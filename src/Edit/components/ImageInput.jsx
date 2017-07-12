import React, { Component } from "react"
import Dropzone from "react-dropzone"
import Cropper from "react-cropper"
import _ from "lodash"
import sweetAlert from "sweetalert"
import PropTypes from "prop-types"
import Input from "./Input.jsx"

import {isAllowedType} from "../helpers.js"

class ImageInput extends Input {
  constructor(props) {
    super()

    this.inputValue = props.value

    this.state = {
      imagePreview:
        props.getImage && props.value ? props.getImage(props.value) : null,
      showCropper: false,
      previewBeforeCrop: null
    }

    if (document) {
      require("cropperjs/dist/cropper.css")
      require("sweetalert/dist/sweetalert.css")
    }

    this.onDrop = this.onDrop.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
    this.getImageFileFromCanvas = this.getImageFileFromCanvas.bind(this)

    this.allowedTypes = ["png", "jpg", "jpeg"]
  }

  value() {
    if (this.inputValue) {
      return this.inputValue
    } else if (this.droppedFile) {
      this.inputValue = this.props.saveImage(this.droppedFile)
      return this.inputValue
    }

    return ""
  }

  cleanVariables() {
    this.inputValue = null
    this.droppedFile = null

    this.setState({
      imagePreview: null,
      showCropper: false,
      previewBeforeCrop: null
    })
  }

  deleteImage() {
    if (this.inputValue) {
      const callback = () =>
        this.props.deleteImage(this.inputValue, err => {
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
    let self = this
    const { name, type } = self.droppedFile

    return new Promise((resolve, reject) => {
      const callback = blob => {
        self.droppedFile = blobToFile(blob, name)
        resolve(imagePreview)
      }

      if (canvas.toBlob) canvas.toBlob(callback, type)
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

  
  
  processDroppedFile(file){    
    this.droppedFile = file
    const preview = _.get(file, "preview")
    preview && this.setState({ imagePreview: preview, showCropper: true })
  }

  onDrop([file]) {
    if(!isAllowedType(file, this.allowedTypes)) return
    this.cleanError()
    this.processDroppedFile(file)
  }

  dropZone() {
    /**
     * - Important: the ref input is used to mark the border of the component when it receives the 
     * prop "required".
     * - More info: see component Input.jsx
     * */

    return (
      <div className="drop-dropzone" ref={e => (this.input = e)}>
        <Dropzone
          multiple={false}
          onDrop={this.onDrop}
          className="drag-and-drop"
        >
          <h4>Drag and drop</h4>
          <h6>oder</h6>
          <h4>Hochladen</h4>
        </Dropzone>
      </div>
    )
  }

  imagePreview() {
    return (
      <div className="image">
        <img src={this.state.imagePreview} />
        {this.state.previewBeforeCrop && <a onClick={this.redoCrop}>redo</a>}
        {"  "}
        {<a onClick={this.deleteImage}>delete</a>}
      </div>
    )
  }

  info() {
    return (
      <div className="info">
        <p>Das Bild muss dem Format … ensprechen </p>
        <p>Folgende Dateienformate können hochgeladen werden: </p>
        <p className="black"><b>{this.allowedTypes.join(", ")}</b></p>
      </div>
    )
  }

  render() {
    const { imagePreview: preview, showCropper } = this.state

    return (
      <div className="image-input">
        <div className="row">
          <div className="small-6 large-4 column image">
            <div className="input">
              {showCropper && this.cropperComponent()}
              {!showCropper && preview && this.imagePreview()}
              {!showCropper && !preview && this.dropZone()}
            </div>
            {this.error()}
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
  required: PropTypes.boolean,
  deleteImage: PropTypes.func.isRequired,
  saveImage: PropTypes.func.isRequired,
  value: PropTypes.object,
  getImage: PropTypes.func
}

function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName
  return theBlob
}

