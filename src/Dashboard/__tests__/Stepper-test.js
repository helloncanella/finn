import React, {Component} from "react"
import { shallow, mount } from "enzyme"
import Dashboard from "../Dashboard"

const wrapper = (props = {}, toMount) => {
  props.children = props.children || <div />
  const component = <Dashboard {...props} />
  return toMount ? mount(component) : shallow(component)
}

class Stub extends Component{
  validate(){
    this.props.validate()
  }

  render(){
    return null
  }
}

describe("", () => {
  let comp,
    clickBack = () => comp.find(".back").simulate("click"),
    clickNext = () => comp.find(".next").simulate("click"),
    setState = (state) =>comp.setState(state),
    state = ()=>comp.state()

  beforeEach(() => {
    comp = wrapper()
  })

  afterEach(() => (comp = null))
 
  it("Just one children is rendered", () => {
    const children = [<div id="1" key="1" />, <div id="2" key="2" />]
    const allChildren = wrapper({ children }).find(".children").children()
    expect(allChildren.length).toBe(1)
  })

  it("next button, advance step", () => {
    setState({ stepIndex: 1 })
    clickNext()
    expect(state().stepIndex).toEqual(2)
  })

  it("back button back", () => {
    setState({ stepIndex: 5 })
    clickBack()
    expect(state().stepIndex).toEqual(4)
  })

  // test("don't allow negative values for stepIndex", () => {
  //   comp.setState({ stepIndex: 0 })
  //   clickBack()
  //   expect(comp.state().stepIndex).toEqual(0)
  // })

  test("the back button doesn't appear in the first step", () => {
    setState({stepIndex:0})
    expect(comp.find('.back').length).toEqual(0)
  })

  test("once confirm button is pressed it validate the fields", () => {
    const validation = jest.fn(()=>{})
    const children = <Stub validate={validation} />
    
    comp = wrapper({children})
    clickNext()

    expect(validation).toBeCalled()
  })

  test.skip("if field is valid, collect data")

  test.skip("if fields are valid, advance")

  test.skip("the input values is collected when")
})
