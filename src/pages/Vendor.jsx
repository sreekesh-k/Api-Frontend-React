import React from "react";
import VendorTable from "../components/vendors/VendorTable";
import FormBuilder from "../layouts/form/FormBuilder";
import FormRenderer from "../layouts/form/FormRenderer";
import { useState } from "react";

function Vendor() {
  const [formSchema, setFormSchema] = useState([]);

  return (
    <>
      <VendorTable />
    </>
  );
}

export default Vendor;
