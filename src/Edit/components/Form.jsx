import React, { Component } from "react"
import _ from "lodash"

class Form extends Component {
  constructor() {
    super()

    //define each value
    this.inputs = {}
    this.complexInputs = {}
    this.values = {}
    
  }

  getValues() {
    const inputValue = {}

    const inputs = { ...this.inputs, ...this.values }

    Object.keys(inputs).forEach(name => {
      const input = inputs[name]

      let value
      if (!!input.value) value = input.value()
      else value = input

      value && _.set(inputValue, name, value)
    })

    return inputValue
  }

  validate() {
    let { validators = [] } = this.props
    let caughtError

    !Array.isArray(validators) && (validators = [validators])

    const inputs = { ...this.inputs, ...this.complexInputs }

    Object.keys(inputs).forEach(name => {
      const input = inputs[name]

      if (input.value) {
        const value = input.value()
        validators.forEach(validator => validator(value))
      }

      try {
        input.validate && input.validate()
      } catch (e) {
        caughtError = true
      }
    })

    if (caughtError) throw new Error("one or more fields are invalid")
  }
}

export default Form
