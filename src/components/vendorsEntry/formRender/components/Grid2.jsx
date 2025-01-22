import { createRef, Component, Fragment } from "react";

export default function (props) {
  const { value = {}, onChange, readOnly } = props;

  const handelChangeData = (data) => onChange({ ...value, data });

  return (
    <div
      className="form-group"
      id={props.name + "Div"}
      data-controltype="grid2"
    >
      <window.formRendererDeps.Grid2Component.Grid
        data={value.data}
        sizes={value.sizes}
        onChangeData={handelChangeData}
        readOnly={readOnly}
      />
    </div>
  );
};
