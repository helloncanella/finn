import React, { Component } from 'react'
import Menu from '../components/Menu/Menu.jsx'
import './header.scss'
import { OnMobile } from '../components/BreakingPoints/BreakingPoints.jsx'

export default class Header extends Component {

    logo({ className }) {
        return (
            <div className={`logo ${className}`}>
                <img src={this.props.logoUrl} alt="Peats" />
            </div>
        )
    }

    video() {
        const props = {
            playsInline: true,
            autoPlay: true,
            loop: true,
            src: this.props.backgroundVideo
        }

        return <video {...props} />
    }


    body({ className }) {
        return (
            <div className="body row  ">
                <div className="small-12 medium-offset-1 medium-10 ">
                    <div className="small-12 medium-10 large-7 column">
                        <h1>
                            <span>Tools finden. </span>
                            <OnMobile><br /></OnMobile>
                            <span>Und vergleichen.</span>
                        </h1>
                        <h2>
                            Peats ist der erste B2B Marktplatz für Instrumente zur Personalauswahl und – entwicklung.
                        </h2>
                    </div>
                    <div className="small-12 medium-5 large-3 column zu-toolfinder">
                        <button>Zum Toolfinder</button>
                    </div>
                </div>
            </div>

        )
    }

    render() {
        const Logo = this.logo.bind(this)
            , Body = this.body.bind(this)

        return (
            <header>
                {this.video()}
                <nav className="row">
                    <Logo className="small-5 medium-3 large-2 column" />
                    <Menu className="small-9 column" />
                </nav>
                <Body />
            </header>
        )
    }

}

