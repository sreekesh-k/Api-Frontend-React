import React from "react";
import { useEffect, useState, Fragment } from "react";
import FormRender from "./FormRender";
import { useDispatch, useSelector } from "react-redux";
import { selectVendorAdditionalDetails } from "../../slices/VendorSlice";

function AdditionalDetails(props) {
  const [isTemplateUpdated, setIsTemplateUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { FilledFormJson, isInViewMode, vendorId, isCentrilized } = useSelector(
    selectVendorAdditionalDetails
  );

  // useEffect(() => {
  //   //Fetch Form
  //   fetch("/Vendor/GetVendorAdditionalDetailsByVendorId?VendorId=" + vendorId)
  //     .then((response) => response.json())
  //     .then((val) => {
  //       if (val.status == "success") {
  //         res = val.data;
  //         //setIsTemplateUpdated(res.IsTemplateChanged)
  //         let data = JSON.parse(res.FilledFormJson);
  //         if (data.action) {
  //           dataCopy = props.getData(data.action);
  //           dispatch({
  //             type: "ADDITIONAL_DETAILS_FORM",
  //             payload: { FilledFormJson: dataCopy },
  //           });
  //         } else {
  //           dataCopy = props.getData(data);
  //           dispatch({
  //             type: "ADDITIONAL_DETAILS_FORM",
  //             payload: { FilledFormJson: dataCopy },
  //           });
  //         }
  //       } else {
  //         toastr.error(val.message);
  //       }
  //     })
  //     .catch((err) => toastr.error("Form Fetch Failure"))
  //     .finally(() => setIsLoading(false));
  // }, []);

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
