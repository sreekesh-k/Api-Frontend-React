import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VendorApp from "../../components/vendorsEntry/VendorApp";
import { useSelector } from "react-redux";

function VendorEntry() {
  const navigate = useNavigate();
  const vendorId = useSelector((state) => state.vendor.vendorId);

  useEffect(() => {
    if (!vendorId) {
      navigate("/");
    }
  }, [vendorId]);

  return (
    <>
      {vendorId && (
        <div id="csroot">
          <VendorApp />
        </div>
      )}
    </>
  );
}

export default VendorEntry;
