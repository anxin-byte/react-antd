import React,{Component} from "react";
import "./aside.scss"
import {MenuFoldOutlined,MenuUnfoldOutlined} from "@ant-design/icons"
class LayoutHeader extends Component{
    constructor(props) {
        super(props);
        this.state={
            collapsed:props.collapsed
        }
    }
    //
    componentWillReceiveProps({collapsed}) {
        this.setState({
            collapsed
        })
    }

    toggleMenu=()=>{
      this.props.toggle()
    }
    render() {
        const {collapsed}=this.state
        return(
            <>
              <span onClick={this.toggleMenu} className="collapsed-icon">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>}</span>
            </>
        )
    }
}
export default LayoutHeader