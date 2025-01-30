import React from "react";
import { useEffect, useState, Fragment } from "react";
import FormRender from "../formRender/FormRender";
import { useDispatch, useSelector } from "react-redux";
import {
  additionalDetailsForm,
  selectVendorAdditionalDetails,
} from "../../../slices/VendorSlice";
import { API_URL } from "../../../constants";
function AdditionalDetails(props) {
  const [isTemplateUpdated, setIsTemplateUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { FilledFormJson, isInViewMode, vendorId, isCentrilized } = useSelector(
    selectVendorAdditionalDetails
  );

  useEffect(() => {
    //Fetch Form
    fetch(`${API_URL}/Vendor/GetVendorAdditionalDetailsByVendorId/${vendorId}`)
      .then((response) => response.json())
      .then((val) => {
        if (val.data) {
          let res = val.data;
          //setIsTemplateUpdated(res.IsTemplateChanged)
          let data = JSON.parse(res.filledFormJson);
          if (data.action) {
            let dataCopy = props.getData(data.action);
            dispatch(additionalDetailsForm({ FilledFormJson: dataCopy }));
          } else {
            let dataCopy = props.getData(data);
            dispatch(additionalDetailsForm({ FilledFormJson: dataCopy }));
          }
        } else {
          // toastr.error(val.message);
        }
      })
      .catch((err) => {
        //toastr.error("Form Fetch Failure")
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="loadingOverlayVd">
        <i
          className="fa fa-spinner fa-spin fa-3x fa-fw"
          style={{ left: "50%", position: "absolute", top: "40%" }}
        ></i>
        <span className="sr-only">Loading...</span>
      </div>
    );

  return (
    <Fragment>
      <div className="vendorAdditionalDetails-container">
        {isTemplateUpdated != false && (
          <InfoPopup
            title="Update Additional Details"
            msg=" Template has been updated , please update the details accordingly"
          />
        )}

        {FilledFormJson &&
          (isInViewMode || !isCentrilized) &&
          FilledFormJson.length > 0 && (
            <FormRender
              data={FilledFormJson}
              readOnly={true}
              isComponentUpdate={true}
            />
          )}
        {FilledFormJson &&
          !isInViewMode &&
          isCentrilized &&
          FilledFormJson.length > 0 && (
            <FormRender
              data={FilledFormJson}
              readOnly={false}
              isComponentUpdate={true}
            />
          )}
      </div>
    </Fragment>
  );
}

export default AdditionalDetails;
