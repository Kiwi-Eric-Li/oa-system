import {useEffect, useState} from 'react'
import {Upload, Modal} from 'antd'

import request from '../../utils/request';

export default function UploadComponent({avatar, newAvatar}){

    const [fileList, setFileList] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        if(avatar){
            setFileList([{
                url: avatar
            }]);
            setPreviewImg(avatar);
        }
    }, [])

    const handlePreview = () => {
        setIsShowModal(true);
    }

    const handleChange = ({ file, fileList }) => {
        setFileList(fileList);

        // if (file.status === 'done') {
        //     const url = file.response?.data?.url;
        //     if (url) {
        //         console.log('上传成功');
        //     }
        // }

        // if (file.status === 'error') {
        //     console.log('上传失败');
        // }
    };

    const customUpload = (options) => {
        const { file, onSuccess, onError, onProgress } = options;
        
        const formData = new FormData();
        formData.append('file', file);

        request.post("/img/upload", formData).then(res => {
            if(res.code === 0){
                let url = 'http://localhost:3000' + res.data.url;
                onSuccess(res, file);
                setFileList([
                    {
                        url
                    }
                ]);
                setPreviewImg(url);
            }
        }).catch(err => {
            console.log("err======", err);
        });
    };

    return (
        <>
            <Upload 
                maxCount={1}
                customRequest={customUpload}
                listType="picture-card"
                fileList={fileList}
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