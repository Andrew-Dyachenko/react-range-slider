import React from 'react'
import propTypes from 'prop-types'
import fakeImage from './fakeImage.png'
import { LazyImage } from 'react-lazy-images'

const RangeLazyImage = props => {
	const { className, src, alt } = props
	return <LazyImage
		className={className}
		src={src}
		alt={alt}
		debounceDurationMs={100}
		placeholder={({ ref }) => (
			<img
				className={className}
				ref={ref}
				src={fakeImage}
				alt={alt}
			/>
		)}
		actual={({ imageProps }) => (
			<img alt={alt} {...imageProps} />
		)}
	/>
}

RangeLazyImage.propTypes = {
	src: propTypes.string,
	url: propTypes.string,
	props: propTypes.object
}

export default RangeLazyImage
