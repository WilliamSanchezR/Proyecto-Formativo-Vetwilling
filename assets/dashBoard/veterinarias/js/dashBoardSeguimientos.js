    // Cambiar entre vistas de seguimiento
    document.querySelectorAll('.boton-vista-seg').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.boton-vista-seg').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const vista = this.dataset.vista;
            const tarjetas = document.querySelectorAll('.tarjeta-seguimiento');

            tarjetas.forEach(tarjeta => {
                if (vista === 'todos') {
                    tarjeta.style.display = 'block';
                } else if (vista === 'activos') {
                    if (tarjeta.classList.contains('tratamiento') || 
                        tarjeta.classList.contains('observacion') || 
                        tarjeta.classList.contains('recuperacion')) {
                        tarjeta.style.display = 'block';
                    } else {
                        tarjeta.style.display = 'none';
                    }
                } else if (vista === 'completados') {
                    tarjeta.style.display = tarjeta.classList.contains('completado') ? 'block' : 'none';
                } else if (vista === 'criticos') {
                    tarjeta.style.display = tarjeta.classList.contains('critico') ? 'block' : 'none';
                }
            });
        });
    });

    function abrirModalNuevoSeguimiento() {
        alert('Aquí se abrirá el modal para crear un nuevo seguimiento');
    }