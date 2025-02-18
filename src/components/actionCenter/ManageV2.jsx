import React from "react";

function ManageV2() {
  return (
    <>
      <svg
        style={{ display: "none" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 25 25"
      >
        <symbol
          width="25"
          height="25"
          viewBox="0 0 25 25"
          id="action-open-sa"
          fill="#FFC35E"
        >
          <g id="Group_5307" transform="translate(549.668 215.332)">
            <path
              id="Path_1409"
              data-name="Path 1409"
              d="M-418.739-159h-3.713v17.951a2.327,2.327,0,0,1-2.327,2.327h-9.554v.381a1.123,1.123,0,0,0,1.123,1.123h14.471a1.123,1.123,0,0,0,1.123-1.123v-19.535A1.123,1.123,0,0,0-418.739-159Z"
              transform="translate(-107.803 -53.115)"
            />
            <path
              id="Path_1410"
              data-name="Path 1410"
              d="M-533.073-215.333h-14.471a1.123,1.123,0,0,0-1.123,1.123v19.535a1.123,1.123,0,0,0,1.123,1.123h14.471a1.123,1.123,0,0,0,1.123-1.123V-214.21A1.123,1.123,0,0,0-533.073-215.333Zm-1.352,15.575a.876.876,0,0,1-.876.876h-10.015a.876.876,0,0,1-.876-.876h0a.876.876,0,0,1,.876-.876H-535.3a.876.876,0,0,1,.876.876Zm0-4a.876.876,0,0,1-.876.876h-10.015a.876.876,0,0,1-.876-.876h0a.876.876,0,0,1,.876-.876H-535.3a.876.876,0,0,1,.876.876Zm0-4a.876.876,0,0,1-.876.876h-10.015a.876.876,0,0,1-.876-.876h0a.876.876,0,0,1,.876-.876H-535.3a.876.876,0,0,1,.876.876Zm0-4a.876.876,0,0,1-.876.876h-10.015a.876.876,0,0,1-.876-.876h0a.876.876,0,0,1,.876-.876H-535.3a.876.876,0,0,1,.876.876Z"
              transform="translate(0 0)"
            />
          </g>
        </symbol>
      </svg>

      <svg
        style={{ display: "none" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 25 25"
      >
        <symbol
          width="25"
          height="25"
          viewBox="0 0 25 25"
          id="action-delete-sa"
          fill="#FF525A"
        >
          <g id="Action_Delete" clipPath="url(#clip-Action_Delete)">
            <g
              id="Group_4194"
              data-name="Group 4194"
              transform="translate(-42)"
            >
              <path
                id="BIN_1_"
                d="M0,3.879A1.27,1.27,0,0,1,1.293,2.586H7.759V1.293A1.27,1.27,0,0,1,9.052,0h2.586a1.27,1.27,0,0,1,1.293,1.293V2.586H19.4A1.27,1.27,0,0,1,20.69,3.879V5.172H0ZM19.4,7.759V23.707A1.27,1.27,0,0,1,18.1,25H2.586a1.27,1.27,0,0,1-1.293-1.293V6.466H19.4ZM6.466,10.345a1.293,1.293,0,0,0-2.586,0V21.121a1.293,1.293,0,1,0,2.586,0Zm5.172,0a1.293,1.293,0,0,0-2.586,0V21.121a1.293,1.293,0,1,0,2.586,0Zm5.172,0a1.293,1.293,0,1,0-2.586,0V21.121a1.293,1.293,0,1,0,2.586,0Z"
                transform="translate(45)"
                fillRule="evenodd"
              />
            </g>
          </g>
        </symbol>
      </svg>

      <div className="page-container">
        <div className="row">
          <div id="amendment_history_popup">
            <div className="history_content">
              <div className="head_container">
                <span style={{ cursor: "pointer" }}>&#x2716;</span>
                <strong style={{ paddingLeft: "13px" }}>
                  AmendmentHistory
                </strong>
              </div>
              <br />
              <div className="amendment_history_popup_scrollableDiv">
                <label
                  id="amendment_popup_text"
                  className="label-important"
                  style={{ paddingLeft: "35px" }}
                ></label>
                <br />
              </div>
            </div>
          </div>

          <div className="content ManageLeftPanel col-md-2">
            <div className="panel">
              <div className="panel-heading header">
                <label>Show</label>
                <span
                  className="fa fa-filter pull-right"
                  style={{ color: "white", fontSize: "1vw" }}
                ></span>
              </div>
              <div className="panel-body" id="filterContainer">
                <div className="checkbox p-l-15">
                  <input
                    type="checkbox"
                    name="optionsCheckboxes"
                    //value=""
                    id="options-all"
                  />
                  <label htmlFor="options-all">All</label>
                </div>
              </div>
            </div>
          </div>

          <section className="content ManageTable col-md-10" id="actionsArea">
            <div style={{ position: "relative" }}>
              <div className="tab-content marginTop paddingLR paddingBottom10">
                <div id="DueTable" className="tab-pane fade in active">
                  <div className="base-table">
                    <div>
                      <div className="material-datatables">
                        <table
                          id="DueList_Task"
                          className="table row-border order-column"
                          style={{ width: "100%" }}
                        ></table>
                        <div className="inner-tooltip"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="OverdueTable" className="tab-pane fade in">
                  <div className="base-table">
                    <div>
                      <div className="material-datatables">
                        <table
                          id="OverdueList_Task"
                          className="table row-border order-column"
                          style={{ width: "100%" }}
                        ></table>
                        <div className="inner-tooltip"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="Upcoming" className="tab-pane fade in">
                  <div className="base-table">
                    <div>
                      <div className="material-datatables">
                        <table
                          id="UpcomingList_Task"
                          className="table row-border order-column"
                          style={{ width: "100%" }}
                        ></table>
                        <div className="inner-tooltip"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="Inprogress" className="tab-pane fade in">
                  <div className="base-table">
                    <div>
                      <div className="material-datatables">
                        <table
                          id="InprogressList_Task"
                          className="table row-border order-column"
                          style={{ width: "100% " }}
                        ></table>
                        <div className="inner-tooltip"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="Completed" className="tab-pane fade in">
                  <div className="base-table">
                    <div>
                      <div className="material-datatables">
                        <table
                          id="CompletedList_Task"
                          className="table row-border order-column"
                          style={{ width: "100% " }}
                        ></table>
                        <div className="inner-tooltip"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="Draft" className="tab-pane fade in">
                  <div className="base-table">
                    <div>
                      <div className="material-datatables">
                        <table
                          id="DraftList_Task"
                          className="table row-border order-column"
                          style={{ width: "100% " }}
                        ></table>
                        <div className="inner-tooltip"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div
        id="myModal"
        className="quickview-wrapper fullWidth"
        style={{ marginTop: " 8.2vh" }}
      >
        <div id="root"></div>
        <div
          className="LayoutPage"
          data-bind="with: gm.actioncentre.selectedRow()"
        >
          <div className="LayoutPageHeader"></div>
          <div className="LayoutPageBody">
            <div className="LayoutPageThumbnails">
              <div>
                <div id="thumbnailFirst" className="activeThumbnail">
                  <span>1</span>
                </div>
                <div id="thumbnailThirdLast">
                  <span>2</span>
                </div>
                <div id="thumbnailSecondLast">
                  <span>3</span>
                </div>
                <div id="thumbnailLast">
                  <span>4</span>
                </div>
              </div>
            </div>
            <div className="LayoutPages">
              <div>
                <div id="pageFirst" className="fixedPage">
                  <div id="actionFormStages">
                    <div className="action-form-stages-container"></div>
                    <div>
                      <div
                        className="all-stages-link"
                        style={{ display: "none" }}
                        data-bind="click:gm.actioncentre.viewApprovalHistory"
                        id="actionFormShowStagesHistory"
                        tabIndex="8"
                        data-show="true"
                      >
                        ViewAll
                      </div>
                    </div>
                  </div>

                  <div
                    id="ActionValue"
                    className="modal-body fixedPageContent"
                  ></div>
                  <div id="actionBody" className="modal-body fixedPageContent">
                    <div className="form-group NewActionValue">
                      <label>Title</label>
                      <input
                        className="show amendmentFeild"
                        id="titlefeild"
                        data-bind="value:title"
                        readOnly
                      />
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:title"
                      ></div>
                    </div>
                    <div className="form-group NewActionValue">
                      <label>Name</label>
                      <span
                        className="show amendmentFeild"
                        data-bind="text:name"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:name"
                      ></div>
                    </div>
                    <div className="form-group NewActionValue">
                      <label>Description</label>
                      <span
                        className="show amendmentFeild"
                        data-bind="text:taskDescription"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:taskDescription"
                      ></div>
                    </div>
                    <div className="form-group NewActionValue">
                      <label>ReferenceNumber</label>
                      <span
                        className="show amendmentFeild"
                        data-bind="text:referenceNumber"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:referenceNumber"
                      ></div>
                    </div>
                    <div className="form-group NewActionValue">
                      <label>URN</label>
                      <span
                        className="show amendmentFeild"
                        data-bind="text:personalID"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:personalID"
                      ></div>
                    </div>
                    <div
                      className="form-group  item policy-process"
                      id="policydiv"
                      style={{ display: "none" }}
                    >
                      <label> Policy</label>
                      <select
                        id="policy"
                        style={{ width: "100%" }}
                        className="all-entities policy-process"
                        data-placeholder="Select Policy"
                        disabled
                      >
                        <option></option>
                      </select>
                      <div
                        id="policy-text"
                        className="form-group col-md-6"
                      ></div>
                    </div>

                    <div
                      className="form-group item policy-process"
                      id="clausediv"
                      style={{ display: "none" }}
                    >
                      <label> Clauses</label>
                      <select
                        id="clauses"
                        style={{ width: "100%" }}
                        multiple
                        className="all-entities policy-process"
                        data-placeholder="Select Clauses"
                        disabled
                      ></select>
                    </div>

                    <div
                      className="form-group item policy-process"
                      id="processdiv"
                      style={{ display: "none" }}
                    >
                      <label> Business Process</label>
                      <select
                        id="process"
                        style={{ width: "100%" }}
                        multiple
                        className="all-entities policy-process"
                        data-placeholder="Select Business Process"
                        disabled
                      ></select>
                      <div
                        id="process-text"
                        className="form-group col-md-12"
                      ></div>
                    </div>
                    <div
                      className="form-group item policy-process"
                      id="controldiv"
                      style={{ display: "none" }}
                    >
                      <label>Controls</label>
                      <select
                        id="control"
                        name="control"
                        style={{ width: "100%" }}
                        multiple
                        className="control"
                        disabled
                      ></select>
                    </div>
                    <div
                      className="form-group item policy-process"
                      id="riskdiv"
                      style={{ display: "none" }}
                    >
                      <label>Risks</label>
                      <select
                        id="risk"
                        name="risk"
                        style={{ width: "100%" }}
                        multiple
                        className="risk"
                        disabled
                      ></select>
                    </div>

                    <div className="form-group">
                      <label>Unit Of Measurement</label>
                      <span
                        className="show amendmentFeild"
                        data-bind="text:unitofMeasurement"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:unitofMeasurement"
                      ></div>
                    </div>

                    <div className="form-group">
                      <label id="selfAttestationLabel">SelfAttestation</label>
                      <span
                        className="show "
                        id="selfAttestationPreview"
                        data-bind="text:selfAttestationName"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:selfAttestationName"
                      ></div>
                    </div>

                    <div className="form-group" id="divSelfAttestation">
                      <label id="lblSelfAttestation">Certificate</label>
                      <select
                        id="selfAttestationList"
                        name="selfAttestationList"
                        style={{ width: "100%" }}
                        className="form-control"
                      ></select>
                    </div>

                    <div className="form-group">
                      <label>ControlName</label>
                      <span
                        className="show"
                        data-bind="text:controlName"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:controlName"
                      ></div>
                    </div>

                    <div className="form-group">
                      <label>RiskName</label>
                      <span className="show" data-bind="text:riskName"></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:riskName"
                      ></div>
                    </div>

                    <div
                      id="riskdetails"
                      className="initiator_detalis"
                      style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        margin: "2vw",
                        display: "none",
                      }}
                    >
                      <br />
                      <div
                        className="form-group"
                        style={{
                          width: "33%",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>RiskScore</label>
                        <br />
                        <span id="riskscore"></span>
                      </div>

                      <div
                        className="form-group"
                        style={{
                          width: "33%",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          RiskInterpretation
                        </label>
                        <br />
                        <span id="riskinter"></span>
                      </div>
                      <br />
                    </div>

                    <div className="form-group">
                      <label>ControlDescription</label>
                      <span
                        className="show"
                        data-bind="text:controlDescription"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:controlDescription"
                      ></div>
                    </div>

                    <div className="form-group">
                      <label>ITSystemName</label>
                      <span
                        className="show"
                        data-bind="text:itSystemName"
                      ></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:itSystemName"
                      ></div>
                    </div>

                    <div className="form-group" id="processName">
                      <label>ProcessName</label>
                      <select
                        id="referencecListRCSA"
                        name="referencecListRCSA"
                        className="form-control"
                        style={{ width: "100%" }}
                      ></select>
                    </div>
                    <div
                      className="modal-body form-group"
                      id="viewprocessdetails"
                    >
                      <a target="_blank" id="processUrl" href="#">
                        ViewProcess
                      </a>
                      <br />
                      <label>Status:</label>
                      <label></label>
                    </div>

                    <div className="form-group" id="processName">
                      <label>ProcessName</label>
                      <select
                        id="referencecListRCSA"
                        name="referencecListRCSA"
                        className="form-control"
                        style={{ width: "100%" }}
                      ></select>
                    </div>
                    <div
                      className="modal-body form-group"
                      id="viewprocessdetails"
                    >
                      <a target="_blank" id="processUrl" href="#">
                        ViewProcess
                      </a>
                      <br />
                      <label>Status:</label>
                      <label></label>
                    </div>

                    <div className="form-group">
                      <label>PolicyName</label>
                      <span className="show" data-bind="text:policyName"></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:policyName"
                      ></div>
                    </div>

                    <div className="form-group" id="processurlreadOnly">
                      <a
                        data-bind="attr: { href: url() }"
                        target="_blank"
                        id="processurlRCSA"
                      >
                        ViewProcessImage
                      </a>
                      <br />
                      <label>Status:</label>
                      <label data-bind="text: urlStatus"></label>
                    </div>

                    <div
                      id="rejectProcessRCSA"
                      className="form-group"
                      style={{ display: "none", visibility: "hidden" }}
                    >
                      <label>RejectProcess</label>
                      <input
                        type="checkbox"
                        id="chkRejectProcess"
                        style={{ verticalAlign: "top", marginTop: "5px" }}
                      />
                      <div id="rejectProcessComment">
                        <label>ProcessComment</label>
                        <input
                          id="rejectProcessCommentTb"
                          placeholder="Enter Process Comment."
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div
                      id="exceptionCountPreviewArea"
                      className="material-datatables"
                      style={{ display: "none" }}
                    >
                      <div className="table-responsive">
                        <table
                          id="exceptionCountList"
                          className="table table-striped table-no-bordered table-hover"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th></th>
                              <th>Name</th>
                              <th style={{ position: "relative", left: "0px" }}>
                                Type
                              </th>
                              <th
                                style={{ position: "relative", right: "20px" }}
                              >
                                Open
                              </th>
                              <th
                                style={{ position: "relative", right: "20px" }}
                              >
                                Closed
                              </th>
                              <th
                                style={{ position: "relative", right: "20px" }}
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>

                    <div
                      id="initiatorDetails"
                      className="initiator_detalis"
                      style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        margin: "2vw",
                      }}
                    >
                      <br />
                      <div
                        className="form-group"
                        style={{
                          width: "33%",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>Initiator</label>
                        <br />
                        <span data-bind="text:initiatorName"></span>
                      </div>
                      <div
                        className="form-group"
                        style={{
                          width: "400px",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          InitiatedDate
                        </label>
                        <br />
                        <span data-bind="text:strDateOfRaise"></span>
                      </div>
                      <div
                        className="form-group"
                        style={{
                          width: "200px",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>Role</label>
                        <br />
                        <span data-bind="text:initiatorRole"></span>
                      </div>
                      <br />
                      <div
                        className="form-group"
                        style={{
                          width: "33%",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>RiskName</label>
                        <br />
                        <span data-bind="text:kriRiskName"></span>
                      </div>
                      <div
                        className="form-group"
                        style={{
                          width: "33%",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          BaselLossType
                        </label>
                        <br />
                        <span data-bind="text:baselLossType"></span>
                      </div>
                      <div
                        className="form-group"
                        style={{
                          width: "21%",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          BaselBusinessLine
                        </label>
                        <br />
                        <span data-bind="text:baselBusinessLine"></span>
                      </div>
                      <br />
                      <div
                        className="form-group"
                        style={{
                          width: "33%",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>Target</label>
                        <br />
                        <span data-bind="text:targetValue"></span>
                      </div>
                      \
                      <div
                        className="form-group"
                        style={{
                          width: "33%",
                          margin:
                            "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                        }}
                      >
                        <label style={{ marginBottom: "5px" }}>Baseline</label>
                        <br />
                        <span data-bind="text:baselineValue"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="pageThirdLast" className="fixedPage">
                  <div className="form-group" id="innerDivPageThird">
                    <div className="row">
                      <div className="form-group col-md-6 ">
                        <label>SummaryOfChanges</label>
                      </div>
                    </div>
                    <center>
                      <table
                        id="fieldhistorytable"
                        style={{ tableLayout: "fixed" }}
                        width="96%"
                      >
                        <thead>
                          <tr>
                            <th>FieldName</th>
                            <th>Comment</th>
                            <th>ChangedBy</th>
                            <th>ChangeDate</th>
                          </tr>
                        </thead>
                      </table>
                    </center>
                  </div>
                </div>

                <div id="pageSecondLast" className="fixedPage">
                  <div className="form-group" id="innerDivPageSecond">
                    <div className="row">
                      <div className="form-group col-md-6 ">
                        <label>SummaryofComments</label>
                      </div>
                    </div>
                    <center>
                      <table
                        id="fieldhistorytableComments"
                        style={{ tableLayout: "fixed" }}
                        width="96%"
                      >
                        <thead>
                          <tr>
                            <th>FieldName</th>
                            <th>Comment</th>
                            <th>ChangedBy</th>
                            <th>ChangeDate</th>
                          </tr>
                        </thead>
                      </table>
                    </center>
                  </div>
                </div>

                <div id="pageLast" className="fixedPage edit-form">
                  <div className="form-group" id="divAction">
                    <div className="row">
                      <div className="radioGroup col-md-6">
                        <label style={{ display: "block" }}>Action:</label>
                        <div className="radio">
                          <label id="submit" style={{ display: "none" }}>
                            <input
                              type="radio"
                              name="radioAction"
                              id="radioSubmit"
                              //value="SUBMIT"
                            />
                            Submit
                          </label>
                        </div>
                        <br />
                        <div className="radio">
                          <label id="approve" style={{ display: "none" }}>
                            <input
                              type="radio"
                              name="radioAction"
                              id="radioApprove"
                              className="radioUnChecked"
                              //value="NEXT"
                            />
                            Approve
                          </label>
                        </div>
                        <div className="radio">
                          <label id="reject" style={{ display: "none" }}>
                            <input
                              type="radio"
                              name="radioAction"
                              id="radioReject"
                              //value="ZERO"
                            />
                            NeedsCorrection
                          </label>
                        </div>
                        <div className="radio">
                          <label id="abort" style={{ display: "none" }}>
                            <input
                              type="radio"
                              name="radioAction"
                              id="radioAbort"
                              //value="END"
                            />
                            Abort
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6"></div>
                    </div>
                    <div className="row">
                      <div
                        className="form-group col-md-6 required"
                        id="remarksText"
                      >
                        <label>Remarks</label>
                        <input
                          type="text"
                          data-bind="value:comment"
                          className="form-control actionsRemarks"
                          id="txtComment"
                        />
                      </div>
                      <div className="col-md-6"></div>
                    </div>
                    <div className="form-group row" id="divReject">
                      <label>RejectTo</label>
                      <div className="radioGroup">
                        <div className="radio">
                          <label className="radioReviewer">
                            <input
                              type="radio"
                              name="radioReject"
                              id="radioInitiator"
                              //value="Initiator"
                            />
                            Initiator
                          </label>
                        </div>
                        <div className="radio radioStage radioReviewer">
                          <label>
                            <input
                              type="radio"
                              name="radioReject"
                              id="radioStage"
                              //value="PreviousStage"
                            />
                            PreviousStage
                          </label>
                        </div>
                      </div>
                    </div>
                    <div id="divPreviousStage">
                      <div className="row">
                        <div className="form-group col-md-6 required">
                          <label>SelectStage</label>
                          <select
                            className="form-control"
                            id="lstStages"
                            style={{ width: "100%" }}
                            name="lstStages"
                          ></select>
                        </div>
                      </div>
                      <div className="row" id="assignedUserFormStagesWrapper">
                        <div id="assignedUserFormStages">
                          <div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="form-group required col-md-6"
                        id="divAssignUsers"
                      >
                        <label>AssignNewUsers</label>
                        <select
                          id="referBackUser"
                          name="referBackUser"
                          multiple
                          style={{ width: "100%" }}
                          data-placeholder="StartTypingUsername"
                        ></select>
                      </div>

                      <div
                        className="form-group required col-md-6"
                        id="divSelectForm"
                      >
                        <label>SelectForm:</label>
                        <select
                          id="referBackUserForm"
                          name="referBackUserForm"
                          style={{ width: "100%" }}
                          data-placeholder="AssignAForm"
                        ></select>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="form-group col-md-6"
                        id="divAssignUserBtn"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="stages-tab"
              id="stage_container2"
              style={{ display: "none" }}
            ></div>
          </div>
        </div>
      </div>

      <div
        id="controlsListModal"
        className="quickview-wrapper fullWidth"
        style={{ marginTop: "8vh" }}
      >
        <div
          className="LayoutPage"
          data-bind="with: gm.actioncentre.selectedRow()"
        >
          <div className="LayoutPageHeader"></div>
          <div className="LayoutPageBody form-tab">
            <div className="LayoutPageThumbnails">
              <div>
                <div id="thumbnailFirstDraft" className="activeThumbnail">
                  <span>1</span>
                </div>
                <div id="thumbnailLastDraft">
                  <span>2</span>
                </div>
              </div>
            </div>
            <div className="LayoutPages">
              <div>
                <div
                  id="pageFirstDraft"
                  className="fixedPage modal-body fixedPageContent"
                >
                  <div className="form-group">
                    <label>Name</label>
                    <span className="show" id="controlNamePreview" />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <span
                      className="show"
                      id="controlDescriptionPreview"
                      style={{ minHeight: "6.2vh" }}
                    />
                  </div>

                  <div className="form-group">
                    <label id="selfAttestationLabelDraft">
                      SelfAttestation
                    </label>
                    <span className="show" id="selfAttestationPreviewDraft" />
                  </div>

                  <div className="form-group">
                    <label id="lblTitle">Title</label>
                    <input
                      id="taskTitle"
                      name="taskTitle"
                      disabled
                      placeholder="TitleWillBeAutoGenerated"
                      style={{ width: "100%" }}
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group" id="divSelfAttestationDraft">
                    <label id="lblSelfAttestationDraft">
                      SelectCertificate
                    </label>
                    <select
                      id="selfAttestationListDraft"
                      name="selfAttestationListDraft"
                      style={{ width: "100%" }}
                      className="form-control"
                      data-placeholder="SelectCertificate"
                    ></select>
                  </div>

                  <div
                    className="modal-body checkbox-radios"
                    id="radioGroupsforcontrol"
                  >
                    <div className="radio">
                      <label
                        id="controls"
                        style={{
                          cursor: "not-allowed",
                          color: "rgba(0, 0, 0, 0.26)",
                        }}
                      >
                        Control
                        <input
                          id="radioCon"
                          type="radio"
                          //value="con"
                          name="typecontrol"
                          disabled
                        />
                      </label>
                      <label
                        id="risks"
                        style={{
                          cursor: "not-allowed",
                          color: "rgba(0, 0, 0, 0.26)",
                        }}
                      >
                        Risk
                        <input
                          id="radioRisk"
                          type="radio"
                          //value="risk"
                          name="typecontrol"
                          disabled
                        />
                      </label>
                    </div>
                  </div>
                  <div className="modal-body form-group">
                    <label id="lblControl">Select</label>
                    <span className="text-danger">*</span>
                    <select
                      id="controlList"
                      name="controlList"
                      style={{ width: "100%" }}
                      className="form-control"
                      data-placeholder="Select"
                    ></select>
                  </div>
                  <div
                    className="checkbox-radios"
                    id="radioGroups"
                    style={{ position: "relative", left: "1vw" }}
                  >
                    <div className="radio">
                      <label
                        id="itSystems"
                        style={{
                          cursor: "not-allowed",
                          color: "rgba(0, 0, 0, 0.26)",
                        }}
                      >
                        ITSystems
                        <input
                          id="radioIts"
                          type="radio"
                          //value="its"
                          name="type"
                          disabled
                        />
                      </label>
                      <label
                        id="policies"
                        style={{
                          cursor: "not-allowed",
                          color: "rgba(0, 0, 0, 0.26)",
                        }}
                      >
                        Policies
                        <input
                          id="radioPol"
                          type="radio"
                          //value="pol"
                          name="type"
                          disabled
                        />
                      </label>
                      <label
                        id="processes"
                        style={{
                          cursor: "not-allowed",
                          color: "rgba(0, 0, 0, 0.26)",
                        }}
                      >
                        Processes
                        <input
                          id="radioPro"
                          type="radio"
                          //value="pro"
                          name="type"
                          disabled
                        />
                      </label>
                    </div>
                  </div>

                  <div className="modal-body form-group">
                    <label id="lblReference">Select</label>
                    <label>
                      <span className="text-danger"></span>
                    </label>
                    <select
                      id="referenceList"
                      name="referenceList"
                      className="form-control"
                      data-placeholder="Select"
                      style={{ width: "100%" }}
                    ></select>
                  </div>
                  <br />

                  <div className="form-group">
                    <a target="_blank" id="processUrl" href="#">
                      ViewProcess
                    </a>
                    <br />
                    <label>Status:</label>
                    <label></label>
                  </div>
                </div>
                <div id="pageLastDraft" className="fixedPage">
                  <div className=" form-group">
                    <label>
                      TargetDateToCloseTask
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="datepicker form-control"
                      placeholder="EnterTargetDateToCloseTheTask"
                      id="taskTargetDate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="stages-tab"
            id="stage_container"
            style={{ display: "none" }}
          >
            <div className="card min-height-500">
              <div className="edit-form new-design-theme workflow-acess-rights-content">
                <div className="noStagesAddedDiv" style={{ display: "none" }}>
                  <h2>NoStagesAreAdded</h2>
                </div>
                <form
                  method="post"
                  encType="multipart/form-data"
                  id="frmCreateStages"
                >
                  <div id="multiplestages" style={{ display: "none" }}>
                    <div className="new-design-theme workflow-acess-rights-card stages_btn_panel">
                      <div className="incDecContainer">
                        <span
                          className="glyphicon glyphicon-minus cursor"
                          style={{ fontSize: "16px" }}
                          id="minus"
                        ></span>
                        <input
                          type="number"
                          min="0"
                          max="15"
                          id="numberOfStages"
                          placeholder="NumberOfApprovalStages"
                          data-bind="value:numberOfStages"
                        />
                        <span
                          className="glyphicon glyphicon-plus cursor"
                          style={{ fontSize: "16px" }}
                          id="plus"
                        ></span>
                      </div>
                    </div>
                    <label className="m-lr-20 number_stages">
                      NumberOfApprovalStages
                    </label>
                    <label
                      className="simple-check-box stages_checkbox"
                      data-bind="attr:{'for':'approvalNotNeeded'}"
                      style={{ display: "none" }}
                    >
                      <input
                        type="checkbox"
                        className="approvalNeededCheck"
                        data-bind="attr:{'checked':approvalNotNeeded,'id':'approvalNotNeeded', 'name':'approvalNotNeeded'}"
                      />
                      NoStagesRequired
                    </label>
                  </div>
                  <div id="stageWrapper">
                    <div className="stageMain fullWidth p-t-10">
                      <div className="workflow-stages-card supervisor">
                        <label
                          className="simple-check-box"
                          data-bind="attr:{'for':'supervisorApproval'}"
                        >
                          <input
                            type="checkbox"
                            className="approvalNeededCheck"
                            dissabled="true"
                            data-bind="attr:{'checked':supervisorApproval,'id':'supervisorApproval', 'name':'supervisorApproval'}"
                          />
                          SupervisorReview
                        </label>
                      </div>

                      <ul
                        data-bind="foreach:addedStageList"
                        style={{ padding: " 0" }}
                        className="new-design-theme workflow-stages-container"
                      >
                        <div className="drop-div"></div>
                        <li
                          className="list-item"
                          draggable="true"
                          //ondragstart="drag(event,this)"
                          //ondragend="dragend(event)"
                          data-bind="attr:{'id':'stagedrag_'+ ($index() + 1)}"
                        >
                          <div
                            className="list-item-header closed"
                            data-init="0"
                          >
                            <span
                              className="pull-left stageTitleElement glyphicon glyphicon-chevron-down dropDownArrow cursor fs-18"
                              data-bind="attr:{'id':'openDetails_'+ ($index() + 1)}"
                            ></span>
                            <span
                              className="highlight bold stageTitleElement p-l-15 stage-item-title"
                              data-bind="text:'Stage' + ($index() + 1)"
                            ></span>{" "}
                            :{" "}
                            <span
                              data-bind="text : StageName"
                              className="stage_name_text"
                            ></span>
                            <label
                              className="simple-check-box mandatoryCheck_label"
                              style={{
                                color: "white",
                                position: "absolute",
                                right: "150px",
                              }}
                            >
                              IsThisStageMandatory &nbsp;&nbsp;&nbsp;
                              <input
                                type="checkbox"
                                className="mandatoryCheck"
                                data-bind="attr:{'checked':IsMandatory,'id':'stageAllIsMandatory_' +  ($index() + 1), 'name':'stageAllIsMandatory_' +  ($index() + 1)}"
                              />
                            </label>
                            <span
                              className="pull-right cursor glyphicon glyphicon-pushpin fix p-r-15 fs-18"
                              //onclick"fixClick(this)"
                              data-bind="attr:{'id':'stageAllIsPinned_'+ ($index() + 1)}"
                            ></span>
                            <span
                              className="pull-right cursor glyphicon glyphicon-trash delete p-r-15 fs-18"
                              data-bind="attr:{'id':'deleteStage_'+ ($index() + 1)}"
                            ></span>
                            <span className="clear"></span>
                          </div>
                          <ul
                            className="options"
                            data-bind="visible:false"
                            style={{
                              listStyle: "none",
                              paddingInlineEnd: "40px",
                              height: "fit-content",
                            }}
                          >
                            <li className="flex-row">
                              <div style={{ width: "48%" }}>
                                <div className="form-group required">
                                  <label>StageName</label>
                                  <input
                                    className="form-control stage_name_input"
                                    //onkeyup="stageNameChanged(this)"
                                    style={{ width: "400px" }}
                                    maxLength="150"
                                    type="text"
                                    placeholder="StageName"
                                    data-bind="value:StageName, attr: {'id': 'stageName_' + ($index + 1)}"
                                  />
                                </div>
                              </div>
                              <div
                                data-bind="attr:{'id':'stageActions_' +  ($index() + 1)}"
                                style={{ width: "48%" }}
                              >
                                <div className="form-group required">
                                  <label>SelectAtLeastOneAction</label>
                                </div>
                              </div>
                            </li>
                            <li className="flex-row m-t-20">
                              <div
                                style={{
                                  width: "48%",
                                  height: "33px",
                                  paddingTop: "8px",
                                }}
                              >
                                <label className="text-boldcolor bold ">
                                  ReviewWithin
                                </label>
                                <span
                                  className="number-input-container"
                                  style={{ borderBottom: "1px solid #CCC" }}
                                >
                                  <input
                                    maxLength="3"
                                    type="number"
                                    min="0"
                                    placeholder=""
                                    dissabled="true"
                                    data-bind="value:ReviewBy, attr: {'id': 'reviewBy' + ($index + 1)}"
                                    style={{
                                      background: "transparent",
                                      border: "none",
                                      width: "45px",
                                      paddingLeft: "10px",
                                      marginRight: "10px",
                                    }}
                                  />
                                  <span
                                    //onclick"this.previousSibling.value++"
                                    style={{ visibility: "hidden" }}
                                  >
                                    <i className="glyphicon glyphicon-chevron-up"></i>
                                  </span>
                                  <span
                                    //onclick"this.previousElementSibling.previousElementSibling.value--"
                                    style={{ visibility: "hidden" }}
                                  >
                                    <i className="glyphicon glyphicon-chevron-down"></i>
                                  </span>
                                </span>

                                <label className="bold text-boldcolor">
                                  Days
                                </label>
                              </div>
                              <div
                                className="checkbox"
                                disabled={true}
                                style={{
                                  margin: "0",
                                  visibility: "hidden",
                                  width: "48%",
                                }}
                              >
                                <label data-bind="attr:{'for':'stageAllApprovalMandatory_' +  ($index() + 1)}">
                                  UnanimousApprovalMandatory
                                  <input
                                    type="checkbox"
                                    className="approvalCheck"
                                    data-bind="attr:{'checked':ApprovalMandatory,'id':'stageAllApprovalMandatory_' +  ($index() + 1), 'name':'stageAllApprovalMandatory_' +  ($index() + 1)}"
                                  />
                                </label>
                              </div>
                            </li>

                            <li
                              className="m-t-20"
                              data-bind="attr:{'id':'stageFormGroup_' +  ($index() + 1)}"
                            >
                              <div className="form-group">
                                <label>FormStages</label>
                              </div>
                              <table className="table table-bordered m-b-20 stages-table">
                                <thead>
                                  <tr>
                                    <th
                                      style={{
                                        width: "calc(50 * 100vw / 1920)",
                                        padding: "0",
                                      }}
                                    >
                                      <button
                                        className="btn btn-success btn-sm"
                                        type="button"
                                        dissabled="true"
                                        data-bind="click:gm.stage.addFormGroup"
                                      >
                                        <i
                                          className="glyphicon glyphicon-plus"
                                          style={{
                                            position: "relative",
                                            top: "1px",
                                            right: "0",
                                          }}
                                        ></i>
                                      </button>
                                    </th>
                                    <th>AssignedUsersRoles </th>
                                    <th
                                      style={{
                                        width: "calc(200 * 100vw / 1920)",
                                      }}
                                      className="Hideclass"
                                    >
                                      SectionHeader
                                    </th>
                                    <th
                                      style={{
                                        width: "calc(40 * 100vw / 1920)",
                                      }}
                                      className="Hideclass"
                                    >
                                      Form
                                    </th>
                                    <th
                                      style={{
                                        width: "calc(40 * 100vw / 1920)",
                                      }}
                                      className="Hideclass"
                                    >
                                      Delete
                                    </th>
                                  </tr>
                                </thead>

                                {/* <tr data-bind="visible: FormGroup().length == 0">
                                  <td
                                    colSpan="5"
                                    align="center"
                                    style={{ padding: "15px" }}
                                  >
                                    <span>NoFormsAdded</span>
                                  </td>
                                </tr> */}

                                <tbody data-bind="foreach:FormGroup">
                                  <tr>
                                    <td
                                      className=" blockmiddle"
                                      style={{ textAlign: "center" }}
                                      data-bind="text:$index()+1"
                                    ></td>
                                    <td
                                      className=" blockmiddle"
                                      style={{ padding: "0 15px" }}
                                      data-bind="attr:{'data-stageNumber':$parentContext.$index(), 'data-formIndex':$index(), 'id':'stageForm_'+$parentContext.$index()+'_' +  ($index())}"
                                    >
                                      <select
                                        className="form-control formStagesUsers"
                                        multiple
                                        style={{ width: "100%" }}
                                        placeholder="ClickToAssignUser"
                                      ></select>
                                    </td>
                                    <td className="blockmiddle Hideclass">
                                      <input
                                        type="text"
                                        className="form-control"
                                        data-bind="value:Header"
                                        placeholder="TypeFormName"
                                        style={{ width: "100%" }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        color: "black",
                                        position: "relative",
                                        fontSize:
                                          "calc(20*(50vh + 23.5vw)/910)",
                                        textAlign: "center",
                                      }}
                                      className="Hideclass"
                                    >
                                      <span
                                        className="glyphicon glyphicon-eye-open"
                                        data-bind="click: function(data, event) {  gm.stage.editStageForm($parent,$index) } "
                                      ></span>
                                    </td>
                                    <td
                                      style={{
                                        color: "red",
                                        fontSize:
                                          "calc(20*(50vh + 23.5vw)/910)",
                                        textAlign: "center",
                                      }}
                                      className="Hideclass"
                                    ></td>
                                  </tr>
                                </tbody>
                              </table>
                            </li>
                          </ul>
                        </li>
                        <div
                          className="drop-div"
                          //ondrop="drop(event)"
                          //ondragover="allowDrop(event)"
                          //ondragenter="dragenter(event,this)"
                          //ondragleave="dragleave(event,this)"
                        ></div>
                      </ul>

                      <div
                        className="fieldName normal"
                        id="divConfirmationPopUp"
                      ></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modalComment modal fade"
        id="divCommentPopUp"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog-background" data-dismiss="modal"></div>
        <div className="modal-dialog modal-lg">
          <div
            className="modal-content"
            id="history_Div"
            style={{ backgroundColor: "#eee" }}
          >
            <div className="modal-header" id="history_Divheader">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                <img
                  className="request-navbar-cross"
                  style={{ height: "3vh" }}
                  src="\Views\Risk\icons\CloseIcon.svg"
                />
              </button>
              <h4 className="modal-title">FieldHistory</h4>
            </div>
            <div className="modal-body" id="actionFormCommentHistory"></div>
            <div className="modal-body">
              <input
                rows="1"
                className="form-control"
                type="text"
                //value=""
                id="CommentTextArea"
              />
              <button type="button" id="SaveCommentBtn">
                <svg viewBox="0 0 16 22">
                  <use xlinkHref="#action-save-comment" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="approvalHistoryModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-title">
                <button type="button" className="close" data-dismiss="modal">
                  <svg width="25" height="25" viewBox="0 0 25 20">
                    <use xlinkHref="#close-modal" />
                  </svg>
                </button>
                <h4 className="modal-title">ApprovalHistory</h4>
              </div>
            </div>
            <div className="modal-body">
              <div id="no-stages-wrapper"></div>
              <div className="row">
                <div className="col-md-3 modal-stages-wrapper">
                  <div id="stages-list-icons"></div>
                  <div id="stages-list-stage-names"></div>
                </div>
                <div className="col-md-9" id="stages-details"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="amendment_popup">
        <div id="top_menu">
          <div className="center-cell">
            <div id="tab" className="btn-group" data-toggle="buttons">
              <a
                href="#form"
                id="show_form"
                className="btn active"
                data-toggle="tab"
              >
                <input type="radio" />
                Form
              </a>
              <a
                href="#stages"
                id="show_stages"
                className="btn"
                data-toggle="tab"
              >
                <input type="radio" />
                Stakeholders
              </a>
            </div>
          </div>
        </div>
        <div
          className="LayoutPage"
          data-bind="with: gm.actioncentre.selectedRow()"
        >
          <div className="LayoutPageBody">
            <div className="LayoutPageThumbnails">
              <div>
                <div
                  id="thumbnailFirst"
                  className="activeThumbnail"
                  //onclick"gm.actioncentre.pageThumbnailClick(this, 'pageFirst');"
                >
                  <span>1</span>
                </div>
                <div
                  id="thumbnailLast"
                  //onclick"gm.actioncentre.pageThumbnailClick(this, 'pageLast');"
                >
                  <span>2</span>
                </div>
              </div>
            </div>
            <div className="LayoutPages">
              <div>
                <div id="pageFirst" className="fixedPage">
                  <div id="actionBody" className="modal-body fixedPageContent">
                    <div className="form-group">
                      <label>Title</label>
                      <span className="show" data-bind="text:title" />
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <span className="show" data-bind="text:name" />
                    </div>
                    <div className="form-group">
                      <label>ReferenceNumber</label>
                      <span className="show" data-bind="text:referenceNumber" />
                    </div>
                    <div className="form-group hidden" id="originTaskDataArea">
                      <label>OriginTask</label>
                      <a
                        className="show btn btn-info"
                        href="#"
                        style={{ width: "300px" }}
                      ></a>
                    </div>
                    <div
                      className="form-group hidden"
                      id="amendmentTaskDataArea"
                    >
                      <label>AmendmentTask</label>
                      <a
                        className="show btn btn-info"
                        href="#"
                        style={{ width: "300px" }}
                      ></a>
                    </div>

                    <div className="form-group">
                      <label id="selfAttestationLabel">SelfAttestation</label>
                      <span className="show" id="selfAttestationPreview" />
                    </div>

                    <div className="form-group" id="divSelfAttestation">
                      <label id="lblSelfAttestation">Certificate</label>
                      <select
                        id="selfAttestationList"
                        name="selfAttestationList"
                        style={{ width: "100%" }}
                        className="form-control"
                      ></select>
                    </div>

                    <div className="form-group">
                      <label>ControlName</label>
                      <span className="show" data-bind="text:controlName" />
                    </div>
                    <div className="form-group">
                      <label>RiskName</label>
                      <span className="show" data-bind="text:riskName"></span>
                      <div
                        className="printTextBox"
                        style={{ display: "none" }}
                        data-bind="text:riskName"
                      ></div>
                    </div>
                    <div className="form-group">
                      <label>ControlDescription</label>
                      <span
                        className="show"
                        data-bind="text:controlDescription"
                      />
                    </div>
                    <div className="form-group">
                      <label>ITSystemName</label>
                      <span className="show" data-bind="text:itSystemName" />
                    </div>
                    <div className="form-group">
                      <label>ProcessName</label>
                      <span className="show" data-bind="text:processName" />
                    </div>
                    <div className="form-group">
                      <label>PolicyName</label>
                      <span className="show" data-bind="text:policyName" />
                    </div>
                    <div className="form-group">
                      <a data-bind="attr: { href: url() }" target="_blank">
                        ViewProcessImage
                      </a>
                      <br />
                      <label>Status:</label>
                      <label data-bind="text: urlStatus"></label>
                    </div>
                    <div
                      id="rejectProcessRCSA"
                      className="form-group"
                      style={{ display: "none", visibility: "hidden" }}
                    >
                      <label>RejectProcess</label>
                      <input
                        type="checkbox"
                        id="chkRejectProcess"
                        style={{ verticalAlign: "top", marginTop: "5px" }}
                      />
                      <div id="rejectProcessComment">
                        <label>ProcessComment</label>
                        <input
                          id="rejectProcessCommentTb"
                          placeholder="Enter Process Comment."
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div
                      id="exceptionCountPreviewArea"
                      className="material-datatables"
                      style={{ display: "none" }}
                    >
                      <div className="table-responsive">
                        <table
                          id="exceptionCountList"
                          className="table table-striped table-no-bordered table-hover"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th></th>
                              <th>Name</th>
                              <th style={{ position: "relative", left: "0px" }}>
                                Type
                              </th>
                              <th
                                style={{ position: "relative", right: "20px" }}
                              >
                                Open
                              </th>
                              <th
                                style={{ position: "relative", right: "20px" }}
                              >
                                Closed
                              </th>
                              <th
                                style={{ position: "relative", right: "20px" }}
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="pageLast" className="fixedPage edit-form">
                  <div className="form-group" id="divAction">
                    <div className="row">
                      <div className="radioGroup col-md-6">
                        <label style={{ display: "block" }}>Action:</label>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              name="radioAction2"
                              id="radioApprove2"
                              //value="NEXT"
                            />
                            Approve
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              name="radioAction2"
                              id="radioReject2"
                              //value="ZERO"
                            />
                            Reject
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6"></div>
                    </div>

                    <div className="form-group row" id="divReject">
                      <label>RejectTo</label>
                      <div className="radioGroup">
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              name="radioReject"
                              id="radioInitiator"
                              //value="Initiator"
                            />
                            Initiator
                          </label>
                        </div>
                        <div className="radio radioStage">
                          <label>
                            <input
                              type="radio"
                              name="radioReject"
                              id="radioStage"
                              //value="PreviousStage"
                            />
                            PreviousStage
                          </label>
                        </div>
                      </div>
                    </div>
                    <div id="divPreviousStage">
                      <div className="row">
                        <div className="form-group col-md-6 required">
                          <label>SelectStage</label>
                          <select
                            className="form-control"
                            id="lstStages"
                            style={{ width: "100%" }}
                            name="lstStages"
                          ></select>
                        </div>
                      </div>
                      <div className="row" id="assignedUserFormStagesWrapper">
                        <div id="assignedUserFormStages">
                          <div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="form-group required col-md-6"
                        id="divAssignUsers"
                      >
                        <label>AssignNewUsers</label>
                        <select
                          id="referBackUser"
                          name="referBackUser"
                          multiple
                          style={{ width: "100%" }}
                          data-placeholder="StartTypingUsername"
                        ></select>
                      </div>

                      <div
                        className="form-group required col-md-6"
                        id="divSelectForm"
                      >
                        <label>SelectForm:</label>
                        <select
                          id="referBackUserForm"
                          name="referBackUserForm"
                          style={{ width: "100%" }}
                          data-placeholder="AssignAForm"
                        ></select>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="form-group col-md-6"
                        id="divAssignUserBtn"
                      >
                        <button
                          type="button"
                          className="btn btn-block"
                          data-bind="click:gm.actioncentre.assignUserForm"
                          id="assignUserForm"
                          tabIndex="8"
                        >
                          AddNewUser
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg style={{ display: "none" }}>
        <symbol
          width="25"
          height="25"
          viewBox="0 0 25 25"
          id="action-open-view"
        >
          <g
            id="Group_4225"
            data-name="Group 4225"
            transform="translate(-1676.34 -958.973)"
          >
            <path
              id="Path_1306"
              data-name="Path 1306"
              d="M1696.335,958.972h-14.969a.992.992,0,0,0-1.025.954v17.1a.992.992,0,0,0,1.025.954h3.084V964.075l11.885-4.026v17.1l-2.457.832h2.457a.992.992,0,0,0,1.025-.954v-17a.992.992,0,0,0-1.025-.954Z"
              transform="translate(0 0)"
            />
            <path
              id="Path_1307"
              data-name="Path 1307"
              d="M1689.172,983.972a1.184,1.184,0,0,1-.672-.209,1.152,1.152,0,0,1-.5-.947V964.451a1.157,1.157,0,0,1,.771-1.086l12.049-4.324a1.186,1.186,0,0,1,1.073.14,1.151,1.151,0,0,1,.5.947v18.365a1.157,1.157,0,0,1-.771,1.086l-12.049,4.324A1.18,1.18,0,0,1,1689.172,983.972Zm1.172-18.711v15.9l9.7-3.482v-15.9Zm10.877,13.232h0Z"
              transform="translate(-4.912 0)"
            />
          </g>
        </symbol>

        <symbol width="25" height="25" viewBox="0 0 25 25" id="action-save">
          <g id="Action_Save" clipPath="url(#clip-Action_Save)">
            <path
              id="DISKETTE"
              d="M237,2476.047a1.172,1.172,0,0,1-1.172,1.172H213.172a1.172,1.172,0,0,1-1.172-1.172v-21.875a1.172,1.172,0,0,1,1.172-1.171h3.516v1.563h0v4.3h0v3.516a2.344,2.344,0,0,0,2.288,2.344h10.269a2.343,2.343,0,0,0,2.287-2.344v-3.516h0v-4.3h0V2453h.781a1.166,1.166,0,0,1,.829.343h0l3.516,3.516h0a1.168,1.168,0,0,1,.343.829Zm-6.641-13.672a1.173,1.173,0,0,1-1.172,1.175h-1.563v0h-7.031v0h-1.562a1.173,1.173,0,0,1-1.172-1.175v-2.344h0V2453h12.5v7.031h0Zm-2.344-7.812H224.5v7.422h3.516Z"
              transform="translate(-211.777 -2452)"
              fillRule="evenodd"
            />
          </g>
        </symbol>

        <symbol width="25" height="25" viewBox="0 0 25 25" id="action-submit">
          <g id="Action_Submit" clipPath="url(#clip-Action_Submit)">
            <path
              id="DOCUMENT__x2F__UPLOAD_1_"
              d="M20.565,19.355a1.1,1.1,0,0,1-.847-.363l-.766-.766V23.79a1.21,1.21,0,0,1-2.419,0V18.226l-.766.766a1.1,1.1,0,0,1-.847.363,1.188,1.188,0,0,1-1.21-1.21,1.1,1.1,0,0,1,.363-.847L16.9,14.476a1.257,1.257,0,0,1,.847-.363,1.1,1.1,0,0,1,.847.363L21.411,17.3a1.257,1.257,0,0,1,.363.847A1.188,1.188,0,0,1,20.565,19.355Zm-7.339-2.9a2.276,2.276,0,0,0-.726,1.694,2.426,2.426,0,0,0,2.419,2.419,1.372,1.372,0,0,0,.4-.04v2.863H1.21A1.188,1.188,0,0,1,0,22.177V1.21A1.188,1.188,0,0,1,1.21,0H7.661V6.855a2.426,2.426,0,0,0,2.419,2.419h7.661V12.9a2.276,2.276,0,0,0-1.694.726ZM10.081,8.065a1.188,1.188,0,0,1-1.21-1.21V0h0l8.871,8.065H10.081Z"
              transform="translate(2)"
              fillRule="evenodd"
            />
          </g>
        </symbol>

        <symbol width="25" height="25" viewBox="0 0 25 25" id="action-review">
          <g id="Action_Review" clipPath="url(#clip-Action_Review)">
            <path
              id="BOOK"
              d="M1023.259,1136h-1.293v-25h1.293a1.293,1.293,0,0,1,1.293,1.293v22.414A1.293,1.293,0,0,1,1023.259,1136Zm-17.672-1.293v-1.293h2.155a2.586,2.586,0,0,0,0-5.173h-2.155v-2.155h2.155a2.586,2.586,0,0,0,0-5.172h-2.155v-2.155h2.155a2.586,2.586,0,1,0,0-5.172h-2.155v-1.293a1.293,1.293,0,0,1,1.293-1.293h13.793v25h-13.793A1.293,1.293,0,0,1,1005.586,1134.707Zm3.448-18.534a1.293,1.293,0,0,1-1.293,1.293h-3.448a1.293,1.293,0,1,1,0-2.586h3.448A1.293,1.293,0,0,1,1009.034,1116.173Zm-4.741,6.034h3.448a1.293,1.293,0,0,1,0,2.586h-3.448a1.293,1.293,0,0,1,0-2.586Zm0,7.328h3.448a1.293,1.293,0,1,1,0,2.586h-3.448a1.293,1.293,0,1,1,0-2.586Z"
              transform="translate(-1001 -1111)"
              fillRule="evenodd"
            />
          </g>
        </symbol>
      </svg>

      <svg
        style={{ display: "none" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <symbol
          width="25"
          height="25"
          viewBox="0 0 25 25"
          id="close-modal"
          fill="#ffffff"
        >
          <g id="Misc_Close" clipPath="url(#clip-Misc_Close)">
            <rect
              id="Rectangle_664"
              data-name="Rectangle 664"
              width="3"
              height="23"
              transform="translate(0.999 3.12) rotate(-45)"
            />
            <rect
              id="Rectangle_665"
              data-name="Rectangle 665"
              width="3"
              height="23"
              transform="translate(17.264 1) rotate(45)"
            />
          </g>
        </symbol>
      </svg>

      <svg
        style={{ display: "none" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 16 22"
      >
        <symbol
          width="16"
          height="22"
          viewBox="0 0 16 22"
          id="action-save-comment"
        >
          <g>
            <path
              d="M1,1 15,11.5 1,21Z"
              stroke="#4D94FF"
              strokeWidth="2"
              fill="transparent"
            />
          </g>
        </symbol>
      </svg>

      <div className="modal fade" id="printDialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-title">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h5 className="modal-title">Print</h5>
              </div>
            </div>
            <div className="modal-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  //onchange="printModal.toggleComments()"
                  id="toggleComments"
                />
                <label className="form-check-label" htmlFor="toggleComments">
                  IncludeSummaryOfComments
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  //onchange="printModal.toggleSummary()"
                  id="toggleSummary"
                />
                <label className="form-check-label" htmlFor="toggleSummary">
                  IncludeSummaryOfChanges
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  //onchange="printModal.toggleApproval()"
                  id="toggleApproval"
                />
                <label className="form-check-label" htmlFor="toggleApproval">
                  IncludeApprovalHistory
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                //onclick"printModal.print()"
              >
                Print
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ManageV2;
