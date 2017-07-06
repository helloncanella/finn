import React, { Component } from "react"
import HomePage from "./HomePage/Index.jsx"
import Stepper from "./Dashboard/Stepper.jsx"
import ProfilForm from './Dashboard/ProfilForm.jsx'

import "./Dashboard/style.scss"

export default class App extends React.Component {
  render() {
    return (
      <Stepper>
        <ProfilForm name="Hello" />
        <ProfilForm name="Trello" />
        <ProfilForm name="Bill" />
      </Stepper>
    )
  }
}


