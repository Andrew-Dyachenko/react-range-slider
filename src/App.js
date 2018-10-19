import React, { Component } from 'react'
import './App.css'
import { Helmet } from 'react-helmet'
import RangerSlider from './RangeSlider'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			images: []
		}
	}
	componentDidMount() {
		this.setState({ loading: true })
		fetch('./data.json')
			.then(response => response.json())
			.then(json => json.items.map(item => 
				item.media.m.replace(/_m\./, '.'))) // Replacing char in the link to get original image size
			.then(images => {
				this.setState({
					loading: false,
					images
				});
			})
			.catch(error => console.log(`Error data loading: ${error}`))
	}
	render() {
		const { loading, images } = this.state
		return (
			<div className='App'>
				<div className='container'>
					<Helmet>
						<title>React Range Slider</title>
					</Helmet>

					{
						loading ?
							<p>Loading...</p> :
							<RangerSlider>
								{
									images.map((src, index) =>
										<img
											className='range-slider__img'
											src={src}
											alt='Cap'
											key={index}/>
									)
								}
							</RangerSlider>
					}
				</div>
			</div>
		)
	}
}
