import React, { Component } from "react"
import Stepper from "./components/Stepper.jsx"
import Profile from "./steps/Profile.jsx"
import Contact from "./steps/Contact.jsx"
import Images from "./steps/Images.jsx"
import Social from "./steps/Social.jsx"
import Services from "./steps/Services.jsx"
import FileForm from "./steps/FileForm.jsx"

import { saveImage, getImageUrl } from "./helpers.js"

import scriptLoader from "react-async-script-loader"
const fontawesome = "https://use.fontawesome.com/037d1e9b1a.js"

class EditPage extends Component {
  saveImage = (file, pathToUpdate) => {
    const userId = this.props.user._id
    return saveImage({ file, userId, pathToUpdate }, err => {
      if (err) {
        this.props.onError && this.props.onError(err)
        console.error(err)
      }
    })
  }

  getImage = imageId => {
    return getImageUrl({ src: { id: imageId } })
  }

  profileImage = () => {
    const role = this.role()
    const paths = {
      Anbieter: "profile.about.logo.id",
      Berater: "profile.contact.image.id"
    }
    const { user } = this.props

    if (role in paths) return this.getImage(_.get(user, paths[role]))

    return ""
  }

  role() {
    return _.get(this.props.user, "meta.role")
  }

  render() {
    if (!this.props.isScriptLoaded) return null

    const {
      saveUser: save,
      user: userData,
      anbieterServices,
      onError,
      deleteImage
    } = this.props
    const commonProps = { userData }
    const isAnbieter = userData.meta.role === "Anbieter"

    return (
      <div className="profile-edit">
        <Stepper save={save} onError={onError} userImage={this.profileImage()}>
          <Profile name="Profil" {...commonProps} />
          <Contact name="Kontakt" {...commonProps} />
          <Images
            name="Bilder"
            {...commonProps}
            saveImage={this.saveImage}
            deleteImage={deleteImage}
            getImage={this.getImage}
          />
          <Social name="Socialmedia" {...commonProps} />
          {isAnbieter &&
            <Services
              name="Service"
              {...commonProps}
              possibleValues={anbieterServices}
            />}
          <FileForm
            name="Zip./ Anhang"
            {...commonProps}
            deleteFile={(value, callback) => {
              console.log(value), callback()
            }}
            uploadFile={(file, callback) => {
              console.log(file)
              setTimeout(() => callback(null, "12345"), 500)
            }}
          />
        </Stepper>
      </div>
    )
  }
}
export default scriptLoader(fontawesome)(EditPage)
