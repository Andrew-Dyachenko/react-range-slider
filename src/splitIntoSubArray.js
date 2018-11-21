const splitIntoSubArray = (children, slidesToShow) => {
	const arrayLength = children.length
	let index = 0
	let tempArray = []
	
	for (index = 0; index < arrayLength; index += slidesToShow) {
		tempArray.push(children.slice(index, index + slidesToShow))
	}

	return tempArray
}

export default splitIntoSubArray
