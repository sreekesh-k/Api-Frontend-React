import { createRef, Component, Fragment } from "react";

export default class TextBox extends Component {
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
    let value = this.props.value === null ? undefined : this.props.value;
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
        <label>
          {this.props.label}
          {this.isRequired()}
        </label>
        {this.renderDescription()}
        <span className="forComment"></span>
        <input
          disabled={this.props.readOnly === true ? "disabled" : ""}
          className="form-control"
          type={this.props.subtype}
          maxLength={this.props.maxlength}
          value={value}
          title={value}
          onChange={(evt) =>
            this.props.handleInput(evt.target.value, this.props.index)
          }
          placeholder={this.props.placeholder}
        />
        <div className="printTextBox" style={{ display: "none" }}>
          {this.props.value}
        </div>
      </div>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      return true;
    }
    return false;
  }
}
