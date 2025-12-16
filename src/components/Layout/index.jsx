import {useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'

export default function Layout(){

    useEffect(() => {
        // 获取左侧侧边栏路由表
        


    }, []);

    return (
        <div>
            <section>Layout</section>
            <div>侧边栏</div>
            <Outlet /> 
        </div>
    )
}