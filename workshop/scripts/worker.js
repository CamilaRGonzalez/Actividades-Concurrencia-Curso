function tareaBloqueante(n) {
   let result = 0;
    for (let i = 0; i < n; i++) {
        result += i
    }
    return result;
}
const fn = (event) => {
    if (event.data == null) return;
    if( event.data == "tareaBloqueante" ){
        const result = tareaBloqueante(1e10);
        self.postMessage(result);
    }else if( event.data == "otraTarea" ){
        self.postMessage("otraTarea completada");
    }else{
        self.postMessage("Tarea desconocida");
    }
};
self.onmessage = fn