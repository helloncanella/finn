import React, {Component, PropTypes} from 'react'
import {html} from '../../helpers.js'

class EvolutionLine extends Component {

    renderEvolutionLine() {
        const history = [
            { year: '2010', title: 'PersonalityProfile', description: '- die Tool-Sammlung beginnt als Word Press Blog' },
            { year: '2011', title: 'PersonalityExperts', description: '- Experten kommen hinzu, Autoren schreiben Artikel und beschreiben die Tools' },
            { year: '2012', title: 'Relaunch und Zusammenführung', description: 'der beiden Webseiten, Gründung von PE personalityexperts UG' },
            { year: '2013', title: 'Die ersten Workshops', description: 'zum Thema „Eignungsdiagnostische Instrumente im Überblick“' },
            { year: '2014', title: 'Seminarangebote und Kooperationspartner', description: 'kommen hinzu' },
            { year: '2015', title: 'erste Mini-Messe', description: 'in Köln mit 80 Teilnehmern, auf PE sind knapp 100 Tools gelistet, 500 Experten, 600 Artikel. Die Seite hat 10.000 Klicks pro Monat' },
            { year: '2016', title: 'Gründung PEATS GmbH', description: 'Evaluation & Assessment Tools' }
        ]

       const historyItems = history.map(({ year, title, description }, index) => {
            return (
                <div className="row history-item" key={index}>
                    <div className="year small-4 column">                        
                        <div className="row align-center">
                            <div className="rectangle small-6 medium-5 large-4">
                                <span>{year}</span>
                            </div>
                        </div>
                    </div>
                    <div className="description-moment small-7 column">
                        <h5 className="title">{title}</h5>
                        <p className="description" dangerouslySetInnerHTML={html(description)} />
                    </div>
                </div>
            )
        })

        return (
            <div className="history">
                <div className="crossline" />
                {historyItems}
            </div>
        ) 
            

    }

    render() {
        return (
            <div className="evolution-line row align-center grid">
                <div className="small-8 column">
                    {this.renderEvolutionLine()}                    
                </div>
            </div>
        )
    }
}

export default EvolutionLine