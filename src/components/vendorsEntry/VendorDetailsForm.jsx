import React, { useState, useEffect } from "react";
import { Form, Button, Upload, Select, Input } from "antd";
import FormRender from "./FormRender";
function VendorDetailsForm(props) {
  //Imports
  const { Option } = Select;
  const { TextArea } = Input;
  const [issuanceDate, setIssuanceDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Redux
  // const dispatch = ReactRedux.useDispatch();
  const [
    {
      FormData,
      IsActive,
      URN,
      InActivationDate,
      ReasonOfInactivation,
      InActivationEvidence,
      isInViewMode,
      vendorId,
      isCentrilized,
    },
    setState,
  ] = useState({
    FormData: [
      {
        Id: "3ae603b5-6d6d-4b47-88d1-010ebf671ffb",
        URN: "V0260",
        VendorName: "VN001",
        VendorCode: "VC002",
        Type: "DSA",
        Department: "Test Dept",
        NatureOfService: "Cash handling",
        State: "Andra Pradesh",
        MaterialityDate: "2024-10-29T00:00:00",
        Status: "Inactive",
        FilledFormId: "00000000-0000-0000-0000-000000000000",
        TemplateId: "00000000-0000-0000-0000-000000000000",
        TaskId: "00000000-0000-0000-0000-000000000000",
        FilledForm: null,
        TotalNumberOfRecords: 291,
        InActivationEvidence: "",
        InActivationDate: null,
        ReasonOfInactivation: "",
        Version: "Live",
        CreatedBy: "Surya narayanan",
        ModifiedBy: "Surya narayanan",
        ModifiedDate: "2024-11-21T13:07:21.037",
        CreatedDate: "0001-01-01T00:00:00",
        Materiality: "2024-10-29T00:00:00",
        id: "653a",
      },
    ],
    IsActive: true,
    URN: "",
    InActivationDate: "",
    ReasonOfInactivation: "",
    InActivationEvidence: "",
    isInViewMode: true,
    vendorId: "3ae603b5-6d6d-4b47-88d1-010ebf671ffb",
    isCentrilized: true,
  });
  const handleFileChange = ({ fileList }) => {
    if (fileList.length !== 0) {
      //To upload only 1 file at a time
      file = [fileList[fileList.length - 1]];
      setState((prev) => ({ ...prev, InActivationEvidence: file }));
    } else {
      //If the current file is deleted
      setState((prev) => ({ ...prev, InActivationEvidence: "" }));
    }
  };
  //To Fetch the URN , when selected Vendor Type is one of the DD types
  if (isLoading) {
    return (
      <div className="loadingOverlayVd">
        <i
          className="fa fa-spinner fa-spin fa-3x fa-fw"
          style={{ left: "50%", position: "absolute", top: "40%" }}
        ></i>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="vendorDetails-container">
        <Form className="vd-staticValues-container" layout="vertical">
          <Form.Item label="URN">
            <Input disabled value={URN} className="vd-input vd-w5" />
          </Form.Item>
          <Form.Item label="Materiality issuance date/Empanelment month">
            <Input disabled value={issuanceDate} className="vd-input vd-w10" />
          </Form.Item>
          <Form.Item label="Status">
            <Select
              value={IsActive}
              disabled={isInViewMode || !isCentrilized}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  IsActive: e.target.value,
                }))
              }
            >
              <Option value={true}>Active</Option>
              <Option value={false}>InActive </Option>
            </Select>
          </Form.Item>
          {IsActive == false && (
            <React.Fragment>
              <Form.Item label="Inactivation Date">
                <Input
                  type="date"
                  className="vd-input vd-w10"
                  value={InActivationDate}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      InActivationDate: e.target.value,
                    }))
                  }
                  disabled={isInViewMode}
                />
              </Form.Item>
              <Form.Item label="Upload Inactivation Evidence">
                <Upload
                  beforeUpload={() => false}
                  fileList={InActivationEvidence}
                  onChange={handleFileChange}
                  maxCount={1}
                >
                  <Button disabled={isInViewMode}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Reason of Inactivation">
                <TextArea
                  className="vd-input vd-w85"
                  value={ReasonOfInactivation}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      ReasonOfInactivation: e.target.value,
                    }))
                  }
                  disabled={isInViewMode}
                />
              </Form.Item>
            </React.Fragment>
          )}
        </Form>
        <div id="formDesignerArea">
          {!isInViewMode &&
            isCentrilized &&
            FormData &&
            FormData.length > 0 && <FormRender data={FormData} />}

          {(isInViewMode || !isCentrilized) &&
            FormData &&
            FormData.length > 0 && <FormRender data={FormData} />}
        </div>
      </div>
    </React.Fragment>
  );
}

export default VendorDetailsForm;
