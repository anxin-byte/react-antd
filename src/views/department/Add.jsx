import React,{Component} from "react";

import {Form,Input,InputNumber,Button,Radio,message} from "antd"
// Api
import {DepartmentAdds} from "../../api/department"
class DepartmentAdd extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            form_layout:{
                labelCol:{span:2},
                wrapperCol:{span:22}
            }
        }
    }
    submit = (values) => {
        if(!values.name || values.number===0 || !values.content){
            message.error('请填写表单信息和人员数量！')
            return false
        }
        this.setState({
            loading:true
        })
        DepartmentAdds(values).then(res=>{
            message.info(res.data.message)
            this.setState({
                loading:false
            })
            this.refs.form.resetFields()
        }).catch(err=>{
            this.setState({
                loading:false
            })
        })
        // console.log(values)
    }
    render() {
        return (
            <Form ref="form"
                initialValues={{status:false,number:0}}
                onFinish={this.submit} {...this.state.form_layout}>
                <Form.Item label="部门名称" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="人员数量" name="number">
                    <InputNumber min={0} max={999}/>
                </Form.Item>
                <Form.Item label="禁启用" name="status">
                    <Radio.Group>
                        <Radio value={false}>禁用</Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="content">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button>
                </Form.Item>
            </Form>
        )
    }
}
export default DepartmentAdd