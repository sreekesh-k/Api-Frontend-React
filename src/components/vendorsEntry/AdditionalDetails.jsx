import React from "react";
import { useEffect, useState } from "react";
import FormRender from "./FormRender";

function AdditionalDetails(props) {
  const [isTemplateUpdated, setIsTemplateUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [{ FilledFormJson, isInViewMode, vendorId, isCentrilized }, setState] =
    useState({
      FilledFormJson: [],
      isInViewMode: true,
      vendorId: "3ae603b5-6d6d-4b47-88d1-010ebf671ffb",
      isCentrilized: true,
    });

  useEffect(() => {
    //Fetch Form
    setState((props) => ({
      ...props,
      FilledFormJson: [
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
    }));
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
    <React.Fragment>
      <div className="vendorAdditionalDetails-container">
        {isTemplateUpdated != false && (
          <InfoPopup
            title="Update Additional Details"
            msg=" Template has been updated , please update the details accordingly"
          />
        )}

        {FilledFormJson &&
          (isInViewMode || !isCentrilized) &&
          FilledFormJson.length > 0 && <FormRender data={FilledFormJson} />}
        {FilledFormJson &&
          !isInViewMode &&
          isCentrilized &&
          FilledFormJson.length > 0 && <FormRender data={FilledFormJson} />}
      </div>
    </React.Fragment>
  );
}

export default AdditionalDetails;
