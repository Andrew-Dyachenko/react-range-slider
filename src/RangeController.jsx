import React from 'react'
import propTypes from 'prop-types'
import RangeDatalist from './RangeDatalist'

const RangeConroller = ({
	className = 'range-conroller',
	type = 'range',
	inputId = 'range-controller',
	name = 'range-controller',
	min = 0,
	max = 100,
	value = 0,
	step = 'any',
	data = [],
	dataList = false,
	onInput = f => f,
	onChange = f => f,
	onPrev = f => f,
	onNext = f => f,
	inputRange = f => f
}) =>
	<fieldset className={className}>
		<legend>Range Slider Controller</legend>
		<label htmlFor={`${className}__input`}>Controllers</label>
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
			ref={inputRange}/>
		{
			dataList ?
				<RangeDatalist data={data} value={value}/> :
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
	</fieldset>

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
	data: propTypes.array,
	dataList: propTypes.bool,
	onInput: propTypes.func,
	onChange: propTypes.func,
	onPrev: propTypes.func,
	onNext: propTypes.func,
	inputRange: propTypes.object
}

export default RangeConroller
