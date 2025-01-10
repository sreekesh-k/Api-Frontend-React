import { useEffect, useState } from "react";
import { Input, Row, Col, Select, Button } from "antd";
import moment from "moment";

function VendorCategorization(props) {
  const { TextArea } = Input;
  const [gtScore, setGtScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);
  const [scoreRatingGroups, setScoreRatingGroups] = useState([]);
  const [scoreRating, setScoreRating] = useState("");
  const [saveArray, setSaveArray] = useState([]);
  const [_saveData, set_SaveData] = useState([]);

  const [
    {
      vendorType,
      dataa,
      isLoading,
      vendorId,
      isInViewMode,
      isCentrilized,
      ReviewerRemarks,
      LastReviewSentOn,
      Reviewers,
    },
    setState,
  ] = useState({
    vendorType: "DSA",
    dataa: [],
    isLoading: false,
    gtScore: 0,
    scoreRating: 0,
    vendorId: "3ae603b5-6d6d-4b47-88d1-010ebf671ffb",
    isInViewMode: true,
    isCentrilized: true,
    ReviewerRemarks: "",
    LastReviewSentOn: "",
    Reviewers: [],
  });

  // fetch data
  const fetchVendorCategorizationData = () => {
    fetch(`http://localhost:3000/data`)
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => {
        // dispatch({
        //   type: "UPDATE_CATEGORIZATION_DATA",
        //   payload: data.data.Data.vendorScoring,
        // });
        saveNotificationData(data.Data.InfoResult);
        calculateGtScore(data.Data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchScoringGroups = () => {
    // setLoading(true);
    // fetch(`/Vendor/GetScoringGroups`)
    //   .then((response) => {
    //     setLoadingScores(true);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setScoreRatingGroups(data);
    //     //calculateScoreRating(data.data, gtScore);
    //   })
    //   .finally(() => {
    //     setLoadingScores(false);
    //   });
    console.log("fetchScoringGroups");
  };

  // SAVE_NOTIFICATION_DATA
  const saveNotificationData = (data) => {
    // dispatch({
    //   type: "CATEGORIZATION_NOTIFICATION_DATA",
    //   payload: data,
    // });
  };
  // total score
  const calculateGtScore = (_data) => {
    let data = _data.vendorScoring !== undefined ? _data.vendorScoring : _data;
    let totalScore = 0;
    data.forEach((d) => {
      if (d.SubParams === null) {
        d.ScoreModels.forEach((sm) => {
          if (sm.IsSelected) {
            totalScore += sm.Rating;
          }
        });
      }
      if (d.SubParams !== null) {
        d.SubParams.forEach((sp) => {
          sp.ScoreModels.forEach((sm) => {
            if (sm.IsSelected) {
              totalScore += sm.Rating;
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
    fetchScoringGroups();
  }, []);

  const handleChange = (value, parameterId) => {
    let _data = dataa;
    let saveObj = {
      ScoringRuleId: "",
      ScoringTitle: "",
      Score: 0,
      Weights: 0,
      Rating: 0,
      CreatedBy: "",
      Data: "",
      paramId: 0,
      vendorId: vendorId,
    };
    _data.forEach((d) => {
      if (d.Id === parameterId) {
        d.ScoreModels.forEach((sm) => {
          if (sm.value === value) {
            sm.IsSelected = true;
            saveObj["ScoringRuleId"] = sm.Id;
            saveObj["ScoringTitle"] = sm.Title;
            saveObj["Score"] = sm.Score;
            saveObj["Weights"] = sm.Weights;
            saveObj["Rating"] = sm.Rating;
            saveObj["CreatedBy"] = "";
            saveObj["paramId"] = parameterId;
          } else {
            sm.IsSelected = false;
          }
        });
      }
    });
    calculateGtScore(_data);
    setState((prev) => ({ ...prev, dataa: _data }));
  };
  const handleChange2 = (value, parameterId, subParameterId) => {
    let _data = dataa;
    let saveObj = {
      ScoringRuleId: "",
      ScoringTitle: "",
      Score: 0,
      Weights: 0,
      Rating: 0,
      CreatedBy: "",
      Data: "",
      paramId: 0,
      vendorId: vendorId,
    };
    _data.forEach((d) => {
      if (d.Id === parameterId) {
        d.SubParams.forEach((sp) => {
          if (sp.Id === subParameterId) {
            sp.ScoreModels.forEach((sm) => {
              if (sm.value === value) {
                sm.IsSelected = true;
                saveObj["ScoringRuleId"] = sm.Id;
                saveObj["ScoringTitle"] = sm.Title;
                saveObj["Score"] = sm.Score;
                saveObj["Weights"] = sm.Weights;
                saveObj["Rating"] = sm.Rating;
                saveObj["CreatedBy"] = "admin1@gieom.com";
                saveObj["paramId"] = subParameterId;
              } else {
                sm.IsSelected = false;
              }
            });
          }
        });
      }
    });
    calculateGtScore(_data);
    setState((prev) => ({ ...prev, dataa: _data }));
  };
  const handleDataChange = (e, ScoreModels, parameterId) => {
    const _saveArray = _saveData;
    _saveArray.forEach((s) => {
      if (s.paramId === parameterId) {
        s.Data = e.target.value;
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
    setState((prev) => ({ ...prev, dataa: _data }));
    // --------------

    const _data = dataa;
    const selectedField = ScoreModels.filter((sm) => {
      return sm.IsSelected;
    });
    if (selectedField.length > 0) {
      _data.forEach((d) => {
        if (d.Id === parameterId) {
          d.ScoreModels.forEach((sm) => {
            if (sm.Id === selectedField[0].Id) {
              sm.Data = e.target.value;
            }
          });
        }
      });
    }
    dispatch({
      type: "UPDATE_CATEGORIZATION_DATA",
      payload: _data,
    });
  };
  const handleDataChange2 = (e, ScoreModels, parameterId, subParameterId) => {
    const _saveArray = _saveData;
    _saveArray.forEach((s) => {
      if (s.paramId === subParameterId) {
        s.Data = e.target.value;
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
    setState((prev) => ({ ...prev, dataa: _data }));
    // --------------

    const _data = dataa;
    const selectedField = ScoreModels.filter((sm) => {
      return sm.IsSelected;
    });
    if (selectedField.length > 0) {
      _data.forEach((d) => {
        if (d.Id === parameterId) {
          d.SubParams.forEach((sp) => {
            if (sp.Id === subParameterId) {
              sp.ScoreModels.forEach((sm) => {
                if (sm.Id === selectedField[0].Id) {
                  sm.Data = e.target.value;
                }
              });
            }
          });
        }
      });
    }
    setState((prev) => ({ ...prev, dataa: _data }));
  };

  const useCalculateScoreRating = () => {
    const calculate = (data, totalScore) => {
      //let val = data || data.data.data;
      //let val = data ? data : data.data.data;
      //let val = data.data.data ? data.data.data : data;
      if (data.data) {
        data.data.forEach((d) => {
          if (totalScore >= d.MinValue && totalScore <= d.MaxValue) {
            setScoreRating(d.Title);
          }
        });
      } else {
        data.forEach((d) => {
          if (totalScore >= d.MinValue && totalScore <= d.MaxValue) {
            setScoreRating(d.Title);
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
      if (e.includes(r.value)) r.IsSelected = true;
      else r.IsSelected = false;
    });
    setState((prev) => ({ ...prev, Reviewers: _reviewers }));
  };
  const reviewerIds = Reviewers.filter((r) => r.IsSelected);
  const _ids = [];
  reviewerIds.forEach((r) => _ids.push(r.Id));
  const handleSaveReviewers = () => {
    if (_ids.length < 1) {
      return;
    }
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
                param.ScoringTitle
              }`}</p>
            </Col>
            <Col span="5" className="vc-row-item">
              {param.SubParams === null && (
                <Select
                  disabled={areFieldsDisabled}
                  className="vendor-select"
                  size="small"
                  defaultValue={param.ScoreModels.filter(
                    (s) => s.IsSelected
                  ).map((v) => v.value)}
                  style={{ width: 250, marginBottom: ".5vh" }}
                  options={param.ScoreModels}
                  onChange={(e) => handleChange(e, param.Id)}
                  allowClear={true}
                />
              )}
            </Col>
            <Col span="6">
              {param.SubParams === null && (
                <TextArea
                  type="text"
                  onChange={(e) =>
                    handleDataChange(e, param.ScoreModels, param.Id)
                  }
                  className="data-input"
                  value={param.ScoreModels.filter((s) => s.IsSelected).map(
                    (v) => v.Data
                  )}
                  disabled={
                    areFieldsDisabled ||
                    param.ScoreModels.filter((s) => s.IsSelected).lenght < 1
                  }
                  autoSize={{ minRows: 2, maxRows: 2 }}
                />
              )}
            </Col>
            <Col span="2" className="s-model-border-right vc-row-item">
              {param.SubParams === null && (
                <Input
                  type="text"
                  disabled
                  className="s-model-input"
                  value={param.ScoreModels.filter((s) => s.IsSelected).map(
                    (v) => v.Score
                  )}
                  defaultValue="0"
                />
              )}
            </Col>
            <Col span="2" className="s-model-border-right vc-row-item">
              {param.SubParams === null && (
                <Input
                  type="text"
                  disabled
                  className="s-model-input"
                  value={param.ScoreModels.filter((s) => s.IsSelected).map(
                    (v) => v.Weights
                  )}
                  defaultValue="0"
                />
              )}
            </Col>
            <Col span="2" className="s-model-border-right vc-row-item">
              {param.SubParams === null && (
                <Input
                  type="text"
                  disabled
                  className="s-model-input"
                  value={param.ScoreModels.filter((s) => s.IsSelected).map(
                    (v) => v.Rating
                  )}
                  defaultValue="0"
                />
              )}
            </Col>
            {param.SubParams !== null
              ? param.SubParams.map((sp, key) => {
                  return (
                    <Col span="24" key={key}>
                      <Row className="scoring-model" gutter={20}>
                        <Col span="7">
                          <p className="vendor-parameter-name vc-sub-param">
                            {`${alphabetsArr[key]}). ${sp.ScoringTitle}`}
                          </p>
                        </Col>
                        <Col span="5" className="vc-row-item">
                          {
                            <Select
                              disabled={areFieldsDisabled}
                              className="vendor-select"
                              size="small"
                              defaultValue={sp.ScoreModels.filter(
                                (s) => s.IsSelected
                              ).map((v) => v.value)}
                              style={{ width: 250, marginBottom: ".5vh" }}
                              options={sp.ScoreModels}
                              onChange={(e) =>
                                handleChange2(e, param.Id, sp.Id)
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
                              value={sp.ScoreModels.filter(
                                (s) => s.IsSelected
                              ).map((v) => v.Data)}
                              onChange={(e) =>
                                handleDataChange2(
                                  e,
                                  sp.ScoreModels,
                                  param.Id,
                                  sp.Id
                                )
                              }
                              disabled={
                                areFieldsDisabled ||
                                sp.ScoreModels.filter((s) => !s.IsSelected)
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
                              value={sp.ScoreModels.filter(
                                (s) => s.IsSelected
                              ).map((v) => v.Score)}
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
                              value={sp.ScoreModels.filter(
                                (s) => s.IsSelected
                              ).map((v) => v.Weights)}
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
                              value={sp.ScoreModels.filter(
                                (s) => s.IsSelected
                              ).map((v) => v.Rating)}
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
