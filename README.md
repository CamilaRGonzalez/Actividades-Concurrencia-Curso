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
