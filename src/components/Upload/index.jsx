import {useEffect} from 'react'

import request from '../../utils/request';

export default function Upload({avatar, newAvatar}){

    useEffect(() => {
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
                
            }
            console.log("_getToken=========res======", res);
        }).catch(err => {
            console.log("err======", err);
        });
    }

    return (
        <div>Upload Component</div>
    )
}