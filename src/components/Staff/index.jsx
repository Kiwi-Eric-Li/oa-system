import {useState, useEffect} from "react"

import request from '../../utils/request';

export default function Staff(){
    
    useEffect(() => {
        request.get("/staff?page=1&page_size=10").then(res => {
            console.log("staff=======res==========", res);
        }).catch(err => {
            console.log("err======", err);
        })
    }, [])
    
    return (
        <div>Staff</div>
    )
}