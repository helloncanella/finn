import React, { Component } from 'react'
import { AtLeastPhablet } from '../components/BreakingPoints/BreakingPoints.jsx'
import Statistics from './components/Statistics.jsx'

const list = [
    `HR- und Hiring Manager, Ausbilder,
    Personalberater und Coaches. Kurz: für alle, die
    ein Instrument suchen, mit dem sie Menschen
    einstellen, entwickeln oder fördern wollen.`,

    `Peats ist die erste Informationsplattform rund
    um Personaltests, Mitarbeiterbefragungstools
    und 360°Feedback-Systeme für Deutschland
    Österreich und die Schweiz.`,

    `Hier finden Sie Orientierung und einen
    unabhängigen Marktüberblick. Vergleichen Sie
    verschiedene Anbieter und zertifizierte Berater,
    nutzen Sie die Suchfunktion, um das richtige Tool
    zu finden und lesen Sie aktuelle Expertenartike`
]

export default function ForWhoIsPeats() {
    return (
        <div className='for-who-is-peats row align-center'>
            <div className="small-12 medium-5 column">
                <h3>Für wen ist Peats?</h3>
                <ForWho />
                <AtLeastPhablet>
                    <Statistics />
                </AtLeastPhablet>
                <button>
                    <a href="#">
                        Registrieren
                        </a>
                </button>
            </div>
            <AtLeastPhablet>
                <div className="medium-5 map column">
                    <img src="//i.imgur.com/hsLBw8O.png" alt="" />
                </div>
            </AtLeastPhablet>
        </div>
    )
}



function ForWho() {
    const items = list.map((item, i) => <p key={`for-who-${i}`} className="for-who small">{item}</p>)

    return (
        <div className="for-who-list">
            {items}
        </div>
    )
}
