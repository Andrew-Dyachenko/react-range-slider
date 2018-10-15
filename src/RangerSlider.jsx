import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import RangeTrack from './RangeTrack'
import './RangeSlider.css'

const getAppropriateBreakpoint = innerWidth => breakpoints =>
	breakpoints.reduce((max, next) =>
		max <= innerWidth ? next : max, 0)

// const getAppropriateGroup = breakpoint =>
	

const getBreakpoints = responsive =>
	responsive.reduce((points, obj) =>
		[...points, obj.breakpoint], [])

const getBreakpoint = compose(
	getAppropriateBreakpoint(window.innerWidth),
	getBreakpoints
)

// const getGroup = compose(
// 	getAppropriateGroup,
// 	getBreakpoint
// )

export default class RangeSlider extends Component {
	static propTypes = {
		children: PropTypes.array,
		group: PropTypes.number,
		responsive: PropTypes.array
	}

	static defaultProps = {
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
				group: 8
			}
		]
	}

	constructor(props) {
		super(props)
		this.onResize = this.onResize.bind(this)
		this.updateDimension = this.updateDimension.bind(this)
		const { group } = this.props
		this.state = { group }
	}

	componentDidMount() {
		window.addEventListener('resize', this.onResize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize)
	}

	onResize() {
		this.updateDimension()
	}

	updateDimension() {
		const { responsive } = this.props
		const breakpoint = getBreakpoint(responsive)
		console.log('before dimension: ', this.state.breakpoint)
		this.setState({ breakpoint })
		console.log('after dimension: ', this.state.breakpoint)
	}

	render() {
		const { children } = this.props
		const { group } = this.state
		return (
			<div className="range-slider">
				<div className="range-slider__keyhole">
					<RangeTrack group={group}>
						{children}
					</RangeTrack>
				</div>
			</div>
		)
	}
}
