const tokenAdmin = "adminToken";

export const setToken = value => sessionStorage.setItem(tokenAdmin, value)

export const getToken = () => sessionStorage.getItem(tokenAdmin)
export const isLogin = () => !!getToken()