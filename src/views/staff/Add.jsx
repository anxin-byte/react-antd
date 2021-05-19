import React,{Component} from "react";
import {Form,Row,Select,Col,Radio,message,DatePicker} from "antd"
// Api
import { Add, Detailed, Edit } from "@/api/staff";

import {RequestData} from "@api/common"
import requestUrl from "@api/requestUrl"

import { validate_phone } from "@/utils/validate";
import { nation, face, education } from "@/js/data";

// 配置日期语言
// import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import FormIndex from "../../components/form/FormIndex";
const { Option } = Select;

class StaffAdd extends Component{
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
                {type: "Column",label: "个人信息",name:'col0'},
                {
                    type: "Input",
                    label: "姓名",
                    name: "name",
                    required: false,
                    style: { width: "200px" },
                    placeholder: "请输入姓名"
                },
                {
                    type: "Radio",
                    label: "性别",
                    name: "sex",
                    required: false,
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ]
                },
                {
                    type: "Input",
                    label: "身份证",
                    name: "card_id",
                    required: false,
                    placeholder: "请输入身份证"
                },
                {
                    type: "Upload",
                    label: "头像",
                    name: "face_img",
                    required: false,
                    message: "请上传头像"
                },
                {
                    type: "Date",
                    label: "出生年月",
                    name: "birthday",
                    format: "YYYY/MM",
                    mode: "month",
                    required: false
                },
                {
                    type: "Input",
                    label: "手机号",
                    name: "phone",
                    required: false,
                    placeholder: "请输入11位数字的手机号",
                    rules: [
                        () => ({
                            validator(rule, value) {
                                // 验证手机号
                                // let regPhone = /^1[3456789]\d{9}$/;  // 1 3 713746864  ^首位字符是什么，$结束字符是什么  \d代表数字  11位手机号
                                if (validate_phone(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('手机号格式有误');
                            },
                        })
                    ]
                },
                {
                    type: "Select",
                    label: "民族",
                    name: "nation",
                    required: false,
                    options: nation,
                    placeholder: "请输入11位数字的手机号"
                },
                {
                    type: "Select",
                    label: "政治面貌",
                    name: "political",
                    required: false,
                    options: face,
                    placeholder: "请输入11位数字的手机号"
                },
                {
                    type: "Input",
                    label: "毕业院校",
                    name: "school",
                    required: false
                },
                {
                    type: "Select",
                    label: "学历",
                    name: "education",
                    required: false,
                    options: education
                },
                {
                    type: "Input",
                    label: "专业",
                    name: "major",
                    required: false
                },
                {
                    type: "Upload",
                    label: "毕业证",
                    name: "diploma_img",
                    required: false,
                    message: "请上传毕业证"
                },
                {
                    type: "Input",
                    label: "微信号",
                    name: "wechat",
                    required: false
                },
                {
                    type: "Input",
                    label: "邮箱",
                    name: "email",
                    required: false
                },
                {
                    type: "Column",
                    name:'col1',
                    label: "就职信息"
                },
                {
                    type: "SelectComponent",
                    label: "部门",
                    url: "getDepartmentList",
                    name: "departmen_id",
                    propsKey: {
                        label: "name",
                        value: "id"
                    },
                    required: false,
                    style: { width: "200px" },
                    placeholder: "请选择邮箱"
                },
                {
                    type: "SelectComponent",
                    label: "职位",
                    url: "jobListAll",
                    name: "job_id",
                    propsKey: {
                        label: "jobName",
                        value: "jobId"
                    },
                    required: false,
                    style: { width: "200px" },
                    placeholder: "请选择邮箱"
                },
                {
                    type: "FormItemInline",
                    label: "职员状态",
                    name: "nameStatus",
                    required: false,
                    style: { width: "200px" },
                    placeholder: "请输入姓名",
                    col_label: 2,
                    col_control: 22,
                    inline_item: [
                        {
                            type: "Date",
                            label: "入职时间",
                            name: "job_entry_date",
                            required: false,
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 6
                        },
                        {
                            type: "Date",
                            label: "转正时间",
                            name: "job_formal_date",
                            required: false,
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 6
                        },
                        {
                            type: "Date",
                            label: "离职时间",
                            name: "job_quit_date",
                            required: false,
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 6
                        }
                    ]
                },
                {
                    type: "Input",
                    label: "公司邮箱",
                    name: "company_email",
                    required: false,
                    placeholder: "请输入邮箱"
                },
                {
                    type: "Editor",
                    label: "描述",
                    name: "introduce",
                    required: false,
                    placeholder: "请输入描述内容"
                },
                {
                    type: "Radio",
                    label: "禁启用",
                    name: "status",
                    required: false,
                    options: [
                        { label: "禁用", value: false },
                        { label: "启用", value: true },
                    ]
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
            const data = res.data.data
            // 日期处理
            const basisDate = {
                birthday: data.birthday ? moment(data.birthday) : null,
                job_entry_date: data.job_entry_date ? moment(data.job_entry_date) : null,
                job_formal_date: data.job_formal_date ? moment(data.job_formal_date) : null,
                job_quit_date: data.job_quit_date ? moment(data.job_quit_date) : null,
            }

            this.setState({
                form_config: {
                    ...this.state.formConfig,
                    setFieldValue: {...data, ...basisDate},
                    url: "staffEdit",
                    editKey: "staff_id"
                }
            })
            console.log(this.state.form_config)
            // this.setState({
            //     form_config:{
            //         ...this.state.form_config,
            //         setFieldValue:res.data.data
            //     }
            // },)
            // this.refs.form.setFieldsValue(res.data.data)
        })
    }

    //编辑确认
    onHandlerEdit(values){
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
    onHandlerAdd(values){
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
        this.state.id ? this.onHandlerEdit(values) : this.onHandlerAdd(values);
    }
    render() {
        return (
            <>
                <FormIndex formConfig={this.state.form_config} submit={this.onHandlerSubmit} FormItem={this.state.form_item} FormLayout={this.state.form_layout}>
                    {/*/!** 插槽 *!/*/}
                    {/*<div ref="jobStatus">*/}
                    {/*    <Row gutter={16}>*/}
                    {/*        <Col className="gutter-row" span={4}>*/}
                    {/*            <Radio className="top-5" >在职</Radio>*/}
                    {/*            <div className="spacing-15"></div>*/}
                    {/*            <DatePicker locale={locale} format="YYYY/MM/DD" />*/}
                    {/*        </Col>*/}
                    {/*        <Col className="gutter-row" span={4}>*/}
                    {/*            <Radio className="top-5">休假</Radio>*/}
                    {/*            <div className="spacing-15"></div>*/}
                    {/*            <DatePicker locale={locale} format="YYYY/MM/DD" />*/}
                    {/*        </Col>*/}
                    {/*        <Col className="gutter-row" span={4}>*/}
                    {/*            <Radio className="top-5">离职</Radio>*/}
                    {/*            <div className="spacing-15"></div>*/}
                    {/*            <DatePicker locale={locale} format="YYYY/MM/DD" />*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</div>*/}
                </FormIndex>
            </>

        )
    }
}
export default StaffAdd