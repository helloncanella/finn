import React, { Component } from "react"
import Input from "../components/Input"
import { Textarea, DraftTextarea } from "./../components/Textarea"
import Form from "../components/Form"
import Header from "../components/SectionHeader"
import _ from "lodash"
import AddressInput from "../components/AddressInput.jsx"
import GoogleMapReact from "google-map-react"

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!re.test(email)) {
    throw new Error("Invalid email format")
  }
}

const validateLocation = location => {
  const { lat = "", long = "" } = location.latlong || {}
  if (!lat || !long) throw new Error("Address not located")
}

class Contact extends Form {
  constructor({ userData }) {
    super()

    this.inputs = {}
    this.values = {}

    this.complexInputs = {}

    this.state = {
      latlong: null,
      address: null
    }

    this.setInitalAddressData(userData)

    this.onSelectLocation = this.onSelectLocation.bind(this)
  }

  setInitalAddressData(userData) {
    this.values["profile.contact.latlong"] = _.get(
      userData,
      "profile.contact.latlong"
    )
    this.values["profile.contact.address"] = _.get(
      userData,
      "profile.contact.address"
    )
  }

  onSelectLocation(location) {
    const { address, latlong } = location

    this.setState({
      latlong: (this.values["profile.contact.latlong"] = latlong),
      address: (this.values["profile.contact.address"] = address)
    })
  }

  map() {
    const { lat, long: lng } = this.values["profile.contact.latlong"]
    const image = this.props.userImage
    const userName = _.get(this.props.userData, "profile.contact.name")

    return (
      <GoogleMapReact center={{ lat, lng }} defaultZoom={11}>
        <Poster lat={lat} lng={lng} image={image} title={userName} />
      </GoogleMapReact>
    )
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
                required
              />
            </div>
            <div className="small-6">
              <Input
                maxChar={50}
                ref={e => (this.inputs["profile.contact.title"] = e)}
                slug="Rolle im Unternehmen"
                value={_.get(userData, "profile.contact.title")}
                inputProps={{ placeholder: "Rolle im Unternehmen" }}
                required
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
                validator={validateEmail}
              />
            </div>

            <div className="small-12 column">
              <div className="row textarea-field">
                <Input
                  ref={e => (this.inputs["profile.contact.website"] = e)}
                  slug="Website"
                  value={_.get(userData, "profile.contact.website")}
                  inputProps={{ placeholder: "Vollständige Domain: www. " }}
                  required
                />
              </div>
            </div>
            <div className="small-12 column">
              <div className="row textarea-field">
                <AddressInput
                  onSelect={this.onSelectLocation}
                  ref={ref => (this.complexInputs["address"] = ref)}
                  slug="Anschrift"
                  className="small-12 columns"
                  value={{
                    address: this.values["profile.contact.address"],
                    latlong: this.values["profile.contact.latlong"]
                  }}
                  inputProps={{ placeholder: "Kunden Auflisten" }}
                  validator={validateLocation}
                  required
                />
                <div className="map small-12 medium-8 large-5 columns">
                  {this.map()}
                </div>
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

function Poster({ image, title }) {
  const imageStyle = {
    background: `url(${image}) no-repeat center center`,
    backgroundSize: "cover"
  }

  return (
    <div className="poster">
      <div className="small-5 image" style={imageStyle} />
      <div className="small-7 description-side">
        <div className="title">
          {title}
        </div>
      </div>
    </div>
  )
}
