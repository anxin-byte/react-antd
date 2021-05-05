import React,{Component} from "react";
import {Form,Input,InputNumber,Button,Radio,message} from "antd"
// Api
import {DepartmentAdds,Detailed,DepartmentEdits} from "@api/department"
class DepartmentAdd extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            id:"",
            form_layout:{
                labelCol:{span:2},
                wrapperCol:{span:22}
            }
        }
    }
    // 获取ID
    componentWillMount() {
        const url = new URLSearchParams(this.props.location.search)
        console.log(url)
        if(url.get('id')) {
            console.log(url.get('id'))
            this.setState({
                id:url.get('id')
            })
        }
    }
    // 根据ID获取详情
    componentDidMount() {
        this.GetDetailed()
    }
    // 详情函数
    GetDetailed ()  {
        if(!this.state.id) return false
        Detailed({id:this.state.id}).then(res=>{
            this.refs.form.setFieldsValue(res.data.data)
        })
    }
    // 提交
    submit = (values) => {
        if(!values.name || values.number===0 || !values.content){
            message.error('请填写表单信息和人员数量！')
            return false
        }
        this.setState({
            loading:true
        })
        this.state.id ? this.departmentEdit(values) : this.departmentAdd(values)
        // console.log(values)
    }
    //编辑确认
    departmentEdit(values){
        values.id=this.state.id
        DepartmentEdits(values).then(res=>{
                message.info(res.data.message)
                this.setState({
                    loading:false
                })
            this.GetDetailed()
                // this.refs.form.resetFields()
            }).catch(err=>{
                this.setState({
                    loading:false
                })
            })
    }
    //新增确认
    departmentAdd(values){
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