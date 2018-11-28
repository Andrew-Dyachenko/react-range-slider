# react-range-gallery

> Simple react gallery with range control

[![NPM](https://img.shields.io/npm/v/react-range-gallery.svg)](https://www.npmjs.com/package/react-range-gallery) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo
[http://react-range-gallery.tech/](http://react-range-gallery.tech/)

## Attention!
The project is at the stage of **early development**. Documentation not finished yet. Please use it if you really need. Be caution!

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
import React, { Component } from 'react'
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
                                    alt={`Example ${index}`}
                                    key={index}/>
                            )
                        })
                }
            </RangeGallery>
        )
    }
}
```

#### Lazy images load
> App.js
```jsx
import React, { Component } from 'react'
import RangeGallery, { RangeLazyImage } from 'react-range-gallery'
const preloader = 'http://react-range-gallery.tech/preloader.gif'

export default class App extends Component {
    render() {
        return (
            <RangeGallery>
                {
                    Array(20)
                        .fill(0)
                        .map((element, index) => {
                            return (
                                <RangeLazyImage
                                    src="https://loremflickr.com/g/480/480/owl/all"
                                    alt={`Example ${index}`}
                                    key={index}
                                    fakeSrc={preloader}/>
                            )
                        })
                }
            </RangeGallery>
        )
    }
}
```
> The `RangeLazyImage` is based on **react-lazy-images**, which you can optionally read about [here](https://github.com/fpapado/react-lazy-images).

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

## API Reference (IN PROGRESS...!)

| Name                   | Type   | Default         | Required (As option...) | Description                                                                                                                                                                  |
|------------------------|--------|-----------------|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **className**          | String | range-gallery   | false                   | Main gallery class.<br> Sub dependent components will inherit this class in [BEM](https://en.bem.info/) style format.<br> Example: *className="block__element--modificator"* |
| **conrollerClassName** | String | range-conroller | false                   | Main controller class                                                                                                                                                        |
| **slidesToShow**       | Number | 1               | false                   | Slides quantity to show.<br> All slides separating to groups visible at the moment                                                                                           |
| **slidesToScroll**     | Number | 1               | false                   | Slides quantity to slide.<br> All slides separating to groups visible at the moment                                                                                          |

## Libraries
This package is mainly bootstrapping and builded with next libraries
- [create-react-app](https://github.com/facebook/create-react-app)
- [create-react-library](https://github.com/transitive-bullshit/create-react-library)
- [react-lazy-images](https://github.com/fpapado/react-lazy-images)

## License

MIT © [Andrew-Dyachenko](https://github.com/Andrew-Dyachenko)
