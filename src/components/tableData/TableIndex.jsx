import React,{Component} from "react";
import PropTypes from 'prop-types';

import {Button, Table, message, Form, Input,} from "antd"
import BaseTable from "./BaseTable";
import {TableList} from "@api/common";
import requestUrl from "../../api/requestUrl";

class TableIndex extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // 请求数据
            pageNumber:1,
            pageSize:10,
            keyword:"",
            // switch_id:'',
            loading_table:false,
            // 列表数据
            data:[],
            total:null,
            // 多选
            selected_row_keys:[],
            // modal
            // visible:false,
            // confirmLoading:false
        }
    }
    // 初始化加载数据
    componentDidMount() {
        // console.log(requestUrl[this.props.config.url])
        this.loadData()
    }
    // 搜索
    onFinish = values =>{
        console.log(values)
        this.setState({
            keyword:values.username,
            pageNumber:1,
            pageSize:10
        },()=> this.loadData() )

    }
    // 加载数据接口
    loadData(){
        const {pageNumber,pageSize,keyword} = this.state
        const request_data = {
            pageNumber,
            pageSize
        }
        if(keyword){
            request_data.name = keyword
        }
        this.setState({loading_table:true})
        TableList(requestUrl[this.props.config.url],request_data).then(res=>{
            const res_data = res.data.data
            if(res_data){
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
    // 批量删除
    deleteAllHandler = ()=>{
        console.log("00000",this.state.selected_row_keys)
        if(this.state.selected_row_keys.length === 0) return false
        const id = this.state.selected_row_keys.join()
        this.props.deleteHandler(id)
        // this.setState({id},() => this.deleteHanler())
        // setTimeout(()=>{},0)
        // this.deleteHanler(id)
        // console.log()
    }
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
    onCheckbox = (selected_row_keys)=>{
        this.setState({
            selected_row_keys
        })
    }
    render() {
        const {data,loading_table,total} = this.state
        const rowSelection = { onChange:this.onCheckbox }
        const {thead,checkbox,rowKey} = this.props.config
        return(
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
                <BaseTable
                    columns = {thead}
                    dataSource={data}
                    total={total}
                    changePageCurrent={this.onHandlerCurrentChange}
                    changePageSize={this.onHandlerSizeChange}
                    delete_button={this.props.delete_button}
                    handlerDeleteAll={this.deleteAllHandler}
                    rowSelection = {checkbox ? rowSelection : null}
                    rowKey={rowKey || "id"}
                />
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
export default TableIndex