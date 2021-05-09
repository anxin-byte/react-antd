import React,{Component} from "react";
import PropTypes from 'prop-types';

import {Button,Table,message,Pagination,Row,Col} from "antd"
import { connect } from "react-redux";

class BaseTable extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentDidMount() {
        // console.log(this.props.list)
    }

    render() {
        // rowSelection = {checkbox ? rowSelection : null}
        const { columns,dataSource,total,changePageCurrent,changePageSize,delete_button,handlerDeleteAll,rowSelection,rowKey} = this.props
        return (
            <>
                <Table scroll={{ y: 500 }}  pagination={false}  rowKey={rowKey} rowSelection={rowSelection}  columns = {columns} dataSource={this.props.list} bordered></Table>
                <Row style={{marginTop:"10px"}}>
                    <Col span={8}>{delete_button && <Button onClick={handlerDeleteAll}>批量删除</Button>}</Col>
                    <Col span={16}>
                        <Pagination
                            defaultCurrent={1}
                            onChange={changePageCurrent}
                            onShowSizeChange={changePageSize}
                            className="float-right"
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `共 ${total} 条`}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}
// 监测数据类型
BaseTable.proptype={
    columns:  PropTypes.array,
    dataSource:PropTypes.array,
    total:PropTypes.number,
    handlerDeleteAll:PropTypes.func,
    changePageCurrent:PropTypes.func,
    changePageSize:PropTypes.func,
    delete_button:PropTypes.bool,
    rowSelection:PropTypes.object,
    rowKey:PropTypes.string
}
// // 默认检测
BaseTable.defaultProps={
    columns:[],
    dataSource:[],
    total:0,
    delete_button:false,
    rowKey:"id"
}
//把store中的数据映射到这个组件变成props
const mapStateToProps = (state)=> {
    // console.log(state)
    return {
        list: state.department.departmentList
    }
}
export default connect(
    mapStateToProps,
    null
)(BaseTable);
