import { Router } from 'express'
import * as usersController from '../controllers/usersController.js'
import { authToken, verifyCredential } from '../middlewares/index.middlewares.js'

const router = Router()

router.post('/usuarios', verifyCredential, usersController.register)
router.post('/login', usersController.login)
router.get('/usuarios', authToken, usersController.findProfile)
router.all('*', usersController.notFound)

export default router
