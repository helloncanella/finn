import React, { Component } from "react"
import { shallow, mount } from "enzyme"
import Dashboard from "../Dashboard"

const wrapper = (props = {}, toMount) => {
  props.children = props.children || <div />
  const component = <Dashboard {...props} />
  return toMount == "mount" ? mount(component) : shallow(component)
}

class Stub extends Component {
  validate() {
    this.props.validate && this.props.validate()
  }

  getValues() {
    return 2
  }

  render() {
    return <div />
  }
}

describe("rendering steps", () => {
  let comp,
    clickBack = () => comp.find(".back").simulate("click"),
    clickNext = () => comp.find(".next").simulate("click"),
    setState = state => comp.setState(state),
    state = () => comp.state()

  beforeEach(() => {
    comp = wrapper()
  })

  afterEach(() => (comp = null))

  it("Just one children is rendered", () => {
    const children = [<div id="1" key="1" />, <div id="2" key="2" />]
    const allChildren = wrapper({ children }).find(".children").props().children

    const child1StyleDisplay = allChildren[0].props.style.display
    const child2StyleDisplay = allChildren[1].props.style.display

    expect(child1StyleDisplay).not.toBe("none")
    expect(child2StyleDisplay).toBe("none")
  })

  it("next button, advance step", () => {
    comp = wrapper({ children: [<Stub key="1"/>, <Stub key="2"/>] }, "mount")
    clickNext()
    expect(state().stepIndex).toEqual(1)
  })

  it("back button back", () => {
    setState({ stepIndex: 5 })
    clickBack()
    expect(state().stepIndex).toEqual(4)
  })

  it("the back button doesn't appear in the first step", () => {
    setState({ stepIndex: 0 })
    expect(comp.find(".back").length).toEqual(0)
  })

  it("once confirm button is pressed it validates the fields", () => {
    const validation = jest.fn(() => {})
    const children = <Stub validate={validation} />

    comp = wrapper({ children }, "mount")
    clickNext()

    expect(validation).toBeCalled()
  })

  it("if field is valid, collect data and pass to save function", () => {
    const values = {}
    Stub.prototype.getValues = jest.fn(() => values)

    const save = jest.fn()
    const children = <Stub validate={() => {}} />

    comp = wrapper({ children, save }, "mount")

    clickNext()

    expect(save).toBeCalledWith(values)
  })

  it("dont increases stepIndex if it is the last step", () => {
    const children = [<Stub key="1"/>, <Stub key="2"/>, <Stub key="3"/>]

    comp = wrapper({ children }, "mount")

    clickNext()
    clickNext()
    clickNext()
    clickNext()
    clickNext()
    clickNext()

    expect(comp.instance().state.stepIndex).toBe(2)
  })

  it("visibility of current step changes, when button is pressed", () => {
    const children = [<Stub key="1"/>, <Stub key="2"/>]

    comp = wrapper({ children }, "mount")

    const display = () =>
      comp.find(".children").props().children[0].props.style.display

    clickNext()
    expect(display()).toBe("none")
  })

  describe("if validation fails", () => {
    let error = "black"
    let validate

    beforeEach(() => {
      validate = jest.fn(() => {
        throw new Error(error)
      })
      comp = wrapper({ children: <Stub validate={validate} /> }, "mount")
      clickNext()
    })

    it("print error", () => {
      expect(comp.find(".error").text()).toBe(error)
    })

    it("don't advance", () => {
      expect(state().stepIndex).toBe(0)
    })
  })
})
