import React from 'react'
import propTypes from 'prop-types'
import './RangeDatalist.css'

const RangeDatalist = ({
	className = 'range-datalist',
	label = '',
	title = '',
	value = 0,
	onDatalist = f => f }) =>
	<datalist className={`${className}`} id={`${className}`}>
		{
			new Array(100).fill(0).map((item, index, array) => {
				const { length } = array
				return (
					<option
						className={length / 100 * index < value ?
							`${className}__option ${className}__option--active` :
							`${className}__option`
						}
						label={label}
						title={title}
						key={index}
						value={index}
						onClick={onDatalist}/>
				)}
			)
		}
	</datalist>

RangeDatalist.propTypes = {
	className: propTypes.string,
	label: propTypes.string,
	title: propTypes.string,
	value: propTypes.oneOfType([
		propTypes.number,
		propTypes.string
	]),
	onDatalist: propTypes.func

}

export default RangeDatalist
