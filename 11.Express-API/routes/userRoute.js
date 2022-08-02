const { Router } = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const middlewares = require('../controllers/middlewares')

const router = Router()


/*
router
	.get('/', userController.getUsers)
	.post('/', userController.addUser)
	.get('/:userId', userController.getUserById)
	.patch('/:userId', userController.updateUserById)
	.delete('/:userId', userController.removeUserById)
*/

router.post('/login', authController.login)
// router.post('/signup', middlewares.uploadAvstar, userController.addUser)
router.post('/logout', authController.protect, authController.logout)

router.post('/forgot-password', authController.generatePasswordResetToken)
router.patch('/reset-password', authController.resetPassword)


router
	.use(authController.protect)
	.get('/me', authController.me, userController.getUserById)
	.patch('/update-me',
		middlewares.imageUploader('avatar', 'users'),
		authController.updateMe,
		userController.updateUserById
	)
	.patch('/update-my-password', authController.updateMyPassword)
	.delete('/delete-me', authController.deleteMe, userController.removeUserById)


router.route('/')
	.get(authController.protect, authController.protectedByAdmin, userController.getUsers)
	.post(middlewares.imageUploader('avatar', 'users'), userController.addUser)


router
	.use(authController.protect)
	.use(authController.protectedByAdmin)
	// Bellow routes are are protected only admin can access it.

	.route('/:userId')
	.get(userController.getUserById)
	.patch(userController.updateUserById)
	.delete(userController.removeUserById)



module.exports = router
