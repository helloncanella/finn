import React, {Component} from "react"
import { shallow, mount } from "enzyme"
import Dashboard from "../Dashboard"

const wrapper = (props = {}, toMount) => {
  props.children = props.children || <div />
  const component = <Dashboard {...props} />
  return toMount=='mount' ? mount(component) : shallow(component)
}

class Stub extends Component{
  validate(){
    this.props.validate()
  }

  getValues(){
    return 2
  }

  render(){
    return null
  }
}

describe("rendering steps", () => {
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
    comp=wrapper({}, 'mount')
    clickNext()
    expect(state().stepIndex).toEqual(1)
  })

  it("back button back", () => {
    setState({ stepIndex: 5 })
    clickBack()
    expect(state().stepIndex).toEqual(4)
  })

 
  it("the back button doesn't appear in the first step", () => {
    setState({stepIndex:0})
    expect(comp.find('.back').length).toEqual(0)
  })

  it("once confirm button is pressed it validate the fields", () => {
    const validation = jest.fn(()=>{})
    const children = <Stub validate={validation} />
    
    comp = wrapper({children}, 'mount')
    clickNext()

    expect(validation).toBeCalled()
  })

  it("if field is valid, collect data and pass to save function", ()=>{
    const values = {}
    Stub.prototype.getValues = jest.fn(()=>values)
  
    const save = jest.fn()
    const children = <Stub validate={()=>{}}/> 

    comp = wrapper({children, save}, 'mount')
    
    clickNext()

    expect(save).toBeCalledWith(values)
  })


  it('don\'t advance if step validation fails', ()=>{
    const validate = jest.fn(()=>{
      throw new Error(error)
    })

    comp = wrapper({children: <Stub validate={validate} />}, 'mount')
    
    clickNext()

    expect(state().stepIndex).toBe(0)

  })


 
})
