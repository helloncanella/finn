import React, { Component } from "react"
// import "./style.scss"

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      stepIndex: 0
    }

    this.next = this.next.bind(this)
    this.back = this.back.bind(this)

    this.onAdvance = this.onAdvance.bind(this)

    this.steps = []
  }

  next() {
    this.setState({ stepIndex: ++this.state.stepIndex })
  }

  back() {
    this.state.stepIndex > 0 &&
      this.setState({ stepIndex: --this.state.stepIndex })
  }

  onAdvance(){
    console.log('oi')
  }

  render() {
    let {children} = this.props

    children = Array.isArray(children) ? children: [children]

    children = children.map(child=>{
      let props = child.props || {}  
      return React.cloneElement(child, {...props, ref: e=>this.steps.push(e)})
    })

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
                {children[this.state.stepIndex]}
              </div>
              <div className="controls row">
                {this.state.stepIndex>0 &&<div className="back button" onClick={this.back}>
                  Zurück
                </div>}
                <div className="next button" onClick={this.onAdvance}>
                  {" "}Speichern
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Dashboard
