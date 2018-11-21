import React from 'react'
import propTypes from 'prop-types'
import RangeDatalist from './RangeDatalist'
import './RangeController.css'

const RangeConroller = ({
	className = 'range-conroller',
	type = 'range',
	inputId = 'range-controller',
	name = 'range-controller',
	min = 0,
	value = 0,
	step = 'any',
	data = [],
	slidesToShow = 1,
	dataList = false,
	onInput = f => f,
	onChange = f => f,
	onPrev = f => f,
	onNext = f => f,
	onDatalist = f => f,
	inputRange = f => f
}) => {
	const { length } = data
	const max = Math.ceil(length / slidesToShow)
	return (
		<fieldset className={className}>
			<div className={`${className}__grid`}>
				<legend className={`${className}__legend`}>Range Controlls</legend>
				<label htmlFor={`${className}__input`} className={`${className}__label`}>Choose owlsly</label>
				<input
					className={`${className}__input`}
					id={`${inputId}__input`}
					name={`${name}__input`}
					type={type}
					min={min}
					max={max}
					value={value}
					step={step}
					onInput={onInput}
					onChange={onChange}
					ref={inputRange}
					list='range-datalist'/>
				{
					dataList ?
						<RangeDatalist
							value={value}
							dataLength={length}
							slidesToShow={slidesToShow}
							onDatalist={onDatalist}/> :
						null
				}
				<div className={`${className}__actions`}>
					<button
						className={`${className}__action ${className}__action--prev`}
						onClick={onPrev}>
						Prev
					</button>
					<button
						className={`${className}__action ${className}__action--next`}
						onClick={onNext}>
						Next
					</button>
				</div>
			</div>
		</fieldset>
	)
}

RangeConroller.propTypes = {
	className: propTypes.string,
	type: propTypes.string,
	inputId: propTypes.string,
	name: propTypes.string,
	min: propTypes.number,
	max: propTypes.number,
	value: propTypes.oneOfType([
		propTypes.string,
		propTypes.number,
	]),
	step: propTypes.oneOfType([
		propTypes.string,
		propTypes.number,
	]),
	slidesToShow: propTypes.number,
	data: propTypes.array,
	dataList: propTypes.bool,
	onInput: propTypes.func,
	onChange: propTypes.func,
	onDatalist: propTypes.func,
	onPrev: propTypes.func,
	onNext: propTypes.func,
	inputRange: propTypes.object
}

export default RangeConroller
