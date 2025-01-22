import { createRef, Component, Fragment } from "react";

export default class InlineGroup extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return true;
  }
  generateInlineGroup() {
    let layout = this.props.formRender.generateLayout(
      this.props,
      this.props.formRender
    );
    const count = !layout ? 0 : layout.length;
    const style = {};

    if (count > 0) style["width"] = Math.round(100 / count) + "%";

    return layout.map((element, i) => {
      return (
        <div style={style} key={this.props.name + "DivColumn" + i}>
          {element}
        </div>
      );
    });
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
    let showHeader = true;
    let layoutInlineGroupClass = "LayoutInlineGroup";

    return (
      <div
        className={layoutInlineGroupClass}
        key={this.props.name}
        id={this.props.name + "Div"}
        style={this.props.controlStyle}
      >
        {this.renderDescription()}
        <div className="LayoutInlineGroupBody">
          {this.generateInlineGroup()}
        </div>
      </div>
    );
  }
}
