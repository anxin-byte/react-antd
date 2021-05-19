import React,{Component} from "react";
import {Form,Input,Select,Button,Radio,message} from "antd"
// Api
import {Add,Detailed} from "@api/job"
import {RequestData} from "@api/common"
import requestUrl from "@api/requestUrl"

import FormIndex from "../../components/form/FormIndex";
const { Option } = Select;

class JobAdd extends Component{
    constructor(props) {
        super(props);
        this.state={
            // loading:false,
            id:"",
            editKey: "",
            select: [
                { value: 10, name: "研发部",id:'10'},
                { value: 11, name: "行政部",id:"11"}
            ],
            form_config: {
                submitButton:true,
                url: "jobAdd",
                initValue: {
                    number: 0,
                    status: false,
                    parentId: ""
                },
                setFieldValue: {},
                formatFormKey: "parentId"

            },
            form_layout:{
                labelCol:{span:2},
                wrapperCol:{span:22}
            },
            form_item: [
                {
                    type: "Slot",
                    label: "部门",
                    name: "parentId",
                    required: true,
                    slotName: "department",
                    style: { width: "200px" },
                    placeholder: "请选择部门"
                },
                {
                    type: "Input",
                    label: "职位名称",
                    name: "jobName",
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请输入职位名称"
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
        // console.log('00000')
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
        // DepartmentEdits(values).then(res=>{
        //     message.info(res.data.message)
        //     this.setState({
        //         loading:false
        //     })
        //     this.GetDetailed()
        //     // this.refs.form.resetFields()
        // }).catch(err=>{
        //     this.setState({
        //         loading:false
        //     })
        // })
    }
    //编辑确认
    departmentAdds(values){
        console.log(values)
        Add(values).then(res=>{
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
                <FormIndex formConfig={this.state.form_config} submit={this.onHandlerSubmit} FormItem={this.state.form_item} FormLayout={this.state.form_layout}>
                    {/** 插槽 */}
                    <Select ref="department">
                        {
                            this.state.select && this.state.select.map(elem => {
                                return <Option value={elem.id} key={elem.id}>{elem.name}</Option>
                            })
                        }
                    </Select>
                </FormIndex>
            </>

        )
    }
}
export default JobAdd