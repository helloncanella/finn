import React, { Component } from "react"
import Stepper from "./components/Stepper.jsx"
import Profile from "./steps/Profile.jsx"
import Contact from "./steps/Contact.jsx"
import Images from "./steps/Images.jsx"
import Social from "./steps/Social.jsx"
import Services from "./steps/Services.jsx"

import { saveImage, getImageUrl } from "./helpers.js"

            // deleteImage={(i, callback) => {
            //   console.log(i)
            //   callback()
            // }}


export default class EditPage extends Component {
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
    const { userData } = this.props

    if (role in paths) return this.getImage(_.get(userData, paths[role]))

    return ""
  }

  role() {
    return _.get(this.props.userData, "meta.role")
  }
 
  render() {
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
          {/*<Profile name="Profil" {...commonProps} />*/}
          {/*<Contact name="Kontakt" {...commonProps} />*/}
          <Images
            name="Bilder"
            {...commonProps}
            saveImage={this.saveImage}
            deleteImage={deleteImage}
            getImage={this.getImage}
          />
          {/*<Social name="Socialmedia" {...commonProps} />
          {isAnbieter &&
            <Services
              name="Service"
              {...commonProps}
              possibleValues={anbieterServices}
            />}*/}
        </Stepper>
      </div>
    )
  }
}
