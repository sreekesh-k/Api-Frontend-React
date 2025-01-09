import React from "react";
import { useLocation } from "react-router-dom";
import VendorApp from "../components/vendorsEntry/VendorApp";

function VendorEntry() {
  // Get query params from the URL
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const vendorId = queryParams.get("id");
  // // Retrieve the vendor type from sessionStorage
  // const vendorType = sessionStorage.getItem("vendorType");

  return (
    <>
      <VendorApp />
      {/* <div>
        <h1>Vendor Details</h1>
        <p>Vendor ID: {vendorId}</p>
        <p>Vendor Type: {vendorType}</p>
      </div> */}
    </>
  );
}

export default VendorEntry;
