import React from 'react'
import './resources.scss'
import resources from './resources.json'

export default function Resources() {
    return (
        <div className="resources">
            <div className="row align-center">
                <div className="small-10 medium-8 column">
                    {resources.map((props, i) => <Resource {...props} key={`resource-${i}`} />)}
                </div>
            </div>
        </div>
    )
}

function Resource({ description, features, action }) {

    if (!!features) {
        features = features.map((props, i) => <Feature {...props} key={`feature-${i}`} />)
    }

    return (
        <div className="resource">
            <div className="content">
                <p className="description">{description}</p>
                {features && <ul className="features">{features}</ul>}
                {action && <button><a href={action.link}>{action.description}</a></button>}
            </div>
        </div>
    )
}

function Feature({ name, description, action }) {
    return (
        <li className="feature">
            <div className="content">
                <h4 className="name"><span>{name}</span></h4>
                {description && <p className="description" >{description}</p>}
            </div>
        </li>
    )
}