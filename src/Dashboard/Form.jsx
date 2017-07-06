import React, { Component } from "react"
import _ from "lodash"

class Form extends Component {
  constructor(){
    super()
    this.inputs = []
  }

  getValue() {
    const inputValue = {}

    Object.keys(this.inputs).forEach(name => {
      _.set(inputValue, name, this.inputs[name].value())
    })

    return inputValue
  }

  validate() {
    let { validators = [] } = this.props

    !Array.isArray(validators) && (validators = [validators])

    Object.keys(this.inputs).forEach(name => {
      const input = this.inputs[name]

      if (input.value) {
        const value = input.value()
        validators.forEach(validator => validator(value))
      }

      input.validate && input.validate()
    })
  }
}

export default Form
