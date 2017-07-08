import React, { Component } from 'react';

class ServicesInput extends Component {
  
  constructor(props){
    super()
    this.state = {
      selectedServices: props.value
    }
  }

  value(){
    return this.state.selectedServices
  }

  remove(service){
    const selectedServices = [...this.state.selectedServices]

    const index = selectedServices.indexOf(service)
    selectedServices.splice(index, 1)

    this.setState({selectedServices})
  }

  add(service){
    const selectedServices = [...this.state.selectedServices].concat(service)
    this.setState({selectedServices})
  }

  toggle(service){
    const {selectedServices} = this.state
    
    if(selectedServices.includes(service)) {
      this.remove(service)
    } else{
      this.add(service)
    }

  }

  services(){
    const {possibleValues} = this.props

    const services = Object.keys(possibleValues).map((key, index)=>{
      const service = possibleValues[key]
      const {name, shortcode} = service

      const onClick = ()=>this.toggle(name)
      const selectedClass = this.state.selectedServices.includes(name) ? 'selected' : ''

      return( 
        <div className={`service ${selectedClass}`} key={`service-${index}`} onClick={onClick}>
          <h3 className="shortcode">{shortcode}</h3>
        </div>
      )

    })

    return services 
  }

  render() {
    return (
      <div className="services-input">
          {this.services()}     
      </div>
    )
  }
}

export default ServicesInput;