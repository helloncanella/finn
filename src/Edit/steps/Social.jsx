import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import _ from "lodash"
import SocialInput from "../components/SocialInput"

class Social extends Form {
  constructor() {
    super()
    this.inputs = []
  }

  getRef = company => {
    return e => (this.inputs[`profile.contact.social.${company}`] = e)
  }

  getDefaultValue = company => {
    // debugger
    return _.get(this.props.userData, `profile.contact.social.${company}`)
  }

  socialInput = (company, index)=>{
    return <SocialInput
        company={company}
        key={`company-${index}`}
        ref={this.getRef(company)}
        value={this.getDefaultValue(company)}
      />
  }


  render() {
    const { userData } = this.props

    const headerProps = {
      title: "Social Media",
      description: "Bitte Fügen Sie Die komplette Url der Seite. "
    }

    return (
      <div className="form" style={this.props.style}>
        <section className="social">
          <Header {...headerProps} />
          <div className="inputs">
            {['facebook', 'twitter', 'linkedin', 'xing'].map(this.socialInput)}
          </div>
        </section>
      </div>
    )
  }
}

export default Social
