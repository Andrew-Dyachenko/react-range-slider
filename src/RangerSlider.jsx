import React, { Component } from 'react'
import propTypes from 'prop-types'
import { compose } from 'redux'
import RangeTrack from './RangeTrack'
import RangeController from './RangeController'
import './RangeSlider.css'

const getBreakpoints = ({ innerWidth, responsive }) => {
	const breakpoints = responsive.reduce((points, obj) => 
		[...points, obj.breakpoint], [])

	return {
		innerWidth,
		breakpoints
	}
}

const getAppropriateBreakpoint = ({ innerWidth, breakpoints }) =>
	breakpoints.reduce((max, next) =>
		max < innerWidth && next <= innerWidth ?
			next :
			max, 0)

const getAppropriateSlidesToShow = ({ breakpoint, responsive }) =>
	responsive.reduce((prev, obj) =>
		breakpoint === obj.breakpoint ?
			obj.slidesToShow :
			prev, 1)

const getAppropriateSlidesToScroll = ({ breakpoint, responsive }) =>
	responsive.reduce((prev, obj) =>
		breakpoint === obj.breakpoint ?
			obj.slidesToScroll :
			prev, 1)

const getBreakpoint = compose(
	getAppropriateBreakpoint,
	getBreakpoints
)

const getSlidesToShow = compose(
	getAppropriateSlidesToShow
)

const getSlidesToScroll = compose(
	getAppropriateSlidesToScroll
)

export default class RangeSlider extends Component {
	static propTypes = {
		className: propTypes.string,
		conrollerClassName: propTypes.string,
		slidesToShow: propTypes.number,
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
		slidesToScroll: 1,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 0,
				slidesToShow: 1,
				slidesToScroll: 1
			},
			{
				breakpoint: 480,
				slidesToShow: 2,
				slidesToScroll: 2
			},
			{
				breakpoint: 768,
				slidesToShow: 3,
				slidesToScroll: 3
			},
			{
				breakpoint: 1024,
				slidesToShow: 4,
				slidesToScroll: 4
			},
			{
				breakpoint: 1366,
				slidesToShow: 5,
				slidesToScroll: 5
			},
			{
				breakpoint: 1600,
				slidesToShow: 6,
				slidesToScroll: 6
			},
			{
				breakpoint: 1920,
				slidesToShow: 7,
				slidesToScroll: 7
			}
		]
	}

	constructor(props) {
		super(props)
		this.onResize = this.onResize.bind(this)
		this.onInput = this.onInput.bind(this)
		this.getDimensions = this.getDimensions.bind(this)
		this.onPrev = this.onPrev.bind(this)
		this.onNext = this.onNext.bind(this)
		this.setDimension = this.setDimension.bind(this)
		this.updateDimension = this.updateDimension.bind(this)
		this.inputRange = React.createRef()

		// console.log('this.inputRange: ', this.inputRange)

		const state = this.getDimensions()
		this.setDimension(state)
	}

	componentDidMount() {
		// console.log('this.state.dimension: ', this.state.breakpoint, 'this.state.slidesToShow: ', this.state.slidesToShow)
		window.addEventListener('resize', this.onResize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize)
	}

	onInput(e) {
		// console.log(e)
		const { target } = e
		const { value } = target

		this.setState({ value })
	}

	onResize() {
		const state = this.getDimensions()
		this.updateDimension(state)
	}

	onPrev() {
		const { inputRange, slidesToScroll } = this
		const currentValue = Number(inputRange.current.value)
		// console.log('currentValue: ', currentValue, 'slidesToScroll: ', slidesToScroll, 'currentValue <= 100 - slidesToScroll: ', currentValue <= 100 - slidesToScroll)
		const value = currentValue >= slidesToScroll ?
			currentValue - slidesToScroll :
			0
		// console.log('new val is: ', value)
		this.setState({ value })
	}

	onNext() {
		const { inputRange, slidesToScroll } = this
		const currentValue = Number(inputRange.current.value)
		// console.log('currentValue: ', currentValue, 'slidesToScroll: ', slidesToScroll, 'currentValue <= 100 - slidesToScroll: ', currentValue <= 100 - slidesToScroll)
		const value = currentValue <= 100 - slidesToScroll ?
			currentValue + slidesToScroll :
			100
		// console.log('new val is: ', value)
		this.setState({ value })
	}

	getDimensions() {
		const { innerWidth } = window
		const { responsive } = this.props
		const breakpoint = getBreakpoint({innerWidth, responsive})
		const slidesToShow = getSlidesToShow({breakpoint, responsive})
		const slidesToScroll = getSlidesToScroll({breakpoint, responsive})

		console.log('slidesToScroll: ', slidesToScroll)

		return {
			breakpoint,
			slidesToShow,
			slidesToScroll
		}
	}

	setDimension (dimensions) {
		// eslint-disable-next-line
		this.state = { ...dimensions  }
		// console.log('this.state.dimension: ', this.state.breakpoint, 'this.state.slidesToShow: ', this.state.slidesToShow)
	}

	updateDimension(dimensions) {
		this.setState({ ...dimensions })
		// console.log('this.state.dimension: ', this.state.breakpoint, 'this.state.slidesToShow: ', this.state.slidesToShow)
	}

	render() {
		const { children, className, conrollerClassName } = this.props
		const { breakpoint, slidesToShow, value } = this.state
		const { onInput, onPrev, onNext, inputRange } = this
		return (
			<div className={className}>
				<div className={`${className}__keyhole`}>
					<RangeTrack
						className={className}
						slidesToShow={slidesToShow}
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
