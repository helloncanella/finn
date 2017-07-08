import React, { Component } from "react"
import HomePage from "./HomePage/Index.jsx"
import Edit from "./Edit/Edit.jsx"

import "./Edit/_edit.scss"
import "./OldEdit/editor.scss"

import anbieter from "./Edit/fake-anbieter.json"

export default class App extends React.Component {
  render() {
    return <Edit user={anbieter} saveUser={oi=>console.log(oi)}/>
  }
}


