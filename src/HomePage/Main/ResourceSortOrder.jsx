import React, { Component } from 'react'
import { OnDesktop } from '../components/BreakingPoints/BreakingPoints.jsx'

const providers = {
    title: 'Finden Sie das passende Tool:',
    component: Provider,
    parameters: [
        { name: '360 Feedback', initials: '360', description: 'Gutachten über psychische und physische Belastung von Mitarbeitern.' },
        { name: 'Mitarbeiterbefragung', initials: 'MB', description: 'Psychologisches Assessment von Mitarbeitern und Bewerbern.' },
        { name: 'Personaltests', initials: 'PT', description: 'Ganzheitliches Feedback für Coaching und Entwichlung.' },
        { name: 'Gefährdenbeurteilung', initials: 'GB', description: 'Erfassung von Stimmungs - und Meinungsbildern im Unternehmen.' },
    ]
}

const tools = {
    title: 'Filtern Sie gezielt nach:',
    component: Tools,
    parameters: [
        { name: 'Personaltests', description: 'Von Kompetenz über Intelligenz bis Persönlichkeit – was wollen Sie testen?' },
        { name: 'Einsatzgebiete', description: 'Recruiting, Talentmanagement, Teamentwicklung – das richtige Tool für jeden Zweck.' },
        { name: 'Zielgruppe', description: 'Vom Azubi bis zum Partner - wählen Sie die richtige Mitarbeitergruppe aus.' },
        { name: 'Sprachen', description: 'Ob regional oder in aller Welt – sprechen Sie Ihre Bewerber im richtigen Ton an.' },
    ]
}


const resources = [providers, tools]

export default class ResourceSortOrder extends Component {
    renderResource(resource, index) {
        return <Resource {...resource} key={`resource-${index}`} />
    }

    render() {
        const renderResource = this.renderResource.bind(this)

        return (
            <div className='resource-sort-order'>
                {resources.map(renderResource)}
            </div>
        )

    }
}

function Resource(data) {
    let { title, component: Component, parameters } = data

    parameters = parameters.map((param, i) => <Component {...param} key={`param-${i}`} />)

    return (
        <div className="resource row" key={title}>
            <div className="small-12 medium-10 medium-offset-1 column">
                <h2 className="title small-12 large-4 large-offset-4">{title}</h2>
                <div className="parameters">
                    <div className="row">
                        {parameters}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Provider({ name, initials, description }) {
    return (
        <div className="parameter provider small-12 medium-6 large-3 column">
            <div className="header">
                <div className="categoryIcons">{initials}</div>
                <h4>{name}</h4>
            </div>
            <OnDesktop>
                <p className="small description">{description}</p>
            </OnDesktop>
        </div>
    )
}

function Tools({ name, description }) {
    return (
        <div className="parameter tool small-12 medium-6 large-3 column">
            <h3>{name}</h3>
            <p className="small">{description}</p>
        </div>
    )
}
