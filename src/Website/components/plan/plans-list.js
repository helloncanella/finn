import React, {Component} from 'react'
import './plan-list.scss'

class FellowPlanFooter extends Component {
    render() {
        return (
            <footer className="fellow-plan-footer">
                <a href="#">
                    <p>Fragen, FAQ</p>
                </a>
                <hr/>
                <button>
                    REGISTRIEREN
                </button>
            </footer>
        )
    }
}



class ProvidersPlanFooter extends Component {
    render() {
        return (
            <footer className="providers-plan-footer">
                <h4>Anbieter <span className="red">XL</span></h4>
                <hr/>
                <ul className="features">
                    <li className="feature">
                        <p className="description">
                            Ansicht der Tools in Listenform zum detailierten Vergleich. Servicedienstleistungen
                        </p>
                    </li>
                </ul>
            </footer>
        )
    }
}


const plans = [
    {
        color: 'green',
        name: 'Mitglieder',
        description: "Sie für sich ein Mitgliedsprofil an. Sie können jederzeit ein Upgrade vornehmen,um von allen Peats-Vorteilen eines zum Beispiel Beraterprofils oder Anbieterprofils zu profitieren.",
        features: [
            { description: "Foto" },
            { description: "Name" },
            { description: "Jobtitel" }
        ],
        footerComponent: FellowPlanFooter
    },
    {
        color: '#EB5153',
        name: 'Anbieter',
        description: "Dieses Paket passt für alle Anbieter von eignungsdiagnostischen Tools, Mitarbeiterbefragungen und 360° Feedback-Systemen. Peats ist ideal, Ihr Unternehmen und Ihr Angebot potenziellen Interessenten näherzubringen. Sie können dafür Ihr eigenes Firmenprofil und Toolprofil erstellen.",
        features: [
            { description: "Foto, Name, Jobtitel" },
            { description: "Firmendarstellung" },
            { description: "Lokalisierung via Google Maps" },
            { description: "Artikel posten inkl. redaktioneller" },
            { description: "Unterstützung, social Media und PR" },
            { description: "5 Tools oder bis zu 50 Tools anbieten" },
            { description: "Teilnahme an Kampagnen" },
            { description: "Statistiken" },
            { description: "Verbindungen zu Beratern anzeigen" },
        ],
        footerComponent: ProvidersPlanFooter
    },
     {
        color: '#00524B',
        name: 'Unternehmen',
        description: "Sie suchen zum Beispiel ein eignungsdiagnostisches Tool? Nutzen Sie unseren <a href='#'>ToolFinder</a> , um gezielt und ohne langes Suchen alle Informationen zu finden, die Sie brauchen. Nach Ihrer Registrierung bietet Peats Ihnen zwei Dienstleistungen:",
        features: [
            { name: "Erweiterte Suche", description: "Einen zeitlich begrenzten Zugang zu der erweiterten Suchfunktion inkl. Listenansicht" },
            { name: "Servicedienstleistung", description: "Personalisierte Beratung bei der Auswahl von Tools" },
        ]
    },

    {
        color: '#FF8024',
        name: 'Berater',
        description: "Ich stelle eine Liste für sie zusammen",
        features: [
            { description: "Foto, Name, Jobtitel" },
            { description: "Firmendarstellung" },
            { description: "Darstellung Ihrer Dienstleistungen" },
            { description: "Lokalisierung via Google Maps" },
            { description: "Artikel posten" },
            { description: "Verbindungen zu Anbietern und" },
            { description: "Zertifizierungen mit Tools anzeigen" },
        ],
    },


    
]


export default plans


