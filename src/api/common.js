import {post} from "../utils/request";
import * as url from "url";

/**
 * 列表接口
 */

export const  TableList = (url,data) => post(url,data)
export const  RequestData = (url,data) => post(url,data)
/**
 * 删除列表
 */
export const TableDelete = (url,data) => post(url,data)

/**
 * 公用API
 */
export const requestData = (url,data) => post(url,data)
/**
 * 七牛云token
 */
export const UploadToken = data => post("/uploadIToken/",data)


/**
 * 富文本图片上传
 */
export const  Upload = data => post("/upload/",data)


