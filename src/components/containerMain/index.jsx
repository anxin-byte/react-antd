import React from "react"
import {Switch} from "react-router-dom"

// 私有路由组件
import PrivateRouter from "../../views/privateRouter/Index";

//倒入路由数组
import Components from "./components";

class ContainerMain extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return (
            <Switch>
                {
                    Components.map(item=>{
                        return  <PrivateRouter exact key={item.path} component={item.component} path={item.path}></PrivateRouter>

                    })
                }
            </Switch>
        )
    }
}

export default ContainerMain;
