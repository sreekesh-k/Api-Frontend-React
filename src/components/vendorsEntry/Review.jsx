import React from "react";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReview, setReview } from "../../slices/VendorSlice";

function Review(props) {
  //Review with Redux
  const dispatch = useDispatch();
  const [stages, setStages] = useState([]);
  const [numberOfApprovalStages, setNumberOfApprovalStages] = useState(0);
  const [stageRequired, setStageRequired] = useState(true);
  const [controls, setControls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { vendorId, isInViewMode, isCentrilized } = useSelector(selectReview);
  function setFormBuilderData() {
    setControls([]);
  }
  useEffect(() => {
    dispatch(setReview({ StageJson: stages }));
  }, [stages]);

  // useEffect(() => {
  //   fetch(
  //     "/Stages/FecthStageByEntityId?entityId=" + vendorId + "&moduleName=Vendor"
  //   )
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response.StatusCode == 200) {
  //         if (response.data) {
  //           var stagesData = JSON.parse(response.data.StageJson);
  //           stagesData.map((tempstage) => {
  //             tempstage.IsMaster = tempstage.IsMandatory;
  //             tempstage.FormGroup.map((tempgroup) => {
  //               tempgroup.id = Math.random();
  //             });
  //           });
  //           if (stagesData.length != 0) {
  //             setNumberOfApprovalStages(stagesData.length);
  //             setStageRequired(false);
  //             setStages(stagesData);
  //           }
  //         }
  //       } else {
  //         toastr.error(response.Message);
  //       }
  //     })
  //     .catch((err) => toastr.error("Unable To Fetch Stages"))
  //     .finally(() => setIsLoading(false));
  // }, []);
  if (isLoading)
    return (
      <div className="loadingOverlayVd">
        <i
          className="fa fa-spinner fa-spin fa-3x fa-fw"
          style={{ left: "50%", position: "absolute", top: "40%" }}
        ></i>
        <span class="sr-only">Loading...</span>
      </div>
    );
  return (
    <Fragment>
      {/*<div className={(isInViewMode || !isCentrilized) ? "viewModeOnly" : "enableEdit"} />*/}
      {/* <StagesMain
        {...{ props }}
        stages={stages}
        setStages={setStages}
        numberOfApprovalStages={numberOfApprovalStages}
        setNumberOfApprovalStages={setNumberOfApprovalStages}
        currentLanguage={currentLanguage}
        translatorObject={translatorObject}
        stageRequired={stageRequired}
        setStageRequired={setStageRequired}
        setFormBuilderData={setFormBuilderData}
        isReview={true}
        isReviewInViewMode={true}
      /> */}
      <h1>The Stage Main Component Comes Here (Not Available)</h1>
    </Fragment>
  );
}

export default Review;
