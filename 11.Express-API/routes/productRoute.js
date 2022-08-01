const { Router } = require('express')
const authController = require('../controllers/authController')
const productController = require('../controllers/productController')
const reviewRouter = require('./reviewRoute')

const router = Router()



/*
router
	.get('/', productController.getProducts)
	.post('/', productController.addUser)
	.get('/:productId', productController.getUserById)
	.patch('/:productId', productController.updateUserById)
	.delete('/:productId', productController.removeUserById)
*/

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProduct)

// /api/products/productId/reviews
router.use('/:productId/reviews', reviewRouter)

// Bellow routes are are protected to only it's user
router.use(authController.protect)

router.post('/', productController.addProduct)
router
	.patch('/:productId', authController.restrictToUser, productController.updateProduct)
	.delete('/:productId', authController.restrictToUser, productController.removeProduct)



module.exports = router
