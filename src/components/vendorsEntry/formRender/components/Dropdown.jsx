import { createRef, Component, Fragment } from "react";
import AsyncComponent from "react-select";
import { API_URL } from "../../../../constants";

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    props.eventEmitter.on("propsChanged", (props) => {
      this.props = props;
      this.setState({ props: props });
      this.forceUpdate();
    });
  }
  isRequired() {
    if (this.props.required && this.props.required == true)
      return <span className="text-danger required-asterik-mark">•</span>;
    return null;
  }
  loadOptions(urlParam) {
    url = `${API_URL}/api/${urlParam}`;
    if (url.trim() !== "") {
      try {
        return fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        })
          .then(
            function (response) {
              return response.json();
            },
            function (error) {
              console.log(error);
            }
          )
          .then((json) => {
            return { options: json };
          });
      } catch (error) {
        console.log("error" + error);
      }
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

  render() {
    const hidden = this.props.hidden ? { display: "none" } : {};
    // const AsyncComponent =
    //   this.props.url && this.props.url.trim() !== "" ? Select.Async : Select;
    return (
      <div
        className={"form-group " + (this.props.hidden ? "hidden" : "shown")}
        id={this.props.name + "Div"}
        style={this.props.controlStyle}
      >
        <label>
          {this.props.label}
          {this.isRequired()}
        </label>
        {this.renderDescription()}
        <span className="forComment"></span>
        <AsyncComponent
          name={this.props.name}
          placeholder={
            this.props.placeholder ? this.props.placeholder : "Select...."
          }
          multi={
            this.props.multiple && this.props.multiple == true ? true : false
          }
          options={this.props.values}
          onChange={(selectedOption) =>
            this.props.handleDropdownChange(selectedOption, this.props.index)
          }
          value={this.props.value}
          loadOptions={() => this.loadOptions(this.props.url)}
          disabled={this.props.readOnly === true ? true : false}
          arrowRenderer={this.arrowRenderer}
        />
      </div>
    );
  }

  arrowRenderer() {
    return <span className="glyphicon glyphicon-chevron-down"></span>;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value != this.props.value) {
      return true;
    }
    return false;
  }
}
