const fs = require("fs").promises

const path = require("path");

console.log("\nInicio script")

fs.readFile(path.join(__dirname, "data.txt"), "utf8", (error, data) => {
    if (error) {
        console.error("Error leyendo data.txt:", error);
        return;
    }
    console.log("Contenido de data.txt:", data);
} )

/*
fs.readFile(path.join(__dirname, "data.txt"), "utf8" )
    .then( data => fs.readFile(path.join(__dirname, "index.html"), "utf8" ))
    .then( html => console.log( html.substring(0,25) ) )
    .catch( err => console.error( err ) )
*/
leerData().then( res => console.log( `res de funcion asincronca: ${res}` ) )

async function leerData(){
    const data = await fs.readFile(path.join(__dirname, "data.txt"), "utf8" )
    const html = await fs.readFile(path.join(__dirname, "index.html"), "utf8" )
    console.log( html.substring(0,25) )
    return "return funcion asincrona"
} 
console.log( "\nfin script" )
// javascript tiene un solo hilo de ejecucion