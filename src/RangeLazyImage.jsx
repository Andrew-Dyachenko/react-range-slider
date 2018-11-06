import React, { Component } from 'react'
import propTypes from 'prop-types'
import fakeImage from './fakeImage.png'
import { LazyImage } from 'react-lazy-images'

export default class RangeLazyImage extends Component {
	static propTypes = {
		src: propTypes.string,
		fakeSrc: propTypes.string
	}

	static defaultProps = {
		src: '',
		fakeSrc: ''
	}

	shouldComponentUpdate(nextProps) {
		const { fakeSrc } = this.props
		if (fakeSrc !== nextProps.fakeSrc) {
			return true
		}
		return false
	}

	render() {
		const { props } = this
		const { className, src, alt } = props
		const fakeSrc = props.fakeSrc || fakeImage
		return <LazyImage
			className={className}
			src={src}
			alt={alt}
			debounceDurationMs={100}
			placeholder={({ ref }) => (
				<img
					className={className}
					ref={ref}
					src={fakeSrc}
					alt={alt}
				/>
			)}
			actual={({ imageProps }) => (
				<img alt={alt} {...imageProps} />
			)}
		/>
	}
}

// const RangeLazyImage = props => {
// 	const { className, src, alt } = props
// 	const fakeSrc = props.fakeSrc || fakeImage
// 	return <LazyImage
// 		className={className}
// 		src={src}
// 		alt={alt}
// 		debounceDurationMs={100}
// 		placeholder={({ ref }) => (
// 			<img
// 				className={className}
// 				ref={ref}
// 				src={fakeSrc}
// 				alt={alt}
// 			/>
// 		)}
// 		actual={({ imageProps }) => (
// 			<img alt={alt} {...imageProps} />
// 		)}
// 	/>
// }
