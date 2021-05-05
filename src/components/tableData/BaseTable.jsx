import React,{Component} from "react";
import PropTypes from 'prop-types';

import {Button,Table,message,Pagination,Row,Col} from "antd"
import TableIndex from "./TableIndex";

class BaseTable extends Component{
    constructor(props) {
        super(props);
        this.state={}
    }
    render() {
        // rowSelection = {checkbox ? rowSelection : null}
        const { columns,dataSource,total,changePageCurrent,changePageSize,delete_button,handlerDeleteAll,rowSelection,rowKey} = this.props
        return (
            <>
                <Table pagination={false}  rowKey={rowKey} rowSelection={rowSelection}  columns = {columns} dataSource={dataSource} bordered></Table>
                <Row>
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
export default BaseTable