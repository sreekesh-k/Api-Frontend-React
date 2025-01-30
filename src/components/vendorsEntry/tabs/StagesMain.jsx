import { useTranslation } from "react-i18next";
import { useEffect, useState, Fragment, useRef } from "react";
import { Row, Col, Switch, Checkbox, InputNumber } from "antd";
import StagesList from "./StagesList";
function StagesMain(props) {
  const { t, i18n } = useTranslation();
  const [allowInitiator, setAllowInitiator] = useState(true);
  const [allowEndUser, setAllowEndUser] = useState(false);
  /*const [stageList, setStageList] = useState([]);*/
  let arrayList = [];
  // Form Builder Data Set
  const fb = useRef();
  const FormModal = () => {
    return <div className="" id="formDesignerArea" ref={fb}></div>;
  };
  /*useEffect(() => {
        props.setStages(stageList);
    }, [stageList]);*/
  return (
    <Fragment>
      <FormModal />
      <div className="stageBackground">
        {/* Commenting the switches , for fscs and no work is done on it , and are not going to api as well.
                It needs to be refactored as per stages at other places !!
            */}

        {/*<Row className="stageFlex">*/}
        {/*    <Col>*/}
        {/*        <Switch defaultChecked onChange={() => setAllowInitiator(!allowInitiator)} value={allowInitiator} />*/}
        {/*            <label className="label-stages">{t('Label_AllowInitiatorToChangeStages')} </label>*/}
        {/*    </Col>*/}
        {/*    <Col>*/}
        {/*        <Switch onChange={() => setAllowEndUser(!allowEndUser) } value={allowEndUser} />*/}
        {/*            <label className="label-stages">{t('Label_AllowEndUserAddingStages')}</label>*/}
        {/*     </Col>*/}
        {/*</Row>*/}
        <Row className="stageFlex">
          <Col className="abcd">
            <InputNumber
              size="large"
              defaultValue={0}
              min={0}
              onChange={(val) => {
                props.setNumberOfApprovalStages(val);
                props.setStageRequired(val == 0);
                if (val < props.numberOfApprovalStages) {
                  let removeItems = props.numberOfApprovalStages - val;
                  props.stages.splice(
                    props.stages.length - removeItems,
                    removeItems
                  );
                } else {
                  [...Array(val)].map((e, i) => {
                    arrayList = [
                      ...props.stages,
                      {
                        Actions: {
                          _Abort: 0,
                          _Approve: 1,
                          "_Need correction": 0,
                        },
                        StageName: "",
                        isVisible: false,
                        ApprovalMandatory: false,
                        ReviewBy: "0",
                        IsMandatory: false,
                        IsPinned: false,
                        SamplingSize: 100,
                        StageNumber: i + 1,
                        JsonForm: [],
                        FormGroup: [],
                      },
                    ];
                  });

                  props.setStages(arrayList);
                }
              }}
              value={props.numberOfApprovalStages}
            />
            <label className="label-stages">
              {t("Label_NumberOfApprovalStages")}
            </label>
          </Col>
          <Col>
            <Checkbox
              checked={props.stageRequired}
              onChange={(val) => {
                props.setStageRequired(val.target.checked);
                props.setNumberOfApprovalStages(
                  val.target.checked == true ? 0 : props.numberOfApprovalStages
                );
              }}
            >
              {t("Label_NoStagesRequired")}
            </Checkbox>
          </Col>
        </Row>
        {props.numberOfApprovalStages > 0 && !props.stageRequired && (
          <StagesList
            numberOfApprovalStages={props.numberOfApprovalStages}
            setNumberOfApprovalStages={props.setNumberOfApprovalStages}
            stageList={props.stages}
            setStageList={props.setStages}
            currentLanguage=""
            translatorObject=""
          />
        )}
      </div>
    </Fragment>
  );
}

export default StagesMain;
