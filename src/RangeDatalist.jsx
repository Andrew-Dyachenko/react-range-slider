import React from 'react'
import propTypes from 'prop-types'
import './RangeDatalist.css'

const RangeDatalist = ({
	className = 'range-datalist',
	value = 0,
	accuracy = 100,
	dataLength = 0,
	slidesToShow = 1,
	onDatalist = f => f
}) => {
	const groupsLength = Math.ceil(dataLength / slidesToShow)
	return	(
		<datalist className={`${className}`} id={`${className}`}>
			{
				Array(accuracy).fill(0).map((item, index) => {
					console.log(Number(((index + 1) * Number((groupsLength / 100))).toFixed(2)), Number(Number(value).toFixed(2)))
					const isActive = index === 0 ?
						true :
						Number(((index + 1) * Number((groupsLength / 100))).toFixed(2)) <= Number(Number(value).toFixed(2))

					return (
						<option
							className={isActive ?
								`${className}__option ${className}__option--active` :
								`${className}__option`
							}
							// title={alt}
							key={index}
							value={index}
							onClick={onDatalist}/>
					)}
				)
			}
		</datalist>
	)
}

RangeDatalist.propTypes = {
	className: propTypes.string,
	dataLength: propTypes.number,
	slidesToShow: propTypes.number,
	value: propTypes.oneOfType([
		propTypes.number,
		propTypes.string
	]),
	accuracy: propTypes.number,
	onDatalist: propTypes.func
}

export default RangeDatalist
