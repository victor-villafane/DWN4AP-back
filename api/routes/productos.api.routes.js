import { Router } from "express";
import * as controllers from "../controllers/controller.api.productos.js"
import { validateProducto } from "../../middleware/producto.validate.middleware.js"
import { validateToken } from "../../middleware/token.validate.middleware.js";
const route = Router()
//query string mongodb+srv://admin:admin@dwn4ap.syxmi5s.mongodb.net/
route.get("/",[validateToken], controllers.getProductos)
route.get("/:id",[validateToken], controllers.getProductoById)
route.post("/",[validateProducto, validateToken], controllers.nuevoProducto)
route.delete("/:id",[validateToken], controllers.eliminarProducto)
route.patch("/:id",[validateToken], controllers.editarProducto)                             //  edita solo lo necesario
route.put("/:id",[validateToken], controllers.reemplazarProducto)                           //  Reemplaza

export default route