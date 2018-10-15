import React, { Component } from 'react'
import './App.css'
import RangerSlider from './RangerSlider'
import { Helmet } from 'react-helmet'

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<div className='container'>
					<Helmet>
						<title>React Range Slider</title>
					</Helmet>
					<RangerSlider>
						{
							[0,1,2,3,4,5,6,7,8,9,10,11].map((element, index) =>
								<img
									className='range-slider__img'
									src='https://picsum.photos/410/600'
									alt='Cap'
									key={index}/>
							)
						}
					</RangerSlider>
				</div>
			</div>
		)
	}
}
