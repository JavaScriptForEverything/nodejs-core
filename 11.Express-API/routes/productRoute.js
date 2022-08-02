const { Router } = require('express')

const authController = require('../controllers/authController')
const productController = require('../controllers/productController')
const middlewares = require('../controllers/middlewares')

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

router.get('/my-products', authController.protect, productController.getMyProducts)
router.get('/my-products/:productId', authController.protect, productController.getMyProductById)

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProductById)

// /api/products/productId/reviews
router.use('/:productId/reviews', reviewRouter)

// Bellow routes are are protected to only it's user
router.use(authController.protect)

// router.post('/', middlewares.uploadCoverImage, middlewares.uploadImages, productController.addProduct)
router.post('/',
	middlewares.imageUploader('coverImage', 'products'),
	middlewares.imageUploader('images', 'products'),
	productController.addProduct
)
router
	.patch('/:productId',
		authController.restrictToUser,
		middlewares.imageUploader('coverImage', 'products'),
		middlewares.imageUploader('images', 'products'),
		productController.updateProduct
	)
	.delete('/:productId', authController.restrictToUser, productController.removeProduct)



module.exports = router
