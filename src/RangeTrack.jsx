import React from 'react'
import propTypes from 'prop-types'
import splitIntoSubArray from './splitIntoSubArray'

const RangeTrack = ({
	className = 'range-slider',
	children = [],
	slidesToShow = 1,
	slidesPerRow = 1,
	value = 0
})=> {
	const slides = splitIntoSubArray(children, slidesToShow)
	const repeatX = `repeat(${Math.round(slidesToShow / slidesPerRow)}, 1fr)`
	const repeatY = `repeat(${slidesPerRow}, 1fr)`
	
	return (
		<div
			className={`${className}__balancer`}
			style={{
				transform: `translateX(${(100 / slides.length) * value}%)`
			}}>
			<div
				className={`${className}__track`}
				style={{
					width: `calc(100% * ${slides.length})`,
					transform: `translateX(-${(100 / slides.length) * value}%)`
				}}>
				{
					slides.map((slidesToShow, index) =>
						<div className={`${className}__group`} key={index} style={{
							gridTemplateColumns: repeatX,
							gridTemplateRows: repeatY
						}}>
							{
								slidesToShow.map((item, index) =>
									<div className={`${className}__item`} key={index}>
										<div className={`${className}__filler`}>
											{item}
										</div>
									</div>)
							}
						</div>)
				}
			</div>
		</div>
	)
}

RangeTrack.propTypes = {
	className: propTypes.string,
	children: propTypes.oneOfType([
		propTypes.arrayOf(propTypes.node),
		propTypes.node
	]).isRequired,
	slidesToShow: propTypes.number,
	slidesToScroll: propTypes.number,
	slidesPerRow: propTypes.number,
	breakpoint: propTypes.number,
	value: propTypes.oneOfType([
		propTypes.string,
		propTypes.number
	])
}

export default RangeTrack
