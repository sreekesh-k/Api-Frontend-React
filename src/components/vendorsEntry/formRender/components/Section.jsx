import { createRef, Component, Fragment } from "react";

export default class Section extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return true;
  }
  generateSection() {
    return this.props.formRender.generateLayout(
      this.props,
      this.props.formRender
    );
  }
  getHeader(show) {
    if (show) {
      return <div className="LayoutSectionHeader">{this.props.label}</div>;
    } else return null;
  }
  render() {
    let showHeader = true;
    let layoutSectionClass = "LayoutSection ";

    if (this.props.wrappedTop === true) {
      showHeader = false;
      layoutSectionClass += "LayoutSectionWrappedTop";
    }

    if (this.props.wrappedBottom === true) {
      layoutSectionClass += "LayoutSectionWrappedBottom";
    }

    return (
      <div
        className={layoutSectionClass}
        key={this.props.name}
        id={this.props.name + "Div"}
        style={this.props.controlStyle}
      >
        <div className="LayoutSectionBody">{this.generateSection()}</div>
      </div>
    );
  }
}
