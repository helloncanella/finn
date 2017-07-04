import React, { Component, PropTypes } from 'react'

import './info-window.scss'

export default class InfoWindow extends Component {

    closeButton() {
        return <main className="close-button" onClick={this.props.onClose} />
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.data && nextProps.data.profile.about.logo.path === this.props.data.profile.about.logo.path){
            return false
        }
        return true
    }

    header() {
        const { path: image } = this.props.data.profile.about.logo

        const background = {
            background: `url(${image}) no-repeat center center`,
            backgroundSize: 'cover',
            height: '200px',
            width: '100%'
        }

        return (
            <header style={background}>
            </header>
        )
    }

    body() {
        const { data } = this.props
            , { role } = data.meta
            , { name } = data.profile.contact


        const anbieter = (
            <main>
                <hr />
                <main className="rectangles internal-padding">
                    <main className="rectangle filled"></main>
                    <main className="rectangle"></main>
                    <main className="rectangle filled"></main>
                    <main className="rectangle filled"></main>
                </main>
            </main>
        )

        return (
            <main className="body">
                <h5 className="name internal-padding">{name}</h5>
                {role === 'Anbieter' && anbieter}
            </main>
        )
    }

    footer() {
        const { goToProfile } = this.props

        return (
            <footer >
                <h5 className="go-to-profile">
                    <span onClick={goToProfile}>
                        Zum Profil
                    </span>
                </h5>
                <main className="marker" />
            </footer>
        )
    }

    render() {

        const component = () => (
            <main className='info-window'>
                {this.closeButton()}
                {this.header()}
                {this.body()}
                {this.footer()}
            </main>
        )


        return this.props.show ? component() : null
    }

}