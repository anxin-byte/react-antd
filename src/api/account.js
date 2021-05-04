import {post} from "../../src/utils/request";

/**
 * 登陆接口
 */
export const  Logins = data => post("/login/",data)
/**
 * 注册接口
 */
export const  RegisterPost = data => post("/register/",data)

/**
 * 获取验证码
 */
export const GetCode= data => post("/getSms/",data)
