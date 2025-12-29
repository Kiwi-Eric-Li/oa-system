import ReactEChart from 'echarts-for-react';

export default function ViolationChart({title, renderList}){
    
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
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                width: 550,
                height: 20,
                left: 150,
                bottom: 20,
                start: 0,
                end: 50
            }
        ],
        series: [
            {
                name: '人数',
                type: 'bar',
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
        <div className="block_container">
            <ReactEChart className="react_for_echarts" style={{'width': '100%', 'height': '400px'}} option={option} />
        </div>
    )
}