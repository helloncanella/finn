import React, { Component } from "react"
import Input from './Input.jsx'


class SocialInput extends Input {

  logoClass(companyName){
    const logos = {
      "twitter": "fi-social-twitter",
      "facebook": "fi-social-facebook",
      "linkedin": "fi-social-linkedin",
      "xing": "fi-finn-i-dont-know"
    }

    return logos[companyName]
  }

  render() {
    const companyName = this.props.company

    return (
      <div className="social-input">
        <div className="row">
          <small className="small-12 column company-name">{companyName}</small>
          <div className="small-1 column">
            <div className="logo">
              <i className={this.logoClass(companyName)}></i>
            </div>
          </div>
          <div className="small-11 column">
            <input ref={e=>this.input=e} placeholder="Vollständige adresse eingeben www."/>
          </div>
        </div>
      </div>
    )
  }
}

export default SocialInput
