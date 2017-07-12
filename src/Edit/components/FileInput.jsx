import React, { Component } from "react"
import Dropzone from "react-dropzone"
import Cropper from "react-cropper"
import _ from "lodash"
import sweetAlert from "sweetalert"
import PropTypes from "prop-types"
import Input from "./Input.jsx"

class FileInput extends Input {
  constructor(props) {
    super()

    this.state = {
      value: props.value,
      fileToUpload: null,
      uploading: false
    }
  }

  getFile = e => {
    const file = _.get(e.target, "files.0")
    file && this.setState({ fileToUpload: file })
  }

  fileInput() {
    return (
      <div className="input-container">
        <h6>File hochladen</h6>
        <div className="wrapper">
          <input type="file" id="input" onChange={this.getFile} />
          <label htmlFor="input" className="action-button">
            File Auswählen
          </label>
        </div>
      </div>
    )
  }

  discard = () => {
    this.setState({ fileToUpload: null })
  }

  uploadFile = () => {
    console.log(`upload:`, this.state.fileToUpload)
  }

  uploadActions() {
    const { fileToUpload: file } = this.state

    const discard = (
      <div className="action-button discard" onClick={this.discard}>
        discard
      </div>
    )
    const upload = (
      <div className="action-button upload" onClick={this.uploadFile}>
        upload
      </div>
    )

    return (
      <div className="file-info">
        <div className="action-buttons">
          {discard}
          {upload}
        </div>
        <h6 className="name">
          Datei: {file.name}
        </h6>
      </div>
    )
  }

  uploadedFiles() {
    return <h3>Uploaded file</h3>
  }

  content() {
    const { value, fileToUpload } = this.state

    if (value) return this.uploadedFiles()
    if (fileToUpload) return this.uploadActions()

    return this.fileInput()
    
  }

  render() {
    return (
      <div className="file-input">
        {this.content()}
      </div>
    )
  }
}

export default FileInput

FileInput.propTypes = {
  required: PropTypes.boolean,
  deleteImage: PropTypes.func.isRequired,
  saveImage: PropTypes.func.isRequired,
  value: PropTypes.object,
  getImage: PropTypes.func
}
