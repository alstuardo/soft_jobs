import { Router } from 'express'
import * as usersController from '../controllers/usersController.js'
import { authToken } from '../middlewares/autentication.middleware.js'

const router = Router()

router.post('/usuarios', usersController.register)
router.post('/login', usersController.login)
router.get('/perfil', authToken, usersController.findProfile)
router.all('*', usersController.notFound)

export default router
