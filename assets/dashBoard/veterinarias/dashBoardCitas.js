// ========================================
// TABLA DE CITAS - DATATABLES
// Archivo: tableCitas.js
// ========================================
let tabla;
// Esperar a que jQuery y DataTables estén disponibles
$(document).ready(function() {
    
    console.log('🔄 Inicializando módulo de citas...');
    
    // ========================================
    // INICIALIZACIÓN DE DATATABLES
    // ========================================
    tabla = $('#tablaCitas').DataTable({
        // Configuración de idioma en español
        language: {
            "decimal": "",
            "emptyTable": "No hay citas disponibles",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ citas",
            "infoEmpty": "Mostrando 0 a 0 de 0 citas",
            "infoFiltered": "(filtrado de _MAX_ citas totales)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ citas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron citas",
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
        order: [[1, 'asc']], // Ordenar por fecha por defecto
        
        // Configuración de columnas
        columnDefs: [
            {
                targets: -1, // Última columna (Operación)
                orderable: false,
                searchable: false
            }
        ],
        
        // Responsive
        responsive: true,
        
        // DOM personalizado - Mostrar info y paginación
        dom: '<"row"<"col-sm-12"tr>>' +
             '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
        
        // Callback después de dibujar
        drawCallback: function() {
            actualizarColoresFilas();
            actualizarContadorVer();
        },
        
        // Callback después de inicializar
        initComplete: function() {
            console.log('✅ DataTables inicializado correctamente');
            actualizarColoresFilas();
            actualizarContadorVer();
        }
    });

    // ========================================
    // MANTENER COLORES ALTERNOS DE FILAS
    // ========================================
    function actualizarColoresFilas() {
        $('#tablaCitas tbody tr').each(function(index) {
            $(this).removeClass('fila-azul fila-verde fila-blanca');
            
            const patron = index % 3;
            if (patron === 0) {
                $(this).addClass('fila-azul');
            } else if (patron === 1) {
                $(this).addClass('fila-verde');
            } else {
                $(this).addClass('fila-blanca');
            }
        });
    }

    // ========================================
    // ACTUALIZAR CONTADOR "VER X/Y"
    // ========================================
    function actualizarContadorVer() {
        const info = tabla.page.info();
        $('#btnVer').html(`<i class="bi bi-eye"></i> Ver ${info.recordsDisplay}/${info.recordsTotal}`);
    }

    // ========================================
    // BÚSQUEDA PERSONALIZADA - ARREGLADO
    // ========================================
    $('#buscarCitas').on('keyup change', function() {
        const valorBusqueda = this.value;
        console.log('🔍 Buscando:', valorBusqueda);
        tabla.search(valorBusqueda).draw();
    });

    // Limpiar búsqueda al hacer clic en el icono
    $('.campo-buscar i').on('click', function() {
        $('#buscarCitas').val('').trigger('keyup');
    });

    // ========================================
    // BOTÓN "VER" - MOSTRAR INFO
    // ========================================
    $('#btnVer').on('click', function() {
        const info = tabla.page.info();
        const mensaje = `📊 Información de Citas:\n\n` +
                       `Total de registros: ${info.recordsTotal}\n` +
                       `Registros visibles: ${info.recordsDisplay}\n` +
                       `Mostrando: ${info.start + 1} a ${info.end}\n` +
                       `Página actual: ${info.page + 1} de ${info.pages}`;
        alert(mensaje);
    });

    // ========================================
    // BOTÓN "FILTRAR"
    // ========================================
    $('#btnFiltrar').on('click', function() {
        const servicios = [
            'Vacunación',
            'Atención Medica',
            'VC, MDC, NC',
            'Todas'
        ];
        
        const mensaje = '🔽 Filtrar por Servicio:\n\n' + 
                       servicios.map((s, i) => `${i + 1} - ${s}`).join('\n');
        
        const opcion = prompt(mensaje);
        
        if (opcion !== null) {
            const indice = parseInt(opcion) - 1;
            if (indice >= 0 && indice < servicios.length - 1) {
                tabla.column(6).search(servicios[indice]).draw();
                console.log('🔽 Filtrado por:', servicios[indice]);
            } else if (indice === servicios.length - 1) {
                tabla.column(6).search('').draw();
                console.log('🔽 Filtro eliminado');
            }
        }
    });

    // ========================================
    // BOTÓN "ORDENAR"
    // ========================================
    $('#btnOrdenar').on('click', function() {
        const opciones = [
            '📅 Fecha (más antigua primero)',
            '📅 Fecha (más reciente primero)',
            '👤 Propietario (A-Z)',
            '👤 Propietario (Z-A)',
            '🏥 Servicio (A-Z)'
        ];
        
        const mensaje = '⬆️⬇️ Selecciona el ordenamiento:\n\n' + 
                       opciones.map((o, i) => `${i + 1} - ${o}`).join('\n');
        
        const opcion = prompt(mensaje);
        
        switch(opcion) {
            case '1':
                tabla.order([1, 'asc']).draw();
                console.log('📅 Ordenado por fecha ascendente');
                break;
            case '2':
                tabla.order([1, 'desc']).draw();
                console.log('📅 Ordenado por fecha descendente');
                break;
            case '3':
                tabla.order([2, 'asc']).draw();
                console.log('👤 Ordenado por propietario A-Z');
                break;
            case '4':
                tabla.order([2, 'desc']).draw();
                console.log('👤 Ordenado por propietario Z-A');
                break;
            case '5':
                tabla.order([6, 'asc']).draw();
                console.log('🏥 Ordenado por servicio');
                break;
            default:
                if (opcion !== null) {
                    alert('❌ Opción no válida');
                }
        }
    });

    // ========================================
    // BOTÓN "EXPORT" - EXPORTAR A CSV
    // ========================================
    $('#btnExport').on('click', function() {
        console.log('📥 Exportando a CSV...');
        exportarACSV();
    });

    function exportarACSV() {
        const data = tabla.rows().data();
        let csv = 'ID Perfil,Fecha,Propietario,Mascota,Teléfono,Dirección,Servicio,Nota\n';
        
        data.each(function(fila) {
            const filaLimpia = [];
            for (let i = 0; i < fila.length - 1; i++) {
                const valor = fila[i].toString().replace(/"/g, '""');
                filaLimpia.push(`"${valor}"`);
            }
            csv += filaLimpia.join(',') + '\n';
        });
        
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        const fecha = new Date().toISOString().split('T')[0];
        
        link.setAttribute('href', url);
        link.setAttribute('download', `citas_${fecha}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('✅ Archivo CSV descargado correctamente');
        console.log('✅ CSV exportado');
    }

    // ========================================
    // BOTÓN "AGREGAR NUEVO"
    // ========================================
    $('#btnAgregarNuevo').on('click', function() {
        console.log('➕ Agregar nueva cita');
        
        const confirmacion = confirm('➕ Nueva Cita\n\n¿Deseas agregar una nueva cita?\n\n(Esta es una función de demostración)');
        
        if (confirmacion) {
            // Ejemplo de agregar una fila nueva
            const fecha = new Date().toLocaleDateString('es-ES', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short' 
            });
            
            tabla.row.add([
                'NEW' + Math.floor(Math.random() * 1000),
                fecha,
                'Nuevo Cliente',
                'Perro',
                '300 000 0000',
                'Nueva Dirección',
                'Consulta General',
                'Nueva cita',
                '<button class="btn-accion btn-editar" title="Editar"><i class="bi bi-pencil"></i></button>' +
                '<button class="btn-accion btn-eliminar" title="Eliminar"><i class="bi bi-trash"></i></button>'
            ]).draw();
            
            alert('✅ Nueva cita agregada correctamente');
        }
    });

    // ========================================
    // BOTÓN "EDITAR" EN CADA FILA
    // ========================================
    $(document).on('click', '.btn-editar', function(e) {
        e.stopPropagation();
        const fila = $(this).closest('tr');
        const data = tabla.row(fila).data();
        
        console.log('✏️ Editando cita:', data);
        
        const mensaje = `✏️ Editar Cita\n\n` +
                       `ID: ${data[0]}\n` +
                       `Fecha: ${data[1]}\n` +
                       `Propietario: ${data[2]}\n` +
                       `Mascota: ${data[3]}\n` +
                       `Teléfono: ${data[4]}\n` +
                       `Dirección: ${data[5]}\n` +
                       `Servicio: ${data[6]}\n` +
                       `Nota: ${data[7]}\n\n` +
                       `Aquí se abriría un modal de edición.`;
        
        alert(mensaje);
    });

    // ========================================
    // BOTÓN "ELIMINAR" EN CADA FILA
    // ========================================
    $(document).on('click', '.btn-eliminar', function(e) {
        e.stopPropagation();
        const fila = $(this).closest('tr');
        const data = tabla.row(fila).data();
        
        console.log('🗑️ Intentando eliminar:', data[2]);
        
        const confirmacion = confirm(
            `🗑️ Eliminar Cita\n\n` +
            `¿Estás seguro de eliminar la cita de ${data[2]}?\n\n` +
            `ID: ${data[0]}\n` +
            `Fecha: ${data[1]}\n` +
            `Mascota: ${data[3]}\n\n` +
            `⚠️ Esta acción no se puede deshacer.`
        );
        
        if (confirmacion) {
            tabla.row(fila).remove().draw();
            alert('✅ Cita eliminada correctamente');
            console.log('✅ Cita eliminada');
        }
    });

    // ========================================
    // NAVEGACIÓN DE PÁGINAS - ARREGLADO
    // ========================================
    
    // Escuchar eventos de paginación
    tabla.on('page.dt', function() {
        const info = tabla.page.info();
        console.log(`📄 Página ${info.page + 1} de ${info.pages}`);
    });

    // ========================================
    // ATAJOS DE TECLADO
    // ========================================
    $(document).on('keydown', function(e) {
        // Ctrl/Cmd + F para enfocar búsqueda
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            $('#buscarCitas').focus();
        }
        
        // Esc para limpiar búsqueda
        if (e.key === 'Escape' && $('#buscarCitas').is(':focus')) {
            $('#buscarCitas').val('').trigger('keyup');
        }
    });

    // ========================================
    // EVENTOS ADICIONALES
    // ========================================
    
    // Click en fila para seleccionar (opcional)
    $('#tablaCitas tbody').on('click', 'tr', function() {
        if (!$(this).hasClass('selected')) {
            $(this).addClass('selected').siblings().removeClass('selected');
        }
    });

    // ========================================
    // FUNCIONES DE DEBUG
    // ========================================
    window.debugTabla = function() {
        console.log('📊 Estado de la tabla:');
        console.log('Total de filas:', tabla.rows().count());
        console.log('Filas filtradas:', tabla.rows({ search: 'applied' }).count());
        console.log('Info de página:', tabla.page.info());
    };

    console.log('✅ Módulo de Gestión de Citas inicializado correctamente');
    console.log('💡 Tip: Usa Ctrl+F para buscar, Esc para limpiar');
    console.log('💡 Debug: Escribe debugTabla() en la consola para ver el estado');
});

// ========================================
// FUNCIONES AUXILIARES GLOBALES
// ========================================

// Función para imprimir la tabla
function imprimirTabla() {
    window.print();
}

// Función para limpiar todos los filtros
function limpiarFiltros() {
    $('#buscarCitas').val('');
    $('#tablaCitas').DataTable().search('').columns().search('').draw();
    alert('🧹 Filtros limpiados');
    console.log('🧹 Todos los filtros eliminados');
}

// Función para recargar datos (para uso futuro con API)
function recargarDatos() {
    $('#tablaCitas').DataTable().ajax.reload();
    console.log('🔄 Datos recargados');
}