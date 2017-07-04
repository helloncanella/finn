/**
 * Simulation of the behavior of the filter tour when embedded in a page with scroll.
 */

import React, { Component } from 'react'
import FilterTour from './FilterTour.jsx'

class Lorem extends Component {

    paragraphs() {
        let paragraphs = []

        const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Commodi, vero dolores voluptatem veritatis totam fugiat, neque expedita aut nulla animi mollitia. 
        Doloribus sequi, reprehenderit quidem possimus. 
        Quo perferendis est voluptatibus, facilis, animi molestiae quos expedita, ipsa aliquam aliquid tempora ex, corporis. 
        `

        for (let i = 1; i <= 5; i++) {
            paragraphs.push(<p className='small-8'>{lorem}</p>)
        }

        return paragraphs
    }

    render() {
        return (
            <div className='row align-center'>
                {this.paragraphs()}
            </div>
        )
    }
}


export default class FilterTourInsideAScroll extends Component {
    render() {
        return (
            <div className="filter-inside-scroll">
                <Lorem />
                <FilterTour/>
                <Lorem />
            </div>
        )
    }
}