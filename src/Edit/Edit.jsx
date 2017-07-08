import React, {Component} from 'react'
import Stepper from "./components/Stepper.jsx"
import ProfileAndContactEdit from './steps/ProfileAndContactEdit.jsx'
import Images from './steps/Images.jsx'
import Social from './steps/Social.jsx'
import Services from './steps/Services.jsx'

export default class EditPage extends Component {
  render() {
    const {saveUser: save, user: userData, anbieterServices} = this.props
    const commonProps = {userData}
    const isAnbieter = userData.meta.role === "Anbieter"

    return (
      <div className="profile-edit">
        <Stepper save={save}>
          <ProfileAndContactEdit name="Profil/Kontakt" {...commonProps}/>
          <Images name="Bilder" {...commonProps}/>
          <Social name="Socialmedia" {...commonProps}/>
          {isAnbieter ? <Services name="Service" {...commonProps} possibleValues={anbieterServices}/> : null}
        </Stepper>
      </div>
    )
  }
}


