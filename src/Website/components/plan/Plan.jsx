import React, { Component, PropTypes } from 'react'
import {html} from '../../helpers.js'
import './plan.scss'

export default class Plan extends Component {

    features() {
        const { features } = this.props.data

        const featuresList = features.map(({ name, description }, index) => {
            return (
                <li key={index} className="feature">
                    <h5 className="name">{name}</h5>
                    <p className="description" dangerouslySetInnerHTML={html(description)}></p>
                </li>
            )
        })

        return <ul className="features">{featuresList}</ul>
    }

    render() {
        let { name, description, footerComponent, color } = this.props.data

        const Features = this.features.bind(this)
            , Footer = footerComponent || function(){return null}

        const borderTop = { borderTop: `5px solid ${color}` }

        return (
            <div className="plan" >
                <div className="border-top" style={borderTop} />
                <h3 className="title">{name}</h3>
                <p dangerouslySetInnerHTML={html(description)}></p>
                <Features />
                <Footer />
            </div>
        )
    }

}

Plan.propTypes = {
    data: PropTypes.object.isRequired
}