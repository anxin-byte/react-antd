//路由自动化
const components = []
const files = require.context("../../views",true,/\.jsx$/) // (目录，是否查找子集，指定文件)
files.keys().map(key => {
    // 过滤文件
    if(key.includes('./index/') || key.includes('./layout/') || key.includes('./privateRouter/')  || key.includes("./login/")) return false
    const json_object = {}
    // 生产需要字段
    const split_files_name = key.split('.')
    const path = `/dashboard${split_files_name[1].toLowerCase()}`
    const component = files(key).default
    json_object.path = path
    json_object.component = component
    // 生产路由数组
    components.push(json_object)
})
export default components