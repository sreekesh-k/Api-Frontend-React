import { createRef, Component, Fragment } from "react";

export default class CheckBox extends Component {
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

  renderMarkForToggle() {
    return (
      this.props.toggle && (
        <span className="checkbox-material">
          <span className="check" />
        </span>
      )
    );
  }

  _prepareCheckBoxes() {
    if (this.props.readOnly == true) {
      return this.state.values.map((obj, ind) => {
        return (
          <label className="p-r-15" key={ind}>
            <input
              disabled
              type="checkbox"
              id={this.props.name}
              name={this.props.name}
              value={obj.value}
              checked={this.props.values && obj.selected}
              onChange={(evt) =>
                this.props.handleCheckChange(evt.target, this.props.index)
              }
            />
            {this.renderMarkForToggle()}
            {obj.label}
          </label>
        );
      });
    } else {
      return this.state.values.map((obj, ind) => {
        return (
          <label className="p-r-15" key={ind}>
            <input
              type="checkbox"
              name={this.props.name}
              id={this.props.name}
              value={obj.value}
              checked={this.props.values && obj.selected}
              onChange={(evt) =>
                this.props.handleCheckChange(evt.target, this.props.index)
              }
            />
            {this.renderMarkForToggle()}
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
    const inputClassName = this.props.toggle ? "togglebutton2" : "checkbox";

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
        <div className={inputClassName}>{this._prepareCheckBoxes()}</div>
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
