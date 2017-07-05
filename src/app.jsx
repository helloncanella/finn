import React, { Component } from "react"
import HomePage from "./HomePage/Index.jsx"
import Stepper from "./Dashboard/Stepper.jsx"
import Form from './Dashboard/Form.jsx'

import "./Dashboard/style.scss"

export default class App extends React.Component {
  render() {
    return (
      <Stepper>
        <Form name="Hello" />
        <Form name="Trello" />
        <Form name="Bill" />
      </Stepper>
    )
  }
}

class FormSection extends Component {
  render() {
    return (
      <div className="form small-12" style={this.props.style}>
        <div className="form-section">
          <h1>
            {this.props.name}
          </h1>
        </div>
      </div>
    )
  }
}
