import { createRef, Component, Fragment } from "react";

export default class TextArea extends Component {
  constructor(props) {
    super(props);
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

  renderTextArea() {
    return (
      <textarea
        disabled={this.props.readOnly === true ? "disabled" : ""}
        className="form-control"
        rows={this.props.rows}
        maxLength={this.props.maxlength}
        value={this.props.value}
        onChange={(evt) =>
          this.props.handleInput(evt.target.value, this.props.index)
        }
        placeholder={this.props.placeholder}
      />
    );
  }

  renderTyniMce() {
    return (
      <formRendererDeps.TinyMce.Editor
        readonly={this.props.readOnly}
        init={{
          height: 250,
          paste_data_images: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste code",
          ],
          toolbar:
            "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table",
        }}
        initialValue={this.props.value}
        onChange={(e) =>
          this.props.handleInput(e.target.getContent(), this.props.index)
        }
      />
    );
  }

  rendeQuill() {
    return (
      <formRendererDeps.ReactQuill
        value={this.props.value}
        onChange={(v) => this.props.handleInput(v, this.props.index)}
        readOnly={this.props.readOnly}
      />
    );
  }

  render() {
    let content;

    if (this.props.subtype === "quill") {
      content = this.rendeQuill();
    } else if (this.props.subtype === "tinymce") {
      content = this.renderTyniMce();
    } else {
      content = this.renderTextArea();
    }

    const hidden = this.props.hidden ? { display: "none" } : {};
    //if (this.props.readOnly === true) {
    //        return (<div className="form-group">
    //            <label>{this.props.label}</label>
    //            <span className="show">{this.props.value}</span>
    //        </div>);
    //}
    //else {
    return (
      <div
        className={"form-group " + (this.props.hidden ? "hidden" : "shown")}
        id={this.props.name + "Div"}
        style={this.props.controlStyle}
      >
        <label>
          {this.props.label}
          {this.isRequired()}
        </label>
        {this.renderDescription()}
        <span className="forComment"></span>
        {content}
        <div className="printTextArea" style={{ display: "none" }}>
          {this.props.value}
        </div>
      </div>
    );
    //}
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      return true;
    }
    return false;
  }
}
