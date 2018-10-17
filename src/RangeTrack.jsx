import React from 'react'
import propTypes from 'prop-types'

const splitIntoSubArray = (children, slidesToShow) => {
	const arrayLength = children.length;
	let index = 0;
	let tempArray = [];
	
	for (index = 0; index < arrayLength; index += slidesToShow) {
		tempArray.push(children.slice(index, index + slidesToShow));
	}

	return tempArray;
}

const RangeGroups = ({
	className,
	children,
	slidesToShow = 1,
	slidesPerRow = 1,
	value = 0
})=> {
	let slides = splitIntoSubArray(children, slidesToShow)
	const repeatX = `repeat(${slidesToShow / slidesPerRow}, 1fr)`
	const repeatY = `repeat(${slidesPerRow}, 1fr)`
	return (
		<div
			className={className}
			style={{transform: `translateX(${value}%)`}}>
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
	slidesPerRow: propTypes.number,
	value: propTypes.oneOfType([
		propTypes.string,
		propTypes.number
	])
}

export default RangeGroups
