import React,{Component} from "react";
import {Link} from "react-router-dom";
import {Button,Switch,message} from "antd"


//Api
import {Status} from "@api/job";
import Store from "../../store/index";

import TableIndex from "../../components/tableData/TableIndex";
import { addStatus } from "../../store/action/Config";

// import FormSearch from "../../components/formSearch/FormSearch";
class JobList extends Component{
    constructor(props) {
        super(props);
        this.state ={
            // 请求数据

            keyword:"",
            switch_id:'',
           // 请求参数
            pageNumber: 1,
            pageSize: 10,
            delete_button:true,
            config:{
                url:"jobList",
                checkbox:true,
                rowKey:"jobId",
                //表头
                thead:[
                    {
                        title: "职位名称",
                        dataIndex: "jobName",
                        key: "jobName"
                    },
                    {
                        title: "部门名称",
                        dataIndex: "name",
                        key: "name"
                    },
                    {title:"禁启用",dataIndex:"status",key:"status",
                        render: (text,rowData) => <Switch onChange={()=> this.onHandlerSwitch(rowData.jobId,rowData.status)} loading={this.state.switch_id == rowData.iobId} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
                    },
                    {title:"操作",dataIndex:"operation",key:"operation",
                        render:(text,rowData) => {
                            return (
                                <>
                                    <Button type="primary" className="inline-button"><Link to={{pathname:'/dashboard/job/JobAdd',search:"?id="+rowData.jobId}}>编辑</Link></Button>
                                    <Button  onClick={() => this.delete(rowData.jobId)}>删除</Button>
                                </>
                            )
                        }
                    }
                ],
                form_item: [
                    {
                        type: "Input",
                        label: "部门名称",
                        name: "name",
                        // required: true,
                        style: { width: "200px",marginBottom:"10px" },
                        placeholder: "请输入部门名称"
                    },
                    {
                        type: "Select",
                        label: "禁启用",
                        name: "status",
                        placeholder: "请选择",
                        // required: true,
                        style: { width: "80px",marginBottom:"10px" },
                        optionsKey:"status"
                    },
                ],
            },
            data:[]
        }
    }
    componentDidMount() {
        // const {config} = Store.getState()
        // console.log(config)
        Store.dispatch(addStatus({
            label: "所有",
            value: "all"
        }))
    }

    // table switch 切换
    onHandlerSwitch(switch_id,status){
        if (!switch_id) return false
        this.setState({switch_id})
        Status({id:switch_id,status}).then(res=>{
            message.info(res.data.message)
            this.setState({switch_id:""},() => this.refs.$TableIndex.loadData())
        })
    }
    /** 删除 */
    delete = (id) => {
        this.refs.$TableIndex.onHandlerDelete(id)
    }
    render() {
        const {config,delete_button,form_item} = this.state
        return (
            <>
                {/*<FormSearch formItem={form_item}/>*/}
                <TableIndex  ref ="$TableIndex" delete_button={delete_button}  config={config}/>
            </>
        )
    }
}
export default JobList
