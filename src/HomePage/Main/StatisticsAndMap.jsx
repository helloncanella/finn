import React, { Component } from 'react'
import { OnMobile } from '../components/BreakingPoints/BreakingPoints.jsx'
import Statistics from './components/Statistics.jsx'

export default class StatisticAndMap extends Component {

    render() {
        return (
            <div className='statistics-and-map row'>
                <div className="figures small-4 medium-12 column">
                    <Statistics />
                </div>
                <OnMobile>
                    <div className="map small-8 column">
                        <img src="//i.imgur.com/hsLBw8O.png" alt="" />
                    </div>
                </OnMobile>
            </div>
        )

    }

}

