function calcularDisponible(ingresos, egresos) {
    let valorDisponible = ingresos - egresos;

    if (valorDisponible < 0) {
        valorDisponible = 0;
    }

    return valorDisponible;
}

function calcularCapacidadPago(montoDisponible){
    let capacidad = montoDisponible * 0.3;
    return capacidad;
}

function calcularInteresSimple(monto, taza, plazoAnios){
    let interes = plazoAnios * monto * (taza/100);
    return interes;
}

function calcularTotalPagar(monto, interes){
    let total = monto + interes + 100;
    return total;
}

function calcularCuotaMensual(total, plazoAnios){
    let cuota = total / (plazoAnios * 12);
    return cuota;
}

function aprobarCredito(capacidadPago, cuotaMensual){
    let aprobado;

    if(capacidadPago > cuotaMensual){
        aprobado = true;
    } else{
        aprobado = false;
    }

    return aprobado;
}