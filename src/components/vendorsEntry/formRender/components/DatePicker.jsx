import { createRef, Component, Fragment } from "react";
import $ from "jquery";
import moment from "moment";

export default class DatePicker extends Component {
  static changedDatepickerId = "";
  static currentDatePicker = "";
  static isDateRef = /^date-.+$/;
  static findComponent = (name, formData) =>
    formData.find((e) => e.name === name) || {};

  static getMinMax = (currentProps, formData) => {
    return {
      ...currentProps,
      min: currentProps.minDate
        ? DatePicker.isDateRef.test(currentProps.minDate)
          ? DatePicker.findComponent(currentProps.minDate, formData).value
          : currentProps.minDate
        : undefined,
      max: currentProps.maxDate
        ? DatePicker.isDateRef.test(currentProps.maxDate)
          ? DatePicker.findComponent(currentProps.maxDate, formData).value
          : currentProps.maxDate
        : undefined,
      value: currentProps.value,
    };
  };

  static getChangedDatepickerId = (id) => {
    if (id) {
      changedDatepickerId = id;
    }
  };

  constructor(props) {
    super(props);
    this.myRef = createRef();

    props.eventEmitter.on("propsChanged", (props) => {
      this.props = props;
      this.setState({ props: props });
      this.forceUpdate();
    });
  }

  isRequired() {
    if (this.props.required && this.props.required === true)
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
    //if (this.props.readOnly === true) {
    //        return (<div className="form-group">
    //            <label>{this.props.label}</label>
    //            <span className="show">{this.props.value}</span>
    //        </div>);
    //}
    //else {

    return (
      <div
        id={this.props.name + "Div"}
        className={"form-group " + (this.props.hidden ? "hidden" : "shown")}
        style={this.props.controlStyle}
      >
        <label>
          {this.props.label}
          {this.isRequired()}
        </label>
        {this.renderDescription()}
        <span className="forComment"></span>
        <input
          id={this.props.name + "id"}
          ref={this.myRef}
          disabled={this.props.readOnly}
          className="datepicker  form-control"
          placeholder={this.props.placeholder}
          type="text"
          onChange={(e) => (e.target.value = "")}
        />
        <div className="printDatePicker" style={{ display: "none" }}>
          {this.props.value ? new Date(this.props.value).toDateString() : ""}
        </div>
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    var newmin;
    var newmax;

    let currentDatePicker = newProps;

    try {
      if (newProps.min) {
        newProps.min.toDateString();
        newmin = newProps.min;
      }
      if (newProps.max) {
        newProps.max.toDateString();
        newmax = newProps.max;
      }
    } catch (err) {
      if (newProps.format == "DD-MM-YYYY") {
        try {
          newmin =
            "" +
            (newProps.min.getMonth() + 1) +
            "-" +
            newProps.min.getDate() +
            "-" +
            newProps.min.getFullYear() +
            "";
        } catch (err) {
          if (newProps.min) {
            var datePiecesMin = newProps.min.split("-");
            newmin =
              "" +
              datePiecesMin[1] +
              "-" +
              datePiecesMin[0] +
              "-" +
              datePiecesMin[2] +
              "";
          }
        }

        try {
          newmax =
            "" +
            (newProps.max.getMonth() + 1) +
            "-" +
            newProps.max.getDate() +
            "-" +
            newProps.max.getFullYear() +
            "";
        } catch (err) {
          if (newProps.max) {
            var datePiecesMax = newProps.max.split("-");
            newmax =
              "" +
              datePiecesMax[1] +
              "-" +
              datePiecesMax[0] +
              "-" +
              datePiecesMax[2] +
              "";
          }
        }
      } else if (newProps.format == "DD-MMMM-YYYY") {
        try {
          if (
            newProps.min &&
            moment(newProps.min, "DD-MMMM-YYYY", true).isValid()
          ) {
            newmin = moment(newProps.min, "DD-MMMM-YYYY").format("YYYY-MM-DD");
          } else {
            newmin = newProps.min;
          }

          console.log("tryblock min", newmin);
        } catch (err) {
          if (newProps.min) {
            newmin = newProps.min;
            console.log("catchblock min", newmin);
          }
        }

        try {
          if (
            newProps.max &&
            moment(newProps.max, "DD-MMMM-YYYY", true).isValid()
          ) {
            newmax = moment(newProps.max, "DD-MMMM-YYYY").format("YYYY-MM-DD");
          } else {
            newmax = newProps.max;
          }
        } catch (err) {
          newmax = newProps.max;
        }
      } else if (newProps.format == "MMMM YYYY") {
        try {
          newmin =
            "" +
            (newProps.min.getMonth() + 1) +
            "-" +
            newProps.min.getDate() +
            "-" +
            newProps.min.getFullYear() +
            "";
        } catch (err) {
          if (newProps.min) {
            var parts = newProps.min.split(" ");
            var months = [
              "january",
              "february",
              "march",
              "april",
              "may",
              "june",
              "july",
              "august",
              "september",
              "october",
              "november",
              "december",
            ];
            const day = "01";
            const month = Number(months.indexOf(parts[0].toLowerCase()));
            const year = Number(parts[1]);
            newmin = "" + (month + 1) + "-" + day + "-" + year + "";
          }
        }

        try {
          newmax =
            "" +
            (newProps.max.getMonth() + 1) +
            "-" +
            newProps.max.getDate() +
            "-" +
            newProps.max.getFullYear() +
            "";
        } catch (err) {
          if (newProps.max) {
            var parts = newProps.max.split(" ");
            var months = [
              "january",
              "february",
              "march",
              "april",
              "may",
              "june",
              "july",
              "august",
              "september",
              "october",
              "november",
              "december",
            ];
            const day = "01";
            const month = Number(months.indexOf(parts[0].toLowerCase()));
            const year = Number(parts[1]);
            newmax = "" + (month + 1) + "-" + day + "-" + year + "";
          }
        }
      } else {
        newmin = newProps.min;
        newmax = newProps.max;
      }
    }

    const { minDateInclude, maxDateInclude } = this.props;

    // newmin = newmin.replace("-", "/");
    //newmax = newmax.replace("-", "/");
    var id = $("#" + this.myRef.current.id);

    const minDate = newmin;
    const maxDate = newmax;

    // if (minDate) {

    // minDate.setDate(minDate.getDate()); //+ (minDateInclude ? 0 : 1)
    // }

    // if (maxDate) {

    // maxDate.setDate(maxDate.getDate()); //+ (maxDateInclude ? 0 : -1)
    // }

    const options = {};

    if (minDate) {
      options.minDate = minDate;
      console.log("Setting options minDate", options.minDate);
    }

    if (maxDate) {
      if (minDate) {
        options.maxDate = maxDate > minDate ? maxDate : minDate;
      } else {
        options.maxDate = maxDate;
      }
    }

    var currentDatePickerformatedValue = currentDatePicker.value;
    if (
      moment(currentDatePickerformatedValue, "DD-MMMM-YYYY", true).isValid()
    ) {
      currentDatePickerformatedValue = moment(
        currentDatePicker.value,
        "DD-MMMM-YYYY"
      ).format("YYYY-MM-DD");
    }
    if (typeof changedDatepickerId !== "undefined") {
      if (
        options.maxDate &&
        currentDatePicker.maxDate != undefined &&
        currentDatePicker.maxDate === changedDatepickerId
      ) {
        id.data("DateTimePicker").maxDate(
          moment(options.maxDate, "YYYY-MM-DD").format("DD-MMMM-YYYY")
        );

        if (currentDatePickerformatedValue > options.maxDate) {
          let datePickerid = this.myRef.current.id;

          $("#" + datePickerid).val("");
        }
      }

      if (
        options.minDate &&
        currentDatePicker.minDate != undefined &&
        currentDatePicker.minDate === changedDatepickerId
      ) {
        id.data("DateTimePicker").minDate(
          moment(options.minDate, "YYYY-MM-DD").format("DD-MMMM-YYYY")
        );
        if (currentDatePickerformatedValue < options.minDate) {
          console.log("inside if min ");
          let datePickerid = this.myRef.current.id;
          console.log("datePickerid", datePickerid);
          $("#" + datePickerid).val("");
        }
      }
    }
  }

  componentDidMount() {
    const { minDateInclude, maxDateInclude } = this.props;
    // this.props.value  = this.props.value.replace("-","/");
    var id = $("#" + this.myRef.current.id);
    //let valueDate = this.props.value ? new Date(this.props.value) :  commented for template hub review date fix
    let valueDate =
      this.props.value && new Date(moment(this.props.value, this.props.format)); //added for template hub next  review date fix

    // We need to switch month and date
    // const minSplit = this.props.min && this.props.min.split('-');
    // const maxSplit = this.props.max && this.props.max.split('-');

    const min = this.props.min;
    const max = this.props.max;
    var minDate;
    var maxDate;
    if (min) {
      minDate = new Date(min);
    }

    if (max) {
      maxDate = new Date(max);
    }

    if (min) {
      minDate.setDate(minDate.getDate() + (minDateInclude ? 0 : 1));
    }

    if (max) {
      maxDate.setDate(maxDate.getDate() + (maxDateInclude ? 0 : -1));
    }

    // Only for incorrect data stored
    if (valueDate) {
      if ((min && valueDate < minDate) || (max && valueDate > maxDate)) {
        valueDate = minDate;
      }
    }

    const options = {
      format: this.props.format || "DD-MMMM-YYYY",
    };

    // Set minimum date picker value for today
    if (this.props.minCurrentDateInclude) {
      options.minDate = new Date();
    }

    // Set maximum date picker value for today
    if (this.props.maxCurrentDateInclude) {
      options.maxDate = new Date();
    }

    // Set value only if it is specified.
    // It is fix for date dependencies
    // If the date is set to current automatically, then we have incorrect result of DatePicker.getMinMax
    if (valueDate) {
      // options.defaultDate = valueDate;
      options.date = valueDate;
    }

    if (minDate) {
      options.minDate = minDate;
    }

    if (maxDate) {
      if (minDate) {
        options.maxDate = maxDate > minDate ? maxDate : minDate;
      } else {
        options.maxDate = maxDate;
      }
    }

    
    //   this.props.handleInput(this.myRef.current.value, this.props.index);
    // });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value != this.props.value) {
      return true;
    }
    return false;
  }
}
