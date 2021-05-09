import React from "react"
import {Switch,Route,HashRouter} from "react-router-dom"
import Index from "./views/login/Index"
import Dashboard from "./views/layout/Dashboard";
import { Provider } from "react-redux";
import Store from "@/store/index";
import PrivateRouter from "./views/privateRouter/Index";
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
        <Provider store={Store}>
            <HashRouter>
                <Switch>
                    <Route exact component={Index} path="/"/>
                    <PrivateRouter  component={Dashboard} path="/dashboard"/>
                </Switch>
            </HashRouter>
        </Provider>
    )
  }
}

export default App;
