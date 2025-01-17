import React from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Button } from "antd";

function FormRenderer({ schema }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <h2>Form Renderer</h2>
      {schema.map((field, index) => (
        <Form.Item
          key={index}
          label={field.label}
          rules={[
            {
              required: field.required,
              message: `${field.label} is required!`,
            },
          ]}
        >
          <Input {...register(field.label)} type={field.type} />
        </Form.Item>
      ))}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormRenderer;
