import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import _ from "lodash"
import {role} from "../helpers"



class Profile extends Form {
  constructor() {
    super()
    this.inputs = []
  }

  profile(userData) {
    const headerProps = {
      title: "Profil Bearbeiten",
      description: `Bitte füllen sie sorgfältig die Felder aus und Specihern Sie am Ende
      des Vorganges. Alle die Daten werden in Ihrem Profil angezeigt und
      können jederzeit von Ihnen Bearbeitet und rausgenommen werden.`
    }

    const isAnbieter = role(userData) === "Anbieter"
    const isBerater = role(userData) === "Berater"

    

    return (
      <section className="profile">
        <Header {...headerProps} />
        <div className="inputs">
          <div className="row">
            {isAnbieter &&
              <div className="small-6">
                <Input
                  maxChar={50}
                  ref={e => (this.inputs["profile.about.name"] = e)}
                  slug="Name"
                  value={_.get(userData, "profile.about.name")}
                  inputProps={{ placeholder: "Name Eigeben" }}
                  required
                />
              </div>}
            <div className={isBerater ? "small-12" : "small-6"}>
              <Input
                type={"number"}
                ref={e => (this.inputs["profile.about.founded"] = e)}
                value={_.get(userData, "profile.about.founded")}
                slug="Gründung"
                inputProps={{
                  min: "1970",
                  max: "2020",
                  step: "1",
                  placeholder: "Datum Eingeben TT.MM.JJ"
                }}
                required
              /> 
            </div>
            <div className="small-12 column">
              <div className="row">
                <div className="small-6">
                  <Input
                    ref={e =>
                      (this.inputs["profile.about.testimonial.name"] = e)}
                    slug="Kundenzitat Kundename"
                    value={_.get(userData, "profile.about.testimonial.name")}
                    inputProps={{ placeholder: "Kunden Auflisten" }}
                    required
                  />{" "}
                </div>
                <div className="small-4 large-3 column">
                  <small className="input-message">
                    Bei der Aflistung von Kunden Bittte ein Komma beachten.
                  </small>
                </div>
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <Textarea
                  maxChar={120}
                  ref={e => (this.inputs["profile.about.shortdescription"] = e)}
                  slug="Kurzbeschreibung"
                  value={_.get(userData, "profile.about.shortdescription")}
                  horizontalLayout
                  required
                />
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <DraftTextarea
                  maxWords={400}
                  ref={e => (this.inputs["profile.about.description"] = e)}
                  slug="Unternehmens beschreibung"
                  value={_.get(userData, "profile.about.description")}
                  horizontalLayout
                  required
                />
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <DraftTextarea
                  ref={e => (this.inputs["profile.about.values"] = e)}
                  maxWords={200}
                  slug="Werte"
                  value={_.get(userData, "profile.about.values")}
                  horizontalLayout
                  required
                />
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <Textarea
                  maxChar={200}
                  ref={e => (this.inputs["profile.about.testimonial.text"] = e)}
                  slug="Kundenzitat"
                  value={_.get(userData, "profile.about.testimonial.text")}
                  horizontalLayout
                  required
                />
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
        {this.profile(userData)}
      </div>
    )
  }
}

export default Profile
