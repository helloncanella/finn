import React, { Component } from "react"
import HomePage from "./HomePage/Index.jsx"
import Edit from "./Edit/Edit.jsx"

import "./Edit/_edit.scss"
import "./OldEdit/editor.scss"

import anbieter from "./Edit/fake-anbieter.json"
import servicesList from "./Edit/services-list.json"

const edit = (
  <Edit
    user={anbieter}
    saveUser={oi => console.log(oi)}
    anbieterServices={servicesList}
    saveImage={image => console.log(image)}
    deleteImage={(i, callback) => {
      console.log(i)
      callback()
    }}
    getImage={getImage}
  />
)

// import "./ImageInput/_image-input.scss"
import ImageInput from "./ImageInput/ImageInput"

export default class App extends React.Component {
  render() {
    // const imageInput = (
    //   <ImageInput
    //     id="123132132"
    //     preview={getImage("kklkdla")}
    //     saveImage={image => console.log(image)}
    //     deleteImage={(i,callback) => {console.log(i);callback()}}
    //     ref={e=>this.input =e }
    //   />
    // )
    // return imageInput

    return edit
  }
}

function getImage () {
  return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Rio_De_Janeiro_-_Rafael_Defavari.jpg/700px-Rio_De_Janeiro_-_Rafael_Defavari.jpg"

}
