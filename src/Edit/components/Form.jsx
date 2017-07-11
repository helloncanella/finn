import React, { Component } from "react"
import _ from "lodash"

class Form extends Component {
  constructor(){
    super()
    this.inputs = []
  }

  getValues() {
    const inputValue = {}

    Object.keys(this.inputs).forEach(name => {
      const value = this.inputs[name].value()
      value && _.set(inputValue, name, this.inputs[name].value())
    })

    console.log(inputValue)
    return inputValue
  }

  validate() {
    let { validators = [] } = this.props
    let caughtError

    !Array.isArray(validators) && (validators = [validators])

    Object.keys(this.inputs).forEach(name => {
      const input = this.inputs[name]

      if (input.value) {
        const value = input.value()
        validators.forEach(validator => validator(value))
      }

      try{
        input.validate && input.validate()
      }catch(e){
        caughtError = true
      }
    })

    if(caughtError) throw new Error('one or more fields are invalid')
  }
}

export default Form
