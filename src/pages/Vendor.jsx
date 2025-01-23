import React from "react";
import VendorTable from "../components/vendors/VendorTable";
import FormBuilder from "../layouts/form/FormBuilder";
import FormRenderer from "../layouts/form/FormRenderer";
import { useState } from "react";

function Vendor() {
  const [formSchema, setFormSchema] = useState([]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <VendorTable />
      {/* <div style={{ padding: "20px" }}>
        <FormBuilder onSave={setFormSchema} />
        {formSchema.length > 0 && <FormRenderer schema={formSchema} />}
      </div> */}
    </div>
  );
}

export default Vendor;
