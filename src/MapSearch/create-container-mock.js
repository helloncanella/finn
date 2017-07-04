import React from 'react'

export default function createContainerMock(propsFunction, Component) {
	return (additionalProps) => {
		let props = Object.assign({}, additionalProps, propsFunction())
			, { reference } = additionalProps

		return <Component {...props} ref={reference}></Component>
	}
}