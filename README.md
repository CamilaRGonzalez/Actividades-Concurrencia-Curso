# Technical Assessment: Asynchrony in Node.js

## General Description
This technical challenge aims to validate competencies in handling asynchronous operations within the Node.js runtime environment. It will evaluate the ability to implement solutions using different asynchrony patterns (Callbacks, Promises, Async/Await) and the theoretical understanding of JavaScript's concurrency model.

## Technical Specifications

### Part 1: Code Implementation
**Target File:** `tarea/tarea.js`
**Data Directory:** `tarea/inputs/`

The implementation of four distinct functions is required to perform sequential and parallel reading of three text files (`input1.txt`, `input2.txt`, `input3.txt`). The final result must be the concatenation of the content of said files displayed in the standard output (stdout).

#### Functional Requirements:

1.  **Callback Implementation (`leerArchivosCallback`)**
    *   Use the native `fs` module.
    *   Orchestrate the sequential reading of files handling flow control via nested callbacks.
    *   Properly manage error propagation.

2.  **Promise Implementation (`leerArchivosPromesas`)**
    *   Use `fs.promises`.
    *   Implement sequential reading via `.then()` method chaining.
    *   Implement error handling via `.catch()`.

3.  **Async/Await Implementation (`leerArchivosAsync`)**
    *   Refactor logic using `async/await` syntax.
    *   Ensure code readability and exception handling via `try/catch` blocks.

4.  **Parallel Implementation (`leerArchivosParalelo`)**
    *   Use `Promise.all` to initiate reading of all three files simultaneously.
    *   Ensure the final result respects the file order (input1 -> input2 -> input3) regardless of individual read times.

**Execution and Testing:**
To validate the implementation, uncomment the invocation of the corresponding function in `tarea/tarea.js` and execute:
```bash
cd tarea
node tarea.js
```

---

### Part 2: Conceptual Validation
**Submission Format:** `respuestas.md` file or appended to `README.md`.

Provide precise technical definitions for the following fundamental concepts:

1.  **Event Loop Architecture:** Describe the mechanism by which the Event Loop orchestrates code execution, the Call Stack, and the Task Queue to enable non-blocking concurrency in a Single-Threaded environment.
2.  **Flow Control Patterns:** Analyze the "Callback Hell" anti-pattern. Technically justify how Promise and Async/Await abstractions mitigate cyclomatic complexity and improve maintainability.
3.  **Promise Lifecycle:** Detail the transitional states of a Promise (`pending`, `fulfilled`, `rejected`) and the implications on execution flow when omitting exception handling (`unhandled rejection`).
4.  **Syntax and Syntactic Sugar:** Compare `async/await` versus `.then()` chaining. Identify scenarios where the use of one over the other impacts code structure or error handling.
5.  **I/O Model:** Technically differentiate a CPU-bound operation (blocking) from an I/O-bound operation (non-blocking) in the context of Node.js. Explain the impact of executing CPU-intensive tasks on the main thread.

---
**Evaluation Criteria:**
*   Functional correctness of the code.
*   Cleanliness, readability, and adherence to code standards.
*   Technical precision and depth in conceptual answers.


# Respuestas

1. **Event Loop Architecture:** El Event Loop es el mecanismo que permite a Node.js ejecutar operaciones asíncronas en un entorno single-threaded sin bloquear la ejecución. Su funcionamiento se basa en la interacción entre tres componentes principales: el Call Stack, las Task Queues y el propio ciclo del Event Loop.

- Call Stack (Pila de ejecución):
Es donde el motor V8 ejecuta código JavaScript de forma estrictamente sincrónica. Mientras la pila está ocupada, ninguna otra tarea puede ejecutarse. Cuando una función inicia una operación asíncrona (como I/O, timers o callbacks), esta no se ejecuta en la pila; se delega a APIs del sistema operativo o al thread pool de libuv.

- Task Queues (colas de tareas):
Cuando una operación asíncrona finaliza, su callback no entra automáticamente al Call Stack. En su lugar, se coloca en una cola de tareas, esperando a que la pila quede libre. Existen múltiples colas (timers, I/O callbacks, check, close callbacks), y el Event Loop decide cuál procesar según su fase.

- Event Loop:
Es un bucle que revisa continuamente:

1. Si el Call Stack está vacío;

2. Si hay callbacks en alguna Task Queue;

3. En qué fase debe ejecutarse cada tipo de tarea.

Cuando la pila queda libre, el Event Loop extrae el siguiente callback pendiente de la cola correspondiente y lo coloca en la pila para su ejecución. Este ciclo permite continuar procesando tareas mientras el código principal sigue avanzando.

Gracias a este modelo, Node.js puede manejar operaciones concurrentes sin bloquear, ya que el Event Loop delega el trabajo pesado (principalmente I/O) al sistema operativo, mientras el hilo principal se mantiene disponible para seguir procesando tareas de manera eficiente.

2.  **Flow Control Patterns:** El “Callback Hell” es un anti-patrón que aparece cuando se encadenan múltiples operaciones asíncronas utilizando callbacks anidados. Esta estructura genera código con forma de pirámide (“flecha hacia la derecha”), donde cada callback depende del resultado del anterior.
Este patrón incrementa la complejidad ciclomática, dificulta el manejo de errores, reduce la legibilidad y hace que el flujo de control sea difícil de rastrear y mantener.

El problema surge porque los callbacks mezclan control flow, error handling y lógica de negocio dentro de funciones anidadas, produciendo un aumento de rutas posibles de ejecución y una fuerte dependencia entre niveles.

**Promises**
Las Promises desacoplan la operación asíncrona del callback y permiten representar el resultado como un objeto con estados bien definidos. Su principal aporte es permitir encadenamiento lineal (.then()) en lugar de anidación:

- Transforman una estructura vertical y profunda en una estructura horizontal.

- Reducen la complejidad ciclomática al eliminar múltiples ramas anidadas.

- Centralizan el manejo de errores mediante .catch(), evitando duplicación de lógica.

**Async/Await**
Permite escribir código asíncrono con un flujo secuencial:

- Elimina el encadenamiento de .then(), resultando en código más legible.

- Reduce la complejidad estructural al hacer que funciones asíncronas se comporten visualmente como sincrónicas.

- Maneja errores de manera más clara con try/catch, lo que simplifica ramas lógicas y disminuye rutas de ejecución.

- Facilita el mantenimiento, ya que el flujo de control es explícito y más fácil de razonar.


3.  **Promise Lifecycle:** 
1. pending (pendiente)
Es el estado inicial.
La operación asíncrona está en ejecución y la promesa aún no tiene un valor final.
No se ejecuta ningún callback asociado a .then() o .catch() mientras permanezca en este estado.

2. fulfilled (cumplida)
La operación terminó correctamente y la Promise pasa a tener un valor resuelto.
En este estado se ejecutan los callbacks registrados con .then() o el bloque posterior a un await.
Una Promise que se resuelve no puede volver a cambiar de estado; el cambio es inmutable.

3. rejected (rechazada)
La operación falló o se produjo una excepción.
La Promise adquiere una razón de rechazo (error), y se desencadenan los handlers de error registrados con .catch() o un bloque try/catch que envuelve un await.

Si una Promise entra en estado rejected y no existe un .catch() o un try/catch para capturar el error, se produce un **unhandled rejection** (rechazo no manejado).

**Consecuencias técnicas de unhandled rejection**:

- El proceso puede terminar: Node considera un unhandled rejection equivalente a una excepción no atrapada (uncaughtException). Esto provoca, por defecto, la finalización del proceso, afectando la estabilidad del servidor.

- Estados inconsistentes del programa: La aplicación puede quedar parcialmente ejecutada sin haber completado adecuadamente el flujo previsto.

- Dificultad en depuración y trazabilidad: El error puede propagarse silenciosamente, generando comportamientos inesperados o fallas tardías.

- Pérdida de control del flujo : El rechazo no manejado interrumpe la cadena de Promises, causando que ninguna operación posterior se ejecute.

4.  **Syntax and Syntactic Sugar:** 
**async/await vs .then()**

1. Estructura del código

**.then()**

- Promueve un estilo funcional y encadenado.

- Es útil cuando querés componer varias promesas en cadena.

- Puede volverse difícil de leer cuando la lógica es muy secuencial o dependiente.

- Ideal para transformar datos paso a paso de forma declarativa.

**async/await**

- Favorece un estilo imperativo y secuencial, similar al código síncrono.

- Mucho más legible cuando las operaciones dependen unas de otras.

- Reduce anidamientos innecesarios.

2. Manejo de errores
**.then()**

- Los errores se propagan por la cadena hasta el primer .catch().

- Si no agregás .catch() y la promesa falla → unhandled rejection.

- Manejar errores específicos en tramos diferentes de la cadena requiere dividir la lógica o usar .catch() intermedios.

**async/await**

- El manejo de errores se encapsula con try/catch.

- Más claro, más explícito y permite manejar errores de forma más granular.

- Cualquier excepción dentro de una función async se convierte automáticamente en una promesa rechazada.

3. Paralelismo
**.then()**
Encaja naturalmente con operaciones paralelas.

**async/await**
Si usás await mal, podés convertir tareas paralelas en secuenciales y volver el código más lento.

**Escenarios ideales para .then**
- Muchas transformaciones encadenadas
- Enfoque funcional (map, reduce, pipelines de promesas)
- Tareas en paralelo

**Escenarios ideales para async/await**
- Flujo secuencial con dependencias
- Manejo específico de errores por bloque
- Legibilidad en lógica compleja
- Tareas en paralelo (si se usa correctamente)



5.  **I/O Model:**

**Diferencia técnica entre operaciones CPU-bound (bloqueantes) y operaciones I/O-bound (no bloqueantes) en Node.js**

1. **Operaciones CPU-bound (bloqueantes)**
Definición técnica:
Una operación CPU-bound es aquella cuyo tiempo de ejecución depende principalmente de cálculos intensivos que requieren uso continuo del procesador (CPU).

Ejemplos típicos:

- Procesamiento criptográfico pesado
- Compresión/descompresión
- Hashing masivo (bcrypt)
- Algoritmos matemáticos complejos
- Renderizado de imágenes o video

Cómo afectan a Node.js:
Node.js ejecuta JavaScript en un solo hilo principal (main thread). Si una tarea CPU-bound ocupa ese hilo durante mucho tiempo:

- Bloquea el Event Loop, impidiendo que procese nuevos eventos.
- Congela respuestas a solicitudes entrantes.
- Retarda callbacks, promesas y timers.
- Afecta directamente la concurrencia, porque Node no puede avanzar hasta terminar la tarea pesada.


2. **Operaciones I/O-bound (no bloqueantes)**
Definición técnica:
Una operación I/O-bound depende de recursos externos (disco, red, base de datos, filesystem).
Ejemplos:

- Lectura de archivos
- Requests HTTP
- Consultas a base de datos
- Lectura de sockets
- Acceso a sistemas externos (APIs, colas, S3, etc.)

Cómo las maneja Node.js: 

Node delega estas operaciones al sistema operativo o al Thread Pool de libuv, permitiendo:
- Liberar el Call Stack
- No bloquear el Event Loop
- Continuar ejecutando otras tareas mientras el I/O se completa

Por eso son no bloqueantes.

Consecuencia práctica: Node puede manejar miles de I/O concurrentes sin bloquear el flujo, porque el CPU no está ocupado con cálculos pesados.

3. **Impacto de ejecutar tareas CPU-intensivas en el main thread**

Cuando un cálculo intensivo se realiza directamente en el hilo principal:

- El Event Loop se queda detenido hasta que el cálculo termina.
- Ninguna otra solicitud puede procesarse, aunque sea trivial.
- La latencia aumenta, porque callbacks/promesas no se despachan.
- El servidor parece “caído” aunque esté técnicamente vivo.
- Se degrada la escalabilidad, principal ventaja de Node.js.