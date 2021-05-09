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