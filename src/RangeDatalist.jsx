import React from 'react'
import propTypes from 'prop-types'
import './RangeDatalist.css'
import splitIntoSubArray from './splitIntoSubArray'

const RangeDatalist = ({
	className = 'range-datalist',
	data = [],
	value = 0,
	slidesToShow = 1,
	onDatalist = f => f
}) => {
	const splited = splitIntoSubArray(data, slidesToShow)
	return	(
		<datalist className={`${className}`} id={`${className}`}>
			{
				splited.map((item, index) => {
					// const alt = !Array.isArray(item) ? item.props : ''
					return (
						<option
							className={index <= value ?
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
	data: propTypes.array,
	value: propTypes.oneOfType([
		propTypes.number,
		propTypes.string
	]),
	slidesToShow: propTypes.number,
	onDatalist: propTypes.func

}

export default RangeDatalist
