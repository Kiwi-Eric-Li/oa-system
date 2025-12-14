import {Outlet} from 'react-router-dom'

export default function Layout(){
    return (
        <div>
            <section>Layout</section>
            <Outlet /> 
        </div>
    )
}