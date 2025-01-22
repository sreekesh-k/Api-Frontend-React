import { createRef, Component, Fragment } from "react";

export default class Currency extends Component {
  constructor(props) {
    super(props);

    //Create refs
    this.inputChange = this.inputChange.bind(this);
    this.blurChange = this.blurChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);

    const url = "Iso4217Currency";
    const cachedHits = sessionStorage.getItem(url);
    this.options = JSON.parse(cachedHits);
    this.currency = createRef();
    this.select = createRef();
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
    const AsyncComponent =
      this.props.url && this.props.url.trim() !== "" ? Select.Async : Select;
    const disabledInput = this.props.readOnly || this.props.presetValue;

    const currencySelect = (
      <div className="col-md-4 current-body" style={{ paddingLeft: "0px" }}>
        <AsyncComponent
          name={"cb-" + this.props.name}
          placeholder={
            this.props.placeholder ? this.props.placeholder : "Select...."
          }
          options={this.options}
          onChange={this.handleDropdownChange}
          value={this.props.currencyValue}
          ref={this.select}
          disabled={this.props.readOnly === true ? true : false}
          arrowRenderer={this.arrowRenderer}
        />
      </div>
    );

    const currencyValue = (
      <div className="col-md-7 numberControl">
        <input
          className="form-control masked"
          value={this.props.value}
          ref={this.currency}
          disabled={disabledInput}
          type="text"
          id={inputId}
          onChange={this.inputChange}
          onBlur={this.blurChange}
        />
        {!disabledInput && (
          <Fragment>
            <span
              className="glyphicon glyphicon-minus"
              onClick={() => {
                this.changeInputValue(-1);
              }}
            />
            <span
              className="glyphicon glyphicon-plus"
              onClick={() => {
                this.changeInputValue(1);
              }}
            />
          </Fragment>
        )}
      </div>
    );

    return (
      <div
        className="form-group row"
        id={this.props.name + "Div"}
        style={this.props.controlStyle}
      >
        <div>
          <label>
            {this.props.label}
            {this.isRequired()}
          </label>
          {this.renderDescription()}
          <span className="forComment"></span>
        </div>
        <div className="currencyBody">
          {this.props.reverse ? currencyValue : currencySelect}
          {this.props.reverse ? currencySelect : currencyValue}
        </div>
      </div>
    );
  }

  arrowRenderer() {
    return <span className="glyphicon glyphicon-chevron-down"></span>;
  }

  handleChange() {
    const result = {
      currencyValue: this.select.current.props.value,
      value: this.currency.current.value,
    };

    this.props.handleCurrencyChange(result, this.props.index);
  }

  changeInputValue(delta) {
    var $elemInput = this.currency.current;
    var $elemSelect = this.select.current;

    let val = parseFloat($elemInput.value);

    if (isNaN(val)) val = 0;

    val += delta;

    val = Math.round(val * 100) / 100;

    var result = {
      currencyValue: $elemSelect.props.value,
      value: val,
    };

    this.props.handleCurrencyChange(result, this.props.index);
  }

  blurChange() {
    this.handleChange();
  }

  inputChange() {
    this.handleChange();
  }

  handleDropdownChange(event) {
    var $elemInput = this.currency.current;
    var $elemSelect = this.select.current;

    this.setState({
      currencyValue: event.value,
      value: $elemInput.value,
    });

    var result = {
      currencyValue: event.value,
      value: $elemInput.value,
    };

    this.props.handleCurrencyChange(result, this.props.index);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.value !== this.props.value ||
      nextProps.currencyValue !== this.props.currencyValue
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    var params = this.getLocaleParams();

    var options = {
      reverse: true,
      onComplete: function (cep) {},
      onKeyPress: function (cep, event, currentField, options) {},
      onChange: function (cep) {},
      onInvalid: function (val, e, f, invalid, options) {
        var error = invalid[0];
      },
    };

    $(".masked").on("input", function () {
      var value = $(this).val();

      // Remove any non-digit and non-decimal point characters
      value = value.replace(/[^\d.]/g, "");

      // Split the value by the decimal point
      var parts = value.split(".");

      // Ensure there is at most one decimal point
      if (parts.length > 2) {
        parts = [parts[0], parts.slice(1).join("")];
      }

      //// Limit the number of decimal places to 2
      //if (parts.length === 2) {
      //    parts[1] = parts[1].substring(0, 2);
      //}

      // Reconstruct the formatted value
      value = parts.join(".");

      // Update the input field
      $(this).val(value);
    });
  }

  getLocaleParams() {
    var number = 111111111.111111111;
    var numberString = number.toLocaleString();
    var decimalSeparator;
    var decimalDigits;
    for (var i = numberString.length - 1; i >= 0; i--) {
      var char = numberString.charAt(i);
      if (char !== "1") {
        decimalSeparator = char;
        decimalDigits = numberString.length - i - 1;
        break;
      }
    }

    var groupSeparator;
    for (var i = 0; i < numberString.length; i++) {
      var char = numberString.charAt(i);
      if (char !== "1") {
        groupSeparator = char;
        break;
      }
    }

    return { decimalSeparator, groupSeparator };
  }
}
