import {post} from "../../src/utils/request";

/**
 * 添加接口
 */
export const  DepartmentAdds = data => post("/department/add/",data)

/**
 * 列表接口
 */

export const  GetList = data => post("/department/list/",data)

/**
 * 删除接口
 */
export const  Delete = data => post("/department/delete/",data)
