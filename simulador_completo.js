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

function guardarTasa() {
  let valorCaja = document.getElementById("tasaInteres").value;
  let tasa = parseFloat(valorCaja);
  if (tasa >= 10 && tasa <= 20) {
    tasaInteres = tasa;
    document.getElementById("mensajeTasa").innerText = "Tasa configurada correctamente: " + tasa + "%";
  } else {
    document.getElementById("mensajeTasa").innerText = "La tasa debe estar entre 10% y 20%";
  }
}
