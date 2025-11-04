// Función para abrir modal de nuevo paciente
        function abrirModalNuevoPaciente() {
            alert('Aquí se abrirá el modal para agregar un nuevo paciente');
            // Aquí puedes agregar la lógica del modal
        }

        // Búsqueda de pacientes
        document.getElementById('buscadorPacientes').addEventListener('input', function(e) {
            const termino = e.target.value.toLowerCase();
            const filas = document.querySelectorAll('#tablaPacientesBody tr');
            
            filas.forEach(fila => {
                const texto = fila.textContent.toLowerCase();
                fila.style.display = texto.includes(termino) ? '' : 'none';
            });
        });

        // Filtro por especie
        document.getElementById('filtroEspecie').addEventListener('change', function() {
            // Lógica de filtrado por especie
            console.log('Filtrar por especie:', this.value);
        });

        // Filtro por estado
        document.getElementById('filtroEstado').addEventListener('change', function() {
            // Lógica de filtrado por estado
            console.log('Filtrar por estado:', this.value);
        });

        // Cambiar entre vistas
        document.querySelectorAll('.boton-vista').forEach(button => {
            button.addEventListener('click', function() {
                // Remover active de todos los botones
                document.querySelectorAll('.boton-vista').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Ocultar todas las vistas
                document.getElementById('vistaCalendario').style.display = 'none';
                document.getElementById('vistaDia').style.display = 'none';
                document.getElementById('vistaLista').style.display = 'none';

                // Mostrar la vista seleccionada
                const vista = this.dataset.vista;
                if (vista === 'calendario') {
                    document.getElementById('vistaCalendario').style.display = 'block';
                } else if (vista === 'dia') {
                    document.getElementById('vistaDia').style.display = 'block';
                } else if (vista === 'lista') {
                    document.getElementById('vistaLista').style.display = 'block';
                }
            });
        });

        // Navegación de mes en calendario
        function cambiarMes(direccion) {
            console.log('Cambiar mes:', direccion);
            // Aquí iría la lógica para cambiar el mes
        }

        // Abrir modal para nueva cita
        function abrirModalNuevaCita() {
            alert('Aquí se abrirá el modal para crear una nueva cita');
            // Aquí puedes implementar un modal de Bootstrap
        }

        // Click en días del calendario
        document.querySelectorAll('.celda-dia:not(.otro-mes)').forEach(dia => {
            dia.addEventListener('click', function() {
                document.querySelectorAll('.celda-dia').forEach(d => d.classList.remove('seleccionado'));
                this.classList.add('seleccionado');
                console.log('Día seleccionado:', this.textContent);
                // Aquí puedes cargar las citas del día seleccionado
            });
        });