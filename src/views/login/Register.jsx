import React,{Component} from "react";
import "./index.scss"
import { Form, Input, Button,Row,Col,message} from 'antd';
import { UserOutlined, LockOutlined,UnlockOutlined } from '@ant-design/icons';
import {validate_pass, validate_password} from "../../utils/validate" // 表单验证
import Code from "../../components/code"; // 获取验证码公共组件
import {RegisterPost} from "../../api/account";// Api
import CryptoJs from 'crypto-js'; // 密码加密

class Register extends Component{
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            code:"",
            module:"register",
            loading:false
        }
        // this.onFinish = this.onFinish.bind(this)
    }
    // togo(){
    //     this.props.check('Register')
    // }
    inputChange= e =>{
        this.setState({
            username:e.target.value
        })
    }
    // 注册
    onFinish = values => {
        delete values.passwords
        values.password = CryptoJs.MD5(values.password).toString()
        this.setState({
            loading:true
        })
        RegisterPost(values).then(res=>{
            message.success(res.data.message)
            this.setState({
                loading:false
            })
            if(res.data.resCode === 0){
                this.props.onCheck()
            }
        }).catch(err=>{
            this.setState({
                loading:false
            })
        })
        // console.log('Received values of form: ', values);
    };
    render() {
        const{username,module,loading} = this.state
        return (
                <div className="form-content">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish }>
                        <Form.Item name="username" rules={[{ required: true, message: '邮箱不能为空!' },{
                            type:"email",message:"邮箱格式不正确"
                        }]}>
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' },
                                ({getFieldValue})=>({
                                validator(rule,value){
                                    const passwords_value=getFieldValue("passwords")
                                    if(!validate_pass(value)){
                                        return Promise.reject("字母+数字 小于20位 大于6位")
                                    }
                                    if(passwords_value && value!==passwords_value){
                                        return Promise.reject("两次密码不一致")
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="字母+数字 小于20位 大于6位"/>
                        </Form.Item>
                        <Form.Item name="passwords" rules={[{ required: true, message: '确认密码!'},{
                            pattern:validate_password,message:"字母+数字 小于20位 大于6位"
                        },
                            ({getFieldValue})=>({
                                validator(rule,value){
                                    if(value !== getFieldValue('password')){
                                        return Promise.reject("两次密码不一致")
                                    }
                                    return Promise.resolve()
                                }
                            })]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="字母+数字 小于20位 大于6位"/>
                        </Form.Item>
                        <Form.Item name="code" rules={[{ required: true, message: '请输入6位验证码!',len:6}]}>
                            <Row gutter={13}>
                                <Col span={13}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入验证码!" />
                                </Col>
                                <Col span={11}>
                                   <Code module={module} username={username}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" block className="login-form-button">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>)
    }
}
export default Register