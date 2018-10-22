import React from 'react'
import propTypes from 'prop-types'
import fakeImage from './fakeImage.png'
import { LazyImage } from 'react-lazy-images'

const RangeLazyImage = props => {
	const { className, src } = props
	return <LazyImage
		className={className}
		src="https://www.fillmurray.com/g/2700/1800"
		alt="A portrait of Bill Murray."
		debounceDurationMs={150}
		placeholder={({ imageProps, ref }) => (
			<img
				className={className}
				ref={ref}
				src="https://www.fillmurray.com/g/60/40"
				alt={imageProps.alt}
				style={{ width: "100%" }}
			/>
		)}
		actual={({ imageProps }) => (
			<img {...imageProps} style={{ width: "100%" }} />
		)}
	/>
}

RangeLazyImage.propTypes = {
	src: propTypes.string,
	url: propTypes.string,
	props: propTypes.object
}

export default RangeLazyImage
