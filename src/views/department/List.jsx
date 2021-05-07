import React,{Component} from "react";
import {Link} from "react-router-dom";
import {Button,Switch,message} from "antd"


//Api
import {Status} from "@api/department";
import Store from "../../store/index";

import TableIndex from "../../components/tableData/TableIndex";
import FormSearch from "../../components/formSearch/FormSearch";
class DepartmentList extends Component{
    constructor(props) {
        super(props);
        this.state ={
            // 请求数据

            // keyword:"",
            switch_id:'',

            delete_button:true,
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
                                <Button  onClick={() => this.delete(rowData.id)}>删除</Button>
                        </>
                    )
                }
            }
        ],

            },
        }
    }
    componentDidMount() {
        const {config} = Store.getState()
        console.log(config)

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
                <FormSearch formItem={form_item}/>
                <TableIndex  ref ="$TableIndex" delete_button={delete_button}  config={config}/>
            </>
        )
    }
}
export default DepartmentList
