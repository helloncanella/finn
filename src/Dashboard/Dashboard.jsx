import React, { Component } from "react"

import "./style.scss"

class Dashboard extends Component {
  render() {
    return (
      <div className="layout">
        <aside />
        <main>
          <header />
          <div className="dashboard">
            <div className="stepper">
              <div className="top row">
                <div className="profile small-3 column">
                  <h3 className="title">Profil Ansehen</h3>
                  <h4>überblick über eigene Daten</h4>
                  <img
                    src="https://www.w3schools.com/w3css/img_avatar3.png"
                    alt="avatar"
                    className="avatar"
                  />
                </div>
                <div className="all-steps small-9 column">
                  <h3 className="title">Editieren</h3>
                  <div className="sequences">
                    <div className="line" />
                    <div className="steps">
                      <div className="step current">
                        <div className="bullet" />
                        <h6 className="description">Profil/Kontak</h6>
                      </div>
                      <div className="step">
                        <div className="bullet" />
                        <h6 className="description">Fotos</h6>
                      </div>
                      <div className="step">
                        <div className="bullet" />
                        <h6 className="description">Socialmedia</h6>
                      </div>
                      <div className="step">
                        <div className="bullet" />
                        <h6 className="description">Service</h6>
                      </div>
                      <div className="step">
                        <div className="bullet" />
                        <h6 className="description">Zip/Anhang</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="children row">
                <div className="form-section small-12" />
                <div className="form-section small-12" />
              </div> 
              <div className="controls row">
                <div className="back button" >Zurück</div>
                <div className="next button"> Speichern</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  } 
}

export default Dashboard
