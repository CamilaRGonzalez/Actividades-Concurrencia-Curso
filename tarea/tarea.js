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
  fs.readFile(file1Path, "utf8", (err, data1) => {
    if (err) return console.error(err);

    fs.readFile(file2Path, "utf8", (err, data2) => {
      if (err) return console.error(err);

      fs.readFile(file3Path, "utf8", (err, data3) => {
        if (err) return console.error(err);

        console.log(data1 + data2 + data3);
      });
    });
  });
}

// ==========================================
// EJERCICIO 2: Promises
// ==========================================
// Objetivo: Realizar la misma tarea (leer los 3 archivos y concatenar)
// pero usando fsPromises.readFile y .then() .catch()

function leerArchivosPromesas() {
  fsPromises.readFile(file1Path, "utf8")
    .then(data1 => fsPromises.readFile(file2Path, "utf8").then(data2 => data1 + data2))
    .then(parcial => fsPromises.readFile(file3Path, "utf8").then(data3 => parcial + data3))
    .then(resultado => console.log(resultado))
    .catch(err => console.error(err));
}

// ==========================================
// EJERCICIO 3: Async/Await
// ==========================================
// Objetivo: Realizar la misma tarea usando async/await.
// Recuerda manejar los errores con try/catch.

async function leerArchivosAsync() {
  try {
    const data1 = await fsPromises.readFile(file1Path, "utf8");
    const data2 = await fsPromises.readFile(file2Path, "utf8");
    const data3 = await fsPromises.readFile(file3Path, "utf8");

    console.log(data1 + data2 + data3);
  } catch (err) {
    console.error(err);
  }
}

// ==========================================
// EJERCICIO 4: Promise.all (Opcional/Avanzado)
// ==========================================
// Objetivo: Leer los 3 archivos "en paralelo" y mostrar el resultado concatenado
// cuando todos hayan terminado.

function leerArchivosParalelo() {
  Promise.all([
    fsPromises.readFile(file1Path, "utf8"),
    fsPromises.readFile(file2Path, "utf8"),
    fsPromises.readFile(file3Path, "utf8")
  ])
    .then(([data1, data2, data3]) => {
      console.log(data1 + data2 + data3);
    })
    .catch(err => console.error(err));
}

// Descomenta la función que quieras probar:
//leerArchivosCallback();
//leerArchivosPromesas();
//leerArchivosAsync();
 leerArchivosParalelo();
