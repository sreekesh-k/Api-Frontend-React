import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Pagination } from "antd";
import { API_URL } from "../../constants";

function ClauseModel(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clauseData, setClauseData] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // TABLE
  let locale = {
    emptyText: loading ? "Processing..." : "No Data",
  };
  //Vendor Rating Data
  const columns = [
    {
      title: <b>CLAUSE NO</b>,
      dataIndex: "link",
      key: "link",
      responsive: ["lg"],
      width: "8.5vw",
    },
    {
      title: <b>MANDATORY CLAUSE</b>,
      dataIndex: "label",
      responsive: ["lg"],
      key: "value",
    },
  ];
  const ratingScoreColumns = [
    {
      title: <b>SCORE</b>,
      dataIndex: "score",
      key: "score",
      responsive: ["lg"],
      width: "8.5vw",
    },
    {
      title: <b>VENDOR RATING</b>,
      dataIndex: "value",
      responsive: ["lg"],
      key: "value",
    },
  ];

  const ratingScoreDataSource = [
    {
      score: "<=30",
      value: "Low",
    },
    {
      score: "<=60",
      value: "Medium",
    },
    {
      score: ">60",
      value: "High",
    },
  ];

  const ratingScoreColumns2 = [
    {
      title: <b>SCORE</b>,
      dataIndex: "score",
      key: "score",
      responsive: ["lg"],
      width: "8.5vw",
    },
    {
      title: <b>RATING</b>,
      dataIndex: "value",
      responsive: ["lg"],
      key: "value",
    },
  ];
  const ratingScoreDataSource2 = [
    {
      score: "1",
      value: "Low",
    },
    {
      score: "2",
      value: "Medium",
    },
    {
      score: "3",
      value: "High",
    },
    {
      score: "4",
      value: "Critical",
    },
  ];
  const getClauseData = () => {
    // fetch(`${API_URL}/MasterData/GetAllDropdownValues/vcc`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     //console.log(data)
    //     setClauseData(data);
    //   })
    //   .catch((err) => toastr.error(err.message));
  };
  useEffect(() => {
    getClauseData();
  }, []);
  //Vendor Annual Review Data
  const scoringColumns = [
    {
      title: <b>SCORE</b>,
      dataIndex: "score",
      key: "score",
      responsive: ["lg"],
      width: "37vw",
    },
    {
      title: <b>LEVEL</b>,
      dataIndex: "value",
      responsive: ["lg"],
      key: "value",
      width: "30vw",
    },
    {
      title: <b>COLOR CODE</b>,
      dataIndex: "color",
      responsive: ["lg"],
      key: "color",
      render: (color) => (
        <div
          style={{
            width: "16px", // Circle width
            height: "16px", // Circle height
            borderRadius: "50%", // Makes it a circle
            backgroundColor: color, // Dynamic background color
          }}
        />
      ),
    },
  ];
  const scoringeDataSource = [
    {
      score: "3",
      value: "Low Risk",
      color: "#00ff00", // Green color for low risk
    },
    {
      score: "2",
      value: "Medium Risk",
      color: "#ffff00", // Yellow color for medium risk
    },
    {
      score: "1",
      value: "High Risk",
      color: "#ff0000", // Red color for high risk
    },
  ];
  const renewalColumns = [
    {
      title: <b>ELIGIBLE SCORE</b>,
      dataIndex: "score",
      key: "score",
      responsive: ["lg"],
      width: "37vw",
    },
    {
      title: <b>LEVEL</b>,
      dataIndex: "value",
      responsive: ["lg"],
      key: "value",
      width: "30vw",
    },
    {
      title: <b>COLOR CODE</b>,
      dataIndex: "color",
      responsive: ["lg"],
      key: "color",
      render: (color) => (
        <div
          style={{
            width: "16px", // Circle width
            height: "16px", // Circle height
            borderRadius: "50%", // Makes it a circle
            backgroundColor: color, // Dynamic background color
          }}
        />
      ),
    },
  ];
  const renewalDataSource = [
    {
      score: ">70%",
      value: "Approved",
      color: "#00ff00", // Green color for approved
    },
    {
      score: "50-70%",
      value: "Approved with deviation",
      color: "#ffff00", // Yellow color for approved
    },
    {
      score: "<50%",
      value: "Rejected",
      color: "#ff0000", // Red color for rejected
    },
  ];

  return (
    <div className="vd-clause-model">
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "#4D94FF" }}
      >
        Info
      </Button>
      <Modal
        title="Info"
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
        style={{
          marginLeft: "5.2%",
          marginTop: "-5%",
        }}
        width="94%"
      >
        {props.activeTab == "VendorCategorizationScoring" && (
          <div className="vd-clause-table-wrapper">
            <div id="clauseModal">
              <Table
                size="middle"
                pagination={false}
                columns={columns}
                dataSource={clauseData}
                locale={locale}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "even" : "odd"
                }
                loading={loading}
                rowKey={(record) => record.key}
              />
            </div>
            <div id="ratingScoreModal">
              <Table
                size="middle"
                pagination={false}
                columns={ratingScoreColumns}
                dataSource={ratingScoreDataSource}
                locale={locale}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "even" : "odd"
                }
                loading={loading}
                rowKey={(record) => record.key}
              />
              <Table
                size="middle"
                pagination={false}
                columns={ratingScoreColumns2}
                dataSource={ratingScoreDataSource2}
                locale={locale}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "even" : "odd"
                }
                loading={loading}
                rowKey={(record) => record.key}
              />
            </div>
          </div>
        )}
        {props.activeTab == "VendorRating" && (
          <div className="annualReviewContainer">
            <div id="serviceTable">
              <Table
                title={() => "Vendor Services Renewal Criteria"}
                size="middle"
                pagination={false}
                columns={renewalColumns}
                dataSource={renewalDataSource}
                locale={locale}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "even" : "odd"
                }
                loading={loading}
                rowKey={(record) => record.key}
              />
            </div>
            <div id="scoringTable">
              <Table
                title={() => "Scoring Criteria"}
                size="middle"
                pagination={false}
                columns={scoringColumns}
                dataSource={scoringeDataSource}
                locale={locale}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "even" : "odd"
                }
                loading={loading}
                rowKey={(record) => record.key}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ClauseModel;
