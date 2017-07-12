import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import _ from "lodash"
import FileInput from "../components/FileInput.jsx"

class FileForm extends Form {
  constructor() {
    super()
    this.inputs = []
  }

  render() {
    const { userData } = this.props

    const headerProps = {
      title: "Zip/Anhang",
      description:
        "Sie Können ein Dokument anhängen welches sich die Besucher runter laden können"
    }

    return (
      <div className="form" style={this.props.style}>
        <section className="company-images">
          <Header {...headerProps} />
          <div className="inputs">
            <FileInput
              ref={ref => (this.inputs["zip"] = ref)}
              value={_.get(userData, "zip")}
              uploadFile={file => console.log(file)}
              deleteFile={id => console.log(id)}
              required
            />
          </div>
        </section>
      </div>
    )
  }
}

export default FileForm
