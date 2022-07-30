const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')



/*
router
	.get('/', reviewController.getReviews)
	.post('/', reviewController.addReview)
	.get('/:reviewId', reviewController.getReviewById)
	.patch('/:reviewId', reviewController.updateReviewById)
	.delete('/:reviewId', reviewController.removeReviewById)
*/

router.route('/')
	.get(reviewController.getReviews)
	.post(reviewController.addReview)

router.route('/:reviewId')
	.get(reviewController.getReviewById)
	.patch(reviewController.updateReviewById)
	.delete(reviewController.removeReviewById)



module.exports = router
