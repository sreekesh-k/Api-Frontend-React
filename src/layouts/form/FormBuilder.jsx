import React, { useState } from "react";
import { Button, Input, Select, Form } from "antd";

const { Option } = Select;

function FormBuilder({ onSave }) {
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { type: "text", label: "", required: false }]);
  };

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  return (
    <div>
      <h2>Form Builder</h2>
      {fields.map((field, index) => (
        <Form key={index} layout="inline">
          <Form.Item>
            <Input
              placeholder="Label"
              value={field.label}
              onChange={(e) => updateField(index, "label", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Select
              value={field.type}
              onChange={(value) => updateField(index, "type", value)}
            >
              <Option value="text">Text</Option>
              <Option value="email">Email</Option>
              <Option value="number">Number</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => updateField(index, "required", !field.required)}
            >
              {field.required ? "Required" : "Optional"}
            </Button>
          </Form.Item>
        </Form>
      ))}
      <Button type="primary" onClick={addField}>
        Add Field
      </Button>
      <Button type="default" onClick={() => onSave(fields)}>
        Save Form
      </Button>
    </div>
  );
}

export default FormBuilder;
