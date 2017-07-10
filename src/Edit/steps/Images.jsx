import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import ImageInput from "../components/ImageInput"
import _ from "lodash"

class Images extends Form {
  constructor() {
    super()
    this.inputs = []
    this.state = {
      companiesInputsComponents:[]
    }
  }

  componentDidMount(){
    this.setState({
      companiesInputsComponents: this.getImageInputs("profile.about.images")
    })
  }

  getImageInputs(path) {
    const { saveImage, deleteImage, getImage, userData } = this.props

    let images = _.get(userData, path)
    const valueIsArray = Array.isArray(images)

    !valueIsArray && (images = [images])

    const imagesInputs = images.map((imagePath, index) => {
      const { id } = imagePath
      const preview = getImage(id)

      let thePath = valueIsArray ? `${path}.${index}.id` : `${path}.id`

      return (
        <ImageInput
          id={id}
          key={thePath}
          preview={preview}
          saveImage={saveImage}
          deleteImage={deleteImage}
          ref={e => (this.inputs[thePath] = e)}
        />
      )
    })

    return imagesInputs
  }

  logo() {
    const headerProps = {
      title: "Logo",
      description: `Bitte beachten Sie die Formate, die Hochgeladen werden können`
    }

    return (
      <section className="logo">
        <Header {...headerProps} />
        <div className="input">
          {this.getImageInputs("profile.about.logo")}
        </div>
      </section>
    )
  }

  addCompanyImageInput = () => {
    const { companiesInputsComponents } = this.state
    const {length} =  companiesInputsComponents 
    const path = `profile.about.images.${length}.id`

    const props = {
      key: path,
      ref: e => (this.inputs[path] = e),
      ..._.pick(this.props, ["saveImage", "deleteImage"])
    }

    this.setState({
      companiesInputsComponents: [
        ...companiesInputsComponents,
        <ImageInput {...props} />
      ]
    })
  }

  companyImages() {
    const headerProps = {
      title: "Unternahmensfotos",
      description: ""
    }

    const path = "profile.about.images"

    return (
      <section className="company-images">
        <Header {...headerProps} />
        <div className="inputs">
          {this.state.companiesInputsComponents}
        </div>
        <h4
          className="add-more-images"
          onClick={() => this.addCompanyImageInput()}
        >
          Mehr Bilder Hinzufügen
        </h4>
      </section>
    )
  }

  render() {
    const { userData } = this.props

    return (
      <div className="form" style={this.props.style}>
        {this.logo()}
        {this.companyImages()}
      </div>
    )
  }
}

export default Images
