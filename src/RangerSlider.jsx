import React, { Component } from 'react'
import propTypes from 'prop-types'
import { compose } from 'redux'
import RangeTrack from './RangeTrack'
import RangeController from './RangeController'
import './RangeSlider.css'

const getBreakpoints = ({ windowInnerWidth, responsive }) => {
	const breakpoints = responsive.reduce((points, obj) => 
		[...points, obj.breakpoint], [])

	return {
		windowInnerWidth,
		breakpoints
	}
}

const getAppropriateBreakpoint = ({ windowInnerWidth, breakpoints }) =>
	breakpoints.reduce((max, next) =>
		max < windowInnerWidth && next <= windowInnerWidth ?
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
		slidesToScroll: propTypes.number,
		slidesPerRow:  propTypes.number,
		breakpoint: propTypes.number,
		lazyLoad: propTypes.bool,
		responsive: propTypes.arrayOf(propTypes.object),
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
		breakpoint: 0,
		slidesPerRow: 1,
		lazyLoad: true,
		responsive: [
			{
				breakpoint: 0,
				slidesToShow: 1,
				slidesToScroll: 1,
				slidesPerRow: 1
			},
			{
				breakpoint: 480,
				slidesToShow: 2,
				slidesToScroll: 2,
				slidesPerRow: 1
			},
			{
				breakpoint: 768,
				slidesToShow: 3,
				slidesToScroll: 3,
				slidesPerRow: 1
			},
			{
				breakpoint: 1024,
				slidesToShow: 4,
				slidesToScroll: 4,
				slidesPerRow: 1
			},
			{
				breakpoint: 1366,
				slidesToShow: 5,
				slidesToScroll: 5,
				slidesPerRow: 1
			},
			{
				breakpoint: 1600,
				slidesToShow: 6,
				slidesToScroll: 6,
				slidesPerRow: 2
			},
			{
				breakpoint: 1920,
				slidesToShow: 8,
				slidesToScroll: 8,
				slidesPerRow: 2
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
		this.slider = React.createRef()

		const state = this.getDimensions()
		this.setDimension(state)
	}

	componentDidMount() {
		window.addEventListener('resize', this.onResize)
		const sliderWidth = this.getSliderWidth()
		this.updateDimension({ sliderWidth })
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize)
	}

	onInput(e) {
		const { target } = e
		const { value } = target

		this.setState({ value })
	}

	onResize() {
		const state = this.getDimensions()
		const sliderWidth = this.getSliderWidth()
		this.updateDimension({ ...state, sliderWidth })
	}

	onPrev() {
		const { inputRange } = this
		const { children } = this.props
		const { slidesToScroll } = this.state
		const currentValue = Number(inputRange.current.value)
		const cols = Math.round(children.length / slidesToScroll)
		const jump = 100 / (cols - 1)
		const value = currentValue - jump >= 0 ?
			currentValue - jump :
			0

		console.log('jump: ', jump, 'value: ', value)

		this.setState({ value })
	}

	onNext() {
		const { inputRange } = this
		const { children } = this.props
		const { slidesToScroll } = this.state
		const currentValue = Number(inputRange.current.value)
		const cols = Math.round(children.length / slidesToScroll)
		const jump = 100 / (cols - 1)
		const value = currentValue + jump <= 100 ?
			currentValue + jump :
			100

		console.log('jump: ', jump, 'value: ', value)

		this.setState({ value })
	}

	getSliderWidth() {
		const sliderWidth = this.slider.current.offsetWidth
		return sliderWidth
	}

	getDimensions() {
		const windowInnerWidth = window.innerWidth
		const { responsive } = this.props
		const breakpoint = getBreakpoint({windowInnerWidth, responsive}) || this.props.breakpoint
		const slidesToShow = getSlidesToShow({breakpoint, responsive}) || this.props.slidesToShow
		const slidesToScroll = getSlidesToScroll({breakpoint, responsive}) || this.props.slidesToScroll

		return {
			breakpoint,
			slidesToShow,
			slidesToScroll
		}
	}

	setDimension (dimensions) {
		// eslint-disable-next-line
		this.state = { ...dimensions  }
		console.log('this.state: ', this.state)
	}

	updateDimension(dimensions) {
		this.setState({ ...dimensions })
		console.log('this.state: ', this.state)
	}

	render() {
		const {
			children,
			className,
			conrollerClassName,
			lazyLoad } = this.props,
			{
				breakpoint,
				slidesToShow,
				slidesToScroll,
				slidesPerRow,
				value } = this.state,
			{
				onInput,
				onPrev,
				onNext,
				inputRange } = this
		return (
			<div className={className} ref={this.slider}>
				<div className={`${className}__crop`}>
					<div className={`${className}__keyhole`}>
						<RangeTrack
							className={className}
							slidesToShow={slidesToShow}
							slidesPerRow={slidesPerRow}
							slidesToScroll={slidesToScroll}
							breakpoint={breakpoint}
							value={value}
							lazyLoad={lazyLoad}>
							{children}
						</RangeTrack>
					</div>
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
