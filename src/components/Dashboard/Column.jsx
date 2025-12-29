import ReactEChart from 'echarts-for-react';


export default function Column({title, renderList, styleData, br = false}){

    const option = {
        title: {text: title},
        tooltip: {trigger: 'axis'},
        yAxis: [{type: 'value', minInterval: 1}],
        xAxis: [
            {
                type: 'category',
                data: renderList.xData
            }
        ],
        series: [
            {
                name: "人数",
                type: "bar",
                data: renderList.yData,
                label: {
                    show: true,
                    precision: 1,
                    position: 'top',
                    valueAnimation: true
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




