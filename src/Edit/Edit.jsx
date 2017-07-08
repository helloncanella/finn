import React, {Component} from 'react'
import Stepper from "./components/Stepper.jsx"
import ProfileAndContactEdit from './steps/ProfileAndContactEdit.jsx'
import Images from './steps/Images.jsx'
import Social from './steps/Social.jsx'



export default class EditPage extends Component {
  render() {
    const {saveUser: save, user: userData} = this.props
    const commonProps = {userData}

    return (
      <div className="profile-edit">
        <Stepper save={save}>
          <ProfileAndContactEdit name="Profil/Kontakt" {...commonProps}/>
          <Images name="Bilder" {...commonProps}/>
          <Social name="Socialmedia" {...commonProps}/>
          <ProfileAndContactEdit name="Service" {...commonProps}/>
          <ProfileAndContactEdit name="Zip./ Anhang" {...commonProps}/>
        </Stepper>
      </div>
    )
  }
}


