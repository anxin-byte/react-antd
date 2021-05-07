const app={
    app_list:[
        {label:"禁用", value:true,},
        {label: "启用", value: false}
    ]
}
const appReducer=function (state= app,action){
   switch (action.type){
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