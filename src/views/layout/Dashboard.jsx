import React,{Component} from "react";
import { Layout } from 'antd';
import "./layout.scss"
import LayoutAside from "./components/Aside";
import LayoutHeader from "./components/Header";
import ContainerMain from "../../components/containerMain/index";
const { Header, Sider, Content } = Layout;
class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state={
            collapsed:false
        }

    }
    componentDidMount() {
        const collapsed = JSON.parse(sessionStorage.getItem("collapsed"))
        this.setState({collapsed})
    }

    toggleCollapsed=()=>{
        const collapsed = !this.state.collapsed
        this.setState({collapsed})
        sessionStorage.setItem("collapsed",collapsed)
    }
    render() {
        const {collapsed} = this.state
        return (
        <Layout className="layout-wrap">
            <Sider collapsed={collapsed} width="250px"><LayoutAside/></Sider>
            <Layout>
                <Header  className="layout-header"><LayoutHeader toggle={this.toggleCollapsed}  collapsed={collapsed}/></Header>
                <Content className="layout-content">
                    <ContainerMain/>
                </Content>
            </Layout>
        </Layout>
        )
    }
}
export default Dashboard