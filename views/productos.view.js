import { createPage } from "../pages/utils.js";

export function crearListadoProductos(productos) {
  let html = "<h1>Productos</h1>";
  html += "<ul>";
  productos.forEach((producto) => {
    html += `<li> ${producto.modelo} <a href="/productos/${producto._id}" >Ver</a> | <a href="/productos/modificar/${producto._id}" >editar</a> | <a href="/productos/eliminar/${producto._id}" >eliminar</a> </li>`;
  });
  html += "</ul>";

  return createPage("Productos", html);
}

export function crearDetalleProducto(producto) {
  let html = "";
  if (producto) {
    html += `<h1>Modelo: ${producto.modelo}</h1>`;
    html += `<p>Precio: ${producto.precio}</p>`;
    html += `<p>Marca: ${producto.marca}</p>`;
    html += `<a href="/productos">Volver</a>`;
    return createPage(producto.modelo, html);
  } else {
    return createPage("Error", "<p>Producto no encontrado</p>");
  }
}

export function formularioNuevoProducto(){
    let html = "<form action='/productos/nuevo' method='post'>"
    html += "<div><input type='text' placeholder='modelo del producto' name='modelo' /></div>"
    html += "<div><input type='text' placeholder='marca del producto' name='marca'/></div>"
    html += "<div><input type='number' placeholder='precio del producto' name='precio'/></div>"
    html += "<input type='submit' value='guardar' />"
    html += "</form>"

    return createPage("Nuevo producto", html)
}

export function formularioModificarProducto(producto){
  let html = `<form action='/productos/modificar/${producto._id}' method='post'>`
  html += `<div><input type='text' placeholder='modelo del producto' name='modelo' value="${producto.modelo}" /></div>`
  html += `<div><input type='text' placeholder='marca del producto' name='marca' value="${producto.marca}"/></div>`
  html += `<div><input type='number' placeholder='precio del producto' name='precio' value="${producto.precio}"/></div>`
  html += "<input type='submit' value='editar' />"
  html += "</form>"

  return createPage("Nuevo producto", html)
}

export function formularioEliminar(producto){
  let html = `<form action='/productos/eliminar/${producto._id}' method='post'>`
  html += `<div>Modelo: ${producto.modelo}</div>`
  html += `<div>Marca: ${producto.marca}</div>`
  html += `<div>Precio: ${producto.precio}</div>`
  html += "<input type='submit' value='Eliminar' />"
  html += "</form>"
  html += `<a href="/productos">Volver</a>`;
  return html
}

export function eliminacionExito(id){
  let html = "";
  if (id) {
    html += `<h1>Id: ${id}</h1>`;
    html += `<p>Eliminado correctamente</p>`;
    html += `<a href="/productos">Volver</a>`;
    return createPage("eliminado", html);
  } else {
    return createPage("Error", "<p>Producto no encontrado</p>");
  }
}
