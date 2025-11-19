import { productoSchema } from "../schemas/producto.js"

export function validateProducto(req, res, next){
    console.log("Validando....", req.body)
    productoSchema.validate(req.body, 
            { 
                abortEarly:false,       //se detiene en el primer error 
                stripUnknown: true      //elimina automaticamente del obj los campos que no esten definidos en el esquema
            })
        .then( () => next() )
        .catch( (error) => res.status(400).json({message: error.errors}) )
}