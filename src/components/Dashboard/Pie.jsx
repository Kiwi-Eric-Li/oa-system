
import ReactEChart  from 'echarts-for-react'

export default function Pie({title, renderList, styleData}){
    console.log(title, renderList, styleData);
    const option = {
        title: {text: title, left: 'left'},
        tooltip: {trigger: 'item'},
        
    }



    return (
        <div className="staff_num_container" style={{...styleData}}>
            <ReactEChart className='react_for_echarts' option={option} />
        </div>
    )
}



