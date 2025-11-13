export function createPage(title, content){
    let html = ""

    html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    html += '<title>'+ title +'</title></head><body>'
    html += `<a href="/productos">listado</a> | <a href="/productos/nuevo">Nuevo producto</a>`
    html += content
    html += '</body></html>'

    return html
}

export function createProductList(productos){
    let html = "<table><tr><th>id</th><th>Nombre</th><th>Precio</th></tr>"
    productos.forEach(producto => {
            html += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
            </tr>`
    })
    html += "</table>"
    return html
}

// module.exports = {createPage, createProductList}
// export {createPage, createProductList}
export default {createPage, createProductList}