import ReactEChart from 'echarts-for-react'

export default function AgeColumn({title, renderList, styleData}){

    const option = {
        title: {text: title},
        xAxis: {max: Math.ceil(Math.max(renderList.map(item => item.value)))},
        yAxis: {
            type: 'category',
            data: renderList.map(item => item.name),
            inverse: true,
            max: 1
        },
        series: [
            {
                realtimeSort: true,
                type: 'bar',
                data: renderList.map(item => item.value),
                label: {
                    show: true,
                    position: 'top'
                }
            }
        ]
    }


    return (
        <div className="staff_num_container" style={{...styleData}}>
            <ReactEChart className="react_for_echarts" option={option} />
        </div>
    )
}

