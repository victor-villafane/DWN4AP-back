import * as service from '../../services/usuarios.service.js'
import * as emailService from '../../services/email.service.js'

export function createUser(req, res) {
    service.createUser(req.body)
        .then((usuario) => res.status(201).json(usuario))
        .catch(() => res.status(400).json({ message: "No se pudo crear" }))
}

export function login(req, res) {
    console.log("Controller js", req.body)
    service.login(req.body)
        .then((usuario) => res.status(200).json(usuario))
        .catch(() => res.status(400).json({ message: "No se pudo loguear" }))
}

export function recuperarCuenta(req, res) {
    console.log("Email: ", req.body)
    const email = req.body.email
    emailService.recuperarCuenta(email)
    res.status(200).json({ message: "ok" })
}

export function resetPassword(req, res){
        // console.log(req.body)
    const { token, password } = req.body
    service.updatePassword(token, password)
        .then( () => res.status(201).json({message: "Contraseña actualizada"}) )
        .catch( (err) => res.status(400).json({message: "No se pudo actualizar la contraseña"}) )
}