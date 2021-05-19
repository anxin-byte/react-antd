import {post} from "../../src/utils/request";

/**
 * 添加
 */
export const Add = data => post("/staff/add/",data)


/**
 * 详情
 */
export const Detailed = data => post("/staff/detailed/",data)


/**
 * 禁启用
 */
export const  Status = data =>  post("/staff/status/",data)


/**
 * 编辑
 */
export const  Edit = data => post("/staff/edit/",data)


