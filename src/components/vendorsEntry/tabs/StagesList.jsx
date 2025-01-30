import { useTranslation } from "react-i18next";
import { useEffect, useState, Fragment, useRef } from "react";
import {
  Row,
  Col,
  Input,
  Table,
  InputNumber,
  Collapse,
  Space,
  Checkbox,
  Tooltip,
  Select,
  Button,
  Image,
  Modal,
} from "antd";
import $ from "jquery";
import { API_URL } from "../../../constants";
function StagesList(props) {
  const { t } = useTranslation();
  const [modaldisplayshow, setModaldisplayshow] = useState(false);
  const { Option } = Select;
  const { Panel } = Collapse;

  const {
    stageList,
    setStageList,
    numberOfApprovalStages,
    setNumberOfApprovalStages,
    currentLanguage,
    translatorObject,
  } = props;
  const [nodeIndex, setNodeIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentFormGroup, setcurrentFormGroup] = useState("");
  /* const [showFormModal, setShowFormModal] = useState(false)*/

  //Role and User List
  const [options, setOptions] = useState([]);

  function savestagesform() {
    var formjson = fbStage.formData;
    props.stageList[currentStage].FormGroup.map((value, index) => {
      if (value.id == currentFormGroup) {
        props.stageList[currentStage].FormGroup[index].JsonForm = formjson;
      }
    });
    closeicon();
  }

  //Action's List
  const actionList = [
    {
      label: `${t("Label_Abort")}`,
      value: "abort",
    },
    {
      label: `${t("Label_Approve")}`,
      value: "approve",
      disabled: true,
    },
    {
      label: `${t("Label_NeedsCorrection")}`,
      value: "needs correction",
    },
  ];

  //Api Call To Fetch Role and Users
  useEffect(() => {
    $.ajax({
      type: "GET",
      cache: false,
      url: API_URL + "/api/User/FetchUsersAndRolesPOC",
      async: false,
      contentType: "application/json",
      success: function (response) {
        if (response.length === 0) {
          console.log("no response in owner api");
        } else {
          // console.log("res", response);
          setOptions(response);
        }
      },
      error: function (error) {
        console.log("error of owner api is " + JSON.stringify(error));
      },
    });
  }, []);

  const columns = [
    {
      title: () => (
        <img
          src="assets/images/plusIcon.png"
          alt="add"
          onClick={(e) => {
            e.preventDefault();
            const newGroup = {
              id: Math.random(),
              JsonForm: [],
              Approvers: [],
              Header: "",
            };
            const newList = [...stageList];
            newList[nodeIndex].FormGroup.push(newGroup);
            setStageList(newList);
          }}
        />
      ),
      dataIndex: "",
      width: "5%",
      key: "1",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Assigned Users/Roles",
      dataIndex: "Approvers",
      width: "40%",
      key: "2",
      render: (text, record) => (
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          optionFilterProp={"key"}
          defaultValue={record.Approvers.map((item) => {
            return (
              <Tooltip title={item.label} key={item.label} isuser={item.isUser}>
                {record.Approvers.includes(item.label) ? "" : [item.label]}
              </Tooltip>
            );
          })}
          onChange={(e) => {
            var tempData = [];
            record.Approvers = [];
            e.map((mainData) => {
              options.map((data) => {
                if (mainData[0] == data.label || mainData == data.label) {
                  let tempval = {
                    id: data.id,
                    label: data.label,
                    isUser: data.isUser,
                  };
                  tempData.push(tempval);
                }
              });
            });

            record.Approvers = tempData;
          }}
        >
          {options &&
            options.map((value) => (
              <Option
                value={value.label}
                key={value.label}
                isuser={value.isUser}
              >
                <Tooltip
                  title={value.label}
                  key={value.label}
                  isuser={value.isUser}
                >
                  <span>{value.label} </span>
                </Tooltip>{" "}
              </Option>
            ))}
        </Select>
      ),
    },
    {
      title: "Section Header",
      dataIndex: "Header",
      width: "20%",
      key: "3",
      render: (text, record) => (
        <Input
          type="text"
          defaultValue={record.Header}
          onChange={(e) => {
            let value = e.target.value;
            record.Header = value;
          }}
        />
      ),
    },
    {
      title: "Form",
      dataIndex: "JsonForm",
      width: "10%",
      key: "4",
      render: (text, record, index) => (
        <img
          alt="edit"
          src="assets/images/Action_Edit.svg"
          className="stage-form-edit"
          style={{
            filter:
              "invert(100%) sepia(32%) saturate(544%) hue-rotate(222deg) brightness(111%) contrast(100%)",
          }}
          onClick={(e) => {
            setModaldisplayshow(true);
            setCurrentStage(nodeIndex);
            setcurrentFormGroup(record.id);
            if (record.JsonForm.length != 0) {
              setUpForm('{"action":' + record.JsonForm + "}");
            } else {
              setUpForm([]);
            }
          }}
        />
      ),
    },
    {
      title: "Delete",
      width: "10%",
      key: "5",
      render: (text, record, index) => (
        <img
          alt="delete"
          width={20}
          src="assets/images/delete-black.svg"
          onClick={(e) => {
            const newList = [...stageList];
            const formGroupList = newList[nodeIndex].FormGroup;
            const FilterFormGrouplist = formGroupList.filter(
              (item) => item.id != record.id
            );
            newList[nodeIndex].FormGroup = FilterFormGrouplist;
            setStageList(newList);
          }}
        />
      ),
    },
  ];
  function closeicon() {
    $("#formDesignerAreaStage")[0].innerHTML = "";
    setModaldisplayshow(false);
  }
  //To Drag And Drop
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (e, position) => {
    console.log(position);
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    console.log(position);
    dragOverItem.current = position;
  };
  const drop = (e, i) => {
    const copyListItems = [...stageList];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setStageList(copyListItems);
  };

  // Form Builder Data Set
  function setUpForm(remFormData = []) {
    if (remFormData.length > 0 && remFormData != undefined) {
      $("#formDesignerAreaStage")[0].innerHTML = "";
      let formData = JSON.parse(remFormData);
      let actions = formData.action;
      fbStage = $("#formDesignerAreaStage").formBuilder({
        i18n: {
          locale: props.currentLanguage === "fr" ? "fr-FR" : "en-US",
          override: {
            "en-US": props.translatorObject,
            "fr-FR": props.translatorObject,
          },
        },
        formData: actions,
        showActionButtons: true,
        readOnly: false,
        checkMultiPages: false,
      });
    } else {
      $("#formDesignerAreaStage")[0].innerHTML = "";
      let actions = [];
      fbStage = $("#formDesignerAreaStage").formBuilder({
        i18n: {
          locale: props.currentLanguage === "fr" ? "fr-FR" : "en-US",
          override: {
            "en-US": props.translatorObject,
            "fr-FR": props.translatorObject,
          },
        },
        formData: actions,
        showActionButtons: true,
        readOnly: false,
        checkMultiPages: false,
      });
    }
  }

  //Change Value of Checkbox
  const checkChange = (value, attr) => {
    let arr = stageList;
    arr.map((item, index) => {
      if (index == nodeIndex) {
        stageList[nodeIndex][attr] = value;
      }
      setStageList(arr);
    });
  };

  //Change Value of Input
  const inputChange = (value, attr) => {
    let arr = stageList;
    const timer = setTimeout(() => {
      arr.map((item, index) => {
        if (index == nodeIndex) {
          stageList[nodeIndex][attr] = value;
        }
        setStageList(arr);
      });
    }, 1000);
    return () => clearTimeout(timer);
  };

  const PanelHeader = ({ ...stage }) => {
    const stageVal = stage.stage.stage;
    const indexVal = stage.stage.index;
    return (
      <Row className="stageFlexBetween-approval">
        <Col style={{ fontWeight: "bold", color: "black" }}>
          {t("Label_Stages")}: {stageVal.StageName}
        </Col>
        <Col>
          <Checkbox
            onClick={(event) => {
              // If you don't want click extra trigger collapse, you can prevent this:
              event.stopPropagation();
              checkChange(e.target.checked, "IsMandatory");
            }}
            defaultChecked={stageVal.IsMandatory}
            disabled={stageVal.IsMaster}
            style={{ fontWeight: "bold", color: "black" }}
          >
            {t("Label_IsThisStageMandatory")}
          </Checkbox>
          {/*<img width={20} src="assets/images/redPin.png" className={stageVal.IsPinned ? "stageHeaderImg pinnedStage" : "stageHeaderImg"} onClick={(e) => {*/}
          {/*    e.stopPropagation();*/}
          {/*    checkChange(!stageVal.IsPinned, 'IsPinned')*/}
          {/*}}*/}
          {/*/>*/}
          {!stageVal.IsMandatory && !stageVal.IsMaster && (
            <img
              className="stageHeaderImg"
              width={20}
              src="assets/images/delete-black.svg"
              key={stage.index}
              onClick={(e) => {
                e.stopPropagation();
                let arrayList = stageList.filter(
                  (item, index) => stageList.indexOf(item) != indexVal
                );
                setNumberOfApprovalStages(arrayList.length);
                setStageList(arrayList);
              }}
            />
          )}
        </Col>
      </Row>
    );
  };

  var stageData = new FormData();
  const StageContainer = (stage, index) => {
    let stageValue = stage.stage;
    return (
      <Fragment>
        <Space
          direction="vertical"
          className="stageListContainer"
          key={stage.index}
          index={stage.index}
          id={stage.StageNumber}
          onClick={() => setNodeIndex(stage.index)}
        >
          <Collapse
            collapsible="icon"
            bordered={false}
            defaultActiveKey={[nodeIndex.toString()]}
          >
            <Panel key={stage.index} header={<PanelHeader stage={stage} />}>
              <Row className="stageFlexBetween mtb2">
                <Col className="displayFlex">
                  <label
                    className="label-stages"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    {t("Label_StageName")}{" "}
                    <i className="fa fa-circle asterisk-dot"></i>
                  </label>
                  <Input
                    type="text"
                    placeholder={t("Label_StageName")}
                    defaultValue={stageValue.StageName}
                    className="stageNameInput"
                    onChange={(e) => {
                      let value = e.target.value;
                      inputChange(value, "StageName");
                    }}
                  />
                </Col>{" "}
                <Col style={{ marginLeft: "4.9vw" }}>
                  <Row>
                    <label
                      className="label-stages"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginLeft: "0vh",
                      }}
                    >
                      {t("Label_SelectAtLeastOneAction")}{" "}
                      <i className="fa fa-circle asterisk-dot"></i>
                    </label>
                  </Row>
                  <Row>
                    <Checkbox.Group
                      style={{ fontWeight: "bold", fontColor: "black" }}
                      options={actionList}
                      defaultValue={
                        stageList[nodeIndex]
                          ? stageList[nodeIndex].Actions
                            ? [
                                stageList[nodeIndex].Actions["_Abort"] == 1
                                  ? "abort"
                                  : "",
                                "approve",
                                stageList[nodeIndex].Actions[
                                  "_Need correction"
                                ] == 1
                                  ? "needs correction"
                                  : "",
                              ]
                            : ""
                          : ""
                      }
                      onChange={(e) => {
                        var abort = e.includes("abort");
                        var needCorr = e.includes("needs correction");
                        stageList[nodeIndex].Actions = {
                          _Abort: abort ? 1 : 0,
                          _Approve: 1,
                          "_Need correction": needCorr ? 1 : 0,
                        };
                      }}
                      disabled={false}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="stageFlexBetween mtb2">
                <Col className="stageWidth3">
                  <label
                    className="label-stages"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    {t("Label_ReviewWithin")}
                  </label>
                  <InputNumber
                    defaultValue={stageValue.ReviewBy}
                    min={0}
                    onChange={(e) => {
                      stageList[nodeIndex].ReviewBy = e;
                    }}
                  />
                  <label
                    className="label-stages"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    {t("Label_Days")}{" "}
                  </label>
                </Col>
                <Col>
                  <Checkbox
                    className="approvalMandate"
                    onChange={(e) =>
                      checkChange(e.target.checked, "ApprovalMandatory")
                    }
                    defaultChecked={stageValue.ApprovalMandatory}
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      marginLeft: "13.3vw",
                    }}
                  >
                    {t("Label_UnanimousApprovalMandatory")}
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Table
                  style={{ fontWeight: "bold", fontColor: "black" }}
                  columns={columns}
                  dataSource={stageValue.FormGroup.map((item, i) => ({
                    ...item,
                    key: item.id || i,
                  }))}
                  pagination={false}
                  className="stageTable"
                  scroll={{ y: "70vh" }}
                  showSorterTooltip={false}
                />
              </Row>
            </Panel>
          </Collapse>
        </Space>
      </Fragment>
    );
  };

  return (
    <div>
      <span
        id="formBuilder-stages"
        style={
          modaldisplayshow
            ? { visibility: "visible", zIndex: "1" }
            : { visibility: "hidden", zIndex: "1" }
        }
      >
        <div>
          <Row className="navbar-stageform">
            <Col span={2}>
              <img
                onClick={closeicon}
                className="r-navbar-crossimgRem"
                src="assets/images/CloseIcon.svg"
              />
            </Col>
            <Col span={19}></Col>
            <Col span={3}>
              <Button onClick={savestagesform} className="save-stages-form">
                SAVE AND CLOSE
              </Button>
            </Col>
          </Row>
          <div className="" id="formDesignerAreaStage"></div>{" "}
          <div className="" id="loading"></div>
        </div>
      </span>

      {stageList.map((stage, index) => {
        return (
          <div
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            key={index}
            onDragOver={(e) => e.preventDefault()}
            draggable={stage.IsPinned ? false : true}
          >
            <StageContainer stage={stage} index={index} key={stage} />
          </div>
        );
      })}
    </div>
  );
}

export default StagesList;
