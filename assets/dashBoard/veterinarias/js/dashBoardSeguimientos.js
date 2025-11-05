// Filtros de seguimiento
        document.querySelectorAll('.boton-filtro-seg').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.boton-filtro-seg').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filtro = this.dataset.filtro;
                console.log('Filtro seleccionado:', filtro);
                // Aquí iría la lógica para filtrar los seguimientos
            });
        });

        // Búsqueda de seguimientos
        document.getElementById('buscadorSeguimientos').addEventListener('input', function(e) {
            const termino = e.target.value.toLowerCase();
            console.log('Buscando:', termino);
            // Aquí iría la lógica de búsqueda
        });

        // Nuevo seguimiento
        function nuevoSeguimiento() {
            alert('Aquí se abrirá el modal para crear un nuevo seguimiento');
        }