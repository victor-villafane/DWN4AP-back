import { createPage } from "../pages/utils.js"
import * as services from "../services/personajes.service.js"
import * as views from "../views/personajes.view.js"

export function getPersonajes(req, res){
    const filter = req.query
    services.getPersonajes(filter)
        .then( (personajes) => res.send( views.crearListadoPersonajes(personajes) ) )
} 

// export function getProductosById(req, res){
//     const id = req.params.id
//     services.getProductosById(id)
//         .then( producto => res.send( views.crearDetalleProducto(producto) ) )
// }
