import React from "react";
import { useState, useEffect, Fragment } from "react";
import VendorDetailsForm from "./VendorDetailsForm";
import VendorCategorization from "./VendorCategorization";
import AdditionalDetails from "./AdditionalDetails";
import VendorRating from "./VendorRating";
import Review from "./Review";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClauseModel from "./ClauseModel";
import { selectVendorApp } from "../../slices/VendorSlice";
import { API_URL } from "../../constants";
import moment from "moment";
import {
  changeTab,
  changeVendorName,
  saveVendorId,
  updateEditAccess,
} from "../../slices/VendorSlice";

function VendorApp(props) {
  const dispatch = useDispatch();
  const [isCentrilizedUser, setIsCentrilizedUser] = useState(false);
  const [viewType, setViewType] = useState("EDIT");
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const navigate = useNavigate();
  //const _vendorDetails = JSON.parse(sessionStorage.getItem("vendorDetails"));
  //let _vendorId = _vendorDetails.VendorId;
  const {
    activeTab,
    vendorId,
    vendorType,
    categorizationData,
    detailsData,
    additionalDetailsData,
    ratingData,
    saveRatingData,
    reviewData,
    hasEditAccess,
    isInViewMode,
    VrTotalScore,
    VrEligibleScore,
    VrConculusion,
    VrDevaitions,
    VrFileStream,
    VrFileName,
    VrFinancialList,
    VrvendorRatingFinancialInfoReadModel,
    VrFinacialFormBillingMaxLimit,
    VrFinancialFormOnNatureOfServices,
    VrFinancialFormOnTypes,
    VrvendorDetails,
    CReviewers,
    CReviewerRemarks,
    VdVendorName,
  } = useSelector(selectVendorApp);

  // TAB IDS
  const tabIds = {
    details: "VendorDetails",
    categorization: "VendorCategorizationScoring",
    additionalDetails: "VendorAdditionlaDetails",
    rating: "VendorRating",
    review: "reviewId",
  };

  const tabData = [
    {
      id: "VendorDetails",
      saveURL: `${API_URL}/Vendor/UpdateVendor/${vendorId}`,
      title: "Vendor Details",
    },
    {
      id: "VendorCategorizationScoring",
      saveURL: `${API_URL}/Vendor/SaveScoring`,
      title: "Vendor Categorization",
    },
    {
      id: "VendorAdditionlaDetails",
      saveURL: `${API_URL}/Vendor/UpdateVendorAdditionalDetails/${vendorId}`,
      title: "Additional Details",
    },
    {
      id: "VendorRating",
      //saveURL: `${API_URL}/Vendor/SaveVendorRating`
      title: "Vendor Rating",
    },
    {
      id: "reviewId",
      //saveURL: `${API_URL}/Stages/AddVendorStages`,
      title: "Vendor Review",
    },
  ];
  // HAS_CENTRALIZED_ACCES
  const useCheckHasCentrilizedAccess = () => {
    const setBooleanForCentrilizedUser =
      isCentrilizedUser === "false" ? false : true; // isCentrilizedUser returns true and false as string
    if (setBooleanForCentrilizedUser) {
      return true;
    }
    if (activeTab === tabIds["rating"] && !setBooleanForCentrilizedUser) {
      return true;
    } else {
      return false;
    }
  };
  const hasCentrilizedAccess = useCheckHasCentrilizedAccess();

  const saveTabChange = (tabId, tabName) => {
    if (tabId !== null && tabId !== activeTab) {
      dispatch(changeTab(tabId));
      sessionStorage.setItem("activeTabId", tabId);
    }
    if (tabName) {
      sessionStorage.setItem("activeTabName", tabName);
    }
  };
  const handleClick = (e) => {
    if (!isInViewMode) {
      handleSaveBtnClick(e.target.id);
    } else saveTabChange(e.target.id, e.target.title);
  };
  // VALIDATE CATEGORIZATION DATA
  const validateScoringData = () => {
    let isValidated = true;
    categorizationData.forEach((d) => {
      if (d.SubParams !== null) {
        d.SubParams.forEach((sp) => {
          let notSelectedModels = sp.ScoreModels.filter((sm) => {
            return !sm.IsSelected;
          });
          //console.log({ notSelectedModels })
        });
      }
      if (d.SubParams === null) {
        d.ScoreModels.forEach((sm) => {
          if (!sm.IsSelected) isValidated = false;
        });
      }
    });
  };

  // SAVE_REVIEWERS
  const reviewerIds = CReviewers.filter((r) => r.IsSelected);
  const _ids = [];
  reviewerIds.forEach((r) => _ids.push(r.Id));
  const handleSaveReviewers = () => {
    fetch(`${API_URL}/Vendor/SaveVendorReviewers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        VendorId: vendorId,
        ReviewerIds: _ids,
        CreatedBy: "",
        Remarks: CReviewerRemarks,
        Title: "",
        TotalScore: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        if (data.Status == "success") {
          //toastr.success(data.message);
        } else {
          // toastr.error(data.Message);
        }
      })
      .catch(
        (
          err //toastr.error(err.message)
        ) => {}
      );
  };

  //SAVE CATEGORIZATION DATA
  const saveCategorizationData = (saveURL, nextTabId, isFinish) => {
    const arr = [];
    categorizationData.forEach((d) => {
      if (d.SubParams !== null) {
        d.SubParams.forEach((sp) => {
          sp.ScoreModels.forEach((sm) => {
            if (sm.IsSelected) {
              arr.push({
                VendorId: vendorId,
                ScoringRuleId: sm.Id,
                ParameterId: sp.Id,
                ParameterName: sp.ScoringTitle,
                ScoringTitle: sm.Title,
                Score: sm.Score,
                Weights: sm.Weights,
                Rating: sm.Rating,
                CreatedBy: "",
                Data: sm.Data,
              });
            }
          });
        });
      }
      if (d.SubParams === null) {
        d.ScoreModels.forEach((sm) => {
          if (sm.IsSelected) {
            arr.push({
              VendorId: vendorId,
              ScoringRuleId: sm.Id,
              ParameterId: d.Id,
              ParameterName: d.ScoringTitle,
              ScoringTitle: sm.Title,
              Score: sm.Score,
              Weights: sm.Weights,
              Rating: sm.Rating,
              CreatedBy: "",
              Data: sm.Data,
            });
          }
        });
      }
    });
    if (arr.length > 0) {
      if (_ids.length < 1) {
        //toastr.error("Please select reviewers!");
        return;
      }
      saveData(JSON.stringify(arr), saveURL, nextTabId, isFinish);
      handleSaveReviewers();
    } else {
      //toastr.error("Please select the values!");
      setIsLoadingFinish(false);
      return;
    }
  };

  // CHECK WHETHER TO CALL FINANCIAL FORM SAVE API
  const useCheckFinancialFormConditions = () => {
    let _v_Details = JSON.parse(sessionStorage.getItem("vendorDetails"));
    if (_v_Details === null) return false;
    const { Type, AnnualBilling, NatureOfServices } = _v_Details;
    // console.log({ VrFinancialFormOnTypes, VrFinacialFormBillingMaxLimit, VrFinancialFormOnNatureOfServices, NatureOfServices })
    if (!Type && !AnnualBilling && !NatureOfServices) return false;
    if (
      Type === VrFinancialFormOnTypes ||
      AnnualBilling > VrFinacialFormBillingMaxLimit ||
      (VrFinancialFormOnNatureOfServices &&
        VrFinancialFormOnNatureOfServices.some((item) =>
          NatureOfServices.includes(item.trim())
        ))
    )
      return true;
  };
  const toSaveFinancialForm = useCheckFinancialFormConditions();
  //console.log({ toSaveFinancialForm })
  // SAVE RATING DATA
  const saveRating = (saveURL, nextTabId, isFinish) => {
    let arr = [];
    const _data = ratingData;
    let saveDataObj = {
      vendorRatingModels: [],
      averageVendorRatingModel: {
        Id: "",
        VendorId: vendorId,
        TotalScore: VrTotalScore,
        EligibleScore: VrEligibleScore,
        Conculusion: VrConculusion,
        Devaitions: VrDevaitions,
        FileStream: VrFileStream,
        FileName: VrFileName,
      },
    };

    _data.forEach((d) => {
      if (d.SubParams !== null) {
        d.SubParams.forEach((sp) => {
          sp.ScoreModel.forEach((sm) => {
            if (sm.IsSelected) {
              arr.push({
                VendorId: vendorId,
                RatingParameterId: sp.Id,
                ScoringRuleId: sm.Id,
                Score: sm.Score,
                ScoreLevel: sm.ScoreLevel,
                ScoreLevelColor: sm.ScoreColorLevel,
                IsDelete: false,
                RatingParameter: sp.Title,
                RatingRule: sm.label,
              });
            }
          });
        });
      }
      if (d.SubParams === null) {
        d.ScoreModel.forEach((sm) => {
          if (sm.IsSelected) {
            arr.push({
              VendorId: vendorId,
              RatingParameterId: d.Id,
              ScoringRuleId: sm.Id,
              Score: sm.Score,
              ScoreLevel: sm.ScoreLevel,
              ScoreLevelColor: sm.ScoreColorLevel,
              IsDelete: false,
              RatingParameter: d.ParameterName,
              RatingRule: sm.label,
            });
          }
        });
      }
    });
    saveDataObj.vendorRatingModels = arr;
    saveDataObj.averageVendorRatingModel = {
      VendorId: vendorId,
      TotalScore: VrTotalScore,
      EligibleScore: VrEligibleScore,
      Conculusion: VrConculusion,
      Devaitions: VrDevaitions,
      FileName: VrFileName,
    };
    var vrRatingFormDataObj = new FormData();
    if (VrFileStream !== "") {
      vrRatingFormDataObj.append(`file${0}`, VrFileStream[0].originFileObj);
      vrRatingFormDataObj.append(`Files[${0}].uid`, VrFileStream[0].uid);
    }
    vrRatingFormDataObj.append("model", JSON.stringify(saveDataObj));
    if (hasCentrilizedAccess && toSaveFinancialForm) {
      saveFinancialForm(vrRatingFormDataObj, saveURL, nextTabId, isFinish);
    }
    if (hasCentrilizedAccess && !toSaveFinancialForm) {
      saveDataWithoutContent(vrRatingFormDataObj, saveURL, nextTabId, isFinish);
    }
  };

  // SAVE_VENDOR_NAME
  const saveVendorName = (name) => {
    dispatch(changeVendorName(name));
  };
  const DataMessage = (data, tabId, isFinish) => {
    if (data.Status == "success" || data.StatusCode == 201) {
      if (data.data) {
        dispatch(saveVendorId(data.data.VendorId));
        saveVendorName(data.data.VendorName);
        sessionStorage.setItem(
          "vendorDetails",
          JSON.stringify({
            VendorId: data.data.VendorId,
            Type: data.data.VendorType,
            AnnualBilling: data.data.AnnualBillingAmount,
            //"NatureOfServices": data.data.NatureOfService[0].NatureOfService,
            NatureOfServices:
              data.data.NatureOfService !== null
                ? data.data.NatureOfService.map((n) => n.NatureOfService)
                : [],
            VendorName: data.data.VendorName,
          })
        );
      }
      if (tabId) {
        let tab = tabData.find((tab) => tab.id == tabId);
        let title = tab ? tab.title : "";
        saveTabChange(tabId, `VENDOR MASTER: ${data.data.VendorName}`);
      }

      if (isFinish) {
        handleFinishBtnClick();
      }
      //toastr.success(data.message);
      else return;
    } else {
      // toastr.error(data.message);
    }
  };
  // SAVE_FINANCIAL_FORM
  const saveFinancialForm = (
    vrRatingFormDataObj,
    saveURL,
    nextTabId,
    isFinish
  ) => {
    const saveDataObj = {
      vendorFinancialSaveModels: [],
      ratingFinancialInfoReadModel: {
        VendorId: vendorId,
        ProfitAndLossCertifiedBy:
          VrvendorRatingFinancialInfoReadModel["ProfitAndLossCertifiedBy"],
        Deviation: VrvendorRatingFinancialInfoReadModel["Deviation"],
        AdverseRemarks: VrvendorRatingFinancialInfoReadModel["AdverseRemarks"],
        OperationalNetwork:
          VrvendorRatingFinancialInfoReadModel["OperationalNetwork"],
        HistoryOfPaymentStopped:
          VrvendorRatingFinancialInfoReadModel["HistoryOfPaymentStopped"],
        BankImposedPenalty:
          VrvendorRatingFinancialInfoReadModel["BankImposedPenalty"],
        FileName: VrvendorRatingFinancialInfoReadModel["FileName"],
      },
    };
    VrFinancialList.forEach((f) => {
      f.SubParams.forEach((sp) => {
        saveDataObj.vendorFinancialSaveModels.push({
          VendorId: vendorId,
          VendorFinancialParameterId: sp.ParameterId,
          CurrentFinancialYear: sp.CurrentFinancialYear,
          LastFinancialYear: sp.LastFinancialYear,
          IsDelete: false,
        });
      });
    });
    let financialDataObj = new FormData();
    if (
      VrvendorRatingFinancialInfoReadModel["FileStream"] !== null &&
      VrvendorRatingFinancialInfoReadModel["FileStream"][0] !== undefined &&
      VrvendorRatingFinancialInfoReadModel["FileStream"][0] !== null
    ) {
      financialDataObj.append(
        `file${0}`,
        VrvendorRatingFinancialInfoReadModel["FileStream"][0].originFileObj
      );
      financialDataObj.append(
        `Files[${0}].uid`,
        VrvendorRatingFinancialInfoReadModel["FileStream"][0].uid
      );
    }
    financialDataObj.append("model", JSON.stringify(saveDataObj));

    fetch(`${API_URL}/Vendor/SaveVendorFinancials`, {
      method: "POST",
      body: financialDataObj,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.Status == "success" || data.StatusCode == 201) {
          //toastr.success(data.data.message)
          saveDataWithoutContent(
            vrRatingFormDataObj,
            saveURL,
            nextTabId,
            isFinish
          );
        } else {
          //toastr.error(data.data.message);
        }
      })
      .catch((err) => {
        //console.log(err)
        //toastr.error("Unable To Save Data");
      });
  };

  // -----------------------
  // SAVE DATA
  const saveData = (data, api, nextTabId, isFinish) => {
    fetch(api, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log(response)
        DataMessage(response, nextTabId, isFinish);
      })
      .catch(
        (err) => {} //toastr.error(err.message)
      );
  };
  // SAVE DATA -- rating also calles same function
  const saveDataWithoutContent = (data, api, nextTabId, isFinish) => {
    fetch(api, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        DataMessage(response, nextTabId, isFinish);
      })
      .catch(
        (err) => {}
        // toastr.error(err.message)
      );
  };

  const handleFinishBtnClick = () => {
    if (vendorId) {
      fetch(`${API_URL}/Vendor/FinishVendor/${vendorId}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Status == "success") {
            // toastr.success(data.message);
            window.location = "/Vendor/Vendor";
            setIsLoadingFinish(false);
          } else {
            // toastr.error(data.message);
            setIsLoadingFinish(false);
          }
        })
        .catch((err) => toastr.error(err.message));
    } else {
      // toastr.error("Unable To Finish, Save First");
    }
  };
  const vendorDetailsErrorHandling = (detailsData) => {
    let msg = "";
    if (detailsData.IsActive == false) {
      if (detailsData.InActivationEvidence == "") {
        msg = "Please Submit Inactivation Evidence \n";
      }
      if (detailsData.ReasonOfInactivation == "") {
        msg = msg + "Please Add Reason For Inactivation  \n";
      }
      if (detailsData.InActivationDate == "") {
        msg = msg + "Please Add Inactivation Date \n";
      }
    }
    return msg;
  };
  const dynamicFormErrorHandling = (data) => {
    let errMsg = "";
    let fData = data.FormData || data.FilledFormJson;
    if (fData) {
      // -1 as last is layout
      for (let i = 0; i < fData.length - 1; i++) {
        const field = fData[i];
        // Check if the field is required and does not have a value
        if (
          field.required &&
          (!field.value ||
            (Array.isArray(field.value) && field.value.length === 0))
        ) {
          errMsg = errMsg + `${field.label} is mandatory \n`;
          break;
        }
      }
    }
    return errMsg;
  };

  const reviewErrorHandling = () => {
    let errorMessage = "";
    if (reviewData.StageJson.length != 0) {
      reviewData.StageJson.map((value) => {
        if (value.StageName == "") {
          errorMessage = "Please enter Stage Name \n";
        }
        if (value.FormGroup.length == 0) {
          errorMessage = errorMessage + "Please Select Stage User \n";
        } else {
          value.FormGroup.map((tempgroup) => {
            if (tempgroup.Approvers.length == 0) {
              errorMessage = errorMessage + "Please Select Stage User \n";
            }
          });
        }
      });
    }
    return errorMessage;
  };

  //To Handle Map and Date Format
  const getData = (Fdata) => {
    let formData = [];
    Fdata.forEach((data) => {
      let dataCopy = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (key !== "eventEmitter" && key !== "isConverted") {
            dataCopy[key] = element;
          }
        }
      }
      if (dataCopy.type === "date") {
        dataCopy = getDateTimeValue(dataCopy);
      }
      formData.push(dataCopy);
    });
    return formData;
  };
  const getDateTimeValue = (dataCopy) => {
    if (dataCopy.value) {
      //Need to Revisit FormRender - It's not optimised way to do
      if (dataCopy.value.split("-")[0].length == 4) {
        dataCopy.value = moment(dataCopy.value).format("YYYY-MM-DD");
      } else {
        dataCopy.value = moment(dataCopy.value, dataCopy.format).format(
          "YYYY-MM-DD"
        );
      }
    }
    return dataCopy;
  };

  function handleCircularObject(formDataArray) {
    var tempFormData = [];
    formDataArray.map((data) => {
      delete data.eventEmitter;
      tempFormData.push(JSON.stringify(data));
    });
    return "[" + tempFormData + "]";
  }

  async function handleSaveBtnClick(nextTabId, isFinish = false) {
    if (isFinish) {
      setIsLoadingFinish(true);
    }
    let data = tabData.filter((t) => {
      return t.id == activeTab;
    });
    if (data.length > 0) {
      if (activeTab === "VendorCategorizationScoring" && vendorType !== "DSA") {
        if (hasCentrilizedAccess && !isInViewMode) {
          saveCategorizationData(data[0].saveURL, nextTabId, isFinish);
        } else {
          saveTabChange(nextTabId, "");
        }
      }
      if (activeTab === "VendorCategorizationScoring" && vendorType == "DSA") {
        saveTabChange(nextTabId, "");
        setIsLoadingFinish(false);
      }
      if (activeTab == "VendorDetails") {
        let errorMessage = "";
        errorMessage += await vendorDetailsErrorHandling(detailsData);
        errorMessage += await dynamicFormErrorHandling(detailsData);
        if (errorMessage !== "") {
          // toastr.error(errorMessage);
        } else {
          var formDataObj = new FormData();
          if (detailsData.InActivationEvidence[0]) {
            formDataObj.append(
              `file${0}`,
              detailsData.InActivationEvidence[0].originFileObj
            );
            formDataObj.append(
              `Files[${0}].uid`,
              detailsData.InActivationEvidence[0].uid
            );
          }

          var formJSon = await handleCircularObject(detailsData.FormData);

          var dataNew = {
            ...detailsData,
            Type: vendorType,
            InActivationEvidence: "",
            FormData: formJSon,
          };
          formDataObj.append("model", JSON.stringify(dataNew));
          if (hasCentrilizedAccess && !isInViewMode)
            saveDataWithoutContent(
              formDataObj,
              data[0].saveURL,
              nextTabId,
              isFinish
            );
          else saveTabChange(nextTabId, "");
        }
      }
      if (activeTab == "VendorAdditionlaDetails") {
        let errorMessage = "";
        errorMessage += await dynamicFormErrorHandling(additionalDetailsData);
        if (errorMessage !== "") {
          // toastr.error(errorMessage);
        } else {
          var formJSon = await handleCircularObject(
            additionalDetailsData.FilledFormJson
          );
          if (hasCentrilizedAccess && !isInViewMode)
            saveData(
              JSON.stringify({
                ...additionalDetailsData,
                VendorId: vendorId,
                FilledFormJson: formJSon,
              }),
              data[0].saveURL,
              nextTabId,
              isFinish
            );
          else saveTabChange(nextTabId, "");
        }
      }
    }
    if (activeTab === "VendorRating") {
      if (!isInViewMode) {
        saveRating(data[0].saveURL, nextTabId, isFinish);
      } else {
        saveTabChange(nextTabId, "");
      }
    }
    if (activeTab == "reviewId") {
      let errorMessage = "";
      errorMessage += await reviewErrorHandling(reviewData);
      if (errorMessage !== "") {
        //toastr.error(errorMessage);
      } else {
        if (hasCentrilizedAccess)
          saveData(
            JSON.stringify({
              ...reviewData,
              StageJson: JSON.stringify(reviewData.StageJson),
              EntityID: vendorId,
              IsDefault: false,
            }),
            data[0].saveURL,
            nextTabId,
            isFinish
          );
        else saveTabChange(nextTabId, "");
      }
    }
  }

  // RENDER DIFFERENT VENDOR SECTIONS
  const renderSections = {
    VendorDetails: <VendorDetailsForm getData={getData} />,
    VendorCategorizationScoring: <VendorCategorization />,
    VendorAdditionlaDetails: <AdditionalDetails getData={getData} />,
    VendorRating: <VendorRating />,
    reviewId: <Review />,
  };

  const handleTabChange = (dest) => {
    if (dest === "next") {
      let nextTab =
        activeTab === "VendorDetails"
          ? "VendorCategorizationScoring"
          : activeTab === "VendorCategorizationScoring"
          ? "VendorAdditionlaDetails"
          : activeTab === "VendorAdditionlaDetails"
          ? "VendorRating"
          : "reviewId";
      if (
        isInViewMode ||
        (activeTab === "VendorCategorizationScoring" && vendorType == "DSA")
      ) {
        let tab = tabData.find((tab) => tab.id == nextTab);
        let title = tab ? tab.title : "";
        saveTabChange(nextTab, title);
      } else handleSaveBtnClick(nextTab);
    } else {
      let prevTab =
        activeTab === "reviewId"
          ? "VendorRating"
          : activeTab === "VendorRating"
          ? "VendorAdditionlaDetails"
          : activeTab === "VendorAdditionlaDetails"
          ? "VendorCategorizationScoring"
          : "VendorDetails";
      if (
        isInViewMode ||
        (activeTab === "VendorCategorizationScoring" && vendorType == "DSA")
      ) {
        let tab = tabData.find((tab) => tab.id == prevTab);
        let title = tab ? tab.title : "";
        saveTabChange(prevTab, title);
      } else handleSaveBtnClick(prevTab);
    }
  };
  useEffect(() => {
    if (vendorId) {
      dispatch(saveVendorId(vendorId));
    } else {
      //console.log("else part called")
      // dispatch(changeTab("VendorDetails"));
    }
  }, [activeTab]);

  const handleEditAccess = () => {
    localStorage.setItem("isViewMode", JSON.stringify(false));
    dispatch(updateEditAccess({ isInViewMode: false }));
  };

  useEffect(() => {
    if (viewType === "NEW") {
      handleEditAccess();
    }
  }, []);
  // useEffect(() => {
  //   updateTitle(
  //     `VENDOR MASTER ${VdVendorName !== "" ? `: ${VdVendorName}` : ""}`
  //   );
  // }, [VdVendorName]);

  const LoadingSvg = () => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 1024 1024"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-loader"
      >
        <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path>
      </svg>
    );
  };
  // crate separate component here
  return (
    <div className="action-centre-nav">
      <div style={{ position: "relative" }}>
        <ul
          className="vd-actionTabs"
          style={{ position: "sticky", top: "0px", zIndex: "1000" }}
        >
          {tabData.map((tab) => {
            return (
              <li
                className={activeTab === tab.id ? "active-tab" : ""}
                key={tab.id}
                style={{
                  width:
                    tab.title.length <= 14
                      ? "9vw"
                      : tab.title.length >= 25
                      ? "20vw"
                      : "12vw",
                }}
              >
                <button onClick={handleClick} id={tab.id} title={tab.title}>
                  {tab.title}
                </button>
              </li>
            );
          })}
          <div style={{ position: "absolute", right: "1px" }}>
            <div
              className="control-panel"
              style={{ marginLeft: "1.1vw", marginRight: "1.1vw" }}
            >
              {/* {tabData.find((tab) => tab.id === activeTab).showHistory &&
                vendorId && (
                  <div className="vd-action-btn ">
                    <HistoryButton
                      api={
                        "/Vendor/GetHistory?vendorId=" +
                        vendorId +
                        "&tabName=" +
                        historyTabIds[activeTab]
                      }
                      selectedTab={activeTab}
                      {...{ tabData }}
                    />
                  </div>
                )} */}
              {tabData.find((tab) => tab.id === activeTab).showInfo && (
                <div className="vd-action-btn ">
                  <ClauseModel {...{ activeTab }} />
                </div>
              )}
              <div className="vd-action-btn ">
                <button
                  onClick={() => navigate("/")}
                  style={{ backgroundColor: "#4E4E4E" }}
                >
                  Close
                </button>
              </div>
              <div className="vd-action-btn ">
                <button
                  onClick={() => handleTabChange("prev")}
                  disabled={activeTab === "VendorDetails"}
                  style={{ backgroundColor: "#4E4E4E", width: "3vw" }}
                  className={
                    activeTab === "VendorDetails" ? "DcButton disabled" : ""
                  }
                >
                  <i
                    id=""
                    className="glyphicon glyphicon-chevron-left vd-arrow"
                  ></i>
                </button>
              </div>
              <div className="vd-action-btn ">
                <button
                  onClick={() => handleTabChange("next")}
                  disabled={activeTab === "reviewId"}
                  style={{ backgroundColor: "#4E4E4E", width: "3vw" }}
                  className={
                    activeTab === "reviewId" ? "DcButton disabled" : ""
                  }
                >
                  <i
                    id=""
                    className="glyphicon glyphicon-chevron-right vd-arrow"
                  ></i>
                </button>
              </div>

              {/* {((hasCentrilizedAccess &&
                activeTab == "VendorCategorizationScoring" &&
                isRatingFreezed == false) ||
                (hasCentrilizedAccess &&
                  activeTab != "VendorCategorizationScoring")) &&
                activeTab !== "reviewId" && ( */}
              {hasCentrilizedAccess && (
                <Fragment>
                  {
                    //(hasEditAccess || viewType === "NEW") && --Change Condition Dar if (hasCentrilizedAccess)
                    !isInViewMode || viewType === "NEW" ? (
                      <div style={{ display: "flex" }}>
                        {tabData.find((tab) => tab.id === activeTab)
                          .showSave && (
                          <div className="vd-action-btn">
                            <button
                              onClick={() => handleSaveBtnClick(activeTab)}
                              style={{ backgroundColor: "#FFB63B" }}
                            >
                              Save
                            </button>
                          </div>
                        )}
                        <div className="vd-action-btn ">
                          <button
                            disabled={isLoadingFinish}
                            style={{
                              backgroundColor: "#00C24D",
                              cursor: !isLoadingFinish
                                ? "pointer"
                                : "not-allowed",
                            }}
                            onClick={() => handleSaveBtnClick(activeTab, true)}
                          >
                            {!isLoadingFinish ? "Finish" : <LoadingSvg />}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="vd-action-btn ">
                        {viewType == "EDIT" &&
                          tabData.find((tab) => tab.id === activeTab)
                            .showEdit && (
                            <button
                              style={{ backgroundColor: "#00C24D" }}
                              onClick={handleEditAccess}
                            >
                              Edit
                            </button>
                          )}
                      </div>
                    )
                  }
                </Fragment>
              )}
            </div>
          </div>
        </ul>
      </div>
      <Fragment>{renderSections[activeTab]}</Fragment>
    </div>
  );
}
export default VendorApp;
