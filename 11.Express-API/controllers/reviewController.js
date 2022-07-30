exports.getReviews = (req, res) => {
	res.status(200).json({
		status: 'success',
		Reviews: [{
			name: 'riajul'
		}]
	})
}

exports.addReview = (req, res) => {
	res.status(201).json({
		status: 'success',
		review: {
			name: 'riajul'
		}
	})
}

exports.getReviewById = (req, res) => {
	res.status(200).json({
		status: 'success',
		review: {
			name: 'riajul'
		}
	})
}

exports.updateReviewById = (req, res) => {
	res.status(201).json({
		status: 'success',
		review: {
			name: 'riajul'
		}
	})
}

exports.removeReviewById = (req, res) => {
	// res.status(204).json({
	// 	status: 'success',
	// 	review: {
	// 		name: 'riajul'
	// 	}
	// })
	res.sendStatus(204)
}
