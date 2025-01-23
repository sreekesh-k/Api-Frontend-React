import { useEffect, useState } from "react";
import { Input, Row, Col, Select, Button } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectVendorCategorization } from "../../slices/VendorSlice";
import {
  changeCategorizationReviewers,
  updateCategorizationData,
  categorizationNotificationData,
} from "../../slices/VendorSlice";
import { API_URL } from "../../constants";
function VendorCategorization(props) {
  const { TextArea } = Input;
  const [gtScore, setGtScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);
  const [scoreRatingGroups, setScoreRatingGroups] = useState([]);
  const [scoreRating, setScoreRating] = useState("");
  const [saveArray, setSaveArray] = useState([]);
  const [_saveData, set_SaveData] = useState([]);

  const dispatch = useDispatch();

  const {
    vendorType,
    dataa,
    isLoading,
    vendorId,
    isInViewMode,
    isCentrilized,
    ReviewerRemarks,
    LastReviewSentOn,
    Reviewers,
  } = useSelector(selectVendorCategorization);

  // fetch data
  const fetchVendorCategorizationData = () => {
    fetch(`${API_URL}/Vendor/GetScoring/${vendorId}`)
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => {
        dispatch(updateCategorizationData(data.data.vendorScoring));
        saveNotificationData(data.data.infoResult);
        calculateGtScore(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(false);
  };

  const fetchScoringGroups = () => {
    setLoading(true);
    fetch(`${API_URL}/Vendor/GetScoringGroups`)
      .then((response) => {
        setLoadingScores(true);
        return response.json();
      })
      .then((data) => {
        setScoreRatingGroups(data);
        calculateScoreRating(data.data, gtScore);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingScores(false);
      });
  };

  // SAVE_NOTIFICATION_DATA
  const saveNotificationData = (data) => {
    dispatch(categorizationNotificationData(data));
  };
  // total score
  const calculateGtScore = (_data) => {
    let data = _data.vendorScoring !== undefined ? _data.vendorScoring : _data;
    let totalScore = 0;
    // console.log(data);
    data.forEach((d) => {
      if (d.subParams === null) {
        d.scoreModels.forEach((sm) => {
          if (sm.isSelected) {
            totalScore += sm.rating;
          }
        });
      }
      if (d.subParams !== null) {
        d.subParams.forEach((sp) => {
          sp.scoreModels.forEach((sm) => {
            if (sm.isSelected) {
              totalScore += sm.rating;
            }
          });
        });
      }
    });
    setGtScore(totalScore);
    if (data && data.length > 0) {
      //calculateScoreRating(scoreRatingGroups, totalScore);
    }
  };

  useEffect(() => {
    fetchVendorCategorizationData();
    // fetchScoringGroups();
  }, []);

  const handleChange = (value, parameterId) => {
    let _data = dataa;
    let saveObj = {
      ScoringRuleId: "",
      scoringTitle: "",
      Score: 0,
      Weights: 0,
      Rating: 0,
      CreatedBy: "",
      Data: "",
      paramId: 0,
      vendorId: vendorId,
    };
    _data.forEach((d) => {
      if (d.id === parameterId) {
        d.scoreModels.forEach((sm) => {
          if (sm.value === value) {
            sm.isSelected = true;
            saveObj["ScoringRuleId"] = sm.id;
            saveObj["scoringTitle"] = sm.title;
            saveObj["Score"] = sm.score;
            saveObj["Weights"] = sm.weights;
            saveObj["Rating"] = sm.rating;
            saveObj["CreatedBy"] = "";
            saveObj["paramId"] = parameterId;
          } else {
            sm.isSelected = false;
          }
        });
      }
    });
    calculateGtScore(_data);
    dispatch(updateCategorizationData(_data));
  };
  const handleChange2 = (value, parameterId, subParameterId) => {
    let _data = dataa;
    let saveObj = {
      ScoringRuleId: "",
      scoringTitle: "",
      Score: 0,
      Weights: 0,
      Rating: 0,
      CreatedBy: "",
      Data: "",
      paramId: 0,
      vendorId: vendorId,
    };
    _data.forEach((d) => {
      if (d.id === parameterId) {
        d.subParams.forEach((sp) => {
          if (sp.id === subParameterId) {
            sp.scoreModels.forEach((sm) => {
              if (sm.value === value) {
                sm.IsSelected = true;
                saveObj["ScoringRuleId"] = sm.id;
                saveObj["scoringTitle"] = sm.title;
                saveObj["Score"] = sm.score;
                saveObj["Weights"] = sm.weights;
                saveObj["Rating"] = sm.rating;
                saveObj["CreatedBy"] = "admin1@gieom.com";
                saveObj["paramId"] = subParameterId;
              } else {
                sm.isSelected = false;
              }
            });
          }
        });
      }
    });
    calculateGtScore(_data);
    dispatch(updateCategorizationData(_data));
  };
  const handleDataChange = (e, scoreModels, parameterId) => {
    const _saveArray = _saveData;
    _saveArray.forEach((s) => {
      if (s.paramId === parameterId) {
        s.data = e.target.value;
      }
    });
    setSaveArray(_saveArray);
    let arr = [];
    _saveArray.forEach((obj) => {
      newObj = Object.keys(obj)
        .filter((objKey) => objKey !== "paramId")
        .reduce((newObj, key) => {
          newObj[key] = obj[key];
          return newObj;
        }, {});
      arr.push(newObj);
    });
    dispatch(updateCategorizationData(arr));
    // --------------

    const _data = dataa;
    const selectedField = scoreModels.filter((sm) => {
      return sm.isSelected;
    });
    if (selectedField.length > 0) {
      _data.forEach((d) => {
        if (d.id === parameterId) {
          d.scoreModels.forEach((sm) => {
            if (sm.id === selectedField[0].id) {
              sm.data = e.target.value;
            }
          });
        }
      });
    }
    dispatch(updateCategorizationData(_data));
  };
  const handleDataChange2 = (e, scoreModels, parameterId, subParameterId) => {
    const _saveArray = _saveData;
    _saveArray.forEach((s) => {
      if (s.paramId === subParameterId) {
        s.data = e.target.value;
      }
    });
    setSaveArray(_saveArray);
    let arr = [];
    _saveArray.forEach((obj) => {
      newObj = Object.keys(obj)
        .filter((objKey) => objKey !== "paramId")
        .reduce((newObj, key) => {
          newObj[key] = obj[key];
          return newObj;
        }, {});
      arr.push(newObj);
    });
    dispatch(updateCategorizationData(arr));
    // --------------

    const _data = dataa;
    const selectedField = scoreModels.filter((sm) => {
      return sm.isSelected;
    });
    if (selectedField.length > 0) {
      _data.forEach((d) => {
        if (d.id === parameterId) {
          d.subParams.forEach((sp) => {
            if (sp.id === subParameterId) {
              sp.scoreModels.forEach((sm) => {
                if (sm.id === selectedField[0].id) {
                  sm.data = e.target.value;
                }
              });
            }
          });
        }
      });
    }
    dispatch(updateCategorizationData(_data));
  };

  const useCalculateScoreRating = () => {
    const calculate = (data, totalScore) => {
      //let val = data || data.data.data;
      //let val = data ? data : data.data.data;
      //let val = data.data.data ? data.data.data : data;
      if (data.data) {
        data.data.forEach((d) => {
          if (totalScore >= d.MinValue && totalScore <= d.MaxValue) {
            setScoreRating(d.title);
          }
        });
      } else {
        data.forEach((d) => {
          if (totalScore >= d.MinValue && totalScore <= d.MaxValue) {
            setScoreRating(d.title);
          }
        });
      }
    };
    return calculate;
  };
  const calculateScoreRating = useCalculateScoreRating();

  const handleReviewerChange = (e) => {
    let _reviewers = Reviewers;
    _reviewers.forEach((r) => {
      if (e.includes(r.value)) r.isSelected = true;
      else r.isSelected = false;
    });
    dispatch(changeCategorizationReviewers(_reviewers));
  };
  const reviewerIds = Reviewers.filter((r) => r.isSelected);
  const _ids = [];
  reviewerIds.forEach((r) => _ids.push(r.id));
  const handleSaveReviewers = () => {
    if (_ids.length < 1) {
      //toastr.error("Please select reviewers!");
      return;
    }
    fetch(`${API_URL}/Vendor/SaveVendorReviewers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        VendorId: vendorId,
        ReviewerIds: _ids,
        Remarks: ReviewerRemarks,
        Title: scoreRating,
        TotalScore: gtScore,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success") {
          // toastr.success(data.message);
        } else {
          // toastr.error(data.Message);
        }
      })
      .catch((err) => {
        //toastr.error(err.message)
      });
  };

  const alphabetsArr = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  useEffect(() => {
    if (document.querySelector(".categorization-wrapper") !== null)
      document.querySelector(".categorization-wrapper").scrollIntoView();
  }, [dataa.length]);
  useEffect(() => {
    calculateScoreRating(scoreRatingGroups, gtScore);
  }, [gtScore, scoreRatingGroups]);
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

  const areFieldsDisabled =
    vendorType == "DSA" || isInViewMode || !isCentrilized;

  const btnWrapper = document.querySelector(".historyBtn-wrapper");

  return (
    <div className="categorization-wrapper vd-access-outer">
      {vendorType === "DSA" && (
        <div className="categorization-overlay">
          <p className="c-overlay-text">
            Your are not allowed to make changes in this Tab
          </p>
        </div>
      )}
      <Row className="vendor-header">
        <Col span="7">Scoring Parameter</Col>
        <Col span="5">Scoring Rule</Col>
        <Col span="6">Comments</Col>
        <Col span="2">Risk rating</Col>
        <Col span="2">Weightage</Col>
        <Col span="2">Weighted score</Col>
      </Row>
      {dataa.map((param, key) => {
        return (
          <Row key={key} className="vendor-data-rows" gutter={20}>
            <Col span="7">
              <p className="vendor-parameter-name">{`${key + 1}. ${
                param.scoringTitle
              }`}</p>
            </Col>
            <Col span="5" className="vc-row-item">
              {param.subParams === null && (
                <Select
                  disabled={areFieldsDisabled}
                  className="vendor-select"
                  size="small"
                  defaultValue={param.scoreModels
                    .filter((s) => s.isSelected)
                    .map((v) => v.value)}
                  style={{ width: 250, marginBottom: ".5vh" }}
                  options={param.scoreModels}
                  onChange={(e) => handleChange(e, param.id)}
                  allowClear={true}
                />
              )}
            </Col>
            <Col span="6">
              {param.subParams === null && (
                <TextArea
                  type="text"
                  onChange={(e) =>
                    handleDataChange(e, param.scoreModels, param.id)
                  }
                  className="data-input"
                  value={param.scoreModels
                    .filter((s) => s.isSelected)
                    .map((v) => v.Data)}
                  disabled={
                    areFieldsDisabled ||
                    param.scoreModels.filter((s) => s.isSelected).lenght < 1
                  }
                  autoSize={{ minRows: 2, maxRows: 2 }}
                />
              )}
            </Col>
            <Col span="2" className="s-model-border-right vc-row-item">
              {param.subParams === null && (
                <Input
                  type="text"
                  disabled
                  className="s-model-input"
                  value={param.scoreModels
                    .filter((s) => s.isSelected)
                    .map((v) => v.score)}
                  defaultValue="0"
                />
              )}
            </Col>
            <Col span="2" className="s-model-border-right vc-row-item">
              {param.subParams === null && (
                <Input
                  type="text"
                  disabled
                  className="s-model-input"
                  value={param.scoreModels
                    .filter((s) => s.isSelected)
                    .map((v) => v.weights)}
                  defaultValue="0"
                />
              )}
            </Col>
            <Col span="2" className="s-model-border-right vc-row-item">
              {param.subParams === null && (
                <Input
                  type="text"
                  disabled
                  className="s-model-input"
                  value={param.scoreModels
                    .filter((s) => s.isSelected)
                    .map((v) => v.rating)}
                  defaultValue="0"
                />
              )}
            </Col>
            {param.subParams !== null
              ? param.subParams.map((sp, key) => {
                  return (
                    <Col span="24" key={key}>
                      <Row className="scoring-model" gutter={20}>
                        <Col span="7">
                          <p className="vendor-parameter-name vc-sub-param">
                            {`${alphabetsArr[key]}). ${sp.scoringTitle}`}
                          </p>
                        </Col>
                        <Col span="5" className="vc-row-item">
                          {
                            <Select
                              disabled={areFieldsDisabled}
                              className="vendor-select"
                              size="small"
                              defaultValue={sp.scoreModels
                                .filter((s) => s.isSelected)
                                .map((v) => v.value)}
                              style={{ width: 250, marginBottom: ".5vh" }}
                              options={sp.scoreModels}
                              onChange={(e) =>
                                handleChange2(e, param.id, sp.id)
                              }
                              allowClear={true}
                            />
                          }
                        </Col>
                        <Col span="6">
                          {
                            <TextArea
                              type="text"
                              className="data-input"
                              value={sp.scoreModels
                                .filter((s) => s.isSelected)
                                .map((v) => v.data)}
                              onChange={(e) =>
                                handleDataChange2(
                                  e,
                                  sp.scoreModels,
                                  param.id,
                                  sp.id
                                )
                              }
                              disabled={
                                areFieldsDisabled ||
                                sp.scoreModels.filter((s) => !s.isSelected)
                                  .length < 1
                              }
                              autoSize={{ minRows: 2, maxRows: 2 }}
                            />
                          }
                        </Col>
                        <Col
                          span="2"
                          className="s-model-border-right vc-row-item"
                        >
                          {
                            <Input
                              type="text"
                              disabled
                              className="s-model-input"
                              value={sp.scoreModels
                                .filter((s) => s.isSelected)
                                .map((v) => v.score)}
                              defaultValue=""
                            />
                          }
                        </Col>
                        <Col
                          span="2"
                          className="s-model-border-right vc-row-item"
                        >
                          {
                            <Input
                              type="text"
                              disabled
                              className="s-model-input"
                              value={sp.scoreModels
                                .filter((s) => s.isSelected)
                                .map((v) => v.weights)}
                              defaultValue=""
                            />
                          }
                        </Col>
                        <Col
                          span="2"
                          className="s-model-border-right vc-row-item"
                        >
                          {
                            <Input
                              type="text"
                              disabled
                              className="s-model-input"
                              value={sp.scoreModels
                                .filter((s) => s.isSelected)
                                .map((v) => v.rating)}
                              defaultValue=""
                            />
                          }
                        </Col>
                      </Row>
                    </Col>
                  );
                })
              : null}
          </Row>
        );
      })}
      <Row style={{ marginTop: "2vh" }}>
        <Col span="17"></Col>
        <Col span="5">
          <p className="vendor-footer-content">Grand total score</p>
        </Col>
        <Col span="2" className="vendor-footer-content">
          <p className="g-total-score-value">{gtScore}</p>
        </Col>
      </Row>
      <Row>
        <Col span="17"></Col>
        <Col span="5">
          <p className="vendor-footer-content">Vendor Categorization Rating</p>
        </Col>
        <Col span="2" className="vendor-footer-content">
          <p>{scoreRating}</p>
        </Col>
      </Row>

      {/* --- VENDOR CATEGORIZATION RARING --- */}
      <div className="vd-reviewer-wrapper" style={{ marginTop: "3vh" }}>
        {/*<h2 style={{ textAlign: "center" }}>Vendor Reviewer</h2>*/}
        <div className="vc-reviewer-top">
          <div className="vc-top-left">
            <p>Select Reviewers</p>
            <Select
              disabled={areFieldsDisabled}
              className="vd-multi-select"
              mode="multiple"
              defaultValue={_ids}
              placeholder="Vendor Reviewer"
              variant="filled"
              style={{
                flex: 1,
                width: "90%",
              }}
              size="small"
              options={Reviewers}
              onChange={(e) => handleReviewerChange(e)}
              showSearch
              optionFilterProp={"children"}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>
          <div className="vc-top-right">
            <div className="vc-btn-outer">
              <p>Send for Review</p>
              <Button
                className="vd-date-button"
                type="primary"
                onClick={handleSaveReviewers}
                disabled={areFieldsDisabled}
              >
                Send
              </Button>
            </div>
            <div className="vc-last-review-outer">
              <p>Last review sent on</p>
              <Input
                value={moment(LastReviewSentOn).format("DD-MM-YYYY, h:mm")}
                disabled={true}
                style={{ height: "5vh" }}
              />
            </div>
          </div>
        </div>
        <div className="vc-reviewer-bottom">
          <p>Review Remarks</p>
          <TextArea
            disabled={areFieldsDisabled}
            className="vd-review-text-area"
            value={ReviewerRemarks}
            onChange={(e) => {
              dispatch({
                type: "CHANGE_CATEG_REVIEW",
                payload: e.target.value,
              });
            }}
            placeholder="Reviewer Ramarks"
            autoSize={{ minRows: 2, maxRows: 5 }}
          />
        </div>
      </div>
    </div>
  );
}

export default VendorCategorization;
