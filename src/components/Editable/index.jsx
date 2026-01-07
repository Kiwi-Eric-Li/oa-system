
import React, {useState, useRef, useContext, useEffect} from 'react'
import {mapData} from "../../utils/mapData"
import {Form, Input, Select, DatePicker} from 'antd'
import dayjs from 'dayjs'
const { Option } = Select;



const EditableContext = React.createContext(null);
export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({
  title,
  type,
  editable,
  children,
  dataIndex,
  rules,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current && inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);

    let value = record[dataIndex];

    if (type === 'dateNode' && value) {
      value = dayjs(value);
    }

    form.setFieldsValue({
      [dataIndex]: value
    });
  };
  
  // 修改之前的检测
  const sendBeforeCheck = async () => {
    try{  
      const editData = await form.validateFields([dataIndex]);
      setEditing(!editing);
      if(record[dataIndex] === editData[dataIndex]) return;
      handleSave({
        id: record.id,
        type: dataIndex,
        updateVal: editData[dataIndex]
      });
    }catch(e){
      setEditing(!editing);
    }
  }

  const editNodeData = {
    inputNode: <Input ref={inputRef} onPressEnter={sendBeforeCheck} onBlur={sendBeforeCheck} />,
    selectNode: (<Select onBlur={sendBeforeCheck}>
      {
        mapData[dataIndex] && mapData[dataIndex].map((item, index)=>{
          return (
            <Option key={index} value={index}>{item}</Option>
          )
        })
      }
    </Select>),
    dateNode: (
      <DatePicker
        style={{ width: '100%' }} 
        onBlur={sendBeforeCheck}
        onChange={sendBeforeCheck}   // 选完直接保存
      />
    )
  }

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={rules}
      >
        {editNodeData[type]}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};