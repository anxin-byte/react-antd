const config={
    status:[
        {label:"禁用", value:true,},
        {label: "启用", value: false}
    ]
}
const configReducer=function (state=config,action){
    switch (action.type){
        case "config":
            return{
                ...state,
                status: action.data
            }
        default:
            return state
    }

}
export default configReducer;