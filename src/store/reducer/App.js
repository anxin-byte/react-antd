import { setTokenKey, setUsernameKey } from "../Type";
import { getToken, getUsername } from "@/utils/cookies"
const app={
    token:""||getToken(),
    username:""||getUsername(),
    app_list:[
        {label:"禁用", value:true,},
        {label: "启用", value: false}
    ]
}
const appReducer=function (state= app,action){
   switch (action.type){
       case  setTokenKey:{
           console.log(action)
           return {
               ...state,
               token: action.data
           }
       }
       case setUsernameKey:{
           console.log(action)
           return {
               ...state,
               username: action.value
           }
       }
       case "app":{
           return {
              ...state,
               app_list: action.data
           }
       }
       default:
           return state
   }
}
export default appReducer;