import {post} from "../utils/request";

/**
 * 列表接口
 */

export const  TableList = (url,data) => post(url,data)