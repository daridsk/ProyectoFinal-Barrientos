let pagos = localStorage.getItem('registro-de-pagos');

document.addEventListener('DOMContentLoaded', () => {
    pagos = JSON.parse(pagos) || [];

    mostrarTabla(pagos);
});

const buscador = document.querySelector('#buscar-historial');
const botonHistorial = document.querySelector('#boton-historial');
const tablaVaciaHistorial = document.querySelector('#tabla-historial');

let tablaHistorial = document.querySelector('#cuepo-tabla-historial');
function mostrarTabla (pagos = []) {
    tablaHistorial.innerHTML = '';
    pagos.forEach((pago) => {
        const fechaLimpia = conseguirFecha(pago.fecha)
        const tr = document.createElement('tr');
        tr.classList.add('tabla-historial-tr');
        tr.innerHTML = `
        <th scope="col">${pago.nombre.toLowerCase().trim()}</th>
        <th scope="col">${pago.apellido.toLowerCase().trim()}</th>
        <th scope="col">${pago.email.toLowerCase().trim()}</th>
        <th scope="col">${pago.telefono.trim()}</th>
        <th scope="col">${pago.metodos}</th>
        <th scope="col">$${pago.total}</th>
        <th scope="col">${fechaLimpia}</th>
        `;

        tablaHistorial.append(tr);
    });

};


botonHistorial.addEventListener('click', cargarHistorial);
function cargarHistorial() { 

    const busqueda = buscador.value.trim().toLowerCase();
    const resultados = filtroBusqueda(busqueda, pagos);

    mostrarTabla(resultados);
} 

const filtroBusqueda = (busqueda = '', pagos = []) => pagos.filter((pago) => pago.nombre.toLowerCase().includes(busqueda.toLowerCase()));