import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import { createToken } from "./token.service.js"
import jwt from 'jsonwebtoken'

const client = new MongoClient("mongodb+srv://admin:admin@dwn4ap.9nkvut8.mongodb.net")
const db = client.db("DWN4AP")

export async function createUser(usuario) {
    client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error("No se pudo crear el usuario")

    const nuevoUsuario = { ...usuario, password: undefined, passwordConfirm: undefined }
    nuevoUsuario.password = await bcrypt.hash(usuario.password, 10)
    await db.collection("usuarios").insertOne(nuevoUsuario)

    return { ...nuevoUsuario, password: undefined }
}

export async function login(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!existe) throw new Error("No se pudo loguear")

    const esValido = await bcrypt.compare(usuario.password, existe.password)

    if (!esValido) throw new Error("No se pudo loguear")

    const token = await createToken(existe)

    return { ...existe, password: undefined, passwordConfirm: undefined, token }
}

export async function updatePassword(token, password) {
    await client.connect()
    const payload = jwt.verify(token, "RECUPERAR")
    const email = payload.mail
    console.log(email, payload)
    try {
        await db.collection("usuarios").updateOne({ email: email },
            {
                $set: { password: await bcrypt.hash(password, 10) }
            })
            // console.log("UPDATE")
        return { message: "OK" }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}