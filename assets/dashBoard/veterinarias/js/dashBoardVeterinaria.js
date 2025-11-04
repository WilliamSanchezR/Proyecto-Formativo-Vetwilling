let tabla;

// Funcion para inicializar DataTable para la lista de laboratorios asociados
function dataTableListVeterinaria() {
    try {
        tabla = $('#tabla-veterinaria').DataTable({
            // Configuración de idioma en español
            language: {
                "decimal": "",
                "emptyTable": "No hay Laboratorios disponibles",
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
            order: [[2, 'desc']], // Ordenar por fecha por defecto

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

function crearTablaVerinaria(listaVet) {
    // Se selecciona el cuerpo de la tabla y se limpia su contenido.
    const tablaBody = document.getElementById("tablaVeterinariaBody");
    tablaBody.innerHTML = "";
    // Se recorre la lista de pacientes y se crea las filas en la tabla.
    listaVet.forEach(paciente => {
        const fila = document.createElement("tr");


        fila.innerHTML = `
            <td><i class="bi bi-search"></i></td>
            <td>${paciente.nit}</td>
            <td>${paciente.nombreDeVeterinaria}</td>
            <td>${paciente.direccion}</td>
            <td>${paciente.telefono}</td>
            <td>${paciente.email}</td>
            <td class="td-status"></td>
        `;
        // Se agrega la fila al cuerpo de la tabla.
        tablaBody.appendChild(fila);
    });

    dataTableListVeterinaria();

}


function consultaListaLaboratorios() {
    fetch("../../assets/data/veterinarias.json")
        .then(response => response.json())
        .then(data => {
            crearTablaVerinaria(data);
        })
        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });
}

// Botón "ordenar" - ordenar la tabla
$('#btnOrdenar').on('click', function () {
    const opciones = [
        '👤 Nombnre (A-Z)',
        '👤 Nombre (Z-A)'
    ];

    const mensaje = '⬆️⬇️ Selecciona el ordenamiento:\n\n' +
        opciones.map((o, i) => `${i + 1} - ${o}`).join('\n');

    const opcion = prompt(mensaje);

    switch (opcion) {
        case '1':
            tabla.order([2, 'asc']).draw();
            console.log('👤 Ordenado por Nombre ascendente');
            break;
        case '2':
            tabla.order([2, 'desc']).draw();
            console.log('👤 Ordenado por Nombre descendente');
            break;
        default:
            if (opcion !== null) {
                alert('❌ Opción no válida');
            }
    }
});


// Botón "exportar" - exportar a CSV la tabla 
$('#btnExport').on('click', function () {
    console.log('📥 Exportando a CSV...');
    exportarACSV();
});


// Función para exportar la tabla a CSV
function exportarACSV() {
    try {
        const data = tabla.rows({ search: 'applied' }).data();
        let csv = 'No.,Fecha,Propietario,Nombre Mascota,Animal,Raza,Laboratorios,Estado\n';

        data.each(function (fila) {
            const filaLimpia = [];
            for (let i = 0; i < fila.length - 1; i++) {
                let valor = fila[i].toString().replace(/<[^>]*>/g, '');
                valor = valor.replace(/"/g, '""');
                filaLimpia.push(`"${valor}"`);
            }
            csv += filaLimpia.join(',') + '\n';
        });

        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        const fecha = new Date().toISOString().split('T')[0];

        link.setAttribute('href', url);
        link.setAttribute('download', `laboratorios_veterinaria_${fecha}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('✅ Archivo CSV descargado correctamente');
        console.log('✅ CSV exportado:', `citas_veterinaria_${fecha}.csv`);
    } catch (error) {
        console.error('❌ Error al exportar CSV:', error);
        alert('Error al exportar CSV. Revisa la consola.');
    }
}


// Búsqueda en la tabla
$('#buscarVeterinaria').on('keyup change', function () {
    const valorBusqueda = this.value;
    console.log('🔍 Buscando:', valorBusqueda);
    tabla.search(valorBusqueda).draw();
});


// Limpiar búsqueda al hacer clic en el icono de búsqueda
$('.campo-buscar i').on('click', function () {
    $('#buscarPaciente').val('').trigger('keyup');
});


$('#btnAgregarNuevo').on('click', function () {
    document.location.href = "../../../../dashBoard//administrador(dev)/registroVeterinaria.html";
});


document.addEventListener("DOMContentLoaded", () => {
    consultaListaLaboratorios();
})
