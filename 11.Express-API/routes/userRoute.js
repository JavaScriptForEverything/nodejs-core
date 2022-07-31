const { Router } = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

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
router.post('/logout', authController.logout)
router.post('/signup', authController.signup)

router.route('/')
	// .get(userController.getUsers)
	.get(authController.protect, userController.getUsers)
	.post(userController.addUser)

router.route('/:userId')
	.get(userController.getUserById)
	.patch(userController.updateUserById)
	.delete(userController.removeUserById)



module.exports = router
