import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import ImageInput from "../components/ImageInput"
import _ from "lodash"
import {getImageUrl} from '../helpers.js'

class Images extends Form {
  constructor() {
    super()
    this.inputs = []
    this.state = {
      companiesInputsComponents: []
    }
  }

  componentDidMount() {
    if(_.get(this.props.userData, "meta.role")==="Anbieter"){
      this.setState({
        companiesInputsComponents: this.getImageInputs("profile.about.images")
      })
    }
  }
  
  getImageInputs(path) {
    const { saveImage, deleteImage, getImage, userData } = this.props

    let images = _.get(userData, path)
    const valueIsArray = Array.isArray(images)

    !valueIsArray && (images = [images])

    const imagesInputs = images.map((imagePath, index) => {
      const { id } = imagePath
      let thePath = valueIsArray ? `${path}.${index}` : `${path}`

      return (
        <ImageInput
          key={thePath}
          value={_.get(userData, thePath)}
          saveImage={file => saveImage(file, thePath)}
          deleteImage={deleteImage}
          getImage={imageInfo=>getImageUrl({src:imageInfo})}
          ref={e => (this.inputs[thePath] = e)}
          required
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
    const { length } = companiesInputsComponents
    const path = `profile.about.images.${length}.id`
    const saveImage = file => this.props.saveImage(file, path)

    const props = {
      key: path,
      ref: e => (this.inputs[path] = e),
      saveImage,
      ..._.pick(this.props, ["deleteImage"])
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

  contactImage() {
    const headerProps = {
      title: "Kontakt Bild",
      description: ""
    }

    const path = "profile.contact.image"

    return (
      <section className="company-images">
        <Header {...headerProps} />
        <div className="inputs">
          {this.getImageInputs(path)}
        </div>
        
      </section>
    )
  }

  anbieterView() {
    return (
      <div className="anbieter-view">
        {this.logo()}
        {this.companyImages()}
      </div>
    )
  }

  beraterView() {
    return (
      <div className="berater-view">
        {this.contactImage()}
      </div>
    )
  }

  render() {
    const { userData } = this.props
    const role = _.get(userData, "meta.role")

    return (
      <div className="form" style={this.props.style}>
        {role === "Anbieter" && this.anbieterView()}
        {role === "Berater" && this.beraterView()}
      </div>
    )
  }
}

export default Images
