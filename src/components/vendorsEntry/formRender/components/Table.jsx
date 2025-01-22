import { createRef, Component, Fragment } from "react";

export default class Table extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate() {
    return true;
  }
  generateTableBody() {
    let rowsCount = parseInt(this.props.rowsCount);
    let columnsCount = parseInt(this.props.columnsCount);

    let table = [];
    let skippedCells = [];
    for (let i = 0; i < rowsCount; i++) {
      let children = [];
      for (let j = 0; j < columnsCount; j++) {
        let skipped = false;
        for (var n = 0; n < skippedCells.length; n++) {
          let skipedCell = skippedCells[n];
          if (skipedCell.row === i && skipedCell.col === j) {
            skipped = true;
            break;
          }
        }

        if (skipped) continue;

        let obj = null;

        for (let k = 0; k < this.props.cells.length; k++) {
          let cell = this.props.cells[k];
          if (cell.row * 1 === i && cell.column * 1 === j) {
            obj = cell;
            break;
          }
        }

        if (obj) {
          let colspan = 1;
          let rowspan = 1;

          if (obj.colspan !== undefined) colspan = obj.colspan;

          if (obj.rowspan !== undefined) rowspan = obj.rowspan;

          if (colspan > 1 || rowspan > 1) {
            for (var l = i; l < i + rowspan; l++) {
              for (var m = j; m < j + colspan; m++) {
                if (l === i && m === j) continue;
                skippedCells.push({ row: l, col: m });
              }
            }
          }

          children.push(
            <td
              key={"LayoutTableCell_" + i + "_" + j}
              colSpan={colspan}
              rowSpan={rowspan}
            >
              {this.props.formRender.generateLayout(obj, this.props.formRender)}
            </td>
          );
        } else
          children.push(<td key={"LayoutTableCell_" + i + "_" + j}>&nbsp;</td>);
      }
      table.push(<tr key={"LayoutTableRow_" + i}>{children}</tr>);
    }
    return table;
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
    let layoutTableClass = "LayoutTable ";

    if (this.props.bordered === true) layoutTableClass += "LayoutTableBordered";

    return (
      <div style={this.props.controlStyle}>
        {this.renderDescription()}
        <table
          className={layoutTableClass}
          id={this.props.name + "Div"}
          key={this.props.name}
        >
          <tbody>{this.generateTableBody()}</tbody>
        </table>
      </div>
    );
  }
}
