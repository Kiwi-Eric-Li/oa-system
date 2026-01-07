
import React, {useState, useRef, useContext, useEffect} from 'react'
import {mapData} from "../../utils/mapData"
import {Form, Input, Select} from 'antd'
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
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const editNodeData = {
    inputNode: <Input ref={inputRef} onPressEnter={save} onBlur={save} />,
    selectNode: (<Select onBlur={save}>
      {
        mapData[dataIndex] && mapData[dataIndex].map((item, index)=>{
          return (
            <Option key={index} value={index}>{item}</Option>
          )
        })
      }
    </Select>)
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