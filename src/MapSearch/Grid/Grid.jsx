import React, { Component } from 'react'

import './style.scss'

export default class Grid extends Component {

    components() {
        return this.props.components.map((component, index) => {
            return (
                <main className="small-12 medium-6 column" key={index}>
                    {component}
                </main>
            )
        })
    }

    render() {

        return (
            <main className='grid row'>
                {this.components()}
            </main>
        )

    }

}