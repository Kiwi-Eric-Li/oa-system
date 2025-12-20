import {Modal} from 'antd'

export default function Dialog({title, dialogStatus, setDialogStatus, width, className, render}){
    console.log("Dialog============")
    return (
        <Modal width={width} title={title} open={dialogStatus} centered={true} className={className} footer={null} destroyOnHidden={true} onCancel={() => setDialogStatus(false)}>
            {render()}
        </Modal>
    )
}