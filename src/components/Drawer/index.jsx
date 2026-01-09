import {useSelector} from "react-redux"
import {Drawer} from 'antd'



export default function DrawerComponent({title, interfaceName, id, render, reloadList}){
    let showDetailModel = useSelector(state => state.showDetailModel.data);

    return (
        <Drawer 
            title={title}
            placement="right"
            size={500}
            open={showDetailModel}>
            <p>Some contents ...</p>
            <p>Some contents ...</p>
            <p>Some contents ...</p>
            <p>Some contents ...</p>
        </Drawer>
    )
}
