import yup from 'yup'

export const productoSchema = yup.object({
    modelo: yup.string().required().min(3, "modelo tiene minimo de 3 caracteres").max(20, "modelo tiene como maximo 20 caracteres"),
    marca: yup.string().required(),
    precio: yup.number().required().positive().integer(),
    _id: yup.string().optional().matches('^[0-9a-fA-F]{24}$', 'No es un _id de mongo')
})