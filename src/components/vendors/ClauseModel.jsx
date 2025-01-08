import React, { useState } from "react";
import { Modal, Button, Table } from "antd";

const ClauseModel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clauseData, setClauseData] = useState([
    { key: "1", link: "001", label: "Mandatory Clause 1" },
    { key: "2", link: "002", label: "Mandatory Clause 2" },
    { key: "3", link: "003", label: "Mandatory Clause 3" },
  ]);

  // Modal Handlers
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Table configuration
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
      key: "value",
      responsive: ["lg"],
    },
  ];

  const locale = {
    emptyText: loading ? "Processing..." : "No Data",
  };

  return (
    <div className="vd-clause-model">
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "#4D94FF" }}
      >
        Categorization Clauses
      </Button>
      <Modal
        title="Categorization Clauses"
        visible={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
        width="85vw"
      >
        <div className="vd-clause-table-wrapper">
          <Table
            size="middle"
            pagination={false}
            columns={columns}
            dataSource={clauseData}
            locale={locale}
            rowClassName={(record, index) => (index % 2 === 0 ? "even" : "odd")}
            loading={loading}
            rowKey={(record) => record.key}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ClauseModel;
