import React, {Component} from 'react'
import Stepper from "./components/Stepper.jsx"
import ProfilForm from './components/ProfilForm.jsx'

export default class EditPage extends Component {
  render() {
    const {saveUser: save, user: userData} = this.props
    const commonProps = {userData}

    return (
      <div className="profile-edit">
        <Stepper save={save}>
          <ProfilForm name="Profil/Kontakt" {...commonProps}/>
          <ProfilForm name="Bilder" {...commonProps}/>
          <ProfilForm name="Socialmedia" {...commonProps}/>
          <ProfilForm name="Service" {...commonProps}/>
          <ProfilForm name="Zip./ Anhang" {...commonProps}/>
        </Stepper>
      </div>
    )
  }
}


