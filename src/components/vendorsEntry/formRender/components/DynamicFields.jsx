import { createRef, Component, Fragment } from "react";

export default class DynamicFields extends Component {
  constructor(props) {
    super(props);

    this.displayData = [];
    this.prevELements = [];
    this.countFields = 0;
    this.currentFieldsAdded = 0;
    this.initialState = [];
    this.countSectionField = 0;
    this.deletedFieldIndexes = [];
    this.finalElementCount = 0;
    this.state = {
      prevFields: props,
      showdata: this.displayData,
      countFields: this.countFields,
      currentFieldsAdded: this.currentFieldsAdded,
    };
    this.userLang = navigator.language || navigator.userLanguage;
  }
  shouldComponentUpdate() {
    return true;
  }

  generateInlineGroup() {
    let layout = this.props.formRender.generateLayout(
      this.props,
      this.props.formRender
    );
    const count = !layout ? 0 : layout.length;
    const style = {};

    if (count > 0)
      style["width"] = Math.round(100 / this.props.finalElements) + "%";

    let currentLayout = layout.map((element, i) => {
      return (
        <div style={style} key={this.props.name + "DivColumn" + i}>
          {element}
        </div>
      );
    });
    return currentLayout;
  }
  createDynamicSectionObj(obj, appArr, newSectionArr, name = {}) {
    for (var prop in obj) {
      if (typeof obj[prop] == "object") {
        if (prop != "cells") {
          this.createDynamicSectionObj(obj[prop], appArr, newSectionArr, {
            name: "innerText",
          });
        }
      } else {
        if (appArr.length > 0) {
          if (name.hasOwnProperty("name") && !obj.hasOwnProperty("type")) {
            if (newSectionArr[this.countSectionField] != undefined) {
              obj.name = newSectionArr[this.countSectionField].name;
              this.countSectionField++;
            }
          } else {
            let newfieldname =
              obj.name.split("-")[0] +
              "-" +
              new Date().getTime() +
              Math.floor(Math.random() * 899 + 100);
            obj.name = newfieldname;
            appArr = [...appArr, ...obj];
          }
        } else {
          appArr.push(obj);
        }
      }
    }
  }

  generateNewInlineGroup() {
    var testArray = [];
    this.state.prevFields.map((item) => {
      var result = this.props.formRender.state.formData.filter((obj) => {
        return obj.name === item.name;
      });
      var tempObj = { ...result[0] };
      testArray.push(tempObj);
    });
    let newSectionArr = [];
    testArray.map((event, i) => {
      if (i < this.initialState.length) {
        if (event.name != undefined) {
          var newfieldname =
            event.name.split("-")[0] +
            "-" +
            new Date().getTime() +
            Math.floor(Math.random() * 899 + 100);
          newSectionArr.push({ name: newfieldname });
          event.name = newfieldname;
          let newEvent;
          if (event.name.split("-")[0] == "grid2") {
            newEvent = JSON.parse(JSON.stringify(event));
            newEvent.value.data.map((item) => {
              item.map((itemValue) => {
                itemValue.value.value = "";
              });
            });
            event.value = newEvent.value;
          } else {
            event.value = "";
          }
          this.props.formRender.state.formData.push(event);
        }
      }
    });
    if (
      this.props.elements[0].hasOwnProperty("type") &&
      (this.props.elements[0].type == "section" ||
        this.props.elements[0].type == "inline" ||
        this.props.elements[0].type == "inlineGroup")
    ) {
      this.countSectionField = 0;
      let cloneObj = JSON.parse(JSON.stringify(this.props.elements[0]));
      this.createDynamicSectionObj(cloneObj, [], newSectionArr);
      this.props.elements.push(cloneObj);
    } else {
      newSectionArr.map((item, index) => {
        if (this.finalElementCount > index) this.props.elements.push(item);
      });
    }
  }

  renderDescription() {
    const { description } = this.props;

    return (
      description && (
        <span className="ControlDescription" data-tooltip={description}>
          ?
        </span>
      )
    );
  }

  addFields() {
    this.finalElementCount = this.props.finalElements;
    let dynamicFieldsCreated =
      (this.props.elements.length - this.props.finalElements) /
      this.props.finalElements;
    if (dynamicFieldsCreated < this.props.maxDynamicFields) {
      this.currentFieldsAdded = this.currentFieldsAdded + 1;
      this.displayData.push(
        <div className="LayoutInlineGroupBody" test={this.currentFieldsAdded}>
          {this.generateNewInlineGroup()}
        </div>
      );
      this.setState({
        showdata: this.displayData,
        currentFieldsAdded: this.currentFieldsAdded,
      });
    } else {
      alert(
        this.userLang != "fr"
          ? "Maximum Limit Reached"
          : "Limite maximale atteinte"
      );
    }
  }

  componentDidUpdate() {}
  checkChildReturnElements(finalArray, element) {
    element.map((item) => {
      if (item.elements) {
        return this.checkChildReturnElements(finalArray, item.elements);
      } else {
        return finalArray.push(item);
      }
    });
    return finalArray;
  }

  componentDidMount() {
    /*this.initialState = this.props.elements;*/
    this.initialState = this.checkChildReturnElements([], this.props.elements);
    this.countFields = this.props.elements.length;
    let screenHeight = screen.height;
    this.props.controlStyle = {
      paddingBottom: screenHeight > 800 ? "4vh" : "8vh",
    };
    this.setState({
      prevFields: this.initialState,
      countFields: this.countFields,
    });
  }
  getIndexesForDelete(extractedElements) {
    for (let prop in extractedElements) {
      if (typeof extractedElements[prop] == "object") {
        if (prop != "cells") {
          this.getIndexesForDelete(extractedElements[prop]);
        }
      } else {
        if (!extractedElements.hasOwnProperty("type")) {
          this.props.formRender.state.formData.map((selElement, index) => {
            if (selElement.name == extractedElements.name) {
              this.deletedFieldIndexes.push(index);
            }
          });
        }
      }
    }
  }
  deleteFields(event, nowindex, name) {
    var arrayIndices = JSON.parse("[" + event + "]");
    if (arrayIndices.length > 1) {
      this.props.elements = this.props.elements.filter((obj, index) => {
        if (obj.type == "inlineGroup" || obj.type == "section") {
          return obj;
        }
        let testArr = this.props.formRender.state.formData.some(
          (el) => el.name === obj.name
        );
        if (testArr) return obj;
      });
      //To remove the elements from the layout once deleted.
      let layoutIndex2 = this.props.formRender.props.data.findIndex(
        (obj) => obj.type == "layout"
      );
      let layout =
        this.props.formRender.props.data[layoutIndex2].elements[0].elements ||
        this.props.formRender.props.data[layoutIndex2].elements;
      if (layout) {
        layout = layout.filter((obj, index) => {
          return !arrayIndices.includes(index + 1);
        });
      }
    } else {
      let index = this.props.elements.findIndex(
        (i) => i.name == name.replace("_control", "")
      );
      let extractedElements = this.props.elements.splice(index, 1);
      this.deletedFieldIndexes = [];
      this.getIndexesForDelete(extractedElements);
      arrayIndices = JSON.parse(
        "[" + this.deletedFieldIndexes.toString() + "]"
      );
    }
    this.currentFieldsAdded = this.currentFieldsAdded - 1;
    this.props.formRender.state.formData =
      this.props.formRender.state.formData.filter((obj, index) => {
        return !arrayIndices.includes(index);
      });
    this.props.formRender.props.data = this.props.formRender.props.data.filter(
      (obj, index) => {
        return !arrayIndices.includes(index);
      }
    );
    let finalElements = this.checkChildReturnElements([], this.props.elements);
    this.setState({
      showdata: this.displayData,
      prevFields: finalElements,
      currentFieldsAdded: this.currentFieldsAdded,
    });
  }

  generateDynamicFields() {
    let currentlayout = this.generateInlineGroup();
    let mainLayout = [];
    let tempfields = [];
    let tempIndex = [];
    let deleteButton = [];

    currentlayout.map((element, index) => {
      if (element.props.children !== null) {
        let currentIndex = index + 1;
        if (currentIndex % this.props.finalElements == 0) {
          tempIndex.push(element.props.children.props.index);
          tempfields.push(element);

          if (currentIndex > this.props.finalElements) {
            tempfields.push(
              <button
                className="btn btn-danger btn-sm deleteDynamic"
                style={{
                  maxHeight: "3vh",
                  marginTop: !this.props.requireLabel ? "" : "3vh",
                  display: this.props.readOnly ? "none" : "",
                }}
                value={tempIndex}
                name={element.props.children.props.name + "_control"}
                onClick={(e) => {
                  this.deleteFields(
                    e.target.value,
                    this.currentFieldsAdded,
                    e.target.name
                  );
                }}
              >
                X
              </button>
            );
          } else {
            tempfields.push(
              <button
                className="btn btn-danger btn-sm deleteDynamic"
                style={{
                  maxHeight: "3vh",
                  visibility: "hidden",
                  display: this.props.readOnly ? "none" : "",
                }}
                value={tempIndex}
                name={element.props.children.props.name + "_control"}
                onClick={(e) => {
                  this.deleteFields(
                    e.target.value,
                    this.currentFieldsAdded,
                    e.target.name
                  );
                }}
              >
                X
              </button>
            );
          }

          if (
            currentIndex > this.props.finalElements &&
            !this.props.requireLabel
          ) {
            mainLayout.push(
              <div
                className="LayoutInlineGroupBody showLabel"
                style={{ alignItems: "center", marginBottom: "2vh" }}
              >
                {" "}
                {tempfields}
              </div>
            );
          } else {
            mainLayout.push(
              <div
                className="LayoutInlineGroupBody"
                style={{ alignItems: "center", marginBottom: "2vh" }}
              >
                {tempfields}
              </div>
            );
          }
          deleteButton = [];
          tempIndex = [];
          tempfields = [];
        } else {
          tempIndex.push(element.props.children.props.index);
          tempfields.push(element);
        }
      }
    });

    if (!this.props.readOnly) {
      mainLayout.map((element) => {
        element.props.mainfields = this.props.finalElements;
      });
    }

    return mainLayout;
  }

  render() {
    let showHeader = true;
    let layoutInlineGroupClass = "LayoutInlineGroup";
    return (
      <div
        className={layoutInlineGroupClass}
        key={this.props.name}
        id={this.props.name + "Div"}
        style={this.props.controlStyle}
      >
        {this.renderDescription()}
        {this.generateDynamicFields()}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            className="btn btn-primary btn-sm"
            style={{
              display:
                this.props.readOnly ||
                this.props.maxDynamicFields <= 0 ||
                !this.props.maxDynamicFields
                  ? "none"
                  : "",
            }}
            onClick={() => {
              this.addFields();
            }}
          >
            {this.userLang != "fr" ? "Add More" : "Ajouter"}
          </button>
        </div>
      </div>
    );
  }
}
