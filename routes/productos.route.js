import express from "express"
import * as controller from "../controllers/productos.controller.js"

const router = express.Router()

router.get( "/", controller.getProductos)
router.get("/nuevo", controller.formularioNuevoProducto)
router.get( "/:id", controller.getProductosById)
router.post("/nuevo", controller.guardarProducto)
router.get("/modificar/:id", controller.formularioModificarProducto)
router.post("/modificar/:id", controller.editarProducto)
router.get( "/eliminar/:id", controller.formularioEliminar )
router.post( "/eliminar/:id", controller.EliminarProducto )

export default router