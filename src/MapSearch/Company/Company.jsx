import React, { Component, PropTypes } from 'react'

export default class Company extends Component {
    static propTypes = {
        onMouseOut: PropTypes.func.isRequired,
        onMouseOver: PropTypes.func.isRequired,
        onClick: PropTypes.func,
        data: PropTypes.object.isRequired
    }

    render() {
        const { onMouseOver, onMouseOut, onClick, data } = this.props
            , { image, name } = data.profile.contact

        return (
            <main className="company" onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
                <img src={image.path} alt="" />
                <h5 className="name">{name}</h5>
            </main>
        )
    }

}