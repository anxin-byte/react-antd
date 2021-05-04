import React,{Component} from "react";
import {Form,Input,Button,Table,Switch,message} from "antd"

//Api
import {GetList,Delete} from "../../api/department";

class DepartmentList extends Component{
    constructor(props) {
        super(props);
        this.state ={
            // 请求数据
            pageNumber:1,
            pageSize:10,
            keyword:"",
            //表头
            columns:[
                {title:"部门名称",dataIndex:"name",key:"name"},
                {title:"禁启用",dataIndex:"status",key:"status",
                    render: (text,rowData) => <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
                },
                {title:"人员数量",dataIndex:"number",key:"number",},
                {title:"操作",dataIndex:"operation",key:"operation",
                    render:(text,rowData) => {
                        return (
                            <>
                                <Button type="primary" onClick={() => this.editHandler(rowData.id)} className="inline-button">编辑</Button>
                                <Button onClick={() => this.deleteHanler(rowData.id)}>删除</Button>
                            </>
                        )
                    }
                }
            ],
            // 列表数据
            data:[],
            // 多选
            selected_row_keys:[]
        }
    }
    // 初始化加载数据
    componentDidMount() {
        this.loadData()
    }
    // 加载数据接口
    loadData = ()=>{
        const {pageNumber,pageSize,keyword} = this.state
       const request_data = {
           pageNumber,
           pageSize
       }
       if(keyword){
           request_data.name = keyword
       }

       GetList(request_data).then(res=>{
           const res_data = res.data.data
           if(res_data){
               this.setState({
                   data:res_data.data
               })
           }
       })
   }
    // 搜索
    onFinish = values =>{
        console.log(values)
        this.setState({
            keyword:values.username,
            pageNumber:1,
            pageSize:10
        })
        this.loadData()
    }
    editHandler = (row)=>{
        console.log(row)
    }
    deleteHanler  = (id) => {
        if (!id) return false
        Delete(id).then(res => {
            message.info(res.data.message)
            this.loadData()
        })
        // console.log(id)
    }
    // 多选框
    onCheckbox = (selected_row_keys)=>{
        this.setState({
            selected_row_keys
        })
    }

    render() {
        const {columns,data} = this.state
        const rowSelection = { onChange:this.onCheckbox }
        return (
            <>
                <Form style={{marginBottom:'20px'}} layout="inline" onFinish={this.onFinish}>
                    <Form.Item
                        label="部门名称"
                        name="username"
                    >
                        <Input  placeholder="请输入部门名称" />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <Table rowSelection = {rowSelection} rowKey="id" columns={columns} dataSource={data} bordered/>
            </>
        )
    }
}
export default DepartmentList
