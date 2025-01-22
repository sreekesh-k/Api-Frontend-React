import React, { useState, useEffect } from "react";
import EventEmitter3 from "eventemitter3";
import $ from "jquery";

const FormRender = (props) => {
  const [formData, setFormData] = useState(props.data);
  const [readOnly] = useState(props.readOnly || false);
  const [isComponentUpdate] = useState(props.isComponentUpdate || false);
  const [filePreviewSource, setFilePreviewSource] = useState("");

  const allowedFileTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/rtf",
    "text/rtf",
    ".rtf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "xlsx",
    "application/vnd.ms-excel",
    "xls",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "msg",
    ".msg",
    "application/octet-stream",
    "doc",
    "docx",
  ];

  useEffect(() => {
    window.DcFormRenderTriggers = window.DcFormRenderTriggers || [];
    if (!window.rendererInstances) {
      window.rendererInstances = [];
    }
    window.rendererInstances.push({ getData });

    if (window.DcFormRenderTriggers.length) {
      window.DcFormRenderTriggers.forEach((t) => {
        const triggerField = t.refField;
        const triggerValue = t.refValue;
        const currentElement = formData.find((i) => i.name === triggerField);

        if (currentElement) {
          const currentValue =
            currentElement.type === "select"
              ? currentElement.value?.label || currentElement.value
              : currentElement.value;

          if (triggerValue !== currentValue && t.display === "show") {
            $(`#${t.field}Div`).hide();
          }
          if (triggerValue === currentValue && t.display === "hide") {
            $(`#${t.field}Div`).hide();
          }
        }
      });
    }

    return () => {
      window.rendererInstances = window.rendererInstances.filter(
        (instance) => instance.getData !== getData
      );
    };
  }, [formData]);

  const getData = () => {
    let updatedFormData = formData.map((data) => {
      let dataCopy = { ...data };
      delete dataCopy.eventEmitter;
      delete dataCopy.isConverted;

      if (dataCopy.type === "date") {
        dataCopy = getDateTimeValue(dataCopy);
      }

      if (dataCopy.value) {
        if (dataCopy.type === "grid2") {
          dataCopy.value.data.forEach((row) => {
            row.forEach((cell) => {
              if (typeof cell.value.value === "string") {
                cell.value.value = cell.value.value.replace(/[\/\~.:?]/g, "");
              }
            });
          });
        } else if (typeof dataCopy.value === "string") {
          dataCopy.value = dataCopy.value.replace(/[~?><]/g, "");
        }
      }

      return dataCopy;
    });

    return updatedFormData;
  };

  const getDateTimeValue = (dataCopy) => {
    const val = $(`#${dataCopy.name}id`).val();
    dataCopy.value = val
      ? moment(val, dataCopy.format).format("YYYY-MM-DD")
      : val;
    return dataCopy;
  };

  const handleChange = (val, index) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      const obj = updatedFormData[index];

      if (obj.type === "currency") {
        obj.value = val.value;
        obj.currencyValue = val.currencyValue;
      } else {
        obj.value = val;
      }

      if (Array.isArray(obj.value) && obj.value.length === 0) {
        delete obj.value;
      }

      obj.isConverted = true;

      return updatedFormData;
    });
  };

  const generateControl = (obj, i) => {
    const controlStyle = {
      width: obj.controlWidth,
      maxWidth: obj.controlWidth,
      margin: obj.controlMargin,
      height: obj.controlHeight,
      maxHeight: obj.controlHeight,
    };

    switch (obj.type) {
      case "text":
        return (
          <h1 key={i} style={controlStyle}>
            TextBox
          </h1>
        );
      case "date":
        return (
          <h1 key={i} style={controlStyle}>
            DatePicker
          </h1>
        );
      case "textarea":
        return (
          <h1 key={i} style={controlStyle}>
            TextArea
          </h1>
        );
      case "paragraph":
        return (
          <h1 key={i} style={controlStyle}>
            Paragraph
          </h1>
        );
      case "header":
        return (
          <h1 key={i} style={controlStyle}>
            Header
          </h1>
        );
      case "checkbox-group":
        return (
          <h1 key={i} style={controlStyle}>
            CheckBox
          </h1>
        );
      case "radio-group":
        return (
          <h1 key={i} style={controlStyle}>
            RadioBox
          </h1>
        );
      case "number":
        return (
          <h1 key={i} style={controlStyle}>
            NumberBox
          </h1>
        );
      case "file":
        return (
          <h1 key={i} style={controlStyle}>
            FileUpload
          </h1>
        );
      case "section":
        return (
          <h1 key={i} style={controlStyle}>
            Section
          </h1>
        );
      case "inlineGroup":
        return (
          <h1 key={i} style={controlStyle}>
            InlineGroup
          </h1>
        );
      case "dynamicFields":
        return (
          <h1 key={i} style={controlStyle}>
            DynamicFields
          </h1>
        );
      case "page":
        return (
          <h1 key={i} style={controlStyle}>
            Page
          </h1>
        );
      case "table":
        return (
          <h1 key={i} style={controlStyle}>
            Table
          </h1>
        );
      case "currency":
        return (
          <h1 key={i} style={controlStyle}>
            Currency
          </h1>
        );
      case "grid":
        return (
          <h1 key={i} style={controlStyle}>
            Grid
          </h1>
        );
      case "grid2":
        return (
          <h1 key={i} style={controlStyle}>
            Grid2
          </h1>
        );
      default:
        return null;
    }
  };

  const generateForm = () => {
    return formData.map((obj, i) => generateControl(obj, i));
  };

  return (
    <div>
      <div>{generateForm()}</div>
      {filePreviewSource !== "" && (
        <div className="filePreview" onClick={() => setFilePreviewSource("")}>
          <div
            className="filePreviewContent"
            dangerouslySetInnerHTML={{ __html: filePreviewSource }}
          />
          <span className="filePreviewClose">
            <i className="glyphicon glyphicon-remove p-t-5" />
            <span className="bold">Close File</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default FormRender;
