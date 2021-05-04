import React,{Component} from "react";
import {withRouter} from "react-router-dom"
import "./index.scss"
import {Form, Input, Button, Row, Col, message} from 'antd';
import { UserOutlined, LockOutlined,UnlockOutlined } from '@ant-design/icons';
import {validate_password} from "../../utils/validate" // 表单验证
import {Logins} from "../../api/account"; // Api
import Code from "../../components/code"; // 获取验证码按钮组件
import CryptoJs from 'crypto-js'; // 密码加密
import {setToken,setUsername} from "../../utils/cookies"; // Session

class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            code:"",
            module:"login",
            loading:false
        }
        // this.onFinish = this.onFinish.bind(this)
    }
    inputChange= e =>{
     this.setState({
         username:e.target.value
     })
    }
    // 登陆
    onFinish = values => {
        values.password = CryptoJs.MD5(values.password).toString()
        this.setState({
            loading:true
        })
        Logins(values).then(res=>{
            message.success(res.data.message)
            this.setState({
                loading:false
            })
            setUsername(res.data.data.username)
            setToken(res.data.data.token)
            this.props.history.push('/dashboard');
            console.log(res)
        }).catch(err=>{
            this.setState({
                loading:false
            })
            console.log(err)
        })
        // console.log('Received values of form: ', values);
    };
    render() {
        const {username,module,loading} = this.state
        return (
                <div className="form-content">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={ this.onFinish }>
                        <Form.Item name="username" rules={[{ required: true, message: '邮箱不能为空!' },
                            {type:"email",message:"邮箱格式不正确"},
                        //     ({getFieldValue})=>({
                        //     validator(rule,value){
                        //         if(validate_email(value)){
                        //             _this.setState({
                        //                 code_button_disabled:false
                        //             })
                        //             return Promise.resolve()
                        //         }
                        //         return Promise.reject("邮箱格式不正确")
                        //     }
                        // })
                        ]}>
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' },{
                            pattern:validate_password,message:"字母+数字 小于20位 大于6位"
                        }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="字母+数字 小于20位 大于6位"/>
                        </Form.Item>
                        <Form.Item name="code" rules={[{ required: false, message: '请输入6位验证码!',len:6 }]}>
                            <Row gutter={13}>
                                <Col span={13}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                                </Col>
                                <Col span={11}>
                                    <Code module={module} username={username}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" block className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </div>)
    }
}
export default withRouter(Login)