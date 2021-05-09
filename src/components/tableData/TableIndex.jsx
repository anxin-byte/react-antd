import React, {Component, forwardRef} from "react";
import PropTypes from 'prop-types';

import {Button, message, Form, Input, Modal,Row,Col} from "antd"
import BaseTable from "./BaseTable";
import FormSearch from "../formSearch/FormSearch";
import {TableList,TableDelete } from "@api/common";
import requestUrl from "../../api/requestUrl";

// import {Delete} from "@api/department";
// connect
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { addDepartmentList } from "@/store/action/Department";
import Store from "../../store";
// import {addStatus} from "../../store/action/Config";

class TableIndex extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // 请求数据
            pageNumber:1,
            pageSize:10,
            search_data:{},
            // keyword:"",
            loading_table:false, // table 表格懒加载
            // 列表数据
            data:[],
            total:null,
            // 多选
            selected_row_keys:[],
            // modal
            visible:false,
            confirmLoading:false
        }
    }
    // 初始化加载数据
    componentDidMount() {
        this.loadData()
    }
    // onFinish = values =>{
    //     console.log(values)
    //     this.setState({
    //         keyword:values.username,
    //         pageNumber:1,
    //         pageSize:10
    //     },()=> this.loadData() )
    //
    // }
    // 加载数据接口
    loadData(){
        const {pageNumber,pageSize,search_data} = this.state
        const request_data = {
            pageNumber,
            pageSize
        }
        // console.log(search_data)
        if(JSON.stringify(search_data) !== "{}"){
            for(let key in search_data){
                request_data[key] = search_data[key]
            }
        }
        // console.log(request_data)
        // return false
        this.setState({loading_table:true})
        TableList(requestUrl[this.props.config.url],request_data).then(res=>{
            const res_data = res.data.data

            if(res_data){
                Store.dispatch(addDepartmentList(res_data))
                // this.props.actions.addDepartmentList(res_data.data)
                this.setState({
                    loading_table:false,
                    data:res_data.data,
                    total:res_data.total
                })
            }
        }).catch(err=>{
            this.setState({loading_table:false})
        })
    }
    /** 删除 */
    onHandlerDelete(id){
        // console.log(id)
        this.setState({ visible: true })
        if(id) { this.setState({selected_row_keys: [id] }); }
    }
    /** 确认弹窗 */
    deleteHandler = () => {
        // 判断是否已选择删除的数据
        if(this.state.selected_row_keys.length === 0) {
            message.info("请选择需要删除的数据");
            return false;
        }
        this.setState({ confirmLoading: true })
        const id = this.state.selected_row_keys.join();
        // console.log(id)
        TableDelete(requestUrl[`${this.props.config.url}Delete`],{id}).then(response => {
            message.info(response.data.message);
            this.setState({
                visible: false,
                id: "",
                confirmLoading:false,
                // modalconfirmLoading: false,
                selectedRowKeys: []
            })
            // 重新加载数据
            this.loadData();
        })
        // Delete({id}).then(res => {
        //     message.info(res.data.message)
        //     this.setState({
        //         id:"",
        //         confirmLoading:false,
        //         visible: false,
        //         selected_row_keys:[]
        //     },() => this.loadData())
        //     this.loadData()
        // }).catch(err=>{
        //     this.setState({
        //         id:"",
        //         confirmLoading:false,
        //         visible: false,
        //         selected_row_keys:[]
        //     })
        // })
    }
    // 分页
    onHandlerCurrentChange=(pageNumber)=>{
        // if(pageNumber)
        // console.log(pageNumber)
        this.setState({pageNumber},() => this.loadData())
    }
    onHandlerSizeChange=(pageNumbers,pageSize)=>{
        // console.log(pageNumbers)
        // console.log(pageSize)
        // console.log(this.state.pageNumber)
        this.setState({pageNumber:1,pageSize},() => this.loadData())
    }
    // 批量选中
    onCheckbox = (selected_row_keys)=>{
        this.setState({
            selected_row_keys
        })
    }
    //  搜索
    search=(search_data)=>{
        this.setState({
            pageNumber:1,
            pageSize:10,
            search_data
        },()=> this.loadData())
        // console.log(search_data)
    }
    render() {
        const {data,visible,total,confirmLoading,} = this.state
        const rowSelection = { onChange:this.onCheckbox }
        const {thead,checkbox,rowKey,form_item,formSearchCol,formRightCol} = this.props.config
        return(
            <>
                <Row>
                    <Col span={formSearchCol || 20}><FormSearch formItem={form_item} search={this.search} /></Col>
                    {/*<Col span={formRightCol || 4}>*/}
                    {/*    <div className="pull-right">*/}
                    {/*        {this.props.children}*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                </Row>
                <BaseTable
                    columns = {thead}
                    dataSource={data}
                    total={total}
                    changePageCurrent={this.onHandlerCurrentChange}
                    changePageSize={this.onHandlerSizeChange}
                    delete_button={this.props.delete_button}
                    handlerDeleteAll={()=> this.onHandlerDelete()}
                    rowSelection = {checkbox ? rowSelection : null}
                    rowKey={rowKey || "id"}
                />
                <Modal title="提示"
                       confirmLoading={confirmLoading}
                       visible={visible}
                       onOk={this.deleteHandler}
                       okText="确认"
                       cancelText="取消"
                       onCancel={() => this.setState({visible:false})}>
                    <p className="text-center">是否确认删除? <strong className="color-red">此操作将无法恢复!</strong> </p>
                </Modal>
            </>
        )
    }
}
// 监测数据类型
TableIndex.proptype={
  config:  PropTypes.object
}
// // 默认检测
TableIndex.defaultProps={
    delete_button:false
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators({
//             addDepartmentList: addDepartmentList
//         }, dispatch)
//
//     }
// }
// export default connect(null,mapDispatchToProps)(TableIndex)
export default TableIndex