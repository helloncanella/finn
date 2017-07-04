import React, { Component } from 'react'

const Figure = ({ data, value }) => {
    return (
        <div className="figure">
            <h1>{value}</h1>
            <p className="small">{data}</p>
        </div>
    )
}

export default function Statistics() {
    const figures = [
        { data: 'Tools', value: 75 },
        { data: 'Anbieter', value: 99 },
        { data: 'Berater', value: 45 },
        { data: 'Artikel', value: 517 }
    ]

    const renderFigure = (statistic, index) => (<Figure {...statistic} key={`figure-${index}`} />)

    return (
        <div className="statistics">
            {figures.map(renderFigure)}
        </div>
    )
}
