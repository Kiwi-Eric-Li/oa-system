import OrgTree from 'react-org-tree';

export default function Tree({getDepartmentDetail}){
    const data = {
        id: -1,
        label: '公司组织架构图',
        children: [{
            id: 1,
            label: '技术部',
            children: [{
                id: 4,
                label: '后端工程师',
                children: [
                    {
                        id:41,
                        label: "后端1部",
                        children: [
                            {
                                id:411,
                                label: "后端11部门"
                            }
                        ]
                    },
                    {
                        id:42,
                        label: "后端2部"
                    },
                    {
                        id:43,
                        label: "后端3部"
                    }
                ]
            }, {
                id: 5,
                label: '前端工程师'
            }, {
                id: 6,
                label: '运维工程师'
            }]
        }, {
            id: 2,
            label: '人事部'
        }, {
            id: 3,
            label: '销售部'
        }]
    }

    const selectData = (e, data) => {
        getDepartmentDetail(data.id);
    }


    return (
        <OrgTree
            data={data}
            horizontal={false}
            collapsable={false}
            expandAll={true} 
            onClick={selectData} />
    )
}