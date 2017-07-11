import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import ServicesInput from "../components/ServicesInput"
import _ from "lodash"

class Services extends Form {
  constructor() {
    super()
    this.inputs = []
  }

  render() {
    const { userData } = this.props

    const headerProps = {
      title: "Services",
      description:
        "Welche der Kategorien werden Abgedeckt? Bitte wählen Sie die passenden aus "
    }

    return (
      <div className="form" style={this.props.style}>
        <section className="company-images">
          <Header {...headerProps} />
          <div className="inputs">
            <ServicesInput
              value={_.get(userData, "profile.services.list")}
              ref={e => (this.inputs["profile.services.list"] = e)}
              possibleValues={this.props.possibleValues}
              required
            />
          </div>
        </section>
      </div>
    )
  }
}

export default Services

// – wie zum Beispiel aus Sicht der Mitarbeiter, der Vorgesetzten, Teammitglieder oder Kunden
