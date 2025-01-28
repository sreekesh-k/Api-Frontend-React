import React, { useState, useEffect, Fragment } from "react";
import { Form, Button, Upload, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectVendorDetailsForm } from "../../../slices/VendorSlice";
import {
  setIsActive,
  setInactivation,
  changeVendorDetailsForm,
  setURN,
} from "../../../slices/VendorSlice";
import { API_URL } from "../../../constants";
import FormRender from "../formRender/FormRender";
import moment from "moment";
function VendorDetailsForm(props) {
  //Imports
  const { Option } = Select;
  const { TextArea } = Input;
  const [issuanceDate, setIssuanceDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
  var allowedFileTypes = [];
  var notAllowedFileError = "";
  const handleFileChange = ({ fileList }) => {
    if (fileList.length != 0) {
      //To upload only 1 file at a time
      file = [fileList[fileList.length - 1]];
      let uploadedFileType = file[0].type;
      //Ex- For msg type of file type is null
      if (uploadedFileType === "") {
        uploadedFileType =
          file[0].name.split(".")[file[0].name.split(".").length - 1];
      }
      if (
        allowedFileTypes.length > 0 &&
        !(allowedFileTypes.indexOf(uploadedFileType) >= 0)
      ) {
        //toastr.error(file[0].name + notAllowedFileError);
      } else {
        dispatch(setInactivation({ InActivationEvidence: file }));
      }
    }
    //If the current file is deleted
    else dispatch(setInactivation({ InActivationEvidence: "" }));
  };
  //To Fetch the URN , when selected Vendor Type is one of the DD types
  const fetchLatestURN = () => {
    //Fetch URN
    fetch(`${API_URL}/Vendor/GetLatestURN`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "success") {
          dispatch(setURN({ URN: res.data }));
        } else {
          // toastr.error(res.Message);
        }
      })
      .catch((err) => {
        //toastr.error("URN Fetch Failure")
      });
  };

  useEffect(() => {
    // console.log(vendorId);
    //Fetch Filled Data
    setIsLoading(true);
    fetch(`${API_URL}/Vendor/GetVendorById/${vendorId}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "success") {
          let data = JSON.parse(res.data.formData || res.data.jsonForm);
          // updateTitle(`VENDOR MASTER: ${res.data.name}`);
          if (data.action) {
            let dataCopy = props.getData(data.action);
            dispatch(
              changeVendorDetailsForm({
                FormData: dataCopy,
                IsActive: res.data.isActive,
              })
            );
          } else {
            let dataCopy = props.getData(data);
            dispatch(
              changeVendorDetailsForm({
                FormData: dataCopy,
                IsActive: res.data.isActive,
              })
            );
          }
          if (res.data.materialityDate != null) {
            setIssuanceDate(
              moment(res.data.materialityDate).format("DD-MM-YYYY")
            );
          }
          if (res.data.urn) {
            dispatch(setURN({ URN: res.data.urn }));
          } else {
            fetchLatestURN();
          }
          if (res.data.isActive == false) {
            if (res.data.inActivationDate) {
              let IDate = moment(res.data.inActivationDate).format(
                "YYYY-MM-DD"
              );
              dispatch(
                setInactivation({
                  InActivationDate: IDate,
                  ReasonOfInactivation: res.data.reasonOfInactivation,
                  InActivationEvidence: res.data.reasonOfInactivationFiles,
                })
              );
            }
          }
          if (res.data.isTemplateChanged)
            InfoPopup({ title: "Template", msg: "Template has changed" });
        } else {
          // toastr.error(res.Message);
        }
      })
      .catch((err) => {
        //toastr.error("Form Fetch Failure")
      })
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
                fileList={InActivationEvidence ? InActivationEvidence : []}
                onChange={handleFileChange}
                maxCount={1}
                disabled={isInViewMode}
                accept={allowedFileTypes.join(",")}
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
      <div id="formDesignerArea" className="vendor_template_form">
        {!isInViewMode && isCentrilized && FormData && FormData.length > 0 && (
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
    </Fragment>
  );
}

export default VendorDetailsForm;
