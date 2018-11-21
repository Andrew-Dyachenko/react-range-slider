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

```jsx
import React, { Component } from 'react'

import RangeGallery from 'react-range-gallery'

class Example extends Component {
  render () {
    return (
      <RangeGallery>
        <img src="https://picsum.photos/480/480" alt="Cap 1" />
        <img src="https://picsum.photos/480/480" alt="Cap 2" />
        <img src="https://picsum.photos/480/480" alt="Cap 3" />
      </RangeGallery>
    )
  }
}
```

## License

MIT © [Andrew-Dyachenko](https://github.com/Andrew-Dyachenko)
