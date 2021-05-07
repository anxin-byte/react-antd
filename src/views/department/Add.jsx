import React,{Component} from "react";
import {Form,Input,InputNumber,Button,Radio,message} from "antd"
// Api
import {DepartmentAdds,Detailed,DepartmentEdits} from "@api/department"
// import {RequestData} from "@api/common"
// import requestUrl from "@api/requestUrl"

import FormIndex from "../../components/form/FormIndex";
class DepartmentAdd extends Component{
    constructor(props) {
        super(props);
        this.state={
            // loading:false,
            id:"",
            form_config: {
                submitButton:true,
                url: "departmentAdd",
                initValue: {
                    number: 0,
                    status: false
                },
                setFieldValue: {}
            },
            form_layout:{
                labelCol:{span:2},
                wrapperCol:{span:22}
            },
            form_item: [
            {
                type: "Input",
                label: "部门名称",
                name: "name",
                required: true,
                style: { width: "200px" },
                placeholder: "请输入部门名称"
            },
            {
                type: "InputNumber",
                label: "人员数量",
                name: "number",
                required: true,
                min: 0,
                max: 100,
                style: { width: "200px" },
                placeholder: "请输入人员数量"
            },
            {
                type: "Radio",
                label: "禁启用",
                name: "status",
                required: true,
                options: [
                    { label: "禁用", value: false },
                    { label: "启用", value: true },
                ]
            },
            {
                type: "Input",
                label: "描述",
                name: "content",
                required: true,
                placeholder: "请输入描述内容"
            }
        ]

    }
    }
    // 获取ID
    componentWillMount() {
        const url = new URLSearchParams(this.props.location.search)
        // console.log(url)
        if(url.get('id')) {
            // console.log(url.get('id'))
            this.setState({
                id:url.get('id')
            },()=>this.GetDetailed())
        }
    }
    // // 根据ID获取详情
    // componentDidMount() {
    //     this.GetDetailed()
    // }
    // 详情函数
    GetDetailed ()  {
        if(!this.state.id) return false
        Detailed({id:this.state.id}).then(res=>{
            // console.log(res.data.data)
            this.setState({
                form_config:{
                    ...this.state.form_config,
                    setFieldValue:res.data.data
                }
            },)
            // this.refs.form.setFieldsValue(res.data.data)
        })
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
    //编辑确认
    departmentAdds(values){
        DepartmentAdds(values).then(res=>{
            message.info(res.data.message)
            this.setState({
                loading:false
            })
        }).catch(err=>{
            this.setState({
                loading:false
            })
        })
    }
    onHandlerSubmit=(values)=>{
     this.state.id ? this.departmentEdit(values):this.departmentAdds(values)
    }
    render() {
        return (
            <>
                <FormIndex formConfig={this.state.form_config} submit={this.onHandlerSubmit} FormItem={this.state.form_item} FormLayout={this.state.form_layout}/>
            </>

        )
    }
}
export default DepartmentAdd