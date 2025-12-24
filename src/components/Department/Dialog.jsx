import {Modal} from 'antd'

export default function Dialog({title, dialogStatus, setDialogStatus, getAllDepartments, width, className, render}){

    const closeModal = () => {
        getAllDepartments();
        setDialogStatus(false)
    }

    return (
        <Modal width={width} title={title} open={dialogStatus} centered={true} className={className} footer={null} destroyOnHidden={true} onCancel={() => closeModal()}>
            {render()}
        </Modal>
    )
}