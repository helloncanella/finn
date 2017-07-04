import React, { Component, PropTypes } from 'react'
import {html} from '../../helpers.js' 


class Paragraph extends Component {
    render() {
        const { title, text, className } = this.props.data
            , classes = [className, 'paragraph', 'row', 'align-center'].join(" ")

        return (
            <div className={classes}>
                <div className="small-8 column ">
                    <h3 className="title">{title}</h3>
                    <p dangerouslySetInnerHTML={html(text)} />
                </div>
            </div>
        )
    }
}

Paragraph.propTypes = {
    data: PropTypes.object.isRequired
}

export default Paragraph