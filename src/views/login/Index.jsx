import React,{Component} from "react";
import "./index.scss"
import Login from "./Login"; // 登陆组件
import Register from "./Register"; // 注册组件
class Index extends Component{
    constructor(props) {
        super(props);
        this.state={
            is_login:true
        }
    }

    // 登陆注册组件切换
    onCheck = () => {
        this.setState({
            is_login: ! this.state.is_login
        })
    };
    render() {
        return (
            <div className="form-wrap">
                <div className="form-header">
                    <h4 className="column">{this.state.is_login ? '登录' : "注册"}</h4>
                    <span onClick={this.onCheck}>{this.state.is_login ? '用户注册' : "用户登录"}</span>
                </div>
                {this.state.is_login ? <Login/> : <Register onCheck={this.onCheck}/>}
                {/*<Login check={this.onCheck}/>*/}
                {/*<Register/>*/}
            </div>)
    }
}
export default Index