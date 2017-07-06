import React, { Component } from "react"
import Input from "./Input"
import { Textarea, DraftTextarea } from "./Textarea"

class ProfilForm extends Component {
  constructor() {
    super()
    this.fieldsets = []
  }

  render() {
    return (
      <div className="form" style={this.props.style}>
        <div className="header">
          <h3 className="title">Profil Bearbeiten</h3>
          <small className="description">
            Bitte füllen sie sorgfältig die Felder aus und Specihern Sie am Ende
            des Vorganges. Alle die Daten werden in Ihrem Profil angezeigt und
            können jederzeit von Ihnen Bearbeitet und rausgenommen werden.
          </small>
        </div>
        <div className="division" />
        <div className="inputs">
          <div className="row">
            <div className="small-6">
              <Input
                maxChar={50}
                ref={e => (this.fieldsets["about.name"] = e)}
                slug="Name"
                inputProps={{ placeholder: "Name Eigeben" }}
              />
            </div>
            <div className="small-6">
              <Input
                type={"number"}
                ref={e => (this.fieldsets["about.founded"] = e)}
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
                    ref={e => (this.fieldsets["about.kunden"] = e)}
                    slug="Kunden"
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
                  ref={e => (this.fieldsets["about.shortdescription"] = e)}
                  slug="Kurzbeschreibung"
                  horizontalLayout
                />
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <div className="small-2 column">
                  <label htmlFor="ok">Unternehmen beschreibung</label>
                </div>
                <div className="small-10 column">
                  <textarea />
                </div>
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <div className="small-2 column">
                  <label htmlFor="ok">Werte</label>
                </div>
                <div className="small-10 column">
                  <textarea />
                </div>
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <div className="small-2 column">
                  <label htmlFor="ok">Kundenzitat</label>
                </div>
                <div className="small-10 column">
                  <textarea />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilForm
