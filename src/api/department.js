import {post} from "../../src/utils/request";

/**
 * 添加接口
 */
export const  DepartmentAdds = data => post("/department/add/",data)

/**
 * 编辑接口
 */
export const  DepartmentEdits = data => post("/department/edit/",data)

/**
 * 列表接口
 */

export const  GetList = data => post("/department/list/",data)

/**
 * 删除接口
 */
export const  Delete = data => post("/department/delete/",data)


/**
 * 禁启用
 */
export const  Status = data => post("/department/status/",data)
/**
 * 禁启用
 */
export const  Detailed = data => post("/department/detailed/",data)