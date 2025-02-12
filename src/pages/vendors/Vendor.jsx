import React from "react";
import VendorTable from "../../components/vendors/VendorTable";
import ThemeLayout from "../../common/layouts/ThemeLayout";
import './vendor.css'
function Vendor() {
  return (
    <>
      <ThemeLayout>
        <div>
          <VendorTable />
        </div>
      </ThemeLayout>
    </>
  );
}

export default Vendor;
