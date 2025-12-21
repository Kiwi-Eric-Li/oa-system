import {useEffect, useState} from 'react'
import {Modal, Table} from 'antd'

const {Column} = Table;

export default function AddDepartmentModel({showChildModal, setShowChildModal, departmentList, setSelectDept}){

    const [selDept, setSelDept] = useState(null);

    const clearSelect = () => {
        setShowChildModal(false);
    }

    const addDepartment = () => {
        setSelectDept(selDept);
        clearSelect();
    }
    
    return (
        <Modal 
            title="添加所属部门" 
            open={showChildModal} 
            onCancel={clearSelect}
            onOk={addDepartment}
            destroyOnHidden>
            <Table 
                dataSource={departmentList.children}
                rowSelection={{type: 'radio', onChange: (id, record) => setSelDept(record)}}
                pagination={false}
                expandIconColumnIndex={-1}
                rowKey={(record) => record.id}
            >
                <Column title="部门名称" dataIndex="label"/>
            </Table>
        </Modal>
    )
}

