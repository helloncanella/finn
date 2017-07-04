import React from 'react';
import About from './sections/About/About.jsx'
import Resources from './sections/Resources/Resources.jsx'
import Invitation from './sections/Invitation/Invitation.jsx'
import './stylesheets/index.scss'

export default function CompanyService() {
    return (
        <div className="company-service">
            <About />
            <Resources />
            <Invitation />
        </div>
    )
}



