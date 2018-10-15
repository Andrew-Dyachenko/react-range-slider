import React from 'react'
import propTypes from 'prop-types'

const splitIntoSubArray = (children, group) => {
	const arrayLength = children.length;
	let index = 0;
	let tempArray = [];
	
	for (index = 0; index < arrayLength; index += group) {
		tempArray.push(children.slice(index, index + group));
	}

	return tempArray;
}

const RangeGroups = ({
	className,
	children,
	group = 1,
	value = 0
})=> {
	let groups = splitIntoSubArray(children, group)
	const repeat = `repeat(${group}, 1fr)`
	return (
		<div
			className={className}
			style={{transform: `translateX(${value}%)`}}>
			<div
				className={`${className}__track`}
				style={{
					width: `calc(100% * ${groups.length})`,
					transform: `translateX(-${value}%)`
				}}>
				{
					groups.map((group, index) =>
						<div className={`${className}__group`} key={index} style={{
							gridTemplateColumns: repeat
						}}>
							{
								group.map((item, index) =>
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
	group: propTypes.number,
	value: propTypes.oneOfType([
		propTypes.string,
		propTypes.number
	])
}

export default RangeGroups
