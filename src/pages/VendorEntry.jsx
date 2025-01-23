import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VendorApp from "../components/vendorsEntry/VendorApp";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { saveVendorId } from "../slices/VendorSlice";
function VendorEntry() {
  // Get query params from the URL
  // const location = useLocation();
  const navigate = useNavigate();
  const vendorId = useSelector((state) => state.vendor.vendorId);

  useEffect(() => {
    if (!vendorId) {
      navigate("/");
    }
  }, [vendorId]);
  // const dispatch = useDispatch();
  // const queryParams = new URLSearchParams(location.search);
  // const vendorId = queryParams.get("id");
  // useEffect(() => {
  //   dispatch(saveVendorId(vendorId));
  // }, []);
  // // Retrieve the vendor type from sessionStorage
  // const vendorType = sessionStorage.getItem("vendorType");

  return (
    <>
      {vendorId && (
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "1.5rem",
          }}
        >
          <VendorApp />
        </div>
      )}
      {/* <VendorApp VendorDetailsForm={VendorDetailsForm} VendorCategorization={VendorCategorization} VendorRating={VendorRating} /> */}

      {/* Display the vendor details (DEBUG)*/}
      {/* <div>
        <h1>Vendor Details</h1>
        <p>Vendor ID: {vendorId}</p>
        <p>Vendor Type: {vendorType}</p>
      </div> */}
    </>
  );
}

export default VendorEntry;
