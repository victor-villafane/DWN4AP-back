import jwt from "jsonwebtoken"
import { MongoClient, ObjectId } from "mongodb"

const SECRET_KEY = "123456789"

const client = new MongoClient("mongodb+srv://admin:admin@dwn4ap.9nkvut8.mongodb.net")
const db = client.db("DWN4AP")
const tokens = db.collection("tokens")

export async function createToken(usuario){
    await client.connect()

    const token = jwt.sign( 
        { ...usuario, password: undefined }, 
        SECRET_KEY, 
        { expiresIn: '2h' } 
    )

    await tokens.updateOne({usuarioId: usuario._id}, {$set: {usuarioId: usuario._id, token}}, {
        upsert: true
    })
    
    return token
}

export async function validateToken(token){
    await client.connect()
    try {
        const payload = jwt.verify(token, SECRET_KEY)
        const sessionActive = await tokens.findOne({ token: token, usuarioId: new ObjectId(payload._id) })
        if( !sessionActive ) throw new Error("Token invalido")
        
        if( payload.exp < (new Date().getTime() / 1000) ) throw new Error("Token expirado")

        return payload 
    } catch (error) {
        return undefined
    }
}