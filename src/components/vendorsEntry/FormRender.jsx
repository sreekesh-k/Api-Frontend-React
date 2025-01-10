import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

function FormRender({ data }) {
  if (!data || data.length === 0) {
    return <div>No form data available</div>;
  }

  return (
    <Form layout="vertical">
      {data.map((field) => {
        const {
          Id,
          VendorName,
          URN,
          VendorCode,
          Type,
          Department,
          NatureOfService,
          State,
          MaterialityDate,
          Status,
        } = field;

        // Render based on the field data
        return (
          <React.Fragment key={Id}>
            {/* Vendor Name */}
            <Form.Item label="Vendor Name">
              <Input value={VendorName} disabled />
            </Form.Item>

            {/* URN */}
            <Form.Item label="URN">
              <Input value={URN} disabled />
            </Form.Item>

            {/* Vendor Code */}
            <Form.Item label="Vendor Code">
              <Input value={VendorCode} disabled />
            </Form.Item>

            {/* Type */}
            <Form.Item label="Type">
              <Input value={Type} disabled />
            </Form.Item>

            {/* Department */}
            <Form.Item label="Department">
              <Input value={Department} disabled />
            </Form.Item>

            {/* Nature of Service */}
            <Form.Item label="Nature of Service">
              <TextArea value={NatureOfService} rows={2} disabled />
            </Form.Item>

            {/* State */}
            <Form.Item label="State">
              <Input value={State} disabled />
            </Form.Item>

            {/* Materiality Date */}
            <Form.Item label="Materiality Date">
              <DatePicker
                value={MaterialityDate ? moment(MaterialityDate) : null}
                disabled
              />
            </Form.Item>

            {/* Status */}
            <Form.Item label="Status">
              <Select value={Status} disabled>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </React.Fragment>
        );
      })}
    </Form>
  );
}

export default FormRender;
