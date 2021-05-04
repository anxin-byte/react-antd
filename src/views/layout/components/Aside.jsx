import React,{Component} from "react";
import "./aside.scss"
import AsideMenu from "../../../components/menu";
class LayoutAside extends Component{
    constructor(props) {
        super(props);
        this.state={
            collapsed:false
        }
    }
    render() {
        return <AsideMenu />
    }
}
export default LayoutAside