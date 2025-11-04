// Variables globales
let listaPacientes = [];
let pacientesSeleccionado = null;
const buscarPaciente = document.getElementById("buscarPacientes");
const listaSugerencias = document.getElementById("listaSugerencias");
const contPlaques = document.getElementById("plaque-paciente");
const textReceta = document.getElementById("descripcion-receta");
const plaquePacienteModal = document.getElementById("plaque-paciente-modal");

// Funcion para llamar al json de pacientes
function consultarPacientes() {

    fetch('../../../assets/data/pacientes.json')
        .then(response => response.json())
        .then(data => {
            listaPacientes = data;
        })
        .catch(error => {
            console.error('Error al consultar pacientes:', error);
        });
}

// Funcion para cargar los datos del ppropetasrio y los de la mascota
function crearPlaquePaciente(paciente) {
    return `
            <div>
                <span>Fecha: ${paciente.fecha}</span>
                <span>No. Documento Propietario: ${paciente.documento}</span>
                <span>Propietario: ${paciente.nombrePropietario}</span>
                <span>Télefono: ${paciente.telefono}</span>
                </div>
            <div>
                <span>Nombre Paciente: ${paciente.nombre}</span>
                <span>Especie: ${paciente.especie}</span>
                <span>Raza: ${paciente.raza}</span>
                <span>Sexo: ${paciente.sexo}</span>

            </div>
    `;
}

// Funcion para mostrar el formulario del paciente seleccionado
function mostrarContForm() {
    contPlaques.innerHTML = '';
    const contForm = document.querySelector('.cont-form');
    contForm.style.display = 'flex';
    contPlaques.innerHTML = crearPlaquePaciente(pacientesSeleccionado);
    textReceta.value = 'RP/\n\n';
}

// Funcion para buscar el paciente por nuero de documento del propietario
function buscarPacientes(valorInput) {
    listaSugerencias.innerHTML = '';

    if (valorInput.trim() === '') {
        listaSugerencias.style.display = "none";
        return;
    }

    const valorBusqueda = valorInput.toLowerCase();

    const pacientesFiltrados = listaPacientes.filter(paciente =>
        paciente.documento.toLowerCase().includes(valorBusqueda)
    );

    if (pacientesFiltrados.length === 0) {
        listaSugerencias.style.display = "none";
        return;
    } else {
        listaSugerencias.style.display = "block";
    }

    pacientesFiltrados.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.documento} - ${item.nombre}`;
        listItem.addEventListener("click", () => {
            buscarPaciente.value = `${item.documento} - ${item.nombre}`;
            pacientesSeleccionado = item;
            listaSugerencias.innerHTML = "";
            listaSugerencias.style.display = "none";
            mostrarContForm();
        });
        listaSugerencias.appendChild(listItem);
    });
}

// Evento del input de búsqueda de pacientes
buscarPaciente.addEventListener("input", (e) => {
    const valorInput = e.target.value;
    buscarPacientes(valorInput);
});

// Guardar receta y mostrar previsualizacion de la misma
$('#btn-guardar-receta').on('click', function () {
    $('#vistaImprimir').modal('show');
    plaquePacienteModal.innerHTML = crearPlaquePaciente(pacientesSeleccionado);
    document.getElementById("receta-paciente").innerText = textReceta.value;

    // Mostrar fecha pie de firma de la receta a imprimnir
    const fechaActual = new Date();
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("fecha_report").innerText = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
});

// Funcion para imprimer la receta medica
function imprimirDiv(idDiv) {
  // Guarda el contenido actual del body
  var contenidoOriginal = document.body.innerHTML;
  document.title = 'Veterinario - Recetas';
  // Obtiene el div que se va a imprimir
  var divParaImprimir = document.getElementById(idDiv).innerHTML;
  divParaImprimir

  // Reemplaza el contenido del body con el del div
  document.body.innerHTML = divParaImprimir;
  // 4. Abre el diálogo de impresión
  window.print();
  // Restaura el contenido original del body
  document.body.innerHTML = contenidoOriginal;
  // Recarga la página para volver a la vista original
  window.location.reload();
}

// Boton de imprimir
$('#btn-guardar-resultados').on('click', function() {
    imprimirDiv('cont-imprimir');
});

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    consultarPacientes();
});