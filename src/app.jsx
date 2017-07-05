import React, {Component} from "react"
import HomePage from "./HomePage/Index.jsx"
import Dashboard from "./Dashboard/Dashboard.jsx"

import "./Dashboard/style.scss"

export default class App extends React.Component {
  render() {
    return (
      <Dashboard>
        <FormSection name="Hello" />
        <FormSection name="Trello" />
        <FormSection name="Bill" />
      </Dashboard>
    )
  }
}

class FormSection extends Component {
  render() {
    return (
      <div className="form-section" style={this.props.style}>
        <h1>
          {this.props.name}
        </h1>
      </div>
    )
  }
}
