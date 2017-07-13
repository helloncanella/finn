import React, { Component } from "react"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import Input from "./Input.jsx"
import _ from "lodash"

class AddressInput extends Input {
  constructor(props) {
    super(props)
    this.state = {
      address: _.get(props, "value.address"),
      latlong: _.get(props, "value.latlong") || {}
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onError = this.onError.bind(this)
  }

  value() {
    const { address, latlong } = this.state

    if (!address) return null
    return { address, latlong }
  }

  onChange(address) {
    this.setState({ address })
  }

  handleSelect(address) {
    geocodeByAddress(address)
      .then(results => {
        let { lat, lng } = _.get(results, "0.geometry.location") || {}

        lat = lat()
        lng = lng()

        const value = {
          address,
          latlong: { lat: parseFloat(lat), long: parseFloat(lng) }
        }

        const callback = () => this.props.onSelect({ ...value })
        this.setState({ ...value }, callback)
      })
      .then(err => this.setState({ address }))
  }

  onError(error) {
    if (error) this.setState({ latlong: null })
  }

  render() {
  

    return (
      <div className={`address-input ${this.props.className}`}>
        <label htmlFor="autocomplete">
          {this.props.slug}
          <PlacesAutocomplete
            onSelect={this.handleSelect}
            onError={this.onError}
            inputProps={{
              value: this.state.address,
              onChange: this.onChange,
              id: "autocomplete",
              ref: e => (this.input = e),
              ...this.props.inputProps
            }}
          />
          {this.error()}
        </label>
      </div>
    )
  }
}

export default AddressInput
