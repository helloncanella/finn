import React, { Component } from "react"

class ImageInput extends Component {
  value(){

  }

  render() {
    return (
      <div className="image-input">
        <div className="row">
          <div className="small-6 large-4 column">
            <div className="drag-and-drop">
              <h4>Drag and drop</h4>
              <small>other</small>
              <h4>Hochladen</h4>
            </div>
          </div>
          <div className="small-6 large-8 column">
            <div className="info">
              <p>Das Bild muss dem Format … ensprechen </p>
              <p>Folgende Dateienformate können hochgeladen werden: </p>
              <p className="black">jpeg, .png, …</p>
              <div className="images">
                <div className="image"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageInput
