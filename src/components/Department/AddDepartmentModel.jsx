import {useState} from 'react'
import {Modal, Table} from 'antd'

const {Column} = Table;

export default function AddDepartmentModel({showChildModal, setShowChildModal}){
    
    const [selectDeptId, setSelectDeptId] = useState(0);

    const clearSelect = () => {
        setShowChildModal(false);
    }

    const addDepartment = () => {

    }
    
    return (
        <Modal 
            title="添加所属部门" 
            visible={showChildModal} 
            onCancel={clearSelect}
            onOk={addDepartment}
            destroyOnClose>
            <Table 
                dataSource={[]}
                rowSelection={{type: 'radio', onChange: (id) => setSelectDeptId(id)}}
                pagination={false}
                expandIconColumnIndex={-1}
                rowKey={(record) => record.id}
            >
                <Column title="部门名称" dataIndex="deptName"/>
            </Table>
        </Modal>
    )
}

