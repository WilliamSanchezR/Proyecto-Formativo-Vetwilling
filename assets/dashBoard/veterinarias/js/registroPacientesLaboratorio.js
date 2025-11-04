let currentStep = 0;
const steps = document.querySelectorAll('.step');
const bars = document.querySelectorAll('.progress-bar');
const labels = document.querySelectorAll('.progress-labels span');
let tablaLaboratorios; // Variable global para la tabla DataTables
let listLaboratorios = []; // Lista para almacenar los laboratorios seleccionados
let laboratoriosSeleccionados = []; // Variable para almacenar el laboratorio seleccionado
const buscadorExamenes = document.getElementById('buscarExamenes'); 
const listaSugerencias = document.getElementById('listaSugerencias');
const btnConfirmarRegistr = document.getElementById('btnConfirmar');

// Funcion para mostrar el paso actual del formulario de registro de pacientes de laboratorio
function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    bars.forEach((b, i) => b.classList.toggle('active', i <= index));
    labels.forEach((l, i) => l.classList.toggle('active', i === index));

    // Scroll al inicio del formulario
    document.querySelector('.wizard-container').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Si estamos en el paso de confirmación, actualizar resumen
    if (index === 3) {
        mostrarResumenConfirmacion();
    }
}

// Función para mostrar resumen en el paso de confirmación
function mostrarResumenConfirmacion() {
    const resumenHTML = `
            <div class="resumen-final">
                <div class="resumen-card">
                    <h4><i class="bi bi-person-check text-success"></i> Datos del Propietario</h4>
                    <ul>
                        <li><strong>Nombre:</strong> ${document.getElementById('nombrePropietario').value}</li>
                        <li><strong>Documento:</strong> ${document.getElementById('tipoDocumento').value} ${document.getElementById('documento').value}</li>
                        <li><strong>Teléfono:</strong> ${document.getElementById('telefono').value}</li>
                        <li><strong>Correo:</strong> ${document.getElementById('correo').value}</li>
                        <li><strong>Dirección:</strong> ${document.getElementById('direccion').value}, ${document.getElementById('ciudad').value}</li>
                    </ul>
                </div>

                <div class="resumen-card">
                    <h4><i class="bi bi-heart text-danger"></i> Datos de la Mascota</h4>
                    <ul>
                        <li><strong>Nombre:</strong> ${document.getElementById('nombreMascota').value}</li>
                        <li><strong>Especie:</strong> ${document.getElementById('especie').value}</li>
                        <li><strong>Raza:</strong> ${document.getElementById('raza').value || 'No especificada'}</li>
                        <li><strong>Edad:</strong> ${document.getElementById('edad').value} años</li>
                        <li><strong>Peso:</strong> ${document.getElementById('peso').value} kg</li>
                        <li><strong>Sexo:</strong> ${document.getElementById('sexo').value}</li>
                        <li><strong>Esterilizado:</strong> ${document.getElementById('esterilizado').value}</li>
                    </ul>
                </div>

                <div class="resumen-card" id="resumenExamenes">
                    <h4><i class="bi bi-flask text-primary"></i> Información de Exámenes Clínicos</h4>
                  <ul>
                  ${laboratoriosSeleccionados.map((elemnt) => {
                    return `<li>${elemnt.name}</li>`;
                  }).join('')}
                  </ul>
                </div>
            </div>
        `;

    // Insertar el resumen antes de los botones
    const confirmStep = steps[3];
    const existingResumen = confirmStep.querySelector('.resumen-final');

    if (!existingResumen) {
        const buttonsDiv = confirmStep.querySelector('.buttons');
        buttonsDiv.insertAdjacentHTML('beforebegin', resumenHTML);
    }
}

// Funcion para avanzar en el formulario de registro de pacientes de laboratorio
function nextStep() {
    // Validar campos requeridos del paso actual
    const currentStepElement = steps[currentStep];
    const requiredInputs = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    let camposVacios = [];

    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');

            // Obtener el nombre del campo
            const label = input.previousElementSibling?.textContent || 'Campo';
            camposVacios.push(label);

            // Remover clase de error después de 3 segundos
            setTimeout(() => {
                input.classList.remove('error');
            }, 3000);
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            html: `Por favor complete los siguientes campos:<br><br><strong>${camposVacios.join('<br>')}</strong>`,
            confirmButtonColor: '#0a932c',
            confirmButtonText: 'Entendido'
        });
        return; // ← ESTO ES CRÍTICO
    }

    if (currentStep === 2) {
        if (laboratoriosSeleccionados.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No se han asociado Exámenes',
                html: `Por favor registre exámenes de laboratorio.`,
                confirmButtonColor: '#0a932c',
                confirmButtonText: 'Entendido'
            });
            return; // ← ESTO ES CRÍTICO
        }
    }

    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

// Funcion para retroceder en el formulario de registro de pacientes de laboratorio
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

// Función para pintar las opciones en un select a partir de una lista
function pintarOptionsSelect(lista, selectId) {
    const elementselect = document.getElementById(selectId);
    lista.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.id;
        option.textContent = tipo.name;

        elementselect.appendChild(option);
    });

}

// Función para consultar el JSON de tipos de documento
function consultaTipoDocumento() {
    fetch("../../assets/data/tipoDoumento.json")
        .then(response => response.json())
        .then(data => {
            pintarOptionsSelect(data, 'tipoDocumento');
        })
        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });

}

// Función para consultar el JSON de especies
function consultaEspecie() {
    fetch("../../assets/data/especie.json")
        .then(response => response.json())
        .then(data => {
            pintarOptionsSelect(data, 'especie');
        })
        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });
}

// Función para inicializar DataTables en la tabla de laboratorios
function dataTablesLaboratorios() {

    try {
        tablaLaboratorios = $('#lista-laboratorios').DataTable({
            // Configuración de idioma en español
            language: {
                "decimal": "",
                "emptyTable": "No hay Laboratorios registrados",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Laboratorios",
                "infoEmpty": "Mostrando 0 a 0 de 0 Laboratorios",
                "infoFiltered": "(filtrado de _MAX_ Laboratorios totales)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Laboratorios",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "No se encontraron Laboratorios",
                "paginate": {
                    "first": "Primera",
                    "last": "Última",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },

            // Configuración de paginación
            pageLength: 9,
            lengthMenu: [[9, 15, 25, 50, -1], [9, 15, 25, 50, "Todas"]],

            // Configuración de ordenamiento
            order: [[0, 'desc']], // Ordenar por fecha por defecto

            // Configuración de columnas
            columnDefs: [
                {
                    targets: -1, // Última columna (Operación)
                    orderable: false,
                    searchable: false
                }
            ],

            // DOM personalizado
            dom: '<"row"<"col-sm-12"tr>>' +
                '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',

        });

        console.log('✅ Tabla inicializada exitosamente');

    } catch (error) {
        console.error('❌ Error al inicializar DataTables:', error);
        alert('Error al inicializar la tabla. Revisa la consola para más detalles.');
        return;
    }

}

// Funcion para cargar la lista de laboratorios
function cargarListaLaboratorio() {
    fetch("../../assets/data/examenesLaboratorio.json")
        .then(response => response.json())
        .then(data => {
            listLaboratorios = data;
        })
        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });

}

// Función para eliminar un registro de laboratorio
function eliminarRegistroLaboratorio(option) {
    if (laboratoriosSeleccionados.some((examen) => examen.id === option)) {
        const listaFiltrada = laboratoriosSeleccionados.filter((examen) => examen.id !== option);
        laboratoriosSeleccionados = listaFiltrada;

        CargarExamenesTabla();
    }
}

// Función para cargar los exámenes seleccionados en la tabla
function CargarExamenesTabla() {
    tablaLaboratorios.clear().draw(); // Limpiar la tabla antes de agregar nuevos datos

    laboratoriosSeleccionados.forEach((examen, i) => {
        tablaLaboratorios.row.add([
            i + 1,
            examen.name,
            `<button class="btn-accion btn-editar btn-delete" title="Eliminar" onclick="eliminarRegistroLaboratorio(${examen.id})"><i class="bi bi-trash3"></i></button>`
        ]).draw();
    });
}

// Función para consultar exámenes según el valor del input
function consultarExamenes(valorInput) {
    listaSugerencias.innerHTML = '';

    if (valorInput.trim() === '') {
        listaSugerencias.style.display = "none";
        return;
    }

    const valorBusqueda = valorInput.toLowerCase();

    const examenesFiltrados = listLaboratorios.filter(examen =>
        examen.name.toLowerCase().includes(valorBusqueda)
    );

    if (examenesFiltrados.length === 0) {
        listaSugerencias.style.display = "none";
        return;
    } else {
        listaSugerencias.style.display = "block";
    }

    examenesFiltrados.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name;
        listItem.addEventListener("click", () => {
            buscadorExamenes.value = '';
            if (!laboratoriosSeleccionados.some(examen => examen.id === item.id)) {
                laboratoriosSeleccionados.push(item);
            }

            listaSugerencias.innerHTML = "";
            listaSugerencias.style.display = "none";
            CargarExamenesTabla(laboratoriosSeleccionados);
        });
        listaSugerencias.appendChild(listItem);
    });
}

// Evento del botón "Confirmar Registro"
btnConfirmarRegistr.addEventListener('click', (e) => {
    e.preventDefault();
    document.location.href = '../../../../dashBoard/veterinarias/dashBoardLaboratorio.html';
});

// Evento del botón "Volver a revisar"
document.getElementById('btnVolver')?.addEventListener('click', function () {
    prevStep();
});

// Evento del input de búsqueda de exámenes
buscadorExamenes.addEventListener("input", (e) => {
    const valorInput = e.target.value;
    consultarExamenes(valorInput);
});

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    consultaTipoDocumento();
    consultaEspecie();
    cargarListaLaboratorio();
    dataTablesLaboratorios();
});