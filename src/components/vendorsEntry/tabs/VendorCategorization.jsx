import { useEffect, useState } from "react";
import { Input, Row, Col, Select, Button } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectVendorCategorization } from "../../../slices/VendorSlice";
import {
  changeCategorizationReviewers,
  updateCategorizationData,
  categorizationNotificationData,
} from "../../../slices/VendorSlice";
import { API_URL } from "../../../constants";
function VendorCategorization(props) {
  const { TextArea } = Input;
  const [gtScore, setGtScore] = useState(0);
  const [loadingScores, setLoadingScores] = useState(false);
  const [scoreRatingGroups, setScoreRatingGroups] = useState([]);
  const [scoreRating, setScoreRating] = useState("");
  const [scoreColor, setScoreColor] = useState("");
  const [saveArray, setSaveArray] = useState([]);
  const [_saveData, set_SaveData] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const { loading, setLoading, setInitialData } = props;

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

        const _ids = [];
        if (data.data.infoResult[0] && data.data.infoResult[0].reviewers) {
          const reviewerIds = data.data.infoResult[0].reviewers.filter(
            (r) => r.isSelected
          );
          reviewerIds.forEach((r) => _ids.push(r.id));
        }
        //Initial State Updation
        setInitialData({
          score: JSON.parse(JSON.stringify(data.data.vendorScoring)),
          reviewers: _ids,
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
        //calculateScoreRating(data.data, gtScore);
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
    props.isRatingChanged = true;
    let _data = dataa;
    let saveObj = {
      ScoringRuleId: "",
      ScoringTitle: "",
      Score: 0,
      Weights: 0,
      Rating: 0,
      CreatedBy: "",
      Data: "",
      ScoreLevel: "",
      ScoreLevelColor: "",
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
            saveObj["ScoreLevel"] = sm.ScoreLevel;
            saveObj["ScoreLevelColor"] = sm.ScoreLevelColor;
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
      ScoringTitle: "",
      Score: 0,
      Weights: 0,
      Rating: 0,
      CreatedBy: "",
      ScoreLevel: "",
      ScoreLevelColor: "",
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
                sm.isSelected = true;
                saveObj["ScoringRuleId"] = sm.id;
                saveObj["scoringTitle"] = sm.title;
                saveObj["Score"] = sm.score;
                saveObj["Weights"] = sm.weights;
                saveObj["Rating"] = sm.rating;
                saveObj["CreatedBy"] = "admin1@gieom.com";
                saveObj["ScoreLevel"] = sm.ScoreLevel;
                saveObj["ScoreLevelColor"] = sm.ScoreLevelColor;
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
    props.isRatingChanged = true;
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
  const handleDataChange2 = (e, ScoreModels, parameterId, subParameterId) => {
    props.isRatingChanged = true;
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
    const selectedField = ScoreModels.filter((sm) => {
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
      if (data.data) {
        data.data.forEach((d) => {
          if (totalScore >= d.minValue && totalScore <= d.maxValue) {
            setScoreRating(d.title);
            setScoreColor(d.color);
          }
        });
      } else {
        data.forEach((d) => {
          if (totalScore >= d.minValue && totalScore <= d.maxValue) {
            setScoreRating(d.title);
            setScoreColor(d.color);
          }
        });
      }
    };
    return calculate;
  };
  const calculateScoreRating = useCalculateScoreRating();

  // Set initial selected reviewers state from props or Redux state
  useEffect(() => {
    const selected = Reviewers.filter((reviewer) => reviewer.isSelected).map(
      (r) => r.value
    );
    setSelectedReviewers(selected);
  }, [Reviewers]);

  const handleReviewerChange = (e) => {
    props.isRatingChanged = true;
    // Create a new array with updated IsSelected values
    const updatedReviewers = Reviewers.map((r) => {
      return {
        ...r,
        isSelected: e.includes(r.value), // Set IsSelected based on whether r.value is in the selected list
      };
    });

    // Dispatch the updated reviewers list to Redux
    dispatch(changeCategorizationReviewers(updatedReviewers));
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

  //rating disabled means -> viewType == "DSA" || isRatingFreezed == true;
  const areFieldsDisabled = isCentrilized ? isInViewMode : true;

  if (loading && dataa.length == 0) {
    return (
      <div className="loadingOverlayVd">
        <i
          className="fa fa-spinner fa-spin fa-3x fa-fw"
          style={{ left: "50%", position: "absolute", top: "40%" }}
        ></i>
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else
    return (
      <div className="categorization-wrapper vd-access-outer">
        {loading && (
          <div className="categorization-overlay">
            <i
              className="fa fa-spinner fa-spin fa-3x fa-fw"
              style={{ left: "50%", position: "absolute", top: "40%" }}
            ></i>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {true && (
          <div className="categorization-overlay">
            <p className="c-overlay-text">
              You are not allowed to make changes in this tab
            </p>
          </div>
        )}
        <Row className="vendor-header">
          <Col span="6">Scoring Parameter</Col>
          <Col span="5">Scoring Rule</Col>
          <Col span="4">Comments</Col>
          <Col span="2">Risk rating</Col>
          <Col span="2">Weightage</Col>
          <Col span="2">Weighted Score</Col>
          <Col span="3">Rating</Col>
        </Row>
        {dataa.map((param, key) => {
          return (
            <Row key={key} className="vendor-data-rows" gutter={20}>
              <Col span="6">
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
              <Col span="4">
                {param.subParams === null && (
                  <TextArea
                    type="text"
                    onChange={(e) =>
                      handleDataChange(e, param.scoreModels, param.id)
                    }
                    className="data-input"
                    value={param.scoreModels
                      .filter((s) => s.isSelected)
                      .map((v) => v.data)}
                    disabled={
                      areFieldsDisabled ||
                      param.scoreModels.filter((s) => s.isSelected).lenght < 1
                    }
                    autoSize={{ minRows: 2, maxRows: 2 }}
                  />
                )}
              </Col>
              <Col span="2" className="vc-row-item">
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
              <Col span="2" className="vc-row-item">
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
              <Col span="2" className="vc-row-item">
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
              <Col span="3" className="vc-row-item">
                {param.subParams === null && (
                  <div key={key} className="vd-cate-score">
                    <p>
                      {param.scoreModels
                        .filter((s) => s.isSelected)
                        .map((v) => v.scoreLevel)}
                    </p>
                    <div
                      className="vd-scoreColor"
                      style={{
                        backgroundColor: param.scoreModels
                          .filter((s) => s.isSelected)
                          .map((v) => v.scoreLevelColor),
                      }}
                    />
                  </div>
                )}
              </Col>
              {param.subParams !== null
                ? param.subParams.map((sp, key) => {
                    return (
                      <Col span="24" key={key}>
                        <Row className="scoring-model" gutter={20}>
                          <Col span="6">
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
                          <Col span="4">
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
                          <Col span="2" className="vc-row-item">
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
                          <Col span="2" className="vc-row-item">
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
                          <Col span="2" className="vc-row-item">
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
                          <Col span="3" className="vc-row-item">
                            {
                              <div key={key} className="vd-cate-score">
                                <p>
                                  {sp.scoreModels
                                    .filter((s) => s.isSelected)
                                    .map((v) => v.scoreLevel)}
                                </p>
                                <div
                                  className="vd-scoreColor"
                                  style={{
                                    backgroundColor: sp.scoreModels
                                      .filter((s) => s.isSelected)
                                      .map((v) => v.scoreLevelColor),
                                  }}
                                />
                              </div>
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

        <Row style={{ marginTop: "6vh" }}>
          <Col span="16">
            <div
              style={{
                marginLeft: "1.2vw",
                marginRight: "2.2vw",
                marginBottom: "2vh",
              }}
            >
              <Select
                disabled={areFieldsDisabled}
                className="vd-multi-select"
                mode="multiple"
                value={selectedReviewers}
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
          </Col>
          <Col span="1"></Col>
          <Col span="7">
            <Row>
              <Col
                span="24"
                style={{
                  display: "flex",
                  gap: "1vw",
                  justifyContent: "center",
                }}
              >
                <p className="vendor-footer-content">Grand total score</p>
                <p className="g-total-score-value">{gtScore}</p>
              </Col>

              <Col
                span="24"
                style={{
                  display: "flex",
                  gap: "1vw",
                  justifyContent: "center",
                }}
              >
                <p className="vendor-footer-content">
                  Vendor Categorization Rating
                </p>

                <p className="vr-rating-label">{scoreRating}</p>

                <div
                  className="vd-scoreColor"
                  style={{ backgroundColor: scoreColor }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
}
export default VendorCategorization;
