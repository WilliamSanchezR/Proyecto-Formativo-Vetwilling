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