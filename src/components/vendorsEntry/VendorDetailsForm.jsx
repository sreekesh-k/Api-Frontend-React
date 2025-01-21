import React, { useState, useEffect, Fragment } from "react";
import { Form, Button, Upload, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectVendorDetailsForm } from "../../slices/VendorSlice";
import {
  setIsActive,
  setInactivation,
  changeVendorDetailsForm,
  setURN,
} from "../../slices/VendorSlice";
import FormRender from "./FormRender";
function VendorDetailsForm(props) {
  //Imports
  const { Option } = Select;
  const { TextArea } = Input;
  const [issuanceDate, setIssuanceDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const {
    FormData,
    IsActive,
    URN,
    InActivationDate,
    ReasonOfInactivation,
    InActivationEvidence,
    isInViewMode,
    vendorId,
    isCentrilized,
  } = useSelector(selectVendorDetailsForm);
  const handleFileChange = ({ fileList }) => {
    if (fileList.length !== 0) {
      //To upload only 1 file at a time
      file = [fileList[fileList.length - 1]];
      dispatch(setInactivation({ InActivationEvidence: file }));
    } else {
      //If the current file is deleted
      dispatch(setInactivation({ InActivationEvidence: "" }));
    }
  };
  //To Fetch the URN , when selected Vendor Type is one of the DD types
  const fetchLatestURN = () => {
    //Fetch URN
    fetch("https://rcapi.gieom.com/Vendor/GetLatestURN")
      .then((response) => response.json())
      .then((res) => {
        if (res.Status == "success") {
          dispatch(setURN({ URN: res.data }));
        } else {
          ///toastr.error(res.Message);
        }
      })
      .catch((err) => toastr.error("URN Fetch Failure"));
  };

  useEffect(() => {
    //Fetch Filled Data
    fetch("https://rcapi.gieom.com/Vendor/GetVendorByIdPOC?Id=" + vendorId)
      .then((response) => response.json())
      .then((res) => {
        if (res.Status == "success") {
          let data = JSON.parse(res.Data.FormData || res.Data.JsonForm);
          updateTitle(`VENDOR MASTER: ${res.Data.Name}`);
          if (data.action) {
            dataCopy = props.getData(data.action);
            dispatch(
              changeVendorDetailsForm({
                FormData: dataCopy,
                IsActive: res.Data.IsActive,
              })
            );
          } else {
            dataCopy = props.getData(data);
            dispatch(
              changeVendorDetailsForm({
                FormData: dataCopy,
                IsActive: res.Data.IsActive,
              })
            );
          }
          if (res.Data.MaterialityDate != null) {
            setIssuanceDate(
              moment(res.Data.MaterialityDate).format("DD-MM-YYYY")
            );
          }
          if (res.Data.URN) {
            dispatch(setURN({ URN: res.Data.URN }));
          } else {
            fetchLatestURN();
          }
          if (res.Data.IsActive == false) {
            if (res.Data.InActivationDate)
              IDate = moment(res.Data.InActivationDate).format("YYYY-MM-DD");
            dispatch(
              setInactivation({
                InActivationDate: IDate,
                ReasonOfInactivation: res.Data.ReasonOfInactivation,
                InActivationEvidence: [res.Data.ReasonOfInactivationFiles],
              })
            );
          }
          if (res.Data.IsTemplateChanged)
            InfoPopup({ title: "Template", msg: "Template has changed" });
        } else {
          toastr.error(res.Message);
        }
      })
      .catch((err) => toastr.error("Form Fetch Failure"))
      .finally(() => setIsLoading(false));
  }, []);

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
    <Fragment>
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
              onChange={(e) => dispatch(setIsActive({ IsActive: e }))}
            >
              <Option value={true}>Active</Option>
              <Option value={false}>InActive </Option>
            </Select>
          </Form.Item>
          {IsActive == false && (
            <Fragment>
              <Form.Item label="Inactivation Date">
                <Input
                  type="date"
                  className="vd-input vd-w10"
                  value={InActivationDate}
                  onChange={(e) =>
                    dispatch(
                      setInactivation({ InActivationDate: e.target.value })
                    )
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
                    dispatch(
                      setInactivation({ ReasonOfInactivation: e.target.value })
                    )
                  }
                  disabled={isInViewMode}
                />
              </Form.Item>
            </Fragment>
          )}
        </Form>
        <div id="formDesignerArea">
          {!isInViewMode &&
            isCentrilized &&
            FormData &&
            FormData.length > 0 && (
              <FormRender
                data={FormData}
                readOnly={false}
                isComponentUpdate={true}
              />
            )}

          {(isInViewMode || !isCentrilized) &&
            FormData &&
            FormData.length > 0 && (
              <FormRender
                data={FormData}
                readOnly={true}
                isComponentUpdate={true}
              />
            )}
        </div>
      </div>
    </Fragment>
  );
}

export default VendorDetailsForm;
