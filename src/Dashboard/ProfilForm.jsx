import React, { Component } from "react"

class ProfilForm extends Component {
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
            <div className="small-6 column">
              <label htmlFor="ok">Name</label>
              <input type="text" id="ok" placeholder="Name Eigeben"/>
            </div>
            <div className="small-6 column">
              <label htmlFor="ok">Gründung</label>
              <input type="text" placeholder="Datum Eingeben TT.MM.JJ"/>
            </div>
            <div className="small-12 column">
              <div className="row">
                <div className="small-6 column">
                  <label htmlFor="ok">Kunden</label>
                  <input type="text" placeholder="Kunden Auflisten"/>
                </div>
                <div className="small-3 column">
                  <small className="input-message">
                    Bei der Aflistung von Kunden Bittte ein Komma beachten.
                  </small>
                </div>
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <div className="small-2 column">
                  <label htmlFor="ok">Kurzbeschreibung</label>
                </div>
                <div className="small-10 column">
                  <textarea placeholder="Kurzbeschreibung hinzufügen"/>                    
                </div>
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <div className="small-2 column">
                  <label htmlFor="ok">Kurzbeschreibung</label>
                </div>
                <div className="small-10 column">
                  <textarea/>                    
                </div>
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <div className="small-2 column">
                  <label htmlFor="ok">Werte</label>
                </div>
                <div className="small-10 column">
                  <textarea/>                    
                </div>
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <div className="small-2 column">
                  <label htmlFor="ok">Unternehmen beschreibung</label>
                </div>
                <div className="small-10 column">
                  <textarea/>                    
                </div>
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <div className="small-2 column">
                  <label htmlFor="ok">Kundenzitat</label>
                </div>
                <div className="small-10 column">
                  <textarea/>                    
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
