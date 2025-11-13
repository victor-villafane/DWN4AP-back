import { Router } from "express";
import * as controllers from "../controllers/controller.api.personajes.js"

const route = Router()

route.get("/", controllers.getPersonajes)
route.get("/:id", controllers.getPersonajeById)
route.post("/", controllers.nuevoPersonaje)
route.delete("/:id", controllers.eliminarPersonaje)
route.patch("/:id", controllers.editarPersonaje)                            
route.put("/:id", controllers.reemplazarPersonaje)
route.post("/:idPersonaje/zapatilla", controllers.nuevaZapatilla)
route.get("/:idPersonaje/zapatilla", controllers.getZapatillaPersonaje)


export default route