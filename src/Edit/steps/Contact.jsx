import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import _ from "lodash"

class Contact extends Form {
  constructor() {
    super()
    this.inputs = []
  }

  contact(userData) {
    const headerProps = {
      title: "Kontakt Bearbeiten",
      description: ""
    }

    return (
      <section className="contact">
        <Header {...headerProps} />
        <div className="inputs">
          <div className="row">
            <div className="small-6">
              <Input
                maxChar={50}
                ref={e => (this.inputs["profile.contact.name"] = e)}
                slug="Name"
                value={_.get(userData, "profile.contact.name")}
                inputProps={{ placeholder: "Name Eigeben" }}
              />
            </div>
            <div className="small-6">
              <Input
                maxChar={50}
                ref={e => (this.inputs["profile.contact.title"] = e)}
                slug="Rolle im Unternehmen"
                value={_.get(userData, "profile.contact.title")}
                inputProps={{ placeholder: "Rolle im Unternehmen" }}
              />
            </div>
            <div className="small-6">
              <Input
                maxChar={50}
                ref={e => (this.inputs["profile.contact.telefon"] = e)}
                slug="Telefonnummer"
                value={_.get(userData, "profile.contact.telefon")}
                inputProps={{ placeholder: "Kunden Auflisten" }}
              />
            </div>
            <div className="small-6">
              <Input
                ref={e => (this.inputs["profile.contact.email"] = e)}
                slug="Emailadresse"
                value={_.get(userData, "profile.contact.email")}
                inputProps={{ placeholder: "Emailadresse" }}
                //validator={}
              />
            </div>

            <div className="small-12 column">
              <div className="row textarea-field">
                <Input
                  ref={e => (this.inputs["profile.contact.website"] = e)}
                  slug="Website"
                  value={_.get(userData, "profile.contact.website")}
                  inputProps={{ placeholder: "Vollständige Domain: www. " }}
                />
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <Input 
                  ref={e => (this.inputs["profile.contact.address"] = e)}
                  slug="Anschrift"
                  value={_.get(userData, "profile.contact.address")}
                  inputProps={{ placeholder: "Kunden Auflisten" }}
                />
                {/**TODO:add map**/}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  render() {
    const { userData } = this.props

    return (
      <div className="form" style={this.props.style}>
        {this.contact(userData)}
      </div>
    )
  }
}

export default Contact
