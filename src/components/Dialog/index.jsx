import {Modal} from 'antd'



export default function Dialog({title, dialogStatus, render, setDialogStatus, width=600}){
    
    return (
        <Modal 
            width={width}
            destroyOnHidden
            centered={true}
            title={title}
            open={dialogStatus}
            onCancel={() => setDialogStatus(false)} 
            footer={null}>
            {render()}
        </Modal>
    )

}





