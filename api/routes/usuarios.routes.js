import { Router } from 'express'
import * as controller from '../controllers/controller.api.usuarios.js'
import { validateUser } from '../../middleware/usuarios.validate.middleware.js'

const route = Router()

route.post("/",[validateUser], controller.createUser)
route.post("/login", controller.login)
route.post("/recuperar", controller.recuperarCuenta)
route.post("/reset-password", controller.resetPassword)
export default route