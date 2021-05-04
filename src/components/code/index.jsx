import React,{Component} from "react";
import {Button, message} from "antd";
import {PoweroffOutlined} from "@ant-design/icons";
import {validate_email} from "../../utils/validate" // 表单验证
import {GetCode} from "../../api/account"; //Api

let timer = null
class Code extends Component{
    constructor(props) {
        super(props);
        this.state={
            username:props.username,
            button_loading:false,
            button_disabled:false,
            button_text:'获取验证码',
            module:props.module
        }
    }
    // props更新
    componentWillReceiveProps({username}) {
        this.setState({
            username
        })
    }
    // 组件销毁
    componentWillUnmount() {
        clearInterval(timer)
    }
    // 获取验证码
    getCode =()=>{
        const username=this.state.username
        if(!username){
            message.warning('用户名不能为空',1)
            return false
        }
        if (!validate_email(username)){
            message.warning('邮箱格式不正确',1)
            return false
        }
        this.setState({
            button_loading:true,
            button_text:"发送中"
        })
        const request_data={
            username,
            module:this.state.module
        }
        GetCode(request_data).then(res=>{
            message.success(res.data.message)
            this.countDawn()
        }).catch(err=>{
            this.setState({
                button_loading:false,
                button_text:"重新获取",
            })
        })
    }
    // 定时器
    countDawn=()=>{
        let sec=60
        this.setState({
            button_loading:false,
            button_disabled:true,
            button_text:`${sec}S`,
        })
        timer=setInterval(()=>{
            sec--
            if(sec<=0){
                clearInterval(timer)
                this.setState({
                    button_text:`重新获取`,
                    button_disabled:false,
                })
                return false;
            }
            this.setState({
                button_text:`${sec}S`
            })
        },1000)
    }

    render() {
        const {button_text,button_disabled,button_loading} = this.state
        return <Button icon={<PoweroffOutlined/>} onClick={this.getCode} disabled={button_disabled} loading={button_loading}   block type="danger" className="login-form-button">{button_text}</Button>
        }
}
export default Code