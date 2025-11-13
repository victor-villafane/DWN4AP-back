function A() {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            // console.log("A")
            resolve( ["Luis", "Juan", "Ana"] )
        }, 1000 )
    })
}

function B() {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            // console.log("B")
            resolve( ["Notebook", "Telefono", "Teclado"] )
        }, 500 )
    })
}

function C() {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            // console.log("C")
            resolve( ["Pedido #123", "Pedido #456"] )
        }, 250 )
    })
}

async function mostrarLetras(){
    try {
        const mensaje1 = await A()
        console.log(mensaje1)
        const mensaje2 = await B()
        console.log(mensaje2)
        const mensaje3 = await C()
        console.log(mensaje3)
    } catch (error) {
        console.error(error)
    }
}
// console.log("Antes")
// mostrarLetras()
// console.log("despues")

// A().then((mensaje) => {
//     console.log(mensaje)
//     return B()
// }).then( (mensaje2) => {
//     console.log(mensaje2)
//     return C()
// }).then( (mensaje3) => console.log(mensaje3) )
// .catch((err) => console.error(err))
// A().then( (mensaje) => console.log(mensaje) )
// B().then( (mensaje) => console.log(mensaje) )
// C().then( (mensaje) => console.log(mensaje) )

Promise.all([A(), B(), C()])
    .then( (arrayRespuestas) => {
        console.log("Datos recibidos")
        console.log("Usuarios cargados: ", arrayRespuestas[0])
        console.log("Produtos cargados: ", arrayRespuestas[1])
        console.log("Pedidos cargados: ", arrayRespuestas[2])
    } )