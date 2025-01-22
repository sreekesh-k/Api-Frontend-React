import { createRef, Component, Fragment } from "react";

export default class Grid extends Component {
  static mapValueToRows = (value) =>
    Object.keys(value).reduce((acc, key) => {
      const [x, y] = key.split(":");
      const isHeader = x === "h" || y === "h";
      const localX = x === "h" ? 0 : x;
      const localY = y === "h" ? 0 : y;

      if (!acc[localY]) {
        acc[localY] = [];
      }

      acc[localY][localX] = {
        ...value[key],
        isHeader,
        key,
      };

      return acc;
    }, []);

  elRef = createRef();

  componentDidMount() {
    const { onChange } = this.props;

    $(".datepicker", this.elRef.current)
      .datetimepicker({
        format: "L",
      })
      .on("dp.change", function (e) {
        onChange(this.getAttribute("cell-key"), this.value);
      });

    $(".checkbox input", this.elRef.current)
      .filter(":notmdproc")
      .filter(function () {
        //added this filter to skip checkboxes that were already initialized
        return $(this).parent().find(".check").length === 0;
      })
      .data("mdproc", true)
      .after(
        "<span class='checkbox-material'><span class='check'></span></span>"
      );
  }

  renderCellContent = (cell) => {
    const { onChange, readOnly } = this.props;
    const onChangeLocal = (e) =>
      onChange(cell.key, cell.type === "bool" ? !cell.value : e.target.value);

    const props = {
      className: "form-control".concat(
        cell.type === "date" ? " datepicker" : ""
      ),
      "cell-key": cell.key,
      value: cell.value,
      type:
        cell.type === "bool"
          ? "checkbox"
          : cell.type === "date"
          ? "text"
          : cell.type,
      ...(cell.type === "bool" && cell.value === true
        ? { checked: "checked" }
        : { checked: "" }),
      ...(cell.type !== "date"
        ? { onChange: onChangeLocal }
        : { value: undefined, defaultValue: cell.value }),
      ...(readOnly && cell.type === "bool" && { disabled: true }),
      ...(readOnly && cell.type !== "bool" && { readOnly: true }),
    };

    return cell.isHeader ? (
      cell.value
    ) : cell.type === "bool" ? (
      <div className="checkbox">
        <label>
          <input {...props} />
        </label>
      </div>
    ) : (
      <input {...props} title={props.value} />
    );
  };

  renderCell = (cell, index) => {
    const className = "Cell".concat(cell.isHeader ? " Header" : "");

    return (
      <td key={index} className={className}>
        {this.renderCellContent(cell)}
      </td>
    );
  };

  renderRow = (row, index) => {
    return (
      <tr key={index} className="Row">
        {row.map(this.renderCell)}
      </tr>
    );
  };

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
    const { bordered } = this.props;
    const className = "Grid".concat(bordered ? " Bordered" : "");

    const rows = Grid.mapValueToRows(this.props.value);

    return (
      <div style={this.props.controlStyle}>
        {this.renderDescription()}
        <table className={className} ref={this.elRef}>
          <tbody>{rows.map(this.renderRow)}</tbody>
        </table>
      </div>
    );
  }
}
