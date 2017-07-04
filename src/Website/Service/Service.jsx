import React, { Component, PropTypes } from 'react'
import Header from '../components/header/Header.jsx'
import plans from '../components/plan/plans-list.js'
import Plan from '../components/plan/Plan.jsx'
import Paragraph from '../components/paragraph/Paragraph.jsx'

import '../styles/common.scss'
import './service.scss'

export default class Service extends Component {

    renderPlans() {
        const plansList = plans.map((plan, index) => {
            return (
                <li className="small-12 large-6 column">
                    <Plan data={plan} />
                </li>
            )
        })

        return <ul className="plans row">{plansList}</ul>
    }

    plansSection() {

        const plans = this.renderPlans()

        return (
            <div className="service row align-center">
                <div className="small-8 column">
                    <h3 className="title">Mitgliedschaften</h3>
                    {plans}
                </div>
            </div>
        )
    }

    service() {

        const paragraph = {
            title: 'Service',
            text: `Peats bietet erstmals einen Überblick über eignungsdiagnostische Tools,
            Mitarbeiterbefragungstools und 360°Feedback-Systemen, der Ihnen eine einfache
            Übersicht ermöglicht. Nicht nur das: Wir haben eine Suchfunktion gebaut, die alle
            Verfahren übersichtlich und nach Funktionen listet. Schon wenige Klicks genügen und
            Sie erhalten eine ausführliche Information über alle wesentlichen Parameter, die Ihre
            Suche nach einem Tool erleichtert.`
        }

        return <Paragraph data={paragraph} className="service" />

    }

    headerContent() {
        return (
            <div className="header-content">
                <h3>
                    <span className="light-title">Sie bekommen bei uns</span><br />
                    <span className="heavy-title">Sichtbarkeit Kommunikation Lösungen und Ordnung</span>
                </h3>
                <p>
                    Peats.de ist eine unabhängige Informationsplattform über Anbieter von eignungsdiagnostischen Systemen für Deutschland,Österreich und die Schweiz.
                </p>
                <button>REGISTRIEREN</button>
            </div>
        )
    }

    render() {
        const Plans = this.plansSection.bind(this)
            , Service = this.service.bind(this)

        return (
            <div className='service-page'>
                <Header background='http://www.bmsadvantage.com/wp-content/uploads/2013/03/new_background1.jpg'>
                    {this.headerContent()}
                </Header>
                <main>
                    <Service />
                    <Plans />
                </main>
            </div>
        )
    }
}

