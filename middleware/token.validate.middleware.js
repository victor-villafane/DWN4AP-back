import * as tokenService from "../services/token.service.js"

//EJEMPLO FETCH

// fetch("http://localhost:2025/api/productos", {
//     method: "GET",
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer TOKEN'
//     }
// })
// .then( res => res.json() )
// .then( datos => console.log(datos) )

export async function validateToken(req, res, next){
    try {
        const auth = req.headers.authorization
        if( !auth ) return res.status(401).json({ message: "Token no encontrado" })
        
        // const token = auth.split(" ")[1]
        const [ bearer, token ] = auth.split(" ")

        if( bearer != "Bearer" || !token ) return res.status(401).json({ message: "Formato del token invalido" })

        const usuario = await tokenService.validateToken(token)

        if( !usuario ) return res.status(401).json({message: "Token invalido"})
        
        req.usuario = usuario

        next()
    } catch (error) {
        res.status(401).json({message: "Token invalido"})
    }
}