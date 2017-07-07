import React, { Component } from "react"

class SectionHeader extends Component {
  render() {
    const { title, description } = this.props

    return (
      <div className="header">
        <h3 className="title">
          {title}
        </h3>
        <small className="description">
          {description}
        </small>
        <div className="division" />
      </div>
    )
  }
}

export default SectionHeader
