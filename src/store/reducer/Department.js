import { addDepartmentListData } from "../type";

const department_data={
    departmentList:[]
}
const departmentReducer=function (state= department_data,action){
    switch(action.type){
        case addDepartmentListData: {
            return {
                ...state,
                departmentList: action.data
            }
        }
        default:
            return state;
    }
}
export default departmentReducer;