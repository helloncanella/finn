import React, { Component } from "react"
import Input from "./Input.jsx"
// import FontAwesome from 'react-fontawesome'
//



class SocialInput extends Input {
  logo(companyName) {

    const logos = {
      twitter: "fa fa-twitter",
      facebook: "fa fa-facebook",
      linkedin: "fa fa-linkedin",
      xing: "fa fa-xing"
    }

    return <i className={logos[companyName]} />
  }

  render() {
    const companyName = this.props.company

    return (
      <div className="social-input">
        <div className="row">
          <small className="small-12 column company-name">
            {companyName}
          </small>
          <div className="logo-container">
            <div className="logo">
              {this.logo(companyName)}
            </div>
          </div>
          <div className="input-container">
            <input
              ref={e => (this.input = e)}
              defaultValue={this.props.value}
              placeholder="Vollständige adresse eingeben www."
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SocialInput
