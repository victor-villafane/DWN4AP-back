import * as service from "../../services/personajes.service.js"
import * as serviceZapatillas from "../../services/productos.service.js"
export function getPersonajes(req, res){
    const filtros = req.query
    service.getPersonajes(filtros)
        .then( personajes => personajes.length > 0 
                        ? res.status(200).json(personajes)
                        : res.status(500).json({})
                    )
}

export function getPersonajeById(req, res){
    const id = req.params.id
    service.getPersonajesById(id)
        .then( personaje => res.status(200).json(personaje) )
}

export function nuevoPersonaje(req, res){
    const personaje = {
        "name": req.body.name,
        "species": req.body.species,
        "gender": req.body.gender,
        "house": req.body.house,
        "wizard": req.body.wizard,
        "ancestry": req.body.ancestry,
        "eyeColour": req.body.eyeColour,
        "hairColour": req.body.hairColour
    }
    service.guardarPersonaje( personaje )
        .then( (personajeNuevo) => res.status(201).json(personajeNuevo) )
        .catch( (err) => res.status(500).json( {message: "No se guardo el personaje"} ) )
}

export function eliminarPersonaje(req, res){
    const id = req.params.id
    service.EliminarPersonaje(id)
        .then( (id) => res.status(202).json({ message: `personaje eliminado correctamente id: ${id}` }) )
        .catch( (err) => res.status(500).json( {message: "No se elimino el personaje"} ) )
}

export function editarPersonaje(req, res){
    const id = req.params.id
    service.editarPersonaje(id, req.body)        
        .then( (personajeEditado) => res.status(202).json(personajeEditado) )
        .catch( (err) => res.status(500).json( {message: "No se guardo el personaje"} ) )
}

export function reemplazarPersonaje(req, res){
    const id = req.params.id
    const personaje = {
        "name": req.query.name,
        "species": req.query.species,
        "gender": req.query.gender,
        "house": req.query.house,
        "wizard": req.query.wizard,
        "ancestry": req.query.ancestry,
        "eyeColour": req.query.eyeColour,
        "hairColour": req.query.hairColour
    }
    service.reemplazarPersonaje(id, personaje)        
        .then( (personajeEditado) => res.status(202).json(personajeEditado) )
        .catch( (err) => res.status(500).json( {message: "No se guardo el personaje"} ) )
}

export function nuevaZapatilla(req, res){
    const id = req.params.idPersonaje
    const zapatilla = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio,
        duenio: id
    }
    serviceZapatillas.guardarProducto(zapatilla)
        .then( (nuevaZapatilla) => service.guardarDuenio(id, nuevaZapatilla, zapatilla) )
        .then( (  ) => res.status(201).json({message: "Zapatilla creada!"}) )
        .catch( err => res.status(500).json({ message: "Error interno del servidor" }) )
}

export function getZapatillaPersonaje(req, res){
    const id = req.params.idPersonaje
    service.getZapatillaPersonaje(id)
        .then( zapatillas => {
            if( zapatillas ){
                res.status(200).json(zapatillas)
            }else{
                res.status(404).json( {message: "Cliente no encontrado"} )
            }
        } )
        .catch( err => res.status(500).json({ message: "Error del servidor" }) )
}