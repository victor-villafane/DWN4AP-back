import * as service from "../../services/productos.service.js"

export function getProductos(req, res){
    const filtros = req.query
    service.getProductos(filtros)
        .then( productos => productos.length > 0 
                        ? res.status(200).json(productos)
                        : res.status(500).json({})
                    )
}

export function getProductoById(req, res){
    const id = req.params.id
    service.getProductosById(id)
        .then( producto => res.status(200).json(producto) )
}

export function nuevoProducto(req, res){
    const producto = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio
    }
    service.guardarProducto( producto )
        .then( (productoNuevo) => res.status(201).json(productoNuevo) )
        .catch( (err) => res.status(500).json( {message: "No se guardo el producto"} ) )
}

export function eliminarProducto(req, res){
    const id = req.params.id
    service.EliminarProducto(id)
        .then( (id) => res.status(202).json({ message: `producto eliminado correctamente id: ${id}` }) )
        .catch( (err) => res.status(500).json( {message: "No se elimino el producto"} ) )
}

export function editarProducto(req, res){
    const id = req.params.id
    service.editarProducto(id, req.body)        
        .then( (productoNuevo) => res.status(202).json(productoNuevo) )
        .catch( (err) => res.status(500).json( {message: "No se guardo el producto"} ) )
}

export function reemplazarProducto(req, res){
    const id = req.params.id
    const producto = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio
    }
    service.reemplazarProducto(id, producto)        
        .then( (productoNuevo) => res.status(202).json(productoNuevo) )
        .catch( (err) => res.status(500).json( {message: "No se guardo el producto"} ) )
}