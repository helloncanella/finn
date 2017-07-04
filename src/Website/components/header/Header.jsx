import React, { Component, PropTypes } from 'react'
import './header.scss'

export default class Header extends Component {

    constructor() {
        super()
        this.style = this.style.bind(this)
    }

    logo() {
        return (
            <div className="logo small-2 large-1 column">
                <img src="https://peats.de/logos/logo-weiss.png" alt="" />
            </div>
        )
    }

    nav() {
        const Logo = this.logo.bind(this)

        return (
            <nav className="row align-justify align-middle">
                <Logo />
                <Menu />
            </nav>
        )

    }

    content() {
        const content = this.props.children || null

        return (
            <div className="content row align-center">
                <div className="column">
                    <div className="small-6 large-4 small-offset-1">
                        {content}
                    </div>
                </div>
            </div>
        )
    }

    style() {
        const url = this.props.background

        return {
            background: `url(${url}) no-repeat center center fixed`,
            backgroundSize: 'cover'
        }
    }

    render() {
        const Nav = this.nav.bind(this)
            , Content = this.content.bind(this)

        return (
            <header style={this.style()} >
                <Nav />
                <Content />
            </header>
        )
    }

}

Header.propTypes = {
    background: PropTypes.string.isRequired
}

class Menu extends Component {
    render(){
        return (
            <div className="menu small-8 column align-right">
                <ul>
                    <li>Tools</li>
                    <li>Anbieter</li>
                    <li>Berater</li>
                    <li>Über</li>
                    <li>Eiloggen</li>
                </ul>
            </div>
        )
    }
}