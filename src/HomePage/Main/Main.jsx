import React, { Component } from 'react'
import StatisticsAndMap from './StatisticsAndMap.jsx'
import ResourceSortOrder from './ResourceSortOrder.jsx';
import ForWhoIsPeats from './ForWhoIsPeats.jsx'
import Articles from './Articles.jsx'
import {OnMobile} from '../components/BreakingPoints/BreakingPoints.jsx'
import './main.scss'

export default class Main extends Component {

    render() {

        return (
            <main>
                <OnMobile>
                    <StatisticsAndMap />
                </OnMobile>
                <ForWhoIsPeats />
                <ResourceSortOrder/>
                <Articles />
            </main>
        )

    }

} 