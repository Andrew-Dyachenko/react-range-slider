import React from 'react'
import propTypes from 'prop-types'
import './RangeDatalist.css'

const RangeDatalist = ({
    className = 'range-datalist',
    data = [],
    label = '',
    title = '',
    value = 0 }) =>
    <datalist className={`${className}__list`} id={`${className}__list`}>
        {
            new Array(100).fill(0).map((item, index, array) => {
                const { length } = array
                return (
                    <option
                        className={length / 100 * index < value ?
                            `${className}__list-option` :
                            `${className}__list-option ${className}__list-option--active`
                        }
                        label={label}
                        title={title}
                        key={index}/>
                    )
                }
            )   
        }
    </datalist>

RangeDatalist.propTypes = {
    className: propTypes.string,
    data: propTypes.array,
    label: propTypes.string,
    title: propTypes.string,
    value: propTypes.number
}

export default RangeDatalist
