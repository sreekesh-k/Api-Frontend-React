import { Table } from "antd";
import { Pagination } from "antd";
import { Tooltip } from "antd";
import { Tag } from "antd";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
// import {useDespatch} from "react-redux";
// impor {storeVendorDataAction} from "vendorSlice";
// import {useSelector} from "redux-toolkit";

function VendorTable(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState([
    {
      Id: "3ae603b5-6d6d-4b47-88d1-010ebf671ffb",
      URN: "V0260",
      VendorName: "VN001",
      VendorCode: "VC002",
      Type: "DSA",
      Department: "Test Dept",
      NatureOfService: "Cash handling",
      State: "Andra Pradesh",
      MaterialityDate: "2024-10-29T00:00:00",
      Status: "Inactive",
      FilledFormId: "00000000-0000-0000-0000-000000000000",
      TemplateId: "00000000-0000-0000-0000-000000000000",
      TaskId: "00000000-0000-0000-0000-000000000000",
      FilledForm: null,
      TotalNumberOfRecords: 291,
      InActivationEvidence: "",
      InActivationDate: null,
      ReasonOfInactivation: "",
      Version: "Live",
      CreatedBy: "Surya narayanan",
      ModifiedBy: "Surya narayanan",
      ModifiedDate: "2024-11-21T13:07:21.037",
      CreatedDate: "0001-01-01T00:00:00",
      Materiality: "2024-10-29T00:00:00",
      id: "653a",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const recordsLimit = 10;
  const pageSize = 10;

  // SEARCH NEEDS MORE OPTIMIZATION, currently it is done this way because input field change does not reflct while typing
  let searchInput = document.getElementById("HeaderFilterSearch");
  // searchInput.addEventListener("change", (e) => {
  //   setCurrentPage(1);
  //   //console.log(e.target.value)
  //   setSearchValue(e.target.value);
  // });

  let locale = {
    emptyText: loading ? "Processing..." : "No Data",
  };
  const handleTableChnge = (_, __, sorter) => {
    const columnName = sorter.columnKey;
    const order = sorter.order;
    const orderValue = order == "ascend" ? 0 : 1;
    if (order) {
      getVendorData(0, columnName, orderValue);
      setCurrentPage(1);
    } else {
      getVendorData(0, "", 0);
      setCurrentPage(1);
    }
  };
  const columnsUserTable = [
    {
      title: <b className="table-col-heading">{"URN".toUpperCase()}</b>,
      dataIndex: "URN",
      key: "Urn",
      responsive: ["lg"],
      width: "1vw",
      sorter: true,
    },
    {
      title: <b className="table-col-heading">{"Vendor Name".toUpperCase()}</b>,
      dataIndex: "VendorName",
      key: "VendorName",
      responsive: ["lg"],
      width: "10vw",
      // render: (text, data) => {
      //   return (
      //     <Tooltip title={text}>
      //       {text !== null
      //         ? text.length > 13
      //           ? text.slice(0, 13)
      //           : text
      //         : text}
      //       {text !== null && text.length > 14 ? ".." : ""}
      //     </Tooltip>
      //   );
      // },
    },
    {
      title: <b className="table-col-heading">{"Vendor code".toUpperCase()}</b>,
      dataIndex: "VendorCode",
      key: "VendorCode",
      responsive: ["lg"],
      width: "10vw",
    },
    {
      title: <b className="table-col-heading">{"Type".toUpperCase()}</b>,
      dataIndex: "Type",
      key: "Type",
      responsive: ["lg"],
      sorter: true,
      widtth: ".2vw",
      render: (tag) => {
        return (
          <Tag color="#9397A5" key={tag}>
            {tag}
          </Tag>
        );
      },
    },
    {
      title: <b className="table-col-heading">{"Department".toUpperCase()}</b>,
      dataIndex: "Department",
      key: "Department",
      responsive: ["lg"],
      sorter: true,
      width: "10vw",
      // render: (text, data) => {
      //   return (
      //     <Tooltip title={text}>
      //       {text !== null ? text.slice(0, 12) : text}
      //       {text !== null && text.length > 12 ? ".." : ""}
      //     </Tooltip>
      //   );
      //   // return <Tooltip title={text}>{text}</Tooltip>
      // },
    },
    {
      title: (
        <b className="table-col-heading">{"Nature of service".toUpperCase()}</b>
      ),
      dataIndex: "NatureOfService",
      key: "NatureOfService",
      responsive: ["lg"],
      sorter: true,
      width: "13.5vw",
      // render: (text, data) => {
      //   return (
      //     <Tooltip title={text}>
      //       {text !== null ? text.slice(0, 18) : text}
      //       {text !== null && text.length > 18 ? ".." : ""}
      //     </Tooltip>
      //   );
      // },
    },
    {
      title: <b className="table-col-heading">{"State".toUpperCase()}</b>,
      dataIndex: "State",
      key: "State",
      responsive: ["lg"],
      sorter: true,
      width: "9vw",
      // render: (text) => {
      //   return (
      //     <Tooltip title={text}>
      //       {text != null ? text.slice(0, 10) : text}
      //       {text !== null && text.length > 10 ? ".." : ""}
      //     </Tooltip>
      //   );
      // },
    },
    {
      title: <b className="table-col-heading">{"Materiality".toUpperCase()}</b>,
      dataIndex: "Materiality",
      key: "Materiality",
      responsive: ["lg"],
      // render: function (data) {
      //   if (data != null) {
      //     return moment(data).format("DD-MM-YYYY");
      //   }
      // },
      width: "9vw",
    },
    {
      title: <b className="table-col-heading">{"Status".toUpperCase()}</b>,
      dataIndex: "Status",
      key: "Status",
      responsive: ["lg"],
      sorter: true,
      width: "5vw",
    },
    {
      title: <b className="table-col-heading">{"Version".toUpperCase()}</b>,
      dataIndex: "Version",
      key: "Version",
      responsive: ["lg"],
      width: "6.5vw",
    },
    {
      title: <b className="table-col-heading">{"Created by".toUpperCase()}</b>,
      dataIndex: "CreatedBy",
      key: "Created",
      responsive: ["lg"],
      width: "8vw",
    },
  ];
  const filterDataFormat = (filters) => {
    const transformedData = {};
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key]) && filters[key].length > 0) {
        transformedData[key] = filters[key].map((item) =>
          item.value ? item.value : []
        );
      }
    });

    return transformedData;
  };
  // const getVendorData = (offset, columnName = "", sortDirection = 0) => {
  //   setLoading(true);
  //   let filterData = [];
  //   if (props.FilterOptions)
  //     filterData = filterDataFormat(JSON.parse(props.FilterOptions));
  //   fetch(`/Vendor/GetAllVendorsDynamic`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       Draw: 0,
  //       Start: offset,
  //       Length: 10,
  //       Search: {
  //         Value: searchValue,
  //         IsRegexValue: true,
  //       },
  //       Columns: [
  //         {
  //           Data: columnName,
  //           Name: "",
  //           Searchable: true,
  //           Orderable: true,
  //           Search: {
  //             Value: "",
  //             IsRegexValue: true,
  //           },
  //           IsOrdered: true,
  //           OrderNumber: 0,
  //           SortDirection: sortDirection,
  //         },
  //       ],
  //       FilterParams: JSON.stringify(filterData),
  //     }),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setVendorData(data.data);
  //       setTotalRecords(data.recordsTotal);
  //     })
  //     .finally(() => setLoading(false));
  // };

  useEffect(() => {
    localStorage.setItem("isViewMode", JSON.stringify(true)); // restores the mdoe to view only in all the tabs
    sessionStorage.removeItem("vendorDetails");
  }, []);

  // useEffect(() => {
  //   getVendorData((currentPage - 1) * recordsLimit, "", 0);
  // }, [props.FilterOptions, searchValue]);

  sessionStorage.setItem("activeTabId", "VendorDetails");
  // CHANGE_PAGE
  const handlePageChange = (e) => {
    if (e === 1) {
      getVendorData(0);
      setCurrentPage(e);
      return;
    }
    if (e > currentPage) {
      getVendorData((e - 1) * recordsLimit);
    } else {
      getVendorData(e * recordsLimit - 10);
    }
    setCurrentPage(e);
  };

  const handleRowClick = (record) => {
    sessionStorage.setItem("vendorType", record.Type);
    // window.location = `/Vendor/VendorDetails?id=${record.Id}`;
    navigate(`/vendordetail?id=${record.Id}`);
  };

  const TableFooter = () => {
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        id="vendorTableFooter"
      >
        <div>
          <p>{`Showing ${vendorData.length} of ${totalRecords} Records`}</p>
        </div>
        <div>
          <Pagination
            defaultCurrent={currentPage}
            current={currentPage}
            showSizeChanger={false}
            total={totalRecords}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </div>
    );
  };
  return (
    <div style={{ cursor: "pointer" }}>
      <div
        style={{
          width: "94.45vw",
          marginTop: "4vh",
          marginLeft: ".5vw",
          marginBottom: "3vh",
        }}
        id="vendorTableWrapper"
      >
        <Table
          className="vendor-grid-table"
          onChange={handleTableChnge}
          size="middle"
          pagination={false}
          columns={columnsUserTable}
          dataSource={vendorData}
          locale={locale}
          rowClassName={(record, index) => (index % 2 === 0 ? "even" : "odd")}
          loading={loading}
          rowKey={(record) => record.URN}
          onRow={(record) => {
            return {
              onClick: (event) => {
                handleRowClick(record);
              },
            };
          }}
          footer={() => <TableFooter />}
        />
      </div>
    </div>
  );
}

export default VendorTable;
