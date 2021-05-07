const job={
    job_obj: {label:"禁用", value:true}
}
const jobReducer=function (state= job,action){
switch (action.type){
    case "job":
        return{
            ...state,
            job_obj: action.data
        }
    default:
        return state
}
}
export default jobReducer;