import React from 'react';
import characterists from './characterists.json'
import './about.scss'

export default function About() {
    
    const title = (
        <div className="row align-center title">
            <h1 className="small-12 medium-10 column">Unternehmen</h1>
        </div>
    )

    const allCharacterists = (
        <div className="row align-center characterists">
            <div className="small-12 medium-10 column">
                {characterists.map((props, i) => <Item {...props} key={`item-${i}`} />)}
            </div>
        </div>
    )

    return (
        <div className="about ">
            {title}
            {allCharacterists}
        </div>
    )
}

function Item({ title, text }) {
    return (
        <div className="characterist">
            <h2 className="title">{title}</h2>
            <p className="text">{text}</p>
        </div>
    ) 
}