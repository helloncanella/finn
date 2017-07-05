import React from "react"
import HomePage from "./HomePage/Index.jsx"
import Dashboard from "./Dashboard/Dashboard.jsx"

import "./Dashboard/style.scss"

export default class App extends React.Component {
  render() {
    return (
      <Dashboard>
        <div className="form-section">
          <h1>Hello</h1>
        </div>
        <div className="form-section">
          <h1>ola</h1>
        </div>
        <div className="form-section">
          <h1>teco</h1>
        </div>
      </Dashboard>
    )
  }
}
