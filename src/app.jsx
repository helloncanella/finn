import React, { Component } from "react"
import HomePage from "./HomePage/Index.jsx"
import Stepper from "./Dashboard/Stepper.jsx"
import ProfilForm from './Dashboard/ProfilForm.jsx'

import "./Dashboard/style.scss"
import "./Dashboard/editor.scss"

export default class App extends React.Component {
  render() {
    return (
      <Stepper save={oi=>console.log(oi)}>
        <ProfilForm name="Hello" />
        <ProfilForm name="Trello" />
        <ProfilForm name="Bill" />
      </Stepper>
    )
  }
}


