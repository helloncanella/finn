import React, { Component } from "react"
import HomePage from "./HomePage/Index.jsx"
import Edit from "./Edit/Edit.jsx"

import "./Edit/_edit.scss"
import "./OldEdit/editor.scss"

import anbieter from "./Edit/fake-anbieter.json"
import servicesList from "./Edit/services-list.json"

import scriptLoader from "react-async-script-loader"

const saveImage = image => {
      console.log(image);
      return {id:"123546"}
    }
const edit = (
  <Edit
    user={anbieter}
    saveUser={oi => console.log(oi)}
    anbieterServices={servicesList}
    deleteImage={(i, callback) => {
      console.log(i)
      callback()
    }}
  />
)

// import "./ImageInput/_image-input.scss"
// import ImageInput from "./ImageInput/ImageInput"

 class App extends React.Component {
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
    // console.log(moment)
    
    if (!this.props.isScriptLoaded) return null
    return edit
  }
}
const momentjs = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.js"
export default scriptLoader(momentjs)(App)

function getImage () {
  return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Rio_De_Janeiro_-_Rafael_Defavari.jpg/700px-Rio_De_Janeiro_-_Rafael_Defavari.jpg"

}
