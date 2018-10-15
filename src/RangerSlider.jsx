import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import RangeTrack from './RangeTrack'
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
		group: PropTypes.number,
		breakpoint: PropTypes.number,
		responsive: PropTypes.array
	}

	static defaultProps = {
		breakpoint: 0,
		group: 1,
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
		this.getState = this.getState.bind(this)
		this.setDimension = this.setDimension.bind(this)
		this.updateDimension = this.updateDimension.bind(this)

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

	onResize() {
		const state = this.getState()
		this.updateDimension(state)
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
		const { children } = this.props
		const { breakpoint, group } = this.state
		return (
			<div className="range-slider">
				<div className="range-slider__keyhole">
					<RangeTrack group={group} breakpoint={breakpoint}>
						{children}
					</RangeTrack>
				</div>
			</div>
		)
	}
}
