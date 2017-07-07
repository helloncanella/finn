import React, { Component } from "react"
import { shallow, mount } from "enzyme"
import Form from "../Form"
import _ from "lodash"

class Input extends Component {
  render() {
    return null
  }
}

const element = (inputNames, props, inputProps=[]) => {
  !inputNames && (inputNames = ["any"])
  !Array.isArray(inputNames) && (inputNames = [inputNames])
  !Array.isArray(inputProps) && (inputProps = [inputProps])


  class Stub extends Form {
    constructor() {
      super()
      this.inputs = []
    }

    render() {
      return (
        <div>
          {inputNames.map((name, index) =>{
            return <Input ref={e => (this.inputs[name] = e)} key={index} {...inputProps[index]}/>
          })}
        </div>
      )
    }
  }

  return mount(<Stub {...props} />)
}

describe("Form component", () => {
  describe("getValues function", () => {
    it("return input values of children", () => {
      const value1 = "oi"
      const value2 = "ola"

      Input.prototype.value = jest
        .fn()
        .mockReturnValueOnce(value1)
        .mockReturnValue(value2)

      let c = element(["lero.ok.vim", "lero.trim.piu"])

      expect(c.instance().getValues()).toEqual({
        lero: { ok: { vim: value1 }, trim: { piu: value2 } }
      })
    })
  })

  describe("validate function", () => {
    it("call all validator passed as props", () => {
      const mocks = Array.from({ length: 5 }, () => jest.fn())

      const c = element(null, { validators: mocks })

      c.instance().validate()

      mocks.forEach(mock => expect(mock).toBeCalled())
    })

    it("call passed validator with each input value", () => {
      const mock = jest.fn()

      const value1 = "oi"
      const value2 = "ola"

      Input.prototype.value = jest
        .fn()
        .mockReturnValueOnce(value1)
        .mockReturnValue(value2)

      const c = element(["oi", "lero"], { validators: mock })

      c.instance().validate()

      expect(mock).toBeCalledWith(value1)
      expect(mock).toBeCalledWith(value2)
    })


    it("call existent inputs validator", () => {
      const mock1 = jest.fn(()=>3)
      const mock2 = jest.fn(()=>2)

      Input.prototype.validate = function(){
        this.props.validator()
      }

      const c = element(["oi", "lero"], null, [{validator: mock1}, {validator:mock2} ])
     
      c.instance().validate()

      expect(mock1).toBeCalled()
      expect(mock2).toBeCalled()

    })
  })
})
