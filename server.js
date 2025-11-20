import express from "express"
import ProductosRouter from "./routes/productos.route.js"
import ProductoApiRouter from "./api/routes/productos.api.routes.js"
import PersonajesRouter from "./routes/personajes.route.js"
import PersonajesApiRouter from "./api/routes/personajes.api.routes.js"
import UsuariosApiRouter from './api/routes/usuarios.routes.js'
import swaggerUI from 'swagger-ui-express'
import swaggerJSON from './swagger.output.json' with { type: 'json' }
import multer from "multer"

import cors from 'cors'
import sharp from "sharp"
import { Server } from "socket.io"
import http from "http"

const app = express()

const corsOptions = {   //NO ES EL MISMO QUE VAN A TENER EN SOCKETS!
    origin: ["http://localhost:5173"],
    methods: "GET, POST, PUT, PATCH, DELETE"
}

app.use(cors({ origin: true })) //IMPORTANTE!!! Y REINICIAR

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/index", express.static("public"))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

app.use("/productos", ProductosRouter)
app.use("/api/productos", ProductoApiRouter)
app.use("/personajes", PersonajesRouter)
app.use("/api/personajes", PersonajesApiRouter)
app.use("/api/usuarios", UsuariosApiRouter)
//https://vercel.com/docs/frameworks/backend/express

app.get("/health", (_, res) => {
    res.json({ message: "ok" })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname.trim().replace(" ", "_"))
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("Solo se permite subir imagenes"), false)
    }
}
const upload = multer(
    {
        fileFilter: fileFilter,
        storage: storage
    }
)

async function resizeImage(req, res, next){
    return sharp(req.file.path)
            .resize(1500)
            .webp()
            .toFile( "uploads/" + (new Date().getTime()) + ".webp" )
            .then( () => next() )
            .catch( (err) => res.status(500).json({ "error": err }) )
}

app.post("/api/upload", [upload.single("file"), resizeImage], (req, res) => {
    console.log(req.file)
    console.log(req.body)
})

const port = process.env.PORT || 2025

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// app.listen(2025, () => {
//     console.log("Funcionando en el puerto " + port)
// })

const jugadores = {}

function estadoJuego(){
    io.emit("estado", {
        jugadores
    })
}

io.on( "connection", (socket) => {
    console.log("Conexion recibida!!!", socket.id)
    // socket.on( "message", (data) => {
    //     console.log(data)
    // } )
    socket.on("unirme", ({nombre}) => {
        jugadores[socket.id] = {
            nombre: nombre,
            puntos: 0
        }
        console.log("Jugador: " + nombre + " Se unio al juego!")
        estadoJuego()
    })

    socket.on("sumar-puntos", () => {
        const jugador = jugadores[socket.id]
        if( !jugador ) return
        jugador.puntos++
        estadoJuego()
    })

    socket.on( "disconnect", () => {
        const jugador = jugadores[socket.id]
        if(jugador){
            delete jugadores[socket.id]
            estadoJuego()
        }
    } )
} )

server.listen( port, () => console.log(`Servidor escuchando en http://localhost:${port}`) )