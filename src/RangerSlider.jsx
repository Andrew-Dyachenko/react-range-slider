import React, { Component } from 'react'
import propTypes from 'prop-types'
import { compose } from 'redux'
import RangeTrack from './RangeTrack'
import RangeController from './RangeController'
import './RangeSlider.css'

const getAppropriateBreakpoint = ({ innerWidth, breakpoints }) =>
	breakpoints.reduce((max, next) =>
		max < innerWidth && next <= innerWidth ? next : max, 0)

const getAppropriateGroup = ({ breakpoint, responsive }) =>
	responsive.reduce((max, obj) =>
		breakpoint === obj.breakpoint ? obj.group : max, 1)

const getBreakpoints = ({ innerWidth, responsive }) => {
	const breakpoints = responsive.reduce((points, obj) => 
		[...points, obj.breakpoint], [])

	return {
		innerWidth,
		breakpoints
	}
}

const getBreakpoint = compose(
	getAppropriateBreakpoint,
	getBreakpoints
)

const getGroup = compose(
	getAppropriateGroup
)

export default class RangeSlider extends Component {
	static propTypes = {
		className: propTypes.string,
		conrollerClassName: propTypes.string,
		group: propTypes.number,
		breakpoint: propTypes.number,
		responsive: propTypes.array,
		children: propTypes.oneOfType([
			propTypes.arrayOf(propTypes.node),
			propTypes.node
		]).isRequired
	}

	static defaultProps = {
		className: 'range-slider',
		conrollerClassName: 'range-conroller',
		responsive: [
			{
				breakpoint: 0,
				group: 1
			},
			{
				breakpoint: 480,
				group: 2
			},
			{
				breakpoint: 768,
				group: 3
			},
			{
				breakpoint: 1024,
				group: 4
			},
			{
				breakpoint: 1366,
				group: 5
			},
			{
				breakpoint: 1600,
				group: 6
			},
			{
				breakpoint: 1920,
				group: 7
			}
		]
	}

	constructor(props) {
		super(props)
		this.onResize = this.onResize.bind(this)
		this.onInput = this.onInput.bind(this)
		this.getState = this.getState.bind(this)
		this.onPrev = this.onPrev.bind(this)
		this.onNext = this.onNext.bind(this)
		this.setDimension = this.setDimension.bind(this)
		this.updateDimension = this.updateDimension.bind(this)
		this.inputRange = React.createRef()

		console.log('this.inputRange: ', this.inputRange)

		const state = this.getState()
		this.setDimension(state)
	}

	componentDidMount() {
		console.log('this.state.dimension: ', this.state.breakpoint, 'this.state.group: ', this.state.group)
		window.addEventListener('resize', this.onResize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize)
	}

	onInput(e) {
		console.log(e)
		const { target } = e
		const { value } = target

		this.setState({ value })
	}

	onResize() {
		const state = this.getState()
		this.updateDimension(state)
	}

	onPrev() {
		const { inputRange } = this
		const currentValue = Number(inputRange.current.value)
		const value = currentValue >= 1 ?
			currentValue - 1 :
			0
		this.setState({ value })
	}

	onNext() {
		const { inputRange } = this
		const currentValue = Number(inputRange.current.value)
		const value = currentValue <= 99 ?
			currentValue + 1 :
			100
		this.setState({ value })
	}

	getState() {
		const { innerWidth } = window
		const { responsive } = this.props
		const breakpoint = getBreakpoint({innerWidth, responsive})
		const group = getGroup({breakpoint, responsive})

		return {
			breakpoint,
			group
		}
	}

	setDimension ({breakpoint, group}) {
		// eslint-disable-next-line
		this.state = { breakpoint, group }
		console.log('this.state.dimension: ', this.state.breakpoint, 'this.state.group: ', this.state.group)
	}

	updateDimension({breakpoint, group}) {
		this.setState({ breakpoint, group })
		console.log('this.state.dimension: ', this.state.breakpoint, 'this.state.group: ', this.state.group)
	}

	render() {
		const { children, className, conrollerClassName } = this.props
		const { breakpoint, group, value } = this.state
		const { onInput, onPrev, onNext, inputRange } = this
		return (
			<div className={className}>
				<div className={`${className}__keyhole`}>
					<RangeTrack
						className={className}
						group={group}
						breakpoint={breakpoint}
						value={value}>
						{children}
					</RangeTrack>
				</div>
				<RangeController
					inputRange={inputRange}
					className={conrollerClassName}
					onInput={onInput}
					value={value}
					onPrev={onPrev}
					onNext={onNext}/>
			</div>
		)
	}
}
