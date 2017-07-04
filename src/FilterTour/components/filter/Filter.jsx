import React, { Component } from 'react'
import List from '../list/List.jsx'
import './filter.scss'


export default class Filter extends React.Component {

	constructor() {
		super()

		this.state = {
			subcategories: [],
			resources: []
		}

		this.onSelectItem = this.onSelectItem.bind(this)
	}

	reload() {
		this.props.restartData();
		this.setState({ subcategories: [], resources: [] })
	}

	fetchData({ collection, tag }) {
		let newState = {}
		newState[collection] = this.props.data[collection].list(tag)

		this.setState(newState)
	}

	onSelectItem({ collection, itemName, childCollection }) {
		this.unmarkAllCollectionIfNecessary(collection)

		this.props.toggleItem({ collection, itemName })

		if (!!childCollection)
			this.fetchData({ collection: childCollection, tag: itemName })
		else
			//the component should be always updated when the item is toggled. It doesn't occour automatically if this.fetchData is not called
			this.forceUpdate()

	}

	unmarkAllCollectionIfNecessary(collection) {
		const { data, unmarkAllCollection } = this.props
			, { multipleSelection } = data[collection]

		if (!multipleSelection) unmarkAllCollection(collection)
	}

	categoriesProps() {
		const collection = "categories"
			, childCollection = "subcategories"

		return {
			data: this.props.data.categories.list(),
			onSelectItem: itemName => this.onSelectItem({ itemName, collection, childCollection }),
			title: "Kategorien",
			className: "categories"
		}
	}

	subcategoriesProps() {
		const collection = "subcategories"
			, childCollection = "resources"

		return {
			data: this.state.subcategories,
			onSelectItem: itemName => this.onSelectItem({ itemName, collection, childCollection }),
			childCollection: "resources",
			title: "Eigenschaften",
			className: "characteristics",
		}
	}

	adequatedToolsProps() {
		const collection = "resources"

		return {
			data: this.state.resources,
			onSelectItem: itemName => this.onSelectItem({ itemName, collection }),
			title: "Passende Tools",
			className: "adequated-tools",
			showNumberItems: true
		}
	}

	render() {
		
		//<div className="protection-layer" />: prevents the clicking and its side effects.		
		
		return (
			<div className='filter-component row' ref={e => this.filter = e}>
				<div className="protection-layer" />
				<div className="small-12 medium-4 column">
					<List {...this.categoriesProps() } />
				</div>
				<div className="small-12 medium-4 column">
					<List {...this.subcategoriesProps() } />
				</div>
				<div className="small-12 medium-4 column">
					<List {...this.adequatedToolsProps() } />
				</div>
			</div>
		)
	}
}













