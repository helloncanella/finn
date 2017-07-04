import React, { Component } from 'react'
import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx' 

import './stylesheets/index.scss'

export default class HomePage extends Component {

    headerProps = {
        backgroundVideo: "https://peats.de/video/landing_converted.mp4",
        logoUrl: "https://peats.de/logos/logo-weiss-home.png"
    }

    render() {
        return (
            <div className='home-page'>
                <div className="overlay"></div>
                <Header {...this.headerProps} />
                <Main/>
            </div>
        )
    }
}