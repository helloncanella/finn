import React, { Component, PropTypes } from 'react'
import Header from '../components/header/Header.jsx'
import plans from '../components/plan/plans-list.js'
import Plan from '../components/plan/Plan.jsx'
import Paragraph from '../components/paragraph/Paragraph.jsx'
import Grid from '../components/grid/Grid.jsx'
import EvolutionLine from '../components/evolution-line/EvolutionLine.jsx'

import '../styles/common.scss'
import './about.scss'

import {html} from '../helpers.js'

export default class Service extends Component {

    aboutUs() {

        const paragraph = {
            title: 'Über Uns',
            text: `Peats.de ist eine unabhängige Informationsplattform über Anbieter von
            eignungsdiagnostischen Tools, Mitarbeiterbefragungstools und 360°Feedback-Systemen für
            Deutschland, Österreich und die Schweiz. Die 2010 gegründete Plattform erzielte 2016 circa
            100.000 Besuche.
            Die Besucher der Seite finden hier einen Marktüberblick über die verschiedenen Anbieter, eine
            Suchfunktion eignungsdiagnostischer Systeme, um das richtige Tool zu finden, aktuelle
            Expertenartikel und ein Verzeichnis mit zertifizierten Beratern`
        }

        return <Paragraph data={paragraph} className="about-us" />

    }

    mission() {

        const paragraph = {
            title: 'Mission',
            text: `Die Plattform ist entstanden, um den Markt der Instrumente für Personalauswahl und -
            entwicklung transparent zu machen. Am Anfang stand eine Frage: Welche Tools gibt es
            eigentlich, um im Unternehmen mit der Persönlichkeit von Menschen zu arbeiten? Aber auch
            im Coaching, im Recruiting, mit Führungskräften, Azubis oder Mitarbeitern. Schnell wurde
            daraus die Frage nach der Vielfalt. Was unterscheidet die Tools, welche erfassen Potenziale,
            welche Kompetenzen, welche Verhalten, Intelligenz oder Typen? Welche eignen sich für was
            und wann?<br/>
            Daraus entwickelte sich erst ein Blog. Dann eine Community. Dann eine Dienstleistung. Und
            dann PEATS. Denn bis dahin war eines klar: Der Markt ist unübersichtlich, intransparent und
            es ist eine Herausforderung, ihn überhaupt abzubilden. Schließlich könnte die
            Unterschiedlichkeit der Tools größer nicht sein`
        }

        return <Paragraph data={paragraph} className="mission" />

    }

    vision() {

        const paragraph = {
            title: 'Vision',
            text: `PEATS entstand aus der festen Überzeugung, dass ein Tool – diese Verbindung aus
            Psychologie und Technologie – eine enorm hilfreiche Unterstützung ist. Um dafür zu sorgen,
            dass Menschen den Job machen, der zu Ihnen passt. Den Job, in dem ihre Fähigkeiten zur
            Geltung kommen und in dem sie beste Leistung bringen wollen und können. Und dass
            Menschen die Gelegenheit erhalten, ihre Stärken und Talente im beruflichen Kontext
            reflektieren zu können.<br/>
            Aus dieser Überzeugung wurde unsere Vision geboren, einen Überblick für alle Tools zu
            ermöglichen, die mit Peats.de realisiert wird.`
        }

        return <Paragraph data={paragraph} className="service" />

    }

    headerContent() {
        return (
            <div className="header-content">
                <h3>
                    <span className="light-title">
                        Unabhängige <br />
                        Informationsplattform über <br />
                    </span>
                    <span className="heavy-title">
                        Eignungsdiagnostik
                    </span>
                </h3>
            </div>
        )
    }

    evolution() {
        return (
            <div className="evolution">
                <h3 className="title">Evolution</h3>
                <EvolutionLine />
            </div>
        )
    }

    render() {
        const About = this.aboutUs.bind(this)
            , Mission = this.mission.bind(this)
            , Vision = this.vision.bind(this)
            , Evolution = this.evolution.bind(this)

        return (
            <div className='about-page'>
                <Header background='https://4.bp.blogspot.com/-zTNlgDREhsI/VjWrWFn51wI/AAAAAAAB3vY/4sJonY_oCFc/s0/Polygon_uhd.jpg'>
                    {this.headerContent()}
                </Header>
                <main>
                    <About />
                    <Grid />
                    <Mission />
                    <Evolution />
                    <Vision />
                </main>
            </div>
        )
    }
}




