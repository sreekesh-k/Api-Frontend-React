import { createRef, Component, Fragment } from "react";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.pageThumbnailsRef = createRef(null);
    this.pageLayoutRef = createRef(null);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  generatePages() {
    let pageHeight = parseInt(this.props.pageHaight);
    var thumbnailsViewStyle = {
      height: pageHeight + "px",
    };

    return this.props.pages.map((obj, i) => {
      return (
        <div
          style={thumbnailsViewStyle}
          key={"LayoutPage" + i + "Div"}
          id={this.props.name + "_Page_" + i}
        >
          {this.props.formRender.generateLayout(obj, this.props.formRender)}
        </div>
      );
    });
  }

  componentDidMount() {
    this.pageLayoutRef.current.addEventListener(
      "scroll",
      this.scrollPagesHandler
    );
  }

  componentWillUnmount() {
    this.pageLayoutRef.current.removeEventListener(
      "scroll",
      this.scrollPagesHandler
    );
  }

  scrollPagesHandler = ({ target }) => {
    if (!this.__setActiveStageSilent) {
      const shift = target.offsetHeight / 2;
      const margin = 20;
      const scrollTop = target.scrollTop;
      const visibleActiveIndex = Array.from(
        target.children[0].children
      ).findIndex(
        (() => {
          let totalOffsetHeight = 0 - shift;

          return ({ offsetHeight }) =>
            scrollTop >= totalOffsetHeight &&
            scrollTop < (totalOffsetHeight += offsetHeight + margin);
        })()
      );

      const activeStageIndex = this.getActivePageIndex();

      if (visibleActiveIndex !== activeStageIndex) {
        this.setActivePage(visibleActiveIndex);
      }
    }
  };

  getActivePageIndex = () => {
    const container = this.pageThumbnailsRef.current;
    const thumbnails = Array.from(container.children[0].children);
    const active = container.querySelector(".activeThumbnail");

    return thumbnails.indexOf(active);
  };

  setActivePage = (i, scrollTo) => {
    let pageId = "#" + this.props.name + "_Page_" + i;
    let viewId = "#" + this.props.name + "Div .LayoutPages";
    let key = "LayoutPageThumbnail" + i + "Div";

    if (scrollTo) {
      this.__setActiveStageSilent = true;
      $(viewId).animate(
        {
          scrollTop:
            $(viewId).scrollTop() -
            $(viewId).offset().top +
            $(pageId).offset().top -
            20,
        },
        500,
        () => (this.__setActiveStageSilent = false)
      );
    }

    $("#" + key)
      .parent()
      .children()
      .removeClass("activeThumbnail");
    $("#" + key).addClass("activeThumbnail");
  };

  generateThumbnails() {
    return this.props.pages.map((obj, i) => {
      let style = i === 0 ? "activeThumbnail" : "";
      let key = "LayoutPageThumbnail" + i + "Div";
      return (
        <div
          key={key}
          id={key}
          onClick={() => this.setActivePage(i, true)}
          className={style}
        >
          <span>{i + 1}</span>
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
    let height = parseInt(this.props.controlHeight);
    var layoutPageBodyStyle = {
      //height: height + "px"
    };

    return (
      <div
        className="LayoutPage"
        id={this.props.name + "Div"}
        key={this.props.name}
        style={this.props.controlStyle}
      >
        {/* <div className="LayoutPageHeader">
          <div>
            {this.props.label}
            {this.renderDescription()}
          </div>
        </div> */}
        <div className="LayoutPageBody">
          <div
            className="LayoutPageThumbnails"
            style={{
              display: this.props.multiple_pages == "Yes" ? "" : "none",
            }}
            ref={this.pageThumbnailsRef}
          >
            <div>{this.generateThumbnails()}</div>
          </div>
          {/* <div>{this.props.multiple_pages}</div> */}
          <div
            className="LayoutPages"
            style={layoutPageBodyStyle}
            ref={this.pageLayoutRef}
          >
            <div>{this.generatePages()}</div>
          </div>
        </div>
      </div>
    );
  }
}
