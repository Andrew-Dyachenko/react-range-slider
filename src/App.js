import React, { Component } from 'react'
import './App.css'
import RangerSlider from './RangerSlider'
import { Helmet } from 'react-helmet'

const options = {
	group: 4
}

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<Helmet>
					<title>React Range Slider</title>
				</Helmet>
				<RangerSlider {...options}>
					{
						[10].map((element, index) =>
							<img
								src="https://picsum.photos/600/600"
								alt="Cap"
								key={index}/>
						)
					}
				</RangerSlider>
			</div>
		)
	}
}
