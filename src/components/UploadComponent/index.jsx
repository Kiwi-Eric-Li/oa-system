import {useEffect, useState} from 'react'
import {Upload, Modal} from 'antd'

import request from '../../utils/request';

export default function UploadComponent({avatar, newAvatar}){

    const [token, setToken] = useState("");
    const [fileList, setFileList] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        console.log("avatar=========", avatar);
        if(avatar){
            setFileList([{
                url: avatar
            }]);
            setPreviewImg(avatar);
        }
        _getToken();
    }, [])

    const _getToken = async () => {
        request.post('/user/upload/token', {
            bucket: process.env.REACT_APP_BUCKET,
            uploadUrl: process.env.REACT_APP_UPLOAD_URL,
            accessKey: process.env.REACT_APP_ACCESS_KEY, 
            secretKey: process.env.REACT_APP_SECRET_KEY
        }).then(res => {
            if(res.code === 0){
                setToken(res.data);
            }
        }).catch(err => {
            console.log("err======", err);
        });
    }

    const handlePreview = () => {
        setIsShowModal(true);
    }

    const handleChange = () => {

    }

    return (
        <>
            <Upload 
                maxCount={1}
                action="https://up-z1.qiniu.com/"
                listType="picture-card"
                fileList={fileList}
                data={{token: token}}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                选择图片
            </Upload>
            <Modal open={isShowModal} footer={null} closable={false} onCancel={() => setIsShowModal(false)}>
                <img style={{'width': '100%'}} src={previewImg} />
            </Modal>
        </>
        

    )
}