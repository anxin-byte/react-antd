import React,{Component} from "react";
import {Link} from "react-router-dom";
import {Form,Input,Button,Table,Switch,message,Modal,Popconfirm} from "antd"

//Api
import {GetList,Delete,Status} from "@api/department";
import TableIndex from "../../components/tableData/TableIndex";
class DepartmentList extends Component{
    constructor(props) {
        super(props);
        this.state ={
            // 请求数据
            // pageNumber:1,
            // pageSize:10,
            // keyword:"",
            switch_id:'',

            delete_button:true,
            config:{
                url:"departmentList",
                checkbox:true,
                rowKey:"id",
                //表头
                thead:[
            {title:"部门名称",dataIndex:"name",key:"name",
                render: text  => <a>{text}</a>
            },
            {title:"禁启用",dataIndex:"status",key:"status",
                render: (text,rowData) => <Switch onChange={()=> this.onHandlerSwitch(rowData.id,rowData.status)} loading={this.state.switch_id == rowData.id} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
            },
            {title:"人员数量",dataIndex:"number",key:"number",},
            {title:"操作",dataIndex:"operation",key:"operation",
                render:(text,rowData) => {
                    return (
                        <>
                            <Button type="primary" className="inline-button"><Link to={{pathname:'/dashboard/department/add',search:"?id="+rowData.id}}>编辑</Link></Button>
                            <Popconfirm visible={this.state.id == rowData.id}
                                        onConfirm={()=> this.deleteHandler()}
                                        okButtonProps={{ loading: this.state.confirmLoading }}
                                        onCancel={()=> this.setState({id:""})}
                                        title={ <p className="text-center">是否确认删除? <strong className="color-red">此操作将无法恢复!</strong> </p>} okText="确认" cancelText="取消">
                                <Button  onClick={() => this.setState({id:rowData.id})}>删除</Button>
                            </Popconfirm>
                            {/*<Button onClick={() => this.setState({visible:true,id:rowData.id})}>删除</Button>*/}
                        </>
                    )
                }
            }
        ],
            },

            // 多选
            // selected_row_keys:[],
            // modal
            confirmLoading:false
        }
    }
   //  // 加载数据接口
   //  loadData = ()=>{
   //      const {pageNumber,pageSize,keyword} = this.state
   //     const request_data = {
   //         pageNumber,
   //         pageSize
   //     }
   //     if(keyword){
   //         request_data.name = keyword
   //     }
   //     this.setState({loading_table:true})
   //     GetList(request_data).then(res=>{
   //         const res_data = res.data.data
   //         if(res_data){
   //             this.setState({
   //                 loading_table:false,
   //                 data:res_data.data
   //             })
   //         }
   //     }).catch(err=>{
   //         this.setState({loading_table:false})
   //     })
   // }
    // table switch 切换
    onHandlerSwitch(switch_id,status){
        if (!switch_id) return false
        this.setState({switch_id})
        Status({id:switch_id,status}).then(res=>{
            message.info(res.data.message)
            this.setState({switch_id:""},() => this.refs.$TableIndex.loadData())

            // this.loadData()
        })
    }
    // // 批量删除
    // deleteAllHanler = ()=>{
    //     console.log("00000",this.state.selected_row_keys)
    //     if(this.state.selected_row_keys.length === 0) return false
    //     const id = this.state.selected_row_keys.join()
    //     this.setState({id})
    //     setTimeout(()=>{this.deleteHanler()},0)
    //     // this.deleteHanler(id)
    //     // console.log()
    // }
    // 弹框确认删除
    deleteHandler (delete_all_id) {
        console.log(delete_all_id)
        let id = null
        if(delete_all_id){
            id = delete_all_id
        }else {
           id = this.state.id
            if (!id) return false
            this.setState({confirmLoading:true})
        }
        // const {id} = this.state
        // console.log(id)

        // return false
        Delete({id}).then(res => {
            message.info(res.data.message)
            this.setState({
                id:"",
                confirmLoading:false,
                // visible: false,
                // selected_row_keys:[]
            },() => this.refs.$TableIndex.loadData())
            this.loadData()
        }).catch(err=>{
            this.setState({
                id:"",
                confirmLoading:false,
                // visible: false,
                // selected_row_keys:[]
            })
        })
        // console.log(id)
    }
    // ref获取子组件
    // getChildRef = (ref) => {
    //     this.TableIndex = ref; // 存储子组件
    // }
    // 多选框
    render() {
        const {config,delete_button} = this.state
        return (
            <>
                {/*// <Form style={{marginBottom:'20px'}} layout="inline" onFinish={this.onFinish}>*/}
                {/*    <Form.Item*/}
                {/*        label="部门名称"*/}
                {/*        name="username"*/}
                {/*    >*/}
                {/*        <Input  placeholder="请输入部门名称" />*/}
                {/*    </Form.Item>*/}
                {/*    <Form.Item shouldUpdate={true}>*/}
                {/*            <Button type="primary" htmlType="submit">搜索</Button>*/}
                {/*    </Form.Item>*/}
                {/*</Form>*/}
                <TableIndex deleteHandler={(id)=>this.deleteHandler(id)}  ref ="$TableIndex" delete_button={delete_button}  config={config}/>
                {/*<Table  loading={loading_table}  rowKey="id"  } bordered/>*/}
                {/*<Button onClick={this.deleteAllHanler}>批量删除</Button>*/}
                {/*<Modal title="提示"*/}
                {/*       confirmLoading={confirmLoading}*/}
                {/*       visible={visible} onOk={this.deleteHanler}*/}
                {/*       okText="确认"*/}
                {/*       cancelText="取消"*/}
                {/*       onCancel={() => this.setState({visible:false,id:""})}>*/}
                {/*    <p className="text-center">是否确认删除? <strong className="color-red">此操作将无法恢复!</strong> </p>*/}
                {/*</Modal>*/}
            </>
        )
    }
}
export default DepartmentList
