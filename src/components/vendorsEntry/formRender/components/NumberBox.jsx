import { createRef, Component, Fragment } from "react";

export default class NumberBox extends Component {
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
    const inputId = this.props.name + "Input";
    const disabled =
      this.props.readOnly === true || this.props.presetValue === true
        ? "disabled"
        : "";
    return (
      <div
        className={
          "numberControl form-group " + (this.props.hidden ? "hidden" : "shown")
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
        <div>
          <input
            id={inputId}
            disabled={disabled}
            className="form-control"
            type="number"
            min={this.props.min}
            max={this.props.max}
            onKeyPress={(evt) =>
              this.props.checkDigitsNo(
                evt,
                this.props.value,
                this.props.max,
                this.props.index
              )
            }
            onBlur={(evt) =>
              this.lostFocusNumberCheck(evt, this.props.max, this.props.min)
            }
            step={this.props.step}
            value={this.props.value == null ? "" : this.props.value}
            onChange={(evt) =>
              this.props.handleInput(evt.target.value, this.props.index)
            }
            placeholder={this.props.placeholder}
          />
          <span
            className="glyphicon glyphicon-minus"
            onClick={() => {
              if (disabled != "disabled")
                this.changeInputValue(-1, this.props.max, this.props.min);
            }}
          ></span>
          <span
            className="glyphicon glyphicon-plus"
            onClick={() => {
              if (disabled != "disabled")
                this.changeInputValue(1, this.props.max, this.props.min);
            }}
          ></span>
          <div className="printNumber" style={{ display: "none" }}>
            {this.props.value}
          </div>
        </div>
      </div>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value < 0 || isNaN(nextProps.value)) {
      return false;
    }

    if (nextProps.value != this.props.value) {
      return true;
    }
    return false;
  }
  componentWillReceiveProps(newProps) {
    if (newProps.value < 0 || isNaN(newProps.value)) {
      return false;
    }
  }
  changeInputValue(delta, max, min) {
    var nonNumReg = /[^0-9]/g;
    delta.toString().replace(nonNumReg, "");

    let val = parseFloat(this.props.value);

    if (isNaN(val)) val = parseInt(min);

    val += delta;

    val = Math.round(val * 100) / 100;

    if (val < min || isNaN(val) || val >= parseInt(max) + 1) {
      return false;
    }

    this.setState({
      value: val,
    });

    this.props.handleInput(val, this.props.index);
  }
  lostFocusNumberCheck(event, max, min) {
    if (
      event.target.value < parseInt(min) ||
      event.target.value > parseInt(max)
    ) {
      event.target.value = "";
      this.props.value = "";
    }
  }
}
