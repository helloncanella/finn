import React, { Component } from "react"
import Stepper from "./components/Stepper.jsx"
import Profile from "./steps/Profile.jsx"
import Contact from "./steps/Contact.jsx"
import Images from "./steps/Images.jsx"
import Social from "./steps/Social.jsx"
import Services from "./steps/Services.jsx"

export default class EditPage extends Component {
  render() {
    const {
      saveUser: save,
      user: userData,
      anbieterServices,
      onError,
      saveImage,
      getImage,
      deleteImage
    } = this.props
    const commonProps = { userData }
    const isAnbieter = userData.meta.role === "Anbieter"

    


    return (
      <div className="profile-edit">
        <Stepper save={save} onError={onError}>
          {/*<Profile name="Profil" {...commonProps}/>*/}
          {/*<Contact name="Kontakt" {...commonProps}/>*/}
          <Images
            name="Bilder"
            {...commonProps}
            saveImage={saveImage}
            deleteImage={deleteImage}
            getImage={getImage}
          />
          {/*<Social name="Socialmedia" {...commonProps}/>*/}
          {isAnbieter &&
            <Services
              name="Service"
              {...commonProps}
              possibleValues={anbieterServices}
            />}
        </Stepper>
      </div>
    )
  }
}
