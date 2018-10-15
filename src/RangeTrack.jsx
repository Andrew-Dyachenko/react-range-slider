import React from 'react'
import PropTypes from 'prop-types'

const splitIntoSubArray = (children, group) => {
	const arrayLength = children.length;
	let index = 0;
	let tempArray = [];
	
	for (index = 0; index < arrayLength; index += group) {
		tempArray.push(children.slice(index, index + group));
	}

	return tempArray;
}

const RangeGroups = ({children, group}) => {
	let groups = splitIntoSubArray(children, group)
	return (
		<div className="range-slider__track" style={{width: `calc(100% * ${groups.length})`}}>
			{
				groups.map((group, index) =>
					<div className="range-slider__group" key={index}>
						{
							group.map((item, index) =>
								<div className="range-slider__item" key={index}>
									{item}
								</div>)
						}
					</div>)
			}
		</div>
	)
}

RangeGroups.propTypes = {
	children: PropTypes.array,
	group: PropTypes.number
}

export default RangeGroups
