import { createRef, Component, Fragment } from "react";

export default class RadioBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.values = this.props.values;
    this.loadOptions();
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
  loadOptions() {
    if (this.props.url && this.props.url.trim() !== "") {
      fetch(this.props.url)
        .then((response) => response.json())
        .then((json) => {
          this.setState({ values: json });
        });
    }
  }
  _prepareRadioBoxes() {
    if (this.props.readOnly == true) {
      return this.state.values.map((obj, ind) => {
        return (
          <label className="p-r-15" key={ind}>
            <input
              disabled
              type="radio"
              name={this.props.name}
              value={obj.value}
              checked={this.props.value && this.props.value == obj.value}
            />{" "}
            {obj.label}
          </label>
        );
      });
    } else {
      return this.state.values.map((obj, ind) => {
        return (
          <label className="p-r-15" key={ind}>
            <input
              type="radio"
              name={this.props.name}
              value={obj.value}
              checked={this.props.value && this.props.value == obj.value}
              onChange={(evt) =>
                this.props.handleRadioChange(evt.target.value, this.props.index)
              }
            />{" "}
            {obj.label}
          </label>
        );
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
    const isInline = this.props.inline;
    const inlineClass = isInline ? " inline" : "";

    return (
      <div
        className={
          "form-group " + (this.props.hidden ? "hidden" : "shown") + inlineClass
        }
        id={this.props.name + "Div"}
        style={this.props.controlStyle}
      >
        <label style={{ whiteSpace: "normal" }}>
          {this.props.label}
          {this.isRequired()}
        </label>
        {this.renderDescription()}
        <span className="forComment"></span>
        <div className="radio">{this._prepareRadioBoxes()}</div>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.value != this.props.value ||
      nextState.values != this.state.values
    ) {
      return true;
    }
    return false;
  }
}
