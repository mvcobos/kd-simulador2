let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSecciones() {
  let secciones = ["parametros", "clientes"];
  for (let i = 0; i < secciones.length; i++) {
    document.getElementById(secciones[i]).classList.remove("activa");
  }
}

function mostrarSeccion(id) {
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}
