import React from 'react'
import PropTypes from 'prop-types'

const splitIntoSubArray = (arr, group) => {
	let newArray = []
	while (arr.length > 0) {
		newArray.push(arr.splice(0, group)) 
	}
	return newArray
}

const RangeGroups = ({children, group}) => {
	const groups = splitIntoSubArray(children, group)
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
