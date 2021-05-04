import React,{Component} from "react";
import {Link,withRouter} from "react-router-dom";
import Router from "../../router/index"
import { Menu } from 'antd';
import {
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
class AsideMenu extends Component{
    constructor(props) {
        super(props);
        this.state={
            selected_keys:[],
            open_keys:[],
            default_openKeys:[],
            default_selectedKeys:[],
            collapsed:false
        }
    }
    // 路由跳转获取当前URL地址
    componentDidMount() {
        const pathname = this.props.location.pathname
        const menu_keys=pathname.split('/').slice(0,3).join('/')
        this.selectMenuHeight(pathname,menu_keys)
        // this.setState({
        //     selected_keys:[pathname],
        //     open_keys:[menu_keys]
        // })
    }
    // 菜单单击选择
    selectMenu=({key,keyPath})=>{
        this.selectMenuHeight(key,keyPath[keyPath.length-1])
        // this.setState({
        //     selected_keys:[key],
        //     open_keys:[keyPath[keyPath.length-1]]
        // })
        // console.log(key)
        // console.log(keyPath)
    }
    openMenu=(openKeys)=>{
        this.setState({
            // selected_keys:[key],
            open_keys:[openKeys[openKeys.length-1]]
        })
    }
    // 高亮menu
    selectMenuHeight=(key,key_path)=>{
        this.setState({
            selected_keys:[key],
            open_keys:[key_path]
        })
    }
    // 子集
    renderSubMenu= ({title,key,child}) => {
     return   <SubMenu key={key} icon={<MailOutlined/>} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                    })
                }
              </SubMenu>
    }

    // 无子集
    renderMenu = ({key,title}) => <Menu.Item key={key}  icon={<PieChartOutlined />}><Link to={key}>{title}</Link></Menu.Item>
    render() {
        const {selected_keys, open_keys, default_openKeys,default_selectedKeys} = this.state
        return(
            <>
                <h1 className="logo">
                    <span>LOGO</span>
                </h1>
                <Menu
                    onOpenChange={this.openMenu}
                    onClick={this.selectMenu}
                    selectedKeys={selected_keys}
                    openKeys={open_keys}
                    mode="inline"
                    theme="dark"
                    // inlineCollapsed={this.state.collapsed}
                >
                    {
                        Router && Router.map(firstItem=>{
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                        })
                    }
                </Menu>
            </>
        )
    }
}
export default withRouter(AsideMenu)