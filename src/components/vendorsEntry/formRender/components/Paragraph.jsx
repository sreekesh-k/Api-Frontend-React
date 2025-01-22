import { createRef, Component, Fragment } from "react";

export default class Paragraph extends Component {
  constructor(props) {
    super(props);
    props.eventEmitter.on("propsChanged", (props) => {
      this.props = props;
      this.setState({ props: props });
      this.forceUpdate();
    });
  }
  render() {
    return (
      <div
        className={
          "form-group paragraph_control " +
          (this.props.hidden ? "hidden" : "shown")
        }
        id={this.props.name + "Div"}
        style={this.props.controlStyle}
      >
        <p dangerouslySetInnerHTML={{ __html: this.props.label }}></p>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
}
