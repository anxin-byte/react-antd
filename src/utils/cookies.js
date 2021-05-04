import cookies from "react-cookies";

const token = "adminToken";
const user = "username";

// 存储token
export const setToken = value => cookies.save(token, value);

export const getToken = () => cookies.load(token);

// 存储用户名
export const setUsername = value => cookies.save(user, value);

export const getUsername = () => cookies.load(user);

export const isLogin = () => !!getToken()

// 清除
export const removeToken = ()=> cookies.remove(token, { path: '/' });
export const removeUsername = () => cookies.remove(user, { path: '/' });
