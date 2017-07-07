import React, {Component} from 'react'
import Stepper from "./components/Stepper.jsx"
import ProfileAndContactEdit from './steps/ProfileAndContactEdit.jsx'

export default class EditPage extends Component {
  render() {
    const {saveUser: save, user: userData} = this.props
    const commonProps = {userData}

    return (
      <div className="profile-edit">
        <Stepper save={save}>
          <ProfileAndContactEdit name="Profil/Kontakt" {...commonProps}/>
          <ProfileAndContactEdit name="Bilder" {...commonProps}/>
          <ProfileAndContactEdit name="Socialmedia" {...commonProps}/>
          <ProfileAndContactEdit name="Service" {...commonProps}/>
          <ProfileAndContactEdit name="Zip./ Anhang" {...commonProps}/>
        </Stepper>
      </div>
    )
  }
}


