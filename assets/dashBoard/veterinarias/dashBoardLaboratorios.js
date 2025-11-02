
//Se crea la funcion para crear la tabla de pacientes con laboratorio.
function CrearTablaPacientes(listaPacientes) {
    // Se selecciona el cuerpo de la tabla y se limpia su contenido.
    const tablaBody = document.getElementById("tablaLaboratorioBody");
    tablaBody.innerHTML = "";
    // Se recorre la lista de pacientes y se crea las filas en la tabla.
    listaPacientes.forEach(paciente => {
        const fila = document.createElement("tr");


        fila.innerHTML = `
            <td class="td-search-icon" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><i class="bi bi-search"></i></td>
            <td>${paciente.folio}</td>
            <td>${paciente.fecha}</td>
            <td>${paciente.propietario}</td>
            <td>${paciente.nombreMascota}</td>
            <td>${paciente.animal}</td>
            <td>${paciente.raza}</td>
            <td>${paciente.cantLaboratorios}</td>
            <td class="td-status">${MostrarEstado(paciente.estado)}</td>
        `;
        // Se agrega la fila al cuerpo de la tabla.
        tablaBody.appendChild(fila);
    });
}

function MostrarEstado(estado) {
    switch (estado) {
        case "1":
            return `<i class="bi bi-clock-history pendiente-status"></i>`;
        case "2":
            return `<i class="bi bi-check-circle-fill completado-status"></i>`;
        default:
            return `<i class="bi bi-x-circle-fill cancelado-status"></i>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("../../assets/data/laboratorioPacientes.json")
        .then(response => response.json())
        .then(data => {
            CrearTablaPacientes(data);
        })
        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });
})