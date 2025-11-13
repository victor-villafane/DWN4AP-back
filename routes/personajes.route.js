import express from "express"
import * as controller from "../controllers/personajes.controller.js"

const router = express.Router()

router.get( "/", controller.getPersonajes)
// router.get( "/:id", controller.getPersonajesBy)

export default router