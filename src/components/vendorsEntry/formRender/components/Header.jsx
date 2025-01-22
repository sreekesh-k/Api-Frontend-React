import { createRef, Component, Fragment } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    props.eventEmitter.on("propsChanged", (props) => {
      this.props = props;
      this.setState({ props: props });
      this.forceUpdate();
    });
  }
  shouldComponentUpdate() {
    return false;
  }
  getHeader() {
    const display = this.props.hidden ? "hidden" : "shown";
    const center = {
      textAlign: "center",
    };
    switch (this.props.subtype) {
      case "h1":
        return (
          <h1 className={display} style={center}>
            {this.props.label}
          </h1>
        );
        break;
      case "h2":
        return (
          <h2 className={display} style={center}>
            {this.props.label}
          </h2>
        );
        break;
      case "h3":
        return (
          <h3 className={display} style={center}>
            {this.props.label}
          </h3>
        );
        break;
      default:
        return (
          <h4 className={display} style={center}>
            {this.props.label}
          </h4>
        );
        break;
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
    return (
      <div
        key={this.props.name}
        id={this.props.name + "Div"}
        className={"form-group paragraph_control"}
        style={this.props.controlStyle}
      >
        {this.getHeader()}
        {this.renderDescription()}
      </div>
    );
  }
}
