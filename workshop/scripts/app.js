const $contenedorSpinner = document.getElementById("contenedor-spinner");
const $contenedorResultados = document.getElementById("resultados");
const $contenedorAnimacion = document.getElementById("animacion-js");
const $btnBloqueante = document.getElementById("bloqueante");
const $btnNoBloqueante = document.getElementById("no-bloqueante");
const $btnSpinner = document.getElementById("spinner");
const $btnWorker = document.getElementById("worker");
const $btnFetch = document.getElementById("fetch");
//El fetch no va a funcionar, cambiar a una url válida si se quiere probar
const URL = "http://localhost:8080/api/cities";

(() => {
  const textEl = document.getElementById("anim-text");
  const colors = ["#e11d48", "#f97316", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
  let colorIndex = 0;
  let dots = 0;
  let intervalId = null;

  function start() {
    if (intervalId) return;
    intervalId = setInterval(() => {
      // cambia color
      textEl.style.color = colors[colorIndex % colors.length];
      colorIndex++;

      // animación de puntos para dar sensación de carga
      dots = (dots + 1) % 4;
      textEl.textContent = "Animacion" + ".".repeat(dots);
    }, 300);
  }

  function stop() {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  }

  // iniciar animación al cargar
  start();

  // opcional: parar animación si el contenedor se esconde usando la clase "hidden"
  const observer = new MutationObserver(() => {
    const hidden = textEl.closest("#animacion-js")?.classList.contains("hidden");
    hidden ? stop() : start();
  });

  observer.observe($contenedorAnimacion, { attributes: true, attributeFilter: ["class"] });

  // limpiar al salir para evitar fugas
  window.addEventListener("beforeunload", stop);
})();

$btnSpinner.addEventListener("click", () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "class") {
                const isHidden = $contenedorSpinner.classList.contains("hidden"); 
                if (isHidden) {
                    console.log("Spinner ocultado");
                } else {
                    console.log("Spinner mostrado");
                }   
            }
        });
    });
    observer.observe($contenedorSpinner, { attributes: true });
    $contenedorSpinner.classList.toggle("hidden");
});


$btnBloqueante.addEventListener("click", ()=> {
    tareaBloqueante(1e10);
    $contenedorResultados.innerHTML += `<h2>Tarea bloqueante completada</h2>`;
});

$btnWorker.addEventListener("click", () => {
    const worker = new Worker("scripts/worker.js");
    worker.postMessage("tareaBloqueante");
    worker.onmessage = (event) => {
        $contenedorResultados.innerHTML += `<h2>Tarea en worker completada: ${event.data}</h2>`;
    };
});


$btnNoBloqueante.addEventListener("click", () => {
    // Simula una tarea no bloqueante usando setTimeout
    setTimeout(() => {
      $contenedorResultados.innerHTML += `<h2>Tarea setTimeOut(50)</h2>`;
    }, 5000);
} );

$btnFetch.addEventListener("click", async () => {
    $contenedorResultados.innerHTML += "<h2>Fetching...</h2>";
    fetch(URL)
      .then( response => response.json() )
      .then( ({data}) => {
        $contenedorResultados.innerHTML += `Fetch terminado cantidad ciudades: ${data.length}`;
      })
      .catch( console.error );
});
function tareaBloqueante(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
        result += i
  }
  return Intl.NumberFormat().format(result)
}
