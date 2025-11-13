import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: "Api personajes y productos",
        description: "Esta es una api de pruebas"
    },
    host: 'localhost:2025',
    schemes: ['http']
}

const outFile = './swagger.output.json'
const endpoints = ['./api/routes/personajes.api.routes.js']

swaggerAutogen(outFile, endpoints, doc).then( () => console.log("listo...") )