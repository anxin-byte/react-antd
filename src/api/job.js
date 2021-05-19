import {post} from "@/utils/request"
/**
 * 添加
 */
export const Add = data => post("/job/add/",data)


/**
 * 详情
 */
export const Detailed = data => post("/job/detailed/",data)

/**
 * 禁启用
 */
export const Status= data => post("/job/status/",data)
