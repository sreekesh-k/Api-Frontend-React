import { createRef, Component, Fragment } from "react";

export default class DependentDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
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
  loadOptions(url) {
    if (url.trim() !== "") {
      if (this.props.parentObjData.value)
        return fetch(
          url + "?" + "parentId" + "=" + this.props.parentObjData.value.value
        )
          .then((response) => response.json())
          .then((json) => {
            this.setState({
              options: json,
            });
          });
      else
        return new Promise((resolve, reject) => resolve()).then(() => {
          options: [];
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

  render() {
    const AsyncComponent = Select;
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
          options={this.state.options}
          onChange={(selectedOption) =>
            this.props.handleDropdownChange(selectedOption, this.props.index)
          }
          value={this.props.value}
          disabled={this.props.readOnly === true ? true : false}
          arrowRenderer={this.arrowRenderer}
        />
      </div>
    );
  }

  arrowRenderer() {
    return <span className="glyphicon glyphicon-chevron-down"></span>;
  }

  componentDidMount() {
    this.loadOptions(this.props.url);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //Fresh Selection Initial nothing selected in parent now some option selected
    if (
      this.props.parentObjData.value === undefined &&
      nextProps.parentObjData.value === undefined
    ) {
      // this.props.handleDropdownChange("", this.props.index);

      //  this.refreshDependentDropdown(nextProps);
      return false;
    } else if (nextProps.parentObjData.value === null) {
      return false;
    } else if (
      this.props.parentObjData.value === undefined &&
      nextProps.parentObjData.value.value
    ) {
      fetch(
        this.props.url +
          "?" +
          "parentId" +
          "=" +
          nextProps.parentObjData.value.value
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            options: json,
          });
        });

      this.props.handleDropdownChange("", this.props.index);

      return true;
    }
    // New selected option should be different from current selected parent value
    else if (
      this.props.parentObjData.value === null ||
      this.props.parentObjData.value.value !==
        nextProps.parentObjData.value.value
    ) {
      fetch(
        this.props.url +
          "?" +
          "parentId" +
          "=" +
          nextProps.parentObjData.value.value
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            options: json,
          });
        });
      this.props.handleDropdownChange("", this.props.index);
      return true;
      // this.refreshDependentDropdown(nextProps);
    } else if (this.props.value !== nextProps.value) {
      return true;
    } else if (this.state.options !== nextState.options) {
      return true;
    } else {
      //Do nothing if same option selected again
      return false;
    }
  }
  componentDidUpdate() {}
}
