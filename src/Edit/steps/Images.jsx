import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import ImageInput from '../components/ImageInput'
import _ from "lodash"

class Images extends Form {
  constructor() {
    super()
    this.inputs = []
  }

  logo(userData) {
    const headerProps = {
      title: "Logo",
      description: `Bitte beachten Sie die Formate, die Hochgeladen werden können`
    }

    return (
      <section className="logo">
        <Header {...headerProps} />
        <div className="input">
          <ImageInput ref={e=>this.inputs["logo"]=e}/>
        </div>
      </section>
    )
  }

  companyImages(userData) {
    const headerProps = {
      title: "Unternahmensfotos",
      description: ""
    }

    return (
      <section className="company-images">
        <Header {...headerProps} />
        <div className="inputs">
          
        </div>
      </section>
    )
  }

  render() {
    const { userData } = this.props

    return (
      <div className="form" style={this.props.style}>
        {this.logo(userData)}
        {this.companyImages(userData)}
      </div>
    )
  }
}

export default Images
