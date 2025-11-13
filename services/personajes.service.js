import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@dwn4ap.9nkvut8.mongodb.net")
const db = client.db("DWN4AP")

export async function getPersonajes(filter = {}) {
    const filterMongo = { eliminado: { $ne: true } }

    if( filter.casa != undefined ){
        filterMongo.house = { $eq: filter.casa }
    }

    if( filter.name != undefined ){
        filterMongo.name = { $regex: filter.name, $options: 'i' }
        // filterMongo.$text = { $search: filter.name }
    }

    if( filter.house != undefined ){
        filterMongo.house = { $regex: filter.house, $options: 'i' }
        // filterMongo.$text = { $search: filter.name }
    }

    await client.connect()
    return db.collection("personajes").find(filterMongo).toArray()
}

export async function getPersonajesById(_id) {
    await client.connect()
    return db.collection("personajes").findOne({ _id: new ObjectId(_id) })
}

export async function guardarPersonaje(personaje) {
    await client.connect()
    return db.collection("personajes").insertOne(personaje)
}

export function reemplazarPersonaje(id, personaje) {
    return db.collection("personajes").replaceOne({ _id: new ObjectId(id) }, personaje)
}

export function EliminarPersonaje(id) {
    //return db.collection("personajes").deleteOne({ _id: new ObjectId(id) });
    return db.collection("personajes").updateOne({ _id: new ObjectId(id) }, {
        $set: {
            eliminado: true
        }
    })
}

export function editarPersonaje(id, personaje) {
    return db.collection("personajes").updateOne({ _id: new ObjectId(id) }, { $set: personaje })
}

export function guardarDuenio(id_duenio, nuevaZapatilla, zapatilla){
    console.log("id_duenio", id_duenio)
    console.log("zapatilla", zapatilla)

    return db.collection("personajes").updateOne({ 
        _id: new ObjectId(id_duenio) }, {
        $addToSet: { zapatillas: { ...zapatilla } }
    }, { upsert: true })
}

export async function getZapatillaPersonaje(id){
    try {        
        const personaje = await getPersonajesById(id)
        return personaje.zapatillas
    } catch (error) {
        return null
    }
}