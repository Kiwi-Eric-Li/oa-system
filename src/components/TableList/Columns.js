export default function Columns(handleSave, userInfo){
    const normalList = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'address',
            dataIndex: 'address',
        }
    ]

    const authList = [
        {
            title: '权限',
            dataIndex: 'auth'
        }
    ]

    let renderColumnList = userInfo.identity === 0 ? normalList : [...normalList, ...authList];
    renderColumnList = renderColumnList.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return renderColumnList;
}


