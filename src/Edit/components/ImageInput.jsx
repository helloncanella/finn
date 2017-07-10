import React, { Component } from "react"
import Dropzone from "react-dropzone"
import Cropper from "react-cropper"
import _ from "lodash"
import sweetAlert from "sweetalert"
import PropTypes from "prop-types"

class ImageInput extends Component {
  constructor(props) {
    super()

    this.imageId = props.id

    this.state = {
      imagePreview: props.preview,
      showCropper: false,
      previewBeforeCrop: null
    }

    if (document) {
      require("cropperjs/dist/cropper.css")
      require("sweetalert/dist/sweetalert.css")
    }

    this.onDrop = this.onDrop.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
  }

  value() {
    if (this.imageId) {
      return this.imageId
    } else if (this.droppedFile) {
      const imageId = this.props.saveImage(this.droppedFile)
      return imageId
    }

    return ""
  }

  cleanVariables() {
    this.imageId = null
    this.droppedFile = null

    this.setState({
      imagePreview: null,
      showCropper: false,
      previewBeforeCrop: null
    })
  }

  deleteImage() {
    if (this.imageId) {
      const callback = () =>
        this.props.deleteImage(this.imageId, err => {
          if (err)
            sweetAlert({
              title: "Error",
              text: err.reason || err.message,
              type: "error"
            })
          else
            sweetAlert(
              {
                title: "Deleted",
                type: "success",
                showLoaderOnConfirm: false
              },
              this.cleanVariables.bind(this)
            )
        })

      sweetAlert(
        {
          title: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: false
        },
        callback
      )
    } else {
      this.cleanVariables()
    }
  }

  redoCrop = () => {
    this.setState({
      imagePreview: this.state.previewBeforeCrop,
      showCropper: true
    })
  }

  getImageFileFromCanvas() {
    const canvas = this.cropper.getCroppedCanvas()
    const imagePreview = canvas.toDataURL()

    return new Promise((resolve, reject) => {
      const callback = blob => {
        this.droppedFile = blobToFile(blob, "name")
        resolve(imagePreview)
      }

      if (canvas.toBlob) canvas.toBlob(callback)
      else if (canvas.msToBlob) callback(canvas.msToBlob())
      else {
        sweetAlert("Bitte updaten Sie Ihren Browser")
        resolve(imagePreview)
      }
    })
  }

  setImage = () => {
    const callback = imagePreview =>
      this.setState({
        previewBeforeCrop: this.state.imagePreview,
        imagePreview,
        showCropper: false
      })

    this.getImageFileFromCanvas().then(callback)
  }

  cropperComponent() {
    return (
      <div className="cropper">
        <Cropper
          style={{ height: 200, width: "100%" }}
          aspectRatio={16 / 9}
          src={this.state.imagePreview}
          ref={e => (this.cropper = e)}
        />
        <a onClick={this.setImage}>Crop</a>
      </div>
    )
  }

  onDrop(file) {
    this.droppedFile = file
    const preview = _.get(file, "0.preview")
    preview && this.setState({ imagePreview: preview, showCropper: true })
  }

  dropZone() {
    return (
      <Dropzone multiple={false} onDrop={this.onDrop} className="drag-and-drop">
        <h4>Drag and drop</h4>
        <small>other</small>
        <h4>Hochladen</h4>
      </Dropzone>
    )
  }

  imagePreview() {
    return (
      <div className="image">
        <img src={this.state.imagePreview} />
        {this.state.previewBeforeCrop &&
          <a onClick={this.redoCrop}>redo</a>}{"  "}
        {<a onClick={this.deleteImage}>delete</a>}
      </div>
    )
  }

  info() {
    return (
      <div className="info">
        <p>Das Bild muss dem Format … ensprechen </p>
        <p>Folgende Dateienformate können hochgeladen werden: </p>
        <p className="black">jpeg, .png, …</p>
      </div>
    )
  }

  render() {
    const { imagePreview: preview, showCropper } = this.state

    return (
      <div className="image-input">
        <div className="row">
          <div className="small-6 large-4 column image">
            {showCropper && this.cropperComponent()}
            {!showCropper && preview && this.imagePreview()}
            {!showCropper && !preview && this.dropZone()}
          </div>
          <div className="small-6 large-8 column">
            {this.info()}
          </div>
        </div>
      </div>
    )
  }
}

export default ImageInput

ImageInput.propTypes = {
  id: PropTypes.string,
  deleteImage: PropTypes.func.isRequired,
  saveImage: PropTypes.func.isRequired,
  preview: PropTypes.string
}

function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName
  return theBlob
}
