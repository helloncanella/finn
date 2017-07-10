import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import _ from "lodash"

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

    return (
      <section className="profile">
        <Header {...headerProps} />
        <div className="inputs">
          <div className="row">
            <div className="small-6">
              <Input
                maxChar={50}
                ref={e => (this.inputs["profile.about.name"] = e)}
                slug="Name"
                value={_.get(userData, "profile.about.name")}
                inputProps={{ placeholder: "Name Eigeben" }}
              />
            </div>
            <div className="small-6">
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
              />
            </div>
            <div className="small-12 column">
              <div className="row">
                <div className="small-6">
                  <Input
                    maxChar={50}
                    //ref={e => (this.inputs["profile.kunden"] = e)}
                    slug="Kunden"
                    value="Finn, I didn't find a path for this field"
                    inputProps={{ placeholder: "Kunden Auflisten" }}
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