import React, { Component } from 'react'
import propTypes from 'prop-types'
import './RangeLazyImage.css'
import fakeImage from './fakeImage.png'
import { LazyImage } from 'react-lazy-images'

export default class RangeLazyImage extends Component {
	static propTypes = {
		src: propTypes.string,
		fakeSrc: propTypes.string,
		className: propTypes.string
	}

	static defaultProps = {
		src: '',
		fakeSrc: '',
		className: 'range-gallery'
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
			className={`${className}__img`}
			src={src}
			alt={alt}
			debounceDurationMs={100}
			placeholder={({ ref }) => (
				<img
					className={`${className}__img ${className}__img--placeholder`}
					ref={ref}
					src={fakeSrc}
					alt={alt}
				/>
			)}
			actual={({ imageProps }) => (
				<img
					alt={alt}
					className={`${className}__img  ${className}__img--actual`}
					{...imageProps} />
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
