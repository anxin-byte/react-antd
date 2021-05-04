import React from "react";
import {Route,Redirect} from "react-router-dom";
import {isLogin} from "../../utils/cookies"; // cookies
const PrivateRouter =({component:Component,...rest})=>{
    return (
        <Route
            {...rest}
            render={routeProps => (
                isLogin() ?  <Component {...routeProps}/>:<Redirect to="/" />)}
            />
    )
}
export default PrivateRouter