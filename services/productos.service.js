import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@dwn4ap.9nkvut8.mongodb.net")
const db = client.db("DWN4AP")

export async function getProductos(filter = {}) {
  const filterMongo = { eliminado: { $ne: true } }

  if( filter.marca != undefined ){
    filterMongo.marca = { $eq: filter.marca }
  }

  filterMongo.$and = [];
  if (filter.precioMenorQue !== undefined) {
    filterMongo.$and.push({ precio: { $lte: parseInt(filter.precioMenorQue) } });
  }
  if (filter.precioMayorQue !== undefined) {
    filterMongo.$and.push({ precio: { $gte: parseInt(filter.precioMayorQue) } });
  }
  // Si $and está vacío, puedes eliminarlo y dejar el filtro sin $and
  if (filterMongo.$and.length === 0) {
    delete filterMongo.$and;
  }

  await client.connect()
  return db.collection("zapatillas").find(filterMongo).toArray()
}

export async function getProductosById(_id) {
  await client.connect()
  return db.collection("zapatillas").findOne({ _id: new ObjectId(_id) })
}

export async function guardarProducto(producto) {
  await client.connect()
  return db.collection("zapatillas").insertOne(producto)
}

export function reemplazarProducto(id, producto) {
  return db.collection("zapatillas").replaceOne( { _id: new ObjectId(id) }, producto )
}

export function EliminarProducto(id) {
  //return db.collection("zapatillas").deleteOne({ _id: new ObjectId(id) });
  return db.collection("zapatillas").updateOne({ _id: new ObjectId(id) }, {
    $set: {
      eliminado: true
    }
  })
}

export function editarProducto(id, producto) {
  return db.collection("zapatillas").updateOne({ _id: new ObjectId(id) }, { $set: producto } )
}