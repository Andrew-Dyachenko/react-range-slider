# react-range-gallery

> Simple react gallery with range control

[![NPM](https://img.shields.io/npm/v/react-range-gallery.svg)](https://www.npmjs.com/package/react-range-gallery) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo
[http://react-range-gallery.tech/](http://react-range-gallery.tech/)

## Attention
The project is at the stage of early development. Use with caution!

## Install

```bash
npm install --save react-range-gallery
```

or

```bash
yarn add react-range-gallery
```

## Usage
Usage example implies to use [create-react-app](https://facebook.github.io/create-react-app/) boilerplate
> App.js
```jsx
import React, {Component} from 'react'
import RangeGallery from 'react-range-gallery'

export default class App extends Component {
	render() {
		return (
			<RangeGallery>
			{
				Array(20)
				.fill(0)
				.map((element, index) => {
					return (
					<img
						src="https://loremflickr.com/g/480/480/owl/all"
						key={index}
						alt={`Example ${index}`}/>
					)
				})
			}
			</RangeGallery>
		)
	}
}
```

>index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## License

MIT © [Andrew-Dyachenko](https://github.com/Andrew-Dyachenko)
