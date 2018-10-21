import React from 'react'
import propTypes from 'prop-types'
// import LazyLoad from 'react-lazyload'

const splitIntoSubArray = (children, slidesToShow) => {
	const arrayLength = children.length
	let index = 0
	let tempArray = []
	
	for (index = 0; index < arrayLength; index += slidesToShow) {
		tempArray.push(children.slice(index, index + slidesToShow))
	}

	return tempArray
}

const RangeGroups = ({
	className,
	children,
	slidesToShow = 1,
	slidesPerRow = 1,
	// slidesToScroll = 1,
	// lazyLoad = false,
	value = 0
})=> {
	let slides = splitIntoSubArray(children, slidesToShow)
	const repeatX = `repeat(${Math.round(slidesToShow / slidesPerRow)}, 1fr)`
	const repeatY = `repeat(${slidesPerRow}, 1fr)`
	// 100 / children.length - 100 / children.length % 1
	// const cols = 100 / children.length - 100 / children.length % 1

	return (
		<div
			className={`${className}__balancer`}
			style={{
				transform: `translateX(${value}%)`
			}}>
			<div
				className={`${className}__track`}
				style={{
					width: `calc(100% * ${slides.length})`,
					transform: `translateX(-${value}%)`
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

RangeGroups.propTypes = {
	className: propTypes.string,
	children: propTypes.oneOfType([
		propTypes.arrayOf(propTypes.node),
		propTypes.node
	]).isRequired,
	slidesToShow: propTypes.number,
	slidesToScroll: propTypes.number,
	slidesPerRow: propTypes.number,
	breakpoint: propTypes.number,
	lazyLoad: propTypes.bool,
	value: propTypes.oneOfType([
		propTypes.string,
		propTypes.number
	])
}

export default RangeGroups
