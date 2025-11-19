const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const file1Path = path.join(__dirname, 'inputs', 'input1.txt');
const file2Path = path.join(__dirname, 'inputs', 'input2.txt');
const file3Path = path.join(__dirname, 'inputs', 'input3.txt');

// ==========================================
// EJERCICIO 1: Callbacks
// ==========================================
// Objetivo: Leer los 3 archivos secuencialmente usando callbacks (fs.readFile)
// y mostrar en consola el texto concatenado de los 3 archivos.
// Pista: Cuidado con el "Callback Hell".

function leerArchivosCallback() {
    console.log('--- Iniciando Callbacks ---');
    // Tu código aquí:
    
}

// ==========================================
// EJERCICIO 2: Promises
// ==========================================
// Objetivo: Realizar la misma tarea (leer los 3 archivos y concatenar)
// pero usando fsPromises.readFile y .then() .catch()

function leerArchivosPromesas() {
    console.log('--- Iniciando Promesas ---');
    // Tu código aquí:

}

// ==========================================
// EJERCICIO 3: Async/Await
// ==========================================
// Objetivo: Realizar la misma tarea usando async/await.
// Recuerda manejar los errores con try/catch.

async function leerArchivosAsync() {
    console.log('--- Iniciando Async/Await ---');
    // Tu código aquí:

}

// ==========================================
// EJERCICIO 4: Promise.all (Opcional/Avanzado)
// ==========================================
// Objetivo: Leer los 3 archivos "en paralelo" y mostrar el resultado concatenado
// cuando todos hayan terminado.

async function leerArchivosParalelo() {
    console.log('--- Iniciando Promise.all ---');
    // Tu código aquí:

}

// Descomenta la función que quieras probar:
// leerArchivosCallback();
// leerArchivosPromesas();
// leerArchivosAsync();
// leerArchivosParalelo();
