import { createRef, Component, Fragment } from "react";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    props.eventEmitter.on("propsChanged", (props) => {
      this.props = props;
      this.setState({ props: props });
      this.forceUpdate();
    });
    this.userLang = navigator.language || navigator.userLanguage;
    this.fileRef = createRef();
  }

  componentWillReceiveProps() {
    if (this.fileRef.current) {
      this.fileRef.current.value = "";
    }
  }

  isRequired() {
    if (this.props.required && this.props.required == true)
      return <span className="text-danger required-asterik-mark">•</span>;
    return null;
  }

  removeFile(fileObj) {
    if (fileObj.fileId) {
      this.props.removeFile(fileObj, this.props.name);
    }
  }

  downloadFile(fileObj) {
    let url = "";
    let attachment = fileObj.isAttachment
      ? "&isattachment=true"
      : "&isattachment=false";
    if (fileObj.isAttachment) attachment += "&fileName=" + fileObj.name;
    if (fileObj.type === "image/jpeg" || fileObj.type === "image/png") {
      url =
        window.location.origin +
        "/ActionCentre/DownloadImageForIE/?fileId=" +
        fileObj.fileId +
        attachment;
    } else {
      url =
        window.location.origin +
        "/ActionCentre/DownloadPdf/?fileId=" +
        fileObj.fileId;
      if (fileObj.isAttachment)
        url =
          window.location.origin +
          "/ActionCentre/DownloadPdfAttachment/?fileId=" +
          fileObj.fileId +
          attachment;
    }
    fetch(url, {
      method: "GET",
      headers: {
        responseType: "arraybuffer",
      },
    })
      .then((response) => {
        response
          .blob()
          .then((blobData) => {
            let blob = new Blob([blobData], { type: fileObj.type });
            if (navigator.appVersion.toString().indexOf(".NET") > 0) {
              window.navigator.msSaveBlob(blob, fileObj.name);
            } else {
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = fileObj.name;
              link.click();
            }
          })
          .catch((error) => {
            console.error(error);
          });
        // Your code for handling the data you get from the API
      })
      .catch((error) => {
        console.error(error);
      });
  }

  viewFile(fileObj) {
    const ext = this.getExtentions(fileObj.name);
    let pageImageHtml = "";
    let attachment = fileObj.isAttachment
      ? "&isattachment=true"
      : "&isattachment=false";
    if (fileObj.isAttachment) attachment += "&fileName=" + fileObj.name;
    let url = "";

    if (fileObj.type === "application/pdf") {
      url =
        window.location.origin +
        "/scripts/lib/pdfjs/web/viewer.html?file=/ActionCentre/DownloadPdf/" +
        fileObj.fileId;
      if (fileObj.isAttachment) {
        url =
          window.location.origin +
          "/scripts/lib/pdfjs/web/viewer.html?file=/ActionCentre/ViewPdfAttachment/" +
          fileObj.name +
          "/" +
          fileObj.fileId;
      }

      pageImageHtml =
        '<iframe class="documents" style="width:100%;min-height:483px;" src="' +
        url +
        '" />';
      this.props.setFilePreview(pageImageHtml);
    } else if (
      fileObj.type === "application/msword" ||
      fileObj.type === "application/rtf" ||
      (fileObj.type === "application/octet-stream" && ext == "doc")
    ) {
      url =
        window.location.origin + "/ActionCentre/DownloadPdf1/" + fileObj.fileId;
      if (fileObj.isAttachment) {
        url =
          window.location.origin +
          "/ActionCentre/ViewPdfAttachment/" +
          fileObj.name +
          "/" +
          fileObj.fileId;
      }
      var pageHtml =
        "<iframe src = 'https://docs.google.com/gview?url=" +
        url +
        "%26embedded=true&key=AIzaSyBndmyXW1OPcunqFYZnHRO4sAiZoF1SJdk'></iframe>";
      this.props.setFilePreview(pageHtml);
    } else if (
      fileObj.type === "application/vnd.ms-excel" ||
      fileObj.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileObj.type === "application/octet-stream"
    ) {
      url =
        window.location.origin +
        "/ActionCentre/DownloadPdfAttachment/?fileId=" +
        fileObj.fileId +
        attachment;
      fetch(url, {
        method: "GET",
        headers: {
          responseType: "arraybuffer",
        },
      })
        .then((response) => {
          response.blob().then((blobData) => {
            var arrayBuffer;
            var uint8ArrayNew;
            var fileReader = new FileReader();
            var that = this;

            fileReader.onload = function (event) {
              arrayBuffer = event.target.result;
              uint8ArrayNew = new Uint8Array(arrayBuffer);
              var wb = XLSX.read(uint8ArrayNew, { type: "buffer" });
              var worksheet = wb.Sheets[wb.SheetNames[0]];
              var div = document.createElement("div");
              div.innerHTML = XLSX.utils.sheet_to_html(worksheet);
              var content =
                "<div>" + XLSX.utils.sheet_to_html(worksheet) + "</div>";
              that.props.setFilePreview(content);
            };
            fileReader.readAsArrayBuffer(blobData);
          });
          // Your code for handling the data you get from the API
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (fileObj.type === "image/jpeg" || fileObj.type === "image/png") {
      url =
        window.location.origin +
        "/ActionCentre/DownloadImage/?fileId=" +
        fileObj.fileId +
        attachment;
      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          response.text().then((imageDataUrl) => {
            pageImageHtml =
              '<img style="max-width:100%;" src="' + imageDataUrl + '">';
            this.props.setFilePreview(pageImageHtml);
          });
          // Your code for handling the data you get from the API
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (fileObj.type === "text/plain") {
      //To decide what other previews to be supported
      url =
        window.location.origin +
        "/ActionCentre/DownloadPdf/?fileId=" +
        fileObj.fileId +
        attachment;
      if (fileObj.isAttachment) {
        url =
          window.location.origin +
          "/ActionCentre/ViewPdfAttachment/" +
          fileObj.name +
          "/" +
          fileObj.fileId;
      }
      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          response.text().then((textDataContent) => {
            pageImageHtml = "<p>" + textDataContent + "</p>";
            this.props.setFilePreview(pageImageHtml);
          });
          // Your code for handling the data you get from the API
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  getExtentions(fileName) {
    return fileName.split(".")[fileName.split(".").length - 1];
  }

  isMsgFile(fileName, type) {
    let fileType = fileName.split(".")[fileName.split(".").length - 1];
    return fileType == "msg" && type == "application/octet-stream";
  }

  addDeleteButtton(obj) {
    if (this.props.readOnly === true) return null;
    else
      return (
        <span
          className=" glyphicon glyphicon-trash m-r-20"
          title="Delete"
          onClick={() => {
            this.removeFile(obj);
          }}
        />
      );
  }

  generateFileTableRows() {
    if (this.props.value) {
      return this.props.value.map((obj, ind) => {
        let is = this.isMsgFile(obj.name, obj.type);
        let ext = this.getExtentions(obj.name);

        return (
          <tr style={{ width: "100%" }} key={ind}>
            <td>{obj.name}</td>
            <td className="cursor">
              <span
                className=" glyphicon glyphicon-download-alt m-r-20"
                title="Download"
                onClick={() => {
                  this.downloadFile(obj);
                }}
              />
              {this.addDeleteButtton(obj)}
              {(obj.type === "application/pdf" ||
                obj.type === "image/jpeg" ||
                obj.type === "image/png" ||
                obj.type === "text/plain" ||
                (obj.type === "application/octet-stream" && !is)) && (
                <span
                  className="glyphicon glyphicon-eye-open"
                  title="View"
                  onClick={() => {
                    this.viewFile(obj);
                  }}
                />
              )}
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr style={{ width: "100%" }}>
          <td colSpan="2" align="center">
            <span>No Files Uploaded</span>
          </td>
        </tr>
      );
    }
  }

  generateUploadedEmailBody(obj) {
    return obj.map((obj, ind) => {
      return (
        <tr style={{ width: "100%" }} key={ind}>
          <td>{obj.name}</td>
          <td className="cursor">
            <span
              className=" glyphicon glyphicon-download-alt m-r-20"
              title="Download"
              onClick={() => {
                this.downloadFile(obj);
              }}
            />
            {obj.type !==
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
              obj.type !== "application/msword" && (
                <span
                  className="glyphicon glyphicon-eye-open"
                  title="View"
                  onClick={() => {
                    this.viewFile(obj);
                  }}
                />
              )}
          </td>
        </tr>
      );
    });
  }

  generateUploadedFileTable() {
    return (
      <table className="table table-striped table-no-bordered table-hover table-scroll-tbody">
        <tbody
          style={{ display: "block", maxHeight: "185px", overflowY: "auto" }}
        >
          {this.generateFileTableRows()}
        </tbody>
      </table>
    );
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
        id={this.props.name + "Div"}
        className={"form-group " + (this.props.hidden ? "hidden" : "shown")}
        style={this.props.controlStyle}
      >
        <label>
          {this.props.label}
          {!(this.props.readOnly === true) && this.isRequired()}
        </label>
        {this.renderDescription()}
        <span className="forComment"></span>
        {this.generateUploadedFileTable()}
        {!(this.props.readOnly == true) && (
          <span
            className="btn btn-success btn-sm show file-upload-btn"
            title={this.userLang != "fr" ? "Choose File" : "Choisir le fichier"}
            style={{ width: "100%" }}
          >
            {this.userLang != "fr"
              ? "Attach a File here"
              : "Joindre un fichier ici"}
            <span className="glyphicon glyphicon-paperclip file-upload-icon"></span>
            <input
              ref={this.fileRef}
              type="file"
              multiple={this.props.multiple}
              accept={this.props.allowedFileTypes}
              onChange={(evt) =>
                this.props.handleInput(evt.target.files, this.props.index)
              }
            />
          </span>
        )}
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value != this.props.value) {
      return true;
    }
    return false;
  }
}
