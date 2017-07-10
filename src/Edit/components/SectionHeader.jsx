import React, { Component } from "react"

class SectionHeader extends Component {
  render() {
    const { title, description } = this.props

    return (
      <div className="section-header">
        <h2 className="title">
          {title}
        </h2>
        <small className="description">
          {description}
        </small>
        <div className="division" />
      </div>
    )
  }
}

export default SectionHeader
