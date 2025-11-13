import { createPage } from "../pages/utils.js";

export function crearListadoPersonajes(personajes) {
    let html = "<h1>Personajes</h1>";
    html += `<a href='/personajes?casa=Gryffindor' >Gryffindor</a> 
                | <a href='/personajes?casa=Slytherin' >Slytherin</a> 
                | <a href='/personajes?casa=Hufflepuff' >Hufflepuff</a> 
                | <a href='/personajes?casa=Ravenclaw' >Ravenclaw</a>`
    html += "<ul>";
    personajes.forEach((personaje) => {
      html += `<li> ${personaje.name} <a href="/personajes/${personaje._id}" >Ver</a> </li>`;
    });
    html += "</ul>";
  
    return createPage("Personajes", html);
  }