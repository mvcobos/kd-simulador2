let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSecciones() {
  let secciones = ["parametros", "clientes", "credito"];
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

function guardarCliente() {
  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");

  let clienteExistente = buscarCliente(cedula);

  if (clienteExistente == null) {
    let cliente = {};
    cliente.cedula = cedula;
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.ingresos = ingresos;
    cliente.egresos = egresos;
    clientes.push(cliente);
  } else {
    clienteExistente.nombre = nombre;
    clienteExistente.apellido = apellido;
    clienteExistente.ingresos = ingresos;
    clienteExistente.egresos = egresos;
  }

  pintarClientes();
}

function buscarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula == cedula) {
      return clientes[i];
    }
  }
  return null;
}

function seleccionarCliente(cedula) {
  clienteSeleccionado = buscarCliente(cedula);
  if (clienteSeleccionado != null) {
    mostrarTextoEnCaja("txtCedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("txtNombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("txtApellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("txtIngresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("txtEgresos", clienteSeleccionado.egresos);
  }
}

function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("txtIngresos", "");
  mostrarTextoEnCaja("txtEgresos", "");
  clienteSeleccionado = null;
}

function pintarClientes() {
  let tabla = document.getElementById("tablaClientes");
  let contenido = "";
  for (let i = 0; i < clientes.length; i++) {
    let cliente = clientes[i];
    contenido += "<tr>";
    contenido += "<td>" + cliente.cedula + "</td>";
    contenido += "<td>" + cliente.nombre + "</td>";
    contenido += "<td>" + cliente.apellido + "</td>";
    contenido += "<td>" + cliente.ingresos + "</td>";
    contenido += "<td>" + cliente.egresos + "</td>";
    contenido += `<td><button onclick="seleccionarCliente('` + cliente.cedula + `')">Actualizar</button></td>`;
    contenido += "</tr>";
  }
  tabla.innerHTML = contenido;
}

function buscarClienteCredito() {
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let cliente = buscarCliente(cedula);
  let componente = document.getElementById("datosClienteCredito");
  let resultado = document.getElementById("resultadoCredito");

  resultado.innerHTML = "";
  resultado.className = "";

  if (cliente != null) {
    let contenido = "";
    contenido += "<p>Cédula: " + cliente.cedula + "</p>";
    contenido += "<p>Nombre: " + cliente.nombre + "</p>";
    contenido += "<p>Apellido: " + cliente.apellido + "</p>";
    contenido += "<p>Ingresos: " + cliente.ingresos + "</p>";
    contenido += "<p>Egresos: " + cliente.egresos + "</p>";
    componente.innerHTML = contenido;
  } else {
    componente.innerHTML = "<p>Cliente no encontrado</p>";
  }
}

function calcularCredito() {
  let componente = document.getElementById("resultadoCredito");
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let cliente = buscarCliente(cedula);

  if (cliente == null) {
    componente.className = "";
    componente.innerHTML = "<p>Primero busque un cliente</p>";
  } else {
    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarFloat("plazoCredito");

    let disponible = calcularDisponible(cliente.ingresos, cliente.egresos);
    let capacidad = calcularCapacidadPago(disponible);
    let interes = calcularInteresSimple(monto, tasaInteres, plazo);
    let total = calcularTotalPagar(monto, interes);
    let cuota = calcularCuotaMensual(total, plazo);
    let aprobado = aprobarCredito(capacidad, cuota);

    montoCalculado = monto;
    plazoCalculado = plazo;
    cuotaCalculada = cuota;
    creditoAprobado = aprobado;

    let contenido = "";
    contenido += "Capacidad de pago: " + capacidad + "<br>";
    contenido += "Total a pagar: " + total + "<br>";
    contenido += "Cuota mensual: " + cuota + "<br>";
    if (aprobado == true) {
      contenido += "Resultado: APROBADO";
      componente.className = "aprobado";
    } else {
      contenido += "Resultado: RECHAZADO";
      componente.className = "rechazado";
    }
    componente.innerHTML = contenido;
  }
}
