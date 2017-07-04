import React, { Component } from 'react'
import Filter from './components/filter/Index.jsx'
import { TweenMax, Expo } from 'gsap'
import { clientRect } from './helpers.js'

import './index.scss'

const isNotArray = (element) => !Array.isArray(element)

export default class FilterTour extends Component {


	reload(delay) {
		function toExecute() {
			this.filter.reload()
			this.animate()
		}

		setTimeout(toExecute.bind(this), delay)
	}

	highlightWhenHovering(element, references) {

		if (isNotArray(references) && references)
			references = [references]

		references.forEach(reference => {
			const { top, bottom } = this.clientRect(reference)
				, elementBottom = this.clientRect(element).bottom

			const { classList } = reference
				, className = 'highlighted'
				, isHighlighted = classList.contains(className)

			const isHovering = top <= elementBottom && elementBottom <= bottom

			if (isHovering && !isHighlighted) classList.add(className)
			else if (!isHovering && isHighlighted) classList.remove(className)
		})


	}

	setupPassThrough(initialNode) {

		const nextSibling = initialNode.nextSibling
			, initialNodePosition = this.clientRect(initialNode)

		const from = {
			x: initialNodePosition.right - 50,
			y: initialNodePosition.top + 20
		}

		const to = {
			y: this.clientRect(nextSibling).top,
			delay: 0.2,
			ease: Expo.easeOut,
			onUpdate: () => {
				const references = [initialNode, nextSibling]
				this.highlightWhenHovering(this.cursor, references)
			}
		}

		return { nextSibling, from, to }
	}

	executeAnimation(sequences) {
		let animations

		let sequence = sequences.shift().call(this)

		if (isNotArray(sequence) && sequence)
			sequence = [sequence]

		sequence.forEach(promise => {
			if (!animations)
				animations = promise()
			else
				animations = animations.then(promise)
		})

		if (sequences.length)
			return animations.then(() => this.executeAnimation(sequences))
		else
			return animations

	}

	passThroughAnimation({ initialNode, numberNextItems, clickEachItem, clickLastItem, index }) {
		let { nextSibling, from, to } = this.setupPassThrough(initialNode)

		const toClickLastItem = (numberNextItems === index && clickLastItem)

		const onComplete = (resolve) => {
			if (clickEachItem || toClickLastItem) nextSibling.click();
			resolve()
		}

		const animation = () => new Promise(resolve => {
			to.onComplete = () => onComplete(resolve)

			if (index === 1 && clickEachItem)
				to.onStart = () => initialNode.click()

			TweenMax.fromTo(this.cursor, this.props.itemTransition || 0.6, from, to)
		})

		return { animation, lastElement: nextSibling }

	}

	passThrough(config) {

		return function pass() {
			config.initialNode = this.query(config.initialNode)

			let sequence = []
			for (let i = 1; i <= config.numberNextItems; i++) {
				config.index = i

				const { animation, lastElement } = this.passThroughAnimation(config)
				sequence.push(animation)

				config.initialNode = lastElement
			}

			return sequence

		}.bind(this)

	}

	query(selector) {
		return document.querySelector(selector)
	}

	click(node, delay = 200) {

		return function () {
			node = this.query(node)

			const { right, top } = this.clientRect(node)

			const onComplete = (resolve) => {

				const toExecute = () => {
					node.click()
					resolve()
				}

				setTimeout(toExecute, delay)
			}

			let config = {
				x: right - 50,
				y: top + 20,
				onUpdate: () => this.highlightWhenHovering(this.cursor, node)
			}

			const animation = () => new Promise(resolve => {
				config.onComplete = onComplete(resolve)
				TweenMax.set(this.cursor, config)
			})

			return animation
		}

	}

	goTo(node) {
		return () => {
			const { top, right } = this.clientRect(this.query(node))

			let to = {
				x: right - 50,
				y: top + 20
			}

			const animation = () => new Promise(resolve => {
				to.onComplete = resolve
				TweenMax.to(this.cursor, this.props.columnTransition || 0.25, to)
			})

			return animation
		}
	}

	animate() {

		let categories = '.categories li:nth-child(2)'
			, characteristics = '.characteristics li:nth-child(2)'
			, adequatedTools = '.adequated-tools li'

		let sequences = [
			this.click(categories, 300),
			this.goTo(characteristics),
			this.passThrough({
				initialNode: characteristics,
				numberNextItems: 1,
				clickEachItem: true
			}),
			this.goTo(adequatedTools),
			this.click(adequatedTools),
		]

		this.executeAnimation(sequences).then(this.reload.bind(this, 1000))
	}


	clientRect(node) {
		const reference = this.filterTourBox
		return clientRect(node, reference)
	}

	componentDidMount() {
		this.animate()
	}

	render() {
		return (
			<div className='filter-tour' ref={e => this.filterTourBox = e}>
				<div className="cursor" ref={e => this.cursor = e} />
				<Filter reference={e => this.filter = e} />
			</div>
		)
	}
}

