import React,{Component} from "react";
import PropTypes from 'prop-types';
import { Form, Input, Button, Select,message, InputNumber, Radio, DatePicker, Row, Col } from "antd";
import {requestData} from "@api/common"
import requestUrl from "@api/requestUrl"
// 配置日期语言
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import UploadComponent from "../upload/Index";
import SelectComponent from "../select/Index";
import EditorComponent from "../editor/Index";

const { Option } = Select;

class FormIndex extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            mesPreix: {
                "Input": "请输入",
                "Editor": "请输入",
                "Radio": "请选择",
                "Select": "请选择",
                "SelectComponent": "请选择",
                "Date":  "请选择",
                "Upload": "请上传"
            }
        }
    }
    componentWillReceiveProps({formConfig}){
        // console.log('willprop',nextProps)
        // console.log(nextContext)
        // console.log(formConfig)
        this.refs.form.setFieldsValue(formConfig.setFieldValue)
    }
    formatData = (value) => {
        // 请求数据
        const requestData = JSON.parse(JSON.stringify(value));
        // 需要格式化 JOSN 对象的 key
        const { formatFormKey, editKey, setFieldValue } = this.props.formConfig;
        const keyValue = requestData[formatFormKey];
        // 如果是 JSON 对象
        if(Object.prototype.toString.call(keyValue) == "[object Object]") {
            requestData[formatFormKey] = keyValue[formatFormKey]
        }
        // 判断是否存在“编辑”状态指定的key
        if(editKey) {
            requestData[editKey] = setFieldValue[editKey]
        }
        return requestData;
    }
    // 新增编辑
    onSubmit=(values)=>{
        console.log(values)
        if(this.props.submit){
            this.props.submit(values)
            return false
        }
        /**
         * 参数为 JSON 对象时进行处理
         */
        const paramsData = this.formatData(values);
        // // 请求参数
        // const data = {
        //     url: requestUrl[this.props.formConfig.url],
        //     data: paramsData
        // }
        this.setState({ loading: true })
        requestData(requestUrl[this.props.formConfig.url],paramsData).then(response => {
            const responseData = response.data;
            // 提示
            message.info(responseData.message)
            // 取消按钮加载
            this.setState({ loading: false })
        }).catch(error => {
            // 取消按钮加载
            this.setState({ loading: false })
        })
        // this.setState({loading:true})
        // RequestData(requestUrl[this.props.formConfig.url],values).then(res=>{
        //     message.info(res.data.message)
        //     this.setState({loading:false})
        //     console.log(res)
        // }).catch(err=>{
        //     this.setState({loading:false})
        //     console.log()
        // })
    }
    render() {
        const { FormLayout } = this.props;
        return (
            <>
                <Form ref="form"
                      initialValues={this.props.formConfig.initValue}
                      onFinish={this.onSubmit} {...FormLayout}>
                        {this.initFormItem()}
                    <Row>
                        <Col span={FormLayout.labelCol.span}></Col>
                        <Col span={FormLayout.wrapperCol.span}>
                            { this.props.formConfig.submitButton ? <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button> : "" }
                        </Col>
                    </Row>
                </Form>
            </>
        )
    }
    // 校验规则
    rules = (item) => {
        // state
        const { mesPreix } = this.state;
        let rules = [];
        // 是否必填
        if(item.required) {
            let message = item.message || `${mesPreix[item.type]}${item.label}`; // 请输入xxxxx，请选择xxxxxx
            rules.push({ required: true, message })
        }
        if(item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules);
        }
        return rules;
    }
    /** 失去焦点 */
    blurEvent = (e) => {
        this.props.onBlur && this.props.onBlur(e);
    }
    // input
    inputElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules} validateTrigger={item.trigger || ['onChange']} shouldUpdate={ item.upload_field || false}>
                <Input type={item.value_type || "text"} style={item.style} placeholder={item.placeholder} onBlur={item.blurEvent && this.blurEvent}/>
            </Form.Item>
        )
    }
    // inputNumber
    inputNumberElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber min={item.min} max={item.max} />
            </Form.Item>
        )
    }
    // select
    selectElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                        item.options && item.options.map(elem => {
                            return <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }
    // radio
    radioElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Radio.Group>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }
    // 插槽
    slotElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                { this.props.children && Array.isArray(this.props.children) ? this.props.children.filter(elem => elem.ref === item.slotName) : this.props.children }
            </Form.Item>
        )
    }
    // 栏目
    columnElem = (item) => {
        return (
            <div key={item.name} className="form-column">
                <h4>{item.label}</h4>
            </div>
        )
    }
    // data
    dateElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} className="aaa" style={{marginRight:'20px'}} name={item.name} key={item.name} rules={rules}>
                <DatePicker locale={locale} format={item.format} picker={item.mode} />
            </Form.Item>
        )
    }
    // UploadComponent
    uploadElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: this.validatorSelect}]}>
                <UploadComponent name={item.name} />
            </Form.Item>
        )
    }
    // 初始化表单
    initFormItem=()=>{
        const {FormItem} = this.props
        // console.log('init',FormItem)

        // 检测是否存在 FormItem
        if(!FormItem || (FormItem && FormItem.length === 0)) return false
        // 循环处理
        let form_list = FormItem.map(item =>  this.createControl(item));
        return form_list;
    }
    // SelectComponent
    SelectComponent = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: this.validatorSelect}]}>
                <SelectComponent url={item.url} propsKey={item.propsKey} name={item.name} initValue={this.props.formConfig.setFieldValue} />
            </Form.Item>
        )
    }
    // EditorComponent
    editorElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: this.validatorComponents}]}>
                <EditorComponent name={item.name} initValue={this.props.formConfig.setFieldValue}/>
            </Form.Item>
        )
    }
    // 内联的控件
    formItemInlineElem = (item) => {
        const rules = this.rules(item);
        return (
            <Row key={item.name}>
                <Col span={item.col_label} className="ant-form-item" style={{textAlign: "right",marginBottom:'15px'}}>
                    <div className="ant-form-item-label">
                        <label  className="ant-form-item-required" title="姓名">{item.label}</label>
                    </div>
                </Col>
                <Col span={item.col_control}>
                    <Row>
                        {
                            item.inline_item.map((elem,index) => {
                                return (
                                    <Col span={elem.col} key={index} className="form-item-inline-control">{ this.createControl(elem)}</Col>
                                )
                            })
                        }

                    </Row>
                </Col>
            </Row>
        )
    }
    // 创建表单控件
    createControl = (item) => {
        if(item.type === "Input") { return this.inputElem(item); }
        if(item.type === "Select") { return this.selectElem(item); }
        if(item.type === "SelectComponent") { return this.SelectComponent(item); }
        if(item.type === "InputNumber") { return this.inputNumberElem(item); }
        if(item.type === "Radio") { return this.radioElem(item); }
        if(item.type === "Slot") { return this.slotElem(item); }
        if(item.type === "Column") { return this.columnElem(item); }
        if(item.type === "Date") { return this.dateElem(item); }
        if(item.type === "Upload") { return this.uploadElem(item); }
        if(item.type === "Editor") { return this.editorElem(item); }
        if(item.type === "FormItemInline") { return this.formItemInlineElem(item); }
    }
}
// 校验数据类型
FormIndex.propTypes = {
    formConfig: PropTypes.object
}
// 默认
FormIndex.defaultProps = {
    formConfig: {}
}
export default FormIndex