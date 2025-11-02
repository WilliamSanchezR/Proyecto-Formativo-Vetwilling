
//Se crea la funcion para crear la tabla de pacientes con laboratorio.
function CrearTablaPacientes(listaPacientes) {
    // Se selecciona el cuerpo de la tabla y se limpia su contenido.
    const tablaBody = document.getElementById("tablaLaboratorioBody");
    tablaBody.innerHTML = "";
    // Se recorre la lista de pacientes y se crea las filas en la tabla.
    listaPacientes.forEach(paciente => {
        const fila = document.createElement("tr");

        /// data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"
        fila.setAttribute("data-bs-toggle", "modal");
        fila.setAttribute("data-bs-target", "#exampleModal");
        fila.setAttribute("data-bs-whatever", "@mdo");

        fila.innerHTML = `
            <td><i class="bi bi-search"></i></td>
            <td>${paciente.folio}</td>
            <td>${paciente.fecha}</td>
            <td>${paciente.propietario}</td>
            <td>${paciente.nombreMascota}</td>
            <td>${paciente.animal}</td>
            <td>${paciente.raza}</td>
            <td>${paciente.cantLaboratorios}</td>
            <td>${paciente.estado}</td>
        `;
        // Se agrega la fila al cuerpo de la tabla.
        tablaBody.appendChild(fila);
    });
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