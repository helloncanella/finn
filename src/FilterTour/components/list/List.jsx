import React, { Component } from 'react'
import './list.scss'

export default class List extends Component {

	renderList() {
		const { data } = this.props

		return data.map(({ primaryText, marked, secondaryText }, index) => {

			const onSelectItem = () => this.props.onSelectItem(primaryText)
				, className = marked ? 'active' : null

			return (
				<li onClick={onSelectItem} key={index} className={className}>
					<span className="primary-text">{primaryText}</span><br />
					{secondaryText ? <span className="secondary-text">{secondaryText}</span> : null}
				</li>
			)
		})
	}

	scroll() {
		this.list.scrollTop += 200
	}

	render() {
		const list = this.renderList()
			, classes = [this.props.className, "list"].join(" ")
			, numberOfItems = this.props.showNumberItems && list.length

		return (
			<div className={classes}>
				<h3 className="title">
					{!!numberOfItems && <span>{`${numberOfItems} `}</span>}
					{this.props.title}
				</h3>
				<ul ref={e => this.list = e}>{list}</ul>
				<div className="opacity">
					<div className="marker" onClick={this.scroll.bind(this)}></div>
				</div>
			</div>
		)
	}
}