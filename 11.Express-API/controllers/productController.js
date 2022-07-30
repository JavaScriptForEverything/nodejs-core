exports.getProducts = (req, res) => {
	res.status(200).json({
		status: 'success',
		Products: [{
			name: 'riajul'
		}]
	})
}

exports.addProduct = (req, res) => {
	res.status(201).json({
		status: 'success',
		Product: {
			name: 'riajul'
		}
	})
}

exports.getProduct = (req, res) => {
	res.status(200).json({
		status: 'success',
		Product: {
			name: 'riajul'
		}
	})
}

exports.updateProduct = (req, res) => {
	res.status(201).json({
		status: 'success',
		Product: {
			name: 'riajul'
		}
	})
}

exports.removeProduct = (req, res) => {
	// res.status(204).json({
	// 	status: 'success',
	// 	Product: {
	// 		name: 'riajul'
	// 	}
	// })
	res.sendStatus(204)
}
