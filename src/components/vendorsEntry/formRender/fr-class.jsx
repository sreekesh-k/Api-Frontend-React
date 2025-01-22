/*const Trans = window["ReactI18next"].Trans;*/
import { Component } from "react";
import EventEmitter3 from "eventemitter3";
import $ from "jquery";
// import Grid2 from "./components/Grid2";
// import InlineGroup from "./components/InlineGroup";
// import DynamicFields from "./components/DynamicFields";
// import Page from "./components/Page";
// import Table from "./components/Table";
// import Grid from "./components/Grid";
// import Currency from "./components/Currency";
// import FileUpload from "./components/FileUpload";
// import NumberBox from "./components/NumberBox";
// import RadioBox from "./components/RadioBox";
// import CheckBox from "./components/CheckBox";
// import Header from "./components/Header";
// import Paragraph from "./components/Paragraph";
// import TextArea from "./components/TextArea";
// import DatePicker from "./components/DatePicker";
// import TextBox from "./components/TextBox";
// import Dropdown from "./components/Dropdown";
// import DependentDropdown from "./components/DependentDropdown";
// import Section from "./components/Section";

export default class FormRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: this.props.data,
      readOnly: this.props.readOnly || false,
      isComponentUpdate: this.props.isComponentUpdate || false,
      filePreviewSource: "",
    };
    window.DcFormRenderTriggers = window.DcFormRenderTriggers || [];
    this.allowedFileTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      //Rtf
      "application/msword",
      "application/rtf",
      "text/rtf",
      ".rtf",
      //Txt
      "text/plain",
      //xlsx
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "xlsx",
      //xls
      "application/vnd.ms-excel",
      "xls",
      //Docx
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      //Msg
      "msg",
      ".msg",
      //Bin
      "application/octet-stream",
      "doc",
      "docx",
    ];

    // This is used to be able to update date dependencies across all the instances.
    // The problem is that in "Action center" and "Template hub" the pages are generated separately,
    // so we have multiple independent instances and date relations from page to page being lost.
    // To handle this, we need this "hack"
    if (!window.rendererInstances) {
      window.rendererInstances = [];
    }

    window.rendererInstances.push(this);
  }

  getData = () => {
    let formData = [];
    this.state.formData.forEach((data) => {
      let dataCopy = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (key !== "eventEmitter" && key !== "isConverted") {
            dataCopy[key] = element;
          }
        }
      }
      if (dataCopy.type === "date") dataCopy = this.getDateTimeValue(dataCopy);
      formData.push(dataCopy);
    });

    //this code is to remove special characters
    for (let i = 0; i < formData.length; i++) {
      if (formData[i].value) {
        if (formData[i].type == "grid2") {
          for (let j = 0; j < formData[i].value.data.length; j++) {
            for (let k = 0; k < formData[i].value.data[j].length; k++) {
              // Check type before any manipulation [6301]
              if (
                typeof formData[i].value.data[j][k].value.value === "string"
              ) {
                if (formData[i].value.data[j][k].value.type === "number") {
                  formData[i].value.data[j][k].value.value = formData[
                    i
                  ].value.data[j][k].value.value.replace(/[\/\~:?]/g, "");
                } else {
                  formData[i].value.data[j][k].value.value = formData[
                    i
                  ].value.data[j][k].value.value.replace(/[\/\~.:?]/g, "");
                }
              }
            }
          }
        } else if (typeof formData[i].value == "string") {
          if (formData[i].type === "number") {
            formData[i].value = formData[i].value.replace(/[\/\~:?]/g, "");
          } else {
            formData[i].value = formData[i].value.replace(/[~?><]/g, "");
          }
        }
      }
    }

    return formData;
  };

  getDateTimeValue(dataCopy) {
    var val = $("#" + dataCopy.name + "id").val();
    if (val && val != "") {
      dataCopy.value = moment(val, dataCopy.format).format("YYYY-MM-DD");
    } else {
      dataCopy.value = val;
    }

    return dataCopy;
  }

  checkValue(element) {
    if (element.value == "Invalid date") {
      return false;
    }
    if (element.value && element.value !== "") {
      if (typeof element.value == "object") {
        if (element.value.length !== undefined) {
          return element.value.length > 0;
        }
        return true;
      }
      return true;
    }
    return false;
  }

  runValidation() {
    let flag = true;
    let formData = [];

    this.state.formData.forEach((data) => {
      let dataCopy = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (key !== "eventEmitter" && key !== "isConverted") {
            dataCopy[key] = element;
          }
        }
      }
      if (dataCopy.type === "date") dataCopy = this.getDateTimeValue(dataCopy);
      formData.push(dataCopy);
    });

    let priorityObject = formData.find((o) => o.label === "Priority");
    const userLang = navigator.language || navigator.userLanguage;
    formData.every((element, index) => {
      //Amrut - Check for Priority Label value if exists then check if the current element is BCPP and priority value is high or else return true
      try {
        if (priorityObject.value) {
          if (
            priorityObject.value.value === "High" &&
            element.label === "Business Continuity Plan & Process (BCPP)"
          ) {
            if (element.required === true) {
              if (this.checkValue(element)) {
                return true;
              } else {
                // toastr.error(
                //   "".concat(
                //     element.label,
                //     userLang != "fr" ? " is required" : " est obligatoire"
                //   )
                // );
                flag = false;
                return false;
              }
            } else return true;
          } else {
            return true;
          }
        }
      } catch (e) {}

      // Do your thing, then:
      if (element.required === true) {
        if (this.checkValue(element)) {
          return true;
        } else {
          // toastr.error(
          //   "".concat(
          //     element.label,
          //     userLang != "fr" ? " is required" : " est obligatoire"
          //   )
          // );
          flag = false;
          return false;
        }
      } else return true;
    });
    return flag;
  }
  setFilePreview = (previewHtml) => {
    this.setState({
      filePreviewSource: previewHtml,
    });
  };

  removeFile = (fileObj, fieldName) => {
    let formData = this.state.formData;
    var url =
      window.location.origin +
      "/ActionCentre/DeleteEvidenceFile/?fileId=" +
      fileObj.fileId +
      "&deleteFile=" +
      fileObj.deleteUrl;
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        response
          .json()
          .then((responseData) => {
            for (let i = 0; i < formData.length; i++) {
              if (formData[i].name === fieldName) {
                var temp = new Array();
                for (let j = 0; j < formData[i].value.length; j++) {
                  if (
                    formData[i].value[j].fileId !== responseData.deletedFileId
                  ) {
                    temp.push(formData[i].value[j]);
                  }
                }
                formData[i].value = temp;
              }
            }

            this.setState({ formData: formData });
          })
          .catch((error) => {
            console.error(error);
          });

        // Your code for handling the data you get from the API
      })
      .catch((error) => {
        console.error(error);
      });
  };

  closePreview = () => {
    this.setState({
      filePreviewSource: "",
    });
  };
  checkDigitsNo = (evt, value, max, index) => {
    let key = evt.which || evt.KeyCode;
    let finalValue = value == undefined ? event.key : value + event.key;
    if (parseInt(finalValue) > parseInt(max) && key > 47 && key < 58) {
      value = finalValue.slice(0, finalValue.length - 1);
      evt.target.value = value;
      let formData = this.state.formData;
      let obj = formData[index];
      if (obj.type === "number") {
        obj.value = value;
      }
      evt.preventDefault();
    }
  };
  handleChange = (val, index) => {
    let formData = this.state.formData;

    let obj = formData[index];
    if (obj.type === "currency") {
      obj.value = val.value;
      obj.currencyValue = val.currencyValue;
    } else {
      obj.value = val;
    }

    if (obj.type == "radio-group") {
      $("input[name=" + obj.name + "]").removeAttr("checked");
    }

    if (Array.isArray(obj.value) && obj.value.length === 0) {
      delete obj.value;
    }

    obj.isConverted = true;

    if (this.props.selectedControl) {
      if (
        this.props.selectedControl.behaviourType == "E" &&
        this.props.selectedControl.workflowCategory.trim() == "CW"
      ) {
        let dataObj = formData.reduce(
          (obj, v, index) => ({ ...obj, [v.label]: { ...v, index } }),
          {}
        );
        let ins = [
          "Overpayment or Underpayment",
          "Workstream",
          "Cause",
          "Facilities / Environmental Activity",
          "Location",
          "Legal/Policy Breach or Exception",
          "Policy",
          "Finance System Name",
          "Payment Value",
        ];

        let valueToBeSet = ins
          .map(
            (e) =>
              dataObj[e] &&
              dataObj[e].value &&
              (e == "Finance System Name"
                ? dataObj[e].value
                : e == "Payment Value"
                ? dataObj[e].currencyValue + " " + dataObj[e].value
                : dataObj[e].value.label)
          )
          .filter((s) => (s || "") != "")
          .join(" - ");

        if (valueToBeSet) {
          $(`input.form-control#taskTitle`).val(valueToBeSet);
        }
      }
    }
    if (obj.type === "date" && this.props.isComponentUpdate != true) {
      const newFormData = formData.map((e) => {
        if (e.type !== "date") {
          return e;
        }

        DatePicker.getChangedDatepickerId(obj.name);

        return DatePicker.getMinMax(e, formData);
      });
      this.setState({ formData: newFormData });
    } else {
      this.setState({ formData: formData });
    }
    setTimeout(() => {
      this.state.formData.forEach((element, index) => {
        if (element.presetValue) {
          let formulaParts = element.mathematicalFormula.split(" ");
          formulaParts.forEach((part, index) => {
            if (
              part.charAt(0) === "{" &&
              part.charAt(part.length - 1) === "}"
            ) {
              let fieldName = part.slice(1, part.length - 1);
              this.state.formData.forEach((e, i) => {
                if (e.name === fieldName && e.value) {
                  formulaParts[index] = e.value;
                }
              });
            }
          });
          try {
            element.value = math.eval(formulaParts.join(" "));
            let formData = this.state.formData;
            this.setState({ formData: formData });
            element.eventEmitter.emit("propsChanged", element);
          } catch (error) {
            element.value = "";
            this.setState({ formData: formData });
            element.eventEmitter.emit("propsChanged", element);
          }
        }
      }, 100);
    });
    setTimeout(() => {
      this.state.formData.forEach((element, index) => {
        if (element.dependency) {
          if (element.dependencyRelation === "isEmpty") {
            this.state.formData.forEach((e, i) => {
              if (e.name === element.dependencyField) {
                if (e.value) {
                  element.hidden = true;
                  let formData = this.state.formData;
                  this.setState({ formData: formData });
                  element.eventEmitter.emit("propsChanged", element);
                } else {
                  element.hidden = false;
                  let formData = this.state.formData;
                  this.setState({ formData: formData });
                  element.eventEmitter.emit("propsChanged", element);
                }
              }
            });
          } else if (element.dependencyRelation === "isNotEmpty") {
            this.state.formData.forEach((e, i) => {
              if (e.name === element.dependencyField) {
                if (e.value) {
                  element.hidden = false;
                  let formData = this.state.formData;
                  this.setState({ formData: formData });
                  element.eventEmitter.emit("propsChanged", element);
                } else {
                  element.hidden = true;
                  let formData = this.state.formData;
                  this.setState({ formData: formData });
                  element.eventEmitter.emit("propsChanged", element);
                }
              }
            });
          }
        }
      });
    }, 50);

    let triggers = window.DcFormRenderTriggers.filter(function (t) {
      return t.refField === obj.name;
    });

    triggers.forEach((trigger) => {
      if (trigger && trigger.field) {
        var compareval;
        if (typeof val == "object") {
          compareval = val.label;
        } else {
          compareval = val;
        }
        if (trigger.refValue == compareval) {
          if (trigger.display === "hide") $("#" + trigger.field + "Div").hide();
          else $("#" + trigger.field + "Div").show();
        } else {
          if (trigger.display === "hide") $("#" + trigger.field + "Div").show();
          else $("#" + trigger.field + "Div").hide();
        }
      }
    });
  };
  componentDidUpdate(pre, curr) {
    if (this.props.isComponentUpdate == true) {
      if (pre.data !== this.props.data) {
        this.setState({ formData: this.props.data });
      }
    }
  }
  componentDidMount() {
    if (window.DcFormRenderTriggers.length) {
      window.DcFormRenderTriggers.forEach((t) => {
        const triggerField = t.refField;
        const triggerValue = t.refValue;
        const currentElement = this.state.formData.find(
          (i) => i.name === triggerField
        );

        if (currentElement) {
          const currentValue =
            currentElement.type === "select"
              ? // By logic, we should take select value to compare with, but by requirements comparing with label
                currentElement.value
                ? currentElement.value.label
                : currentElement.value // for select we have an object like { label: 'label', value: 'value'}
              : currentElement.value;

          if (triggerValue !== currentValue && t.display === "show") {
            $("#" + t.field + "Div").hide();
          }
          if (triggerValue === currentValue && t.display === "hide") {
            $("#" + t.field + "Div").hide();
          }
        }
      });
    }

    // $(".ControlDescription").tooltipSpecial();
  }

  handleCheckboxChange = (evt, index) => {
    let formData = this.state.formData;
    let newValue = formData[index].values || [];
    let indexArr = newValue.findIndex((x) => x.value == evt.value);
    if (evt.checked) {
      newValue = newValue.concat(evt.value);
      if (indexArr > -1) {
        newValue[indexArr].selected = true;
      }
    } else {
      newValue = newValue.filter((v) => v !== evt.value);
      if (indexArr > -1) {
        newValue[indexArr].selected = false;
      }
    }
    formData[index].value = newValue;
    this.setState({ formData: formData });
  };

  handleGrid2Change = (index) => (value) => {
    const formData = this.state.formData;
    formData[index].value = value;
    this.setState({ formData: formData });
  };

  handleFileChange = (uploadedFiles, index) => {
    let flag = true;
    let files = new FormData();
    for (let i = 0; i < uploadedFiles.length; i++) {
      let uploadedFileType = uploadedFiles[i].type;
      if (uploadedFileType === "") {
        uploadedFileType =
          uploadedFiles[i].name.split(".")[
            uploadedFiles[i].name.split(".").length - 1
          ];
      }
      if (!(this.allowedFileTypes.indexOf(uploadedFileType) >= 0)) {
        // toastr.error(
        //   uploadedFiles[i].name +
        //     " is an invalid file type. Only 'PDF / PNG / JPEG / RTF / DOCX / XLSX / TXT / MSG' files are allowed."
        // );
        flag = false;
        return false;
      } else {
        files.append("files", uploadedFiles.item(i));
      }
    }

    if (flag === false) {
      return false;
    } else {
      let formData = this.state.formData;
      fetch(
        window.location.protocol +
          "//" +
          window.location.host +
          "/ActionCentre/UploadFiles",
        {
          // Your POST endpoint
          method: "POST",
          headers: {
            dataType: "json",
            processData: false,
          },
          body: files, // This is your file object
        }
      )
        .then((response) => {
          response
            .json()
            .then((responseData) => {
              if (formData[index].multiple === true) {
                formData[index].value = formData[index].value
                  ? [...formData[index].value, ...responseData]
                  : responseData;
              } else {
                formData[index].value = responseData;
              }
              this.setState({ formData: formData });
            })
            .catch((error) => {
              console.error(error);
            });

          // Your code for handling the data you get from the API
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  getControlStyle = (props = {}) => {
    return {
      width: props.controlWidth,
      maxWidth: props.controlWidth,
      margin: props.controlMargin,
      height: props.controlHeight,
      maxHeight: props.controlHeight,
    };
  };

  generateControl(obj, i, formRender) {
    let readOnly =
      formRender.props.readOnly === undefined
        ? false
        : formRender.props.readOnly;
    // // it is not supposed to be here and should be moved to the constructor
    // // For now, as a workaround, just check if there is no "trigger" for this field
    if (
      obj.conditioanalField &&
      window.DcFormRenderTriggers.findIndex((t) => t.field === obj.name) === -1
    ) {
      window.DcFormRenderTriggers.push({
        field: obj.name,
        display: obj.conditioanalDisplay,
        refField: obj.conditioanalField,
        refValue: obj.conditioanalValue,
      });
    }

    const controlStyle = this.getControlStyle(obj);
    switch (obj.type) {
      case "select":
        if (obj.parentName) {
          let flag = false;
          let parentObjData = {};
          formRender.state.formData.every(function (parentObj) {
            if (parentObj.name) {
              if (obj.parentName.trim() === parentObj.name.trim()) {
                parentObjData = jQuery.extend(true, {}, parentObj);
                flag = true;
                return false;
              } else {
                return true;
              }
            } else {
              return true;
            }
          });
          if (flag === false) return null;
          else {
            return (
              <h1>DependentDropdown</h1>
              // <DependentDropdown
              //   readOnly={readOnly}
              //   handleDropdownChange={formRender.handleChange}
              //   parentObjData={parentObjData}
              //   index={i}
              //   key={i}
              //   {...obj}
              //   controlStyle={controlStyle}
              // />
            );
          }
        } else
          return (
            // <Dropdown
            //   readOnly={readOnly}
            //   handleDropdownChange={formRender.handleChange}
            //   index={i}
            //   key={i}
            //   value={obj.value ? obj.value : ""}
            //   {...obj}
            //   controlStyle={controlStyle}
            // />
            <h1>Dropdown</h1>
          );
      case "text": {
        return (
          // <TextBox
          //   readOnly={readOnly}
          //   index={i}
          //   handleInput={formRender.handleChange}
          //   key={i}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>TextBox</h1>
        );
      }
      case "date": {
        if (!obj.isConverted) {
          //obj.value = moment(obj.value).format(obj.format || "DD-MMMM-YYYY");;
          obj.isConverted = true;
        }
        return (
          // <DatePicker
          //   readOnly={readOnly}
          //   index={i}
          //   handleInput={formRender.handleChange}
          //   key={i}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />

          <h1>DatePicker</h1>
        );
      }
      case "textarea":
        return (
          // <TextArea
          //   readOnly={readOnly}
          //   index={i}
          //   handleInput={formRender.handleChange}
          //   key={i}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />

          <h1>TextArea</h1>
        );
      case "paragraph":
        return (
          // <Paragraph index={i} key={i} {...obj} controlStyle={controlStyle} />
          <h1>Paragraph</h1>
        );
      case "header":
        return (
          // <Header index={i} key={i} {...obj} controlStyle={controlStyle} />
          <h1>Header</h1>
        );
      case "checkbox-group":
        return (
          // <CheckBox
          //   readOnly={readOnly}
          //   handleCheckChange={formRender.handleCheckboxChange}
          //   index={i}
          //   key={i}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>CheckBox</h1>
        );
      case "radio-group":
        return (
          // <RadioBox
          //   readOnly={readOnly}
          //   handleRadioChange={formRender.handleChange}
          //   index={i}
          //   key={i}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>RadioBox</h1>
        );
      case "number":
        return (
          // <NumberBox
          //   readOnly={readOnly}
          //   checkDigitsNo={formRender.checkDigitsNo}
          //   handleInput={formRender.handleChange}
          //   index={i}
          //   key={i}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>NumberBox</h1>
        );
      case "file":
        return (
          // <FileUpload
          //   readOnly={readOnly}
          //   setFilePreview={formRender.setFilePreview}
          //   removeFile={formRender.removeFile}
          //   handleInput={formRender.handleFileChange}
          //   index={i}
          //   key={i}
          //   allowedFileTypes={formRender.allowedFileTypes}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>FileUpload</h1>
        );
      case "section":
        return (
          // <Section
          //   index={i}
          //   key={"section" + i}
          //   formRender={formRender}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>Section</h1>
        );
      case "inlineGroup":
        return (
          // <InlineGroup
          //   index={i}
          //   key={"InlineGroup" + i}
          //   formRender={formRender}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>InLineGruop</h1>
        );
      case "dynamicFields": {
        if (!obj.finalElements) {
          obj.finalElements = obj.elements.length;
        }
        return (
          <h1>DynamicFields</h1>
          // <DynamicFields
          //   readOnly={readOnly}
          //   index={i}
          //   key={"dynamicFields" + i}
          //   formRender={formRender}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
        );
      }
      case "page":
        return (
          // <Page
          //   index={i}
          //   key={"page" + i}
          //   formRender={formRender}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>Page</h1>
        );
      case "table":
        return (
          // <Table
          //   index={i}
          //   key={"table" + i}
          //   formRender={formRender}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
          <h1>Table</h1>
        );
      case "currency": {
        return (
          <h1>Currency</h1>
          // <Currency
          //   readOnly={formRender.props.readOnly}
          //   index={i}
          //   key={i}
          //   value={
          //     obj.value
          //       ? obj.value.value === "undefine"
          //         ? obj.value
          //         : obj.value.value
          //       : ""
          //   }
          //   currencyValue={obj.currencyValue ? obj.currencyValue : ""}
          //   min={formRender.props.min}
          //   max={formRender.props.max}
          //   handleCurrencyChange={formRender.handleChange}
          //   {...obj}
          //   controlStyle={controlStyle}
          // />
        );
      }
      case "grid":
        return (
          // <Grid
          //   readOnly={readOnly}
          //   index={i}
          //   key={"grid" + i}
          //   formRender={formRender}
          //   {...obj}
          //   onChange={(...args) => formRender.handleGridChange(i, ...args)}
          //   controlStyle={controlStyle}
          // />
          <h1>Grid</h1>
        );
      case "grid2":
        return (
          // <Grid2
          //   readOnly={readOnly}
          //   index={i}
          //   key={"grid2" + i}
          //   formRender={formRender}
          //   {...obj}
          //   onChange={formRender.handleGrid2Change(i)}
          //   controlStyle={controlStyle}
          // />
          <h1>Grid2</h1>
        );
      default:
        return null;
    }
  }
  generateLayout(layout, formRender) {
    return layout.elements.map((element, i) => {
      let obj = null;
      let index = 0;
      if (
        element.type === "section" ||
        element.type === "inlineGroup" ||
        element.type === "dynamicFields" ||
        element.type === "page" ||
        element.type === "table" ||
        element.type === "grid2"
      ) {
        obj = element;
        index = 1000000 + i;
      } else {
        for (let j = 0; j < formRender.state.formData.length; j++) {
          if (formRender.state.formData[j].name !== element.name) continue;
          obj = formRender.state.formData[j];
          index = j;
          break;
        }
      }

      if (obj) {
        return formRender.generateControl(obj, index, formRender);
      } else return null;
    });
  }

  generateDynamicLayout(elements, formRender) {
    return elements.map((element, i) => {
      let obj = null;
      let index = 0;
      for (let j = 0; j < formRender.state.formData.length; j++) {
        if (formRender.state.formData[j].name !== element.name) continue;
        obj = formRender.state.formData[j];
        index = j;
        break;
      }

      if (obj) {
        return formRender.generateControl(obj, index, formRender);
      } else return null;
    });
  }

  generateForm() {
    let formRender = this;

    if (!formRender.state || !formRender.state.formData) return;

    let layout = null;
    for (let j = 0; j < formRender.state.formData.length; j++) {
      if (formRender.state.formData[j].type !== "layout") continue;
      layout = formRender.state.formData[j];
      break;
    }

    if (layout && layout.elements) {
      return formRender.generateLayout(layout, formRender);
    } else
      return formRender.state.formData.map((obj, i) => {
        return formRender.generateControl(obj, i, formRender);
      });
  }
  render() {
    if (this.props.data) {
      const propData = JSON.parse(JSON.stringify(this.props.data));
      propData.forEach((d, index) => {
        if (d.dependency && d.dependencyRelation === "isNotEmpty") {
          propData.forEach((e, i) => {
            if (e.name === propData[index].dependencyField) {
              if (e.value) {
                propData[index].hidden = false;
              } else {
                propData[index].hidden = true;
              }
            }
          });
        } else {
          propData.forEach((e, i) => {
            if (e.name === propData[index].dependencyField) {
              if (e.value) {
                propData[index].hidden = true;
              } else {
                propData[index].hidden = false;
              }
            }
          });
        }

        // if (d.type === "date") {
        //   propData[index] = DatePicker.getMinMax(d, propData);
        // }

        propData[index].eventEmitter = new EventEmitter3();
      });
    }
    window.DcFormRenderTriggers = window.DcFormRenderTriggers || [];

    return (
      <div>
        <div>{this.generateForm()}</div>
        {this.state.filePreviewSource !== "" && (
          <div className="filePreview" onClick={this.closePreview}>
            <div
              className="filePreviewContent"
              dangerouslySetInnerHTML={{ __html: this.state.filePreviewSource }}
            />
            <span className="filePreviewClose">
              <i className="glyphicon glyphicon-remove p-t-5" />
              <span className="bold">Close File</span>
            </span>
          </div>
        )}
      </div>
    );
  }
}
