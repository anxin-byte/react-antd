import { configAddStatus } from "../Type";

const config={
    status:[
        {label:"禁用", value:true,},
        {label: "启用", value: false}
    ]
}
const configReducer=function (state=config,action){
    switch (action.type){
        case configAddStatus:
            return{
                ...state,
                status:[...state.status,action.payload]
            }
        default:
            return state
    }

}
export default configReducer;