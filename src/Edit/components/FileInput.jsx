import React, { Component } from "react"
import Dropzone from "react-dropzone"
import Cropper from "react-cropper"
import _ from "lodash"
import sweetAlert from "sweetalert"
import PropTypes from "prop-types"
import Input from "./Input.jsx"
import Loading from "react-loading"
import {isAllowedType} from "../helpers"

if (document) {
  require("sweetalert/dist/sweetalert.css")
}

class FileInput extends Input {
  constructor(props) {
    super()

    this.state = {
      value: props.value,
      fileToUpload: null,
      uploading: false
    }

    this.allowedTypes = ['pdf', 'txt']
  }

  value(){
    if(_.isEmpty(this.state.value)) return null
    return this.state.value
  }

  getFile = e => {
    const file = _.get(e.target, "files.0")

    if(isAllowedType(file, this.allowedTypes)){
      file && this.setState({ fileToUpload: file })
    }
  }

  fileInput() {
    return (
      <div className="input-container">
        <h6>File hochladen</h6>
        <div className="wrapper" ref={ref=>this.input=ref}>
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

  onConcludedUpload = (err, fileId) => {
    if (err) {
      this.setError(err.reason || err.message || err)
      return
    }

    const { name } = this.state.fileToUpload

    this.setState({
      loading: false,
      fileToUpload: null,
      error: null,
      value: {
        name,
        id: fileId
      }
    })
  }

  uploadFile = () => {
    this.setState({ loading: true })
    this.props.uploadFile(this.state.fileToUpload, this.onConcludedUpload)
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
          {this.state.loading &&
            <Loading
              className="loading"
              color="gray"
              type="bubbles"
              height={32}
              width={32}
            />}
        </div>
        <h6 className="name">
          Datei: {file.name}
        </h6>
      </div>
    )
  }

  deleteFile = () => {
    const { value: file } = this.state

    if (file) {
      const callback = () =>
        this.props.deleteFile(file, err => {
          if (err)
            sweetAlert({
              title: "Error",
              text: err.reason || err.message || err,
              type: "error"
            })
          else
            sweetAlert(
              {
                title: "Deleted",
                type: "success",
                showLoaderOnConfirm: false
              },
              () => this.setState({ value: null })
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
    }
  }

  uploadedFiles() {
    return (
      <div className="uploaded-file">
        <h3 className="title">Uploaded file</h3>
        <div className="file">
          <div className="fa fa-file-o icon" />
          <p className="name">
            {this.state.value.name}
          </p>
          <p className="delete" onClick={this.deleteFile}>
            delete
          </p>
        </div>
      </div>
    )
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
        {this.error()}
      </div>
    )
  }
}

export default FileInput

FileInput.propTypes = {
  required: PropTypes.boolean,
  deleteFile: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  value: PropTypes.object,
  getImage: PropTypes.func
}
