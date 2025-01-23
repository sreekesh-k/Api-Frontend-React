import { Grid, Row, Col, Select, Upload, Button, Form, Input } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import { API_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVendorRating,
  updateRatingElligibleScore,
  updateRatingElligibleScoreStatus,
  updateRatingFinancialForm,
  updateVendorRatingModel,
} from "../../slices/VendorSlice";
import { setVendorRating } from "../../slices/VendorSlice";

function VendorRating(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const [loading, setLoading] = useState(true);
  const [_saveData, set_SaveData] = useState([]);
  const [deviationValue, setDeviationValue] = useState("");

  const dispatch = useDispatch();

  const {
    vendorId,
    ratingData,
    isInViewMode,
    VrDevaitions,
    vendorDetails,
    VrFileStream,
    VrTotalScore,
    VrConculusion,
    VrFinancialList,
    VrvendorRatingFinancialInfoReadModel,
    VrelligibleScore,
    VrElligibleLevel,
    VrElligibleColor,
    VrElligibilityScore,
    VrMaxVendorRatingScore,
    VrFinacialFormBillingMaxLimit,
    VrFinancialFormOnNatureOfServices,
    VrFinancialFormOnTypes,
    VrvendorDetails,
  } = useSelector(selectVendorRating);
  var allowedFileTypes = window.globalConfig
    ? window.globalConfig.allowedFileTypes
    : [];
  var notAllowedFileError = window.globalConfig
    ? window.globalConfig.notAllowedFileError
    : "";
  // FETCH RATING
  const fetchRating = () => {
    fetch(`${API_URL}/Vendor/GetRatingPOC?vendorId=${vendorId}`)
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => {
        console.log(data)
        sessionStorage.setItem(
          "vendorDetails",
          JSON.stringify({
            VendorId: data.vendorResponseResult.vendorId,
            Type: data.vendorResponseResult.vendorType,
            AnnualBilling: data.vendorResponseResult.annualBillingAmount,
            //"NatureOfServices": data.data.NatureOfService[0].NatureOfService,
            NatureOfServices:
              data.vendorResponseResult.natureOfService !== null
                ? data.vendorResponseResult.natureOfService.map(
                    (n) => n.natureOfService
                  )
                : [],
            VendorName: data.vendorResponseResult.vendorName,
          })
        );
        let averageRatingodel = data.data.averageVendorRatingModel;
        dispatch(
          setVendorRating({
            ratingData: data.data.vendorRatingParameter,
            ratingInitialData: JSON.stringify(data.data.vendorRatingParameter),
          })
        );
        _calculateInitialScore(data.data.vendorRatingParameter);//here
        saveRatingModel(averageRatingodel);
        saveRatingFileName(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //FETCH FINANCIAL FORM
  const fetchFinancialForm = () => {
    fetch(`${API_URL}/Vendor/GetVendorFinancials/${vendorId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let vendorRatingFinancialInfoReadModel =
          data.vendorRatingFinancialInfoReadModel;
        vendorRatingFinancialInfoReadModel["FileStream"] =
          data.vendorRatingFinancialInfoReadModel.financialFile !== "" &&
          data.vendorRatingFinancialInfoReadModel.financialFile !== null
            ? [data.vendorRatingFinancialInfoReadModel.financialFile]
            : "";

        dispatch(
          updateRatingFinancialForm({
            FinancialList: data.financialList,
            vendorRatingFinancialInfoReadModel:
              data.vendorRatingFinancialInfoReadModel,
            finaicialListInitialData: JSON.stringify(data.financialList),
          })
        );
      });
  };
  // console.log(VrvendorRatingFinancialInfoReadModel["FileStream"])
  // FETCH_ELLIGIBLE_SCORE
  const fetchElligibleScore = () => {
    fetch(`${API_URL}/Vendor/GetVendorRatingScoringGroup`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        calculateElligibleScore(data.data);
        dispatch(updateRatingElligibleScore({ elligibleScore: data.data }));
      });
  };
  // CHECK WHETHER TO DISPLAY FINANCIAL FORM

  const useCheckFinancialFormConditions = () => {
    let _v_Details = JSON.parse(sessionStorage.getItem("vendorDetails"));
    //if (VrvendorDetails === null)
    if (_v_Details === null) return false;
    const { Type, AnnualBilling, NatureOfServices } = _v_Details;
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
    //if (Type === VrFinancialFormOnTypes || AnnualBilling > VrFinacialFormBillingMaxLimit || (VrFinancialFormOnNatureOfServices && VrFinancialFormOnNatureOfServices.includes(NatureOfServices)))
    //    return true;
  };
  const toRenderFinancialForm = useCheckFinancialFormConditions();
  // CALCULATE INITIAL AVERAGE SCORE
  const _calculateInitialScore = (data) => {
    let arr = [];
    let avg = 0;
    let totalAvgScoreArr = [];
    let _data = data;
    _data.forEach((d) => {
      if (d.subParams !== null) {
        d.averageScore = 0;
        d.subParams.forEach((sp) => {
          sp.scoreModel.forEach((sm) => {
            if (sm.isSelected) {
              avg += 1;
              arr.push({
                Score: sm.score,
              });
              d.averageScore += sm.score;
            }
          });
        });
        d.averageScore =
          d.averageScore > 0
            ? d.isRoundUp
              ? roundUp(d.averageScore / avg, 1)
              : parseFloat((d.averageScore / avg).toFixed(2))
            : d.averageScore;
        totalAvgScoreArr.push(d.averageScore);
        avg = 0;
      }
      if (d.subParams === null) {
        d.averageScore = 0;
        d.scoreModel.forEach((sm) => {
          if (sm.isSelected) {
            avg += 1;
            arr.push({
              Score: sm.score,
            });
            d.averageScore += sm.score;
          }
          dispatch;
        });
        d.averageScore =
          d.averageScore > 0
            ? d.isRoundUp
              ? roundUp(d.averageScore / avg, 1)
              : parseFloat((d.averageScore / avg).toFixed(2))
            : d.averageScore;
        totalAvgScoreArr.push(d.averageScore);
        avg = 0;
      }
    });
    dispatch(setVendorRating({ ratingData: _data }));
    calculateTotalAverageScore(arr, avg, totalAvgScoreArr);
  };
  const saveRatingFileName = (data) => {
    dispatch(
      updateVendorRatingModel({
        FileName: data.data.averageVendorRatingModel.fileName,
      })
    );
  };
  const saveRatingModel = (averageRatingodel) => {
    dispatch(
      updateVendorRatingModel({
        Devaitions: averageRatingodel.devaitions,
        TotalScore: averageRatingodel.totalScore,
        Conculusion: averageRatingodel.conculusion,
        MaxVendorRatingScore: averageRatingodel.maxVendorRatingScore,
        FinancialFormOnTypes: averageRatingodel.financialFormOnTypes,
        FinacialFormBillingMaxLimit:
          averageRatingodel.finacialFormBillingMaxLimit,
        FinancialFormOnNatureOfServices:
          averageRatingodel.financialFormOnNatureOfServices.split(","),
        //FileStream: [averageRatingodel.RatingFile]
        FileStream:
          averageRatingodel.ratingFile !== "" &&
          averageRatingodel.ratingFile !== null
            ? [averageRatingodel.ratingFile]
            : "",
      })
    );
  };

  const calculateTotalAverageScore = (arr, avg, totalAvgScoreArr) => {
    let avgArr = arr;
    let score = 0;
    ratingData.forEach((d) => {
      score += d.averageScore;
    });
    dispatch(updateVendorRatingModel({ TotalScore: score.toFixed(2) }));
  };

  //calculate sum of average scores

  // ----- SELECT CHANGES ---
  // with patams = null
  const handleSelectChange2 = (e, paramId) => {
    const _data = ratingData;
    _data.forEach((p) => {
      if (p.Id === paramId) {
        p.scoreModel.forEach((s) => {
          if (s.value === e) {
            s.isSelected = true;
          } else {
            s.isSelected = false;
          }
        });
        _calculateInitialScore(_data);
      }
    });
    let avg = 0;
    _data.forEach((d) => {
      d.averageScore = 0;
      if (d.subParams !== null) {
        d.subParams.forEach((sp) => {
          sp.scoreModel.forEach((sm) => {
            if (sm.isSelected) {
              avg += 1;
              d.averageScore += sm.score;
            }
          });
        });
        d.averageScore =
          d.averageScore > 0
            ? d.isRoundUp
              ? roundUp(d.averageScore / avg, 1)
              : parseFloat((d.averageScore / avg).toFixed(2))
            : d.averageScore;
        avg = 0;
      } else {
        d.scoreModel.forEach((sm) => {
          if (sm.isSelected) {
            avg += 1;
            d.averageScore += sm.score;
          }
        });
        d.averageScore =
          d.averageScore > 0
            ? d.isRoundUp
              ? roundUp(d.averageScore / avg, 1)
              : parseFloat((d.averageScore / avg).toFixed(2))
            : d.averageScore;
        avg = 0;
      }
    });

    dispatch(setVendorRating({ ratingData: _data }));
  };

  // with params = [{},{}]
  const handleSelectChange = (e, paramId, subParamId) => {
    const _data = ratingData;
    _data.forEach((p) => {
      if (p.Id === paramId) {
        p.subParams.forEach((sp) => {
          if (sp.Id === subParamId) {
            sp.scoreModel.forEach((s) => {
              if (s.value === e) {
                s.isSelected = true;
              } else {
                s.isSelected = false;
              }
            });
            _calculateInitialScore(_data);
          }
        });
      }
    });
    let avg = 0;
    _data.forEach((d) => {
      d.averageScore = 0;
      if (d.subParams !== null) {
        d.subParams.forEach((sp) => {
          sp.scoreModel.forEach((sm) => {
            if (sm.isSelected) {
              avg += 1;
              d.averageScore += sm.score;
            }
          });
        });
        d.averageScore =
          d.averageScore > 0
            ? d.isRoundUp
              ? roundUp(d.averageScore / avg, 1)
              : parseFloat((d.averageScore / avg).toFixed(2))
            : d.averageScore;
        avg = 0;
      } else {
        d.scoreModel.forEach((sm) => {
          if (sm.isSelected) {
            avg += 1;
            d.averageScore += sm.score;
          }
        });
        d.averageScore =
          d.averageScore > 0
            ? d.isRoundUp
              ? roundUp(d.averageScore / avg, 1)
              : parseFloat((d.averageScore / avg).toFixed(2))
            : d.averageScore;
        avg = 0;
      }
    });
    dispatch(setVendorRating({ ratingData: _data }));
  };
  // ------------------------

  // REMARKS FIELDS CHANGES ---
  const handleRemarksChange = (e, paramId, subParamId, hasSubparams) => {
    const _data = ratingData;
    _data.forEach((dataItem) => {
      if (dataItem.id !== paramId) return;
      const updateRemarks = (scoreModels) => {
        scoreModels.forEach((scoreModel) => {
          if (scoreModel.isSelected) {
            scoreModel.remarks = e.target.value;
          }
        });
      };

      if (hasSubparams) {
        dataItem.subParams.forEach((subParam) => {
          if (subParam.id === subParamId) {
            updateRemarks(subParam.scoreModel);
          }
        });
      } else {
        updateRemarks(dataItem.scoreModel);
      }
    });
    dispatch(selectVendorRating({ ratingData: _data }));
  };

  const handleDeviationChange = (e) => {
    setDeviationValue(e.target.value);
    dispatch(updateVendorRatingModel({ Devaitions: e.target.value }));
  };

  const handleFileUploadChange = ({ fileList }) => {
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
        toastr.error(file[0].name + notAllowedFileError);
      } else {
        dispatch(
          updateVendorRatingModel({ FileStream: file, FileName: file[0].name })
        );
      }
    }
    //If the current file is deleted
    else dispatch(updateVendorRatingModel({ FileStream: "", FileName: "" }));
  };
  //-------------
  // FINANCIL_FORM_ONCHNGES_AND_OTHER_LOGIC
  const handleFformChange1 = (e, paramId, subParamId) => {
    let _data = VrFinancialList;
    _data.forEach((f) => {
      if (f.ParameterId === paramId) {
        f.subParams.forEach((sp) => {
          if (sp.parameterId === subParamId) {
            sp.currentFinancialYear = Number(e.target.value);
          }
        });
      }
    });
    dispatch(
      updateRatingFinancialForm({
        FinancialList: _data,
        vendorRatingFinancialInfoReadModel:
          VrvendorRatingFinancialInfoReadModel,
      })
    );
  };
  const handleFformChange2 = (e, paramId, subParamId) => {
    let _data = VrFinancialList;
    _data.forEach((f) => {
      if (f.parameterId === paramId) {
        f.subParams.forEach((sp) => {
          if (sp.parameterId === subParamId) {
            sp.lastFinancialYear = Number(e.target.value);
          }
        });
      }
    });
    dispatch(
      updateRatingFinancialForm({
        FinancialList: _data,
        vendorRatingFinancialInfoReadModel:
          VrvendorRatingFinancialInfoReadModel,
      })
    );
  };
  // calculate elligible score
  const useCalculateElligibleScore = () => {
    let maxScore = VrMaxVendorRatingScore;
    let elligibleScore = (VrTotalScore / maxScore) * 100;
    const calculate = (scores) => {
      scores.forEach((s) => {
        if (elligibleScore >= s.minValue && elligibleScore <= s.maxValue) {
          dispatch(
            updateRatingElligibleScoreStatus({
              level: s.level,
              color: s.levelColor,
              score: elligibleScore,
            })
          );
        }
      });
    };
    return calculate;
  };
  const calculateElligibleScore = useCalculateElligibleScore();

  useEffect(() => {
    calculateElligibleScore(VrelligibleScore);
  }, [VrelligibleScore, VrTotalScore]);
  // ------------

  // geenrate array for read model
  let financialReadModel = [];
  for (let k in VrvendorRatingFinancialInfoReadModel) {
    if (k === "AdverseRemarks")
      financialReadModel.push({
        id: k,
        key: k,
        value: VrvendorRatingFinancialInfoReadModel["AdverseRemarks"],
        label: "Any adverse remarks in auditors report",
      });
    if (k === "OperationalNetwork")
      financialReadModel.push({
        id: k,
        key: k,
        value: VrvendorRatingFinancialInfoReadModel[k],
        label:
          "Whether operational network of the vendor has diminished in size / geographical coverage / activities handled",
      });
    if (k === "HistoryOfPaymentStopped")
      financialReadModel.push({
        id: k,
        key: k,
        value: VrvendorRatingFinancialInfoReadModel[k],
        label:
          "Whether there is any history of payments stopped for the vendor for any default in performance of the terms of the contract.",
      });

    if (k === "BankImposedPenalty")
      financialReadModel.push({
        id: k,
        key: k,
        value: VrvendorRatingFinancialInfoReadModel[k],
        label:
          "Whether Bank has imposed any penalties on the vendor in the past? If so, give details.",
      });

    if (k === "ProfitAndLossCertifiedBy")
      financialReadModel.push({
        id: k,
        key: k,
        value: VrvendorRatingFinancialInfoReadModel[k],
        label: "The profit and loss statements have been certified by",
      });
  }
  const handleFReadModelChange = (e, id) => {
    let modelObj = VrvendorRatingFinancialInfoReadModel;
    VrvendorRatingFinancialInfoReadModel[id] = e.target.value;

    dispatch(
      updateRatingFinancialForm({
        FinancialList: VrFinancialList,
        vendorRatingFinancialInfoReadModel: modelObj,
      })
    );
  };

  // financial form deviation onchange
  const handleFinancialDeviation = (e) => {
    let modelObj = VrvendorRatingFinancialInfoReadModel;
    VrvendorRatingFinancialInfoReadModel["Deviation"] = e.target.value;

    dispatch(
      updateRatingFinancialForm({
        FinancialList: VrFinancialList,
        vendorRatingFinancialInfoReadModel: modelObj,
      })
    );
  };

  // upload financial file
  const handleFinancialFileUpload = ({ fileList }) => {
    if (fileList.length !== 0) {
      file = [fileList[fileList.length - 1]];
      let modelObj = VrvendorRatingFinancialInfoReadModel;
      VrvendorRatingFinancialInfoReadModel["FileStream"] = file;
      VrvendorRatingFinancialInfoReadModel["FileName"] = file[0].name;
      VrvendorRatingFinancialInfoReadModel["DocType"] = file[0].type;
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
        toastr.error(file[0].name + notAllowedFileError);
      } else {
        dispatch(
          updateRatingFinancialForm({
            FinancialList: VrFinancialList,
            vendorRatingFinancialInfoReadModel: modelObj,
          })
        );
      }
    } else {
      let modelObj = VrvendorRatingFinancialInfoReadModel;
      VrvendorRatingFinancialInfoReadModel["FileStream"] = "";
      VrvendorRatingFinancialInfoReadModel["FileName"] = "";
      VrvendorRatingFinancialInfoReadModel["DocType"] = "";
      dispatch(
        updateRatingFinancialForm({
          FinancialList: VrFinancialList,
          vendorRatingFinancialInfoReadModel: modelObj,
        })
      );
    }
  };

  // SAVE_FINANCIAL_FORM
  const saveFinancialForm = () => {
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
      f.subParams.forEach((sp) => {
        saveDataObj.vendorFinancialSaveModels.push({
          VendorId: vendorId,
          VendorFinancialParameterId: sp.parameterId,
          CurrentFinancialYear: sp.currentFinancialYear,
          LastFinancialYear: sp.lastFinancialYear,
          IsDelete: false,
        });
      });
    });
    let financialDataObj = new FormData();
    if (VrvendorRatingFinancialInfoReadModel["FileStream"][0] !== undefined) {
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
        if (data.Status == "success" || data.StatusCode == 201) {
          toastr.success(data.message);
        } else {
          toastr.error(data.message);
        }
      })
      .catch((err) => toastr.error("Unable To Save Data"));
  };

  // -----------------------

  useEffect(() => {
    fetchRating();
    fetchFinancialForm();
    fetchElligibleScore();
  }, []);
  function roundUp(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.ceil(num * factor) / factor;
  }
  if (loading) {
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
    <div
      style={{ backgroundColor: "#fff" }}
      className="vd-access-outer rating-wrapper"
    >
      {/*<div className={isInViewMode ? "viewModeOnly" : "enableEdit"} />*/}
      <Row className="vendor-header">
        <Col span="6">Scoring Parameter</Col>
        <Col span="8">Scoring Rule</Col>
        <Col span="6">Remarks</Col>
        <Col span="2">Score</Col>
        <Col span="2">Rating</Col>
      </Row>
      {ratingData.map((param, key) => {
        return (
          <Row
            key={key}
            className="vendor-data-rows"
            style={{ marginLeft: "1vw", marginRight: "1vw" }}
          >
            <Col span="24">
              <Row gutter={20}>
                <Col span="6" style={{ marginTop: ".5rem" }}>
                  {param.subParams === null && (
                    <p className="vendor-parameter-name">
                      {param.parameterName}
                    </p>
                  )}
                </Col>
                <Col
                  span="8"
                  style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
                >
                  {param.subParams === null && (
                    <Select
                      disabled={isInViewMode}
                      allowClear={true}
                      className="vendor-select vd-cate-select"
                      size="small"
                      defaultValue={param.scoreModel.filter(
                        (s) => s.isSelected
                      ).map((v) => v.value)}
                      style={{ width: 250 }}
                      options={param.scoreModel}
                      onChange={(e) => handleSelectChange2(e, param.id)}
                    />
                  )}
                </Col>
                <Col
                  span="6"
                  style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
                >
                  {param.subParams === null && (
                    <TextArea
                      type="text"
                      disabled={isInViewMode}
                      className="data-input"
                      autoSize={{ minRows: 2, maxRows: 2 }}
                      onChange={(e) =>
                        handleRemarksChange(
                          e,
                          param.id,
                          null,
                          (hasSubparams = false)
                        )
                      }
                      value={param.scoreModel.filter((s) => s.isSelected).map(
                        (v) => v.remarks
                      )}
                    />
                  )}
                </Col>
                <Col span="2" style={{ marginTop: ".5rem" }}>
                  {param.subParams === null && (
                    <Input
                      key={key}
                      disabled
                      value={param.scoreModel.filter((s) => s.isSelected).map(
                        (v) => v.score
                      )}
                      className="vd-r-text-field"
                    />
                  )}
                </Col>
                <Col span="2">
                  {param.subParams === null
                    ? param.scoreModel.map((sm, key) => {
                        const scoreLevel = param.scoreModel.filter(
                          (s) => s.isSelected
                        ).map((v) => v.scoreLevel);
                        const scoreColorLevel = param.scoreModel.filter(
                          (s) => s.isSelected
                        ).map((v) => v.scoreColorLevel);
                        return (
                          sm.isSelected && (
                            <div key={key} className="vd-rating-score">
                              <p>{scoreLevel}</p>
                              <div
                                className="vd-scoreColor"
                                style={{ backgroundColor: scoreColorLevel }}
                              />
                            </div>
                          )
                        );
                      })
                    : null}
                </Col>
                {param.subParams === null && (
                  <Col span="24">
                    <Row>
                      <Col span="24" />
                      <Col span="20">
                        <div className="avg">
                          <p className="vd-avg-text">Average Score</p>
                        </div>
                      </Col>
                      <Col span="4" style={{ paddingLeft: "4.2vw" }}>
                        <div className="avg">
                          {param.scoreModel.map((sm) => {
                            let score = 0;
                            score += sm.isSelected ? parseInt(sm.score) : 0;
                            return (
                              <p key={key}>{parseInt(score.toFixed(2))}</p>
                            );
                          })}
                          {/*{param.averageScore}*/}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Col>
            <Col span="24">
              {param.subParams !== null && (
                <p className="vendor-parameter-name">{param.parameterName}</p>
              )}
              {param.subParams !== null &&
                param.subParams.map((sp, key) => {
                  return (
                    <Row gutter={20}>
                      <Col
                        span="6"
                        style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
                      >
                        <p className="vendor-sub-parameter-name">{sp.Title}</p>
                      </Col>
                      <Col
                        span="8"
                        className="vd-select-wrapper"
                        style={{ marginTop: ".5rem", marginBottom: "1rem" }}
                      >
                        <Select
                          disabled={isInViewMode}
                          className="vendor-select"
                          size="small"
                          allowClear={true}
                          defaultValue={sp.scoreModel.filter(
                            (s) => s.isSelected
                          ).map((v) => v.value)}
                          onChange={(e) =>
                            handleSelectChange(e, param.id, sp.id)
                          }
                          options={sp.scoreModel}
                        />
                      </Col>
                      <Col
                        span="6"
                        style={{ marginTop: "-.2rem", marginBottom: "1rem" }}
                      >
                        <TextArea
                          type="text"
                          disabled={isInViewMode}
                          className="data-input"
                          autoSize={{ minRows: 2, maxRows: 2 }}
                          onChange={(e) =>
                            handleRemarksChange(
                              e,
                              param.id,
                              sp.id,
                              (hasSubparams = true)
                            )
                          }
                          value={sp.scoreModel.filter((s) => s.isSelected).map(
                            (v) => v.remarks
                          )}
                        />
                      </Col>
                      <Col span="2" style={{ marginTop: ".5rem" }}>
                        {
                          <Input
                            key={key}
                            disabled
                            value={sp.scoreModel.filter(
                              (s) => s.isSelected
                            ).map((v) => v.score)}
                            className="vd-r-text-field"
                          />
                        }
                      </Col>
                      <Col span="2">
                        {sp.scoreModel.map((sm, key) => {
                          const scoreLevel = sp.scoreModel.filter(
                            (s) => s.isSelected
                          ).map((v) => v.scoreLevel);
                          const scoreColorLevel = sp.scoreModel.filter(
                            (s) => s.isSelected
                          ).map((v) => v.scoreColorLevel);
                          return (
                            sm.isSelected && (
                              <div key={key} className="vd-rating-score">
                                <p>{sm.scoreLevel}</p>
                                <div
                                  className="vd-scoreColor"
                                  style={{
                                    backgroundColor: sm.scoreColorLevel,
                                  }}
                                />
                              </div>
                            )
                          );
                        })}
                      </Col>
                    </Row>
                  );
                })}
              {param.subParams !== null && (
                <Col span="24">
                  <Row>
                    <Col span="24" />
                    <Col span="20">
                      <div className="avg">
                        <p className="vd-avg-text">Average Score</p>
                      </div>
                    </Col>
                    <Col span="4" style={{ paddingLeft: "4.2vw" }}>
                      <div className="avg">{param.averageScore}</div>
                    </Col>
                  </Row>
                </Col>
              )}
            </Col>
          </Row>
        );
      })}
      <Fragment>
        <div className="rating-form-2">
          <div className="score-fields-wrapper">
            <div className="form-2-field-wrapper">
              <div>
                <p className="vr-text-bold">Total Score</p>
                <span className="vr-text-small">(Sum of Average score)</span>
              </div>
              <Input
                className="form-2-input score-input"
                value={VrTotalScore}
                disabled={true}
              />
            </div>
            <div className="form-2-field-wrapper">
              <div>
                <p className="vr-text-bold">Eligible Score</p>
                <span className="vr-text-small">
                  (Total score / max possible score*100)
                </span>
              </div>
              <Input
                className="form-2-input eligible-input"
                value={roundUp(VrElligibilityScore, 1)}
                disabled={true}
              />
            </div>

            <div className="form-2-field-wrapper">
              <p className="vr-text-bold uppercase">Conclusion</p>
              <div
                style={{
                  display: "flex",
                  gap: "2vw",
                  alignItems: "center",
                  marginRight: "1.9vw",
                }}
              >
                <Input
                  className="form-2-input vr-conclusion-input"
                  value={VrElligibleLevel}
                  disabled={true}
                />
                <div
                  style={{
                    backgroundColor: VrElligibleColor,
                    borderRadius: "50%",
                    height: "2vh",
                    width: "1vw",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="deviation-wrapper">
            <div style={{ width: "72%" }}>
              <p className="vr-text-bold">Deviations if any</p>
              <Input.TextArea
                disabled={isInViewMode}
                className="form-2-input text-area"
                type="textarea"
                value={VrDevaitions}
                onChange={(e) => {
                  handleDeviationChange(e);
                }}
                autoSize={{ minRows: 4, maxRows: 5 }}
              />
            </div>
            <div className="rating-attach">
              <p className="attach-p">Attach proof of deviation</p>
              <Upload
                disabled={isInViewMode}
                beforeUpload={() => false}
                fileList={VrFileStream}
                onChange={handleFileUploadChange}
                maxCount={1}
                accept={allowedFileTypes.join(",")}
              >
                <Button className="upload-btn" disabled={isInViewMode}>
                  <span>Attach file</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path>
                  </svg>
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      </Fragment>
      {/*(vendorDetails.Type === "IT" || vendorDetails.AnnualBilling > 10000000 || vendorDetails.NatureOfServices[0].Title == "Cash handling") && */}

      {/* ------------------- FNANCIAL_FORM --------------------- */}
      {toRenderFinancialForm && (
        <Fragment>
          <h2 style={{ textAlign: "center" }}>Financial Form</h2>
          {VrFinancialList.length > 0 &&
            VrFinancialList.map((f, i) => {
              return (
                <div key={f.parameterId} className="vd-f-fields-wrapper">
                  <p className="field-heading">{f.parameterTitle}</p>
                  {f.subParams.length > 0 &&
                    f.subParams.map((sp, key) => {
                      return (
                        <div className="f-field-wrapper" id={sp.parameterId}>
                          <p className="f-label">{sp.parameterTitle}</p>
                          <div className="f-fields">
                            <div>
                              <p>Current Financial year</p>
                              <Input
                                value={
                                  sp.currentFinancialYear != null
                                    ? sp.currentFinancialYear
                                    : ""
                                }
                                type="number"
                                disabled={isInViewMode}
                                onChange={(e) =>
                                  handleFformChange1(
                                    e,
                                    f.parameterId,
                                    sp.parameterId
                                  )
                                }
                                className="form-2-input"
                              />
                            </div>
                            <div>
                              <p>Last Financial year</p>
                              <Input
                                value={
                                  sp.lastFinancialYear != null
                                    ? sp.lastFinancialYear
                                    : ""
                                }
                                type="number"
                                disabled={isInViewMode}
                                onChange={(e) =>
                                  handleFformChange2(
                                    e,
                                    f.parameterId,
                                    sp.parameterId
                                  )
                                }
                                className="form-2-input"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          {financialReadModel.length > 0 && (
            <div className="vd-f-fields-wrapper">
              {financialReadModel.map((fm) => {
                return (
                  <div className="f-field-wrapper" id={fm.id}>
                    <p className="field-heading">{fm.label}</p>
                    <Input
                      value={fm.value}
                      disabled={isInViewMode}
                      onChange={(e) => handleFReadModelChange(e, fm.id)}
                      className="form-2-input"
                    />
                  </div>
                );
              })}
            </div>
          )}
          <Row className="vd-f-fields-wrapper">
            <Col span="24">
              <div className="form-2-content">
                <p className="text-bold">Deviations if any</p>
              </div>
            </Col>
            <Col span="17">
              <Input.TextArea
                disabled={isInViewMode}
                className="form-2-input text-area"
                type="textarea"
                value={VrvendorRatingFinancialInfoReadModel["Deviation"]}
                onChange={(e) => {
                  handleFinancialDeviation(e);
                }}
              />
            </Col>
            <Col span="1" />
            <Col span="6">
              <p className="attach-p">
                Attachment for financials and deviations if any
              </p>
              <Upload
                disabled={isInViewMode}
                beforeUpload={() => false}
                fileList={VrvendorRatingFinancialInfoReadModel["FileStream"]}
                onChange={handleFinancialFileUpload}
                maxCount={1}
                accept={allowedFileTypes.join(",")}
              >
                <Button className="upload-btn" disabled={isInViewMode}>
                  <span>Attach file</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path>
                  </svg>
                </Button>
              </Upload>
            </Col>
          </Row>
        </Fragment>
      )}
    </div>
  );
}

export default VendorRating;
