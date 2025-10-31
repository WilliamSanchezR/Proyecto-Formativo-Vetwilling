function alternarBarraIzquierda() {
    const barraLateral = document.getElementById('barraLateralIzquierda');
    const contenidoPrincipal = document.getElementById('contenidoPrincipal');
    const icono = document.getElementById('iconoColapsar');
    
    barraLateral.classList.toggle('colapsada');
    contenidoPrincipal.classList.toggle('sidebar-colapsado');
    
    if (barraLateral.classList.contains('colapsada')) {
        icono.className = 'bi bi-chevron-right';
    } else {
        icono.className = 'bi bi-chevron-left';
    }
}

function alternarBarraDerecha() {
    const barraLateral = document.getElementById('barraLateralDerecha');
    const contenidoPrincipal = document.getElementById('contenidoPrincipal');
    
    barraLateral.classList.toggle('oculta');
    contenidoPrincipal.classList.toggle('panel-derecho-abierto');
}

// ========================================
// FUNCIONES PRINCIPALES DEL DASHBOARD
// ========================================

function alternarBarraIzquierda() {
    const barraLateral = document.getElementById('barraLateralIzquierda');
    const contenidoPrincipal = document.getElementById('contenidoPrincipal');
    const icono = document.getElementById('iconoColapsar');
    const overlay = document.getElementById('overlayMovil');
    
    // En escritorio: colapsar/expandir normal
    if (window.innerWidth > 768) {
        barraLateral.classList.toggle('colapsada');
        contenidoPrincipal.classList.toggle('sidebar-colapsado');
        
        if (barraLateral.classList.contains('colapsada')) {
            icono.className = 'bi bi-chevron-right';
        } else {
            icono.className = 'bi bi-chevron-left';
        }
    } 
    // En móvil: mostrar/ocultar sidebar
    else {
        barraLateral.classList.toggle('expandida');
        
        if (barraLateral.classList.contains('expandida')) {
            overlay.classList.add('activo');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('activo');
            document.body.style.overflow = '';
        }
    }
}

function alternarBarraDerecha() {
    const barraLateral = document.getElementById('barraLateralDerecha');
    const contenidoPrincipal = document.getElementById('contenidoPrincipal');
    const overlay = document.getElementById('overlayMovil');
    
    barraLateral.classList.toggle('oculta');
    
    // Solo ajustar margen en desktop
    if (window.innerWidth > 768) {
        contenidoPrincipal.classList.toggle('panel-derecho-abierto');
    }
    
    // En móvil, mostrar overlay
    if (window.innerWidth <= 768) {
        if (!barraLateral.classList.contains('oculta')) {
            overlay.classList.add('activo');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('activo');
            document.body.style.overflow = '';
        }
    }
}

function cerrarSidebars() {
    const barraIzquierda = document.getElementById('barraLateralIzquierda');
    const barraDerecha = document.getElementById('barraLateralDerecha');
    const overlay = document.getElementById('overlayMovil');
    
    barraIzquierda.classList.remove('expandida');
    barraDerecha.classList.add('oculta');
    overlay.classList.remove('activo');
    document.body.style.overflow = '';
}

// ========================================
// MANEJO DE RESIZE
// ========================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        
        const barraIzquierda = document.getElementById('barraLateralIzquierda');
        const barraDerecha = document.getElementById('barraLateralDerecha');
        const contenidoPrincipal = document.getElementById('contenidoPrincipal');
        const overlay = document.getElementById('overlayMovil');
        
        // Al cambiar a desktop, resetear estados móviles
        if (window.innerWidth > 768) {
            overlay.classList.remove('activo');
            document.body.style.overflow = '';
            barraIzquierda.classList.remove('expandida');
            
            // Restaurar comportamiento normal en desktop
            if (barraIzquierda.classList.contains('colapsada')) {
                contenidoPrincipal.classList.add('sidebar-colapsado');
            } else {
                contenidoPrincipal.classList.remove('sidebar-colapsado');
            }
        }
        // Al cambiar a móvil, ocultar sidebars
        else {
            barraIzquierda.classList.remove('expandida');
            barraDerecha.classList.add('oculta');
            contenidoPrincipal.classList.remove('panel-derecho-abierto');
            contenidoPrincipal.classList.remove('sidebar-colapsado');
        }
        
    }, 250);
});

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Crear overlay si no existe
    if (!document.getElementById('overlayMovil')) {
        const overlay = document.createElement('div');
        overlay.id = 'overlayMovil';
        overlay.className = 'overlay-movil';
        overlay.addEventListener('click', cerrarSidebars);
        document.body.appendChild(overlay);
    }
    
    // Crear botón de menú móvil si no existe
    const navegacionIzq = document.querySelector('.navegacion-izquierda');
    if (navegacionIzq && !document.getElementById('botonMenuMovil')) {
        const botonMenu = document.createElement('button');
        botonMenu.id = 'botonMenuMovil';
        botonMenu.className = 'boton-menu-movil';
        botonMenu.innerHTML = '<i class="bi bi-list"></i>';
        botonMenu.addEventListener('click', alternarBarraIzquierda);
        navegacionIzq.insertBefore(botonMenu, navegacionIzq.firstChild);
    }
    
    // Cerrar sidebars al hacer click en enlaces (en móvil)
    const itemsSidebar = document.querySelectorAll('.item-sidebar');
    itemsSidebar.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                cerrarSidebars();
            }
        });
    });
    
    // Prevenir scroll del body cuando sidebars están abiertos en móvil
    const barraIzquierda = document.getElementById('barraLateralIzquierda');
    const barraDerecha = document.getElementById('barraLateralDerecha');
    
    [barraIzquierda, barraDerecha].forEach(barra => {
        if (barra) {
            let startY;
            barra.addEventListener('touchstart', function(e) {
                startY = e.touches[0].pageY;
            }, { passive: true });
            
            barra.addEventListener('touchmove', function(e) {
                const scrollTop = barra.scrollTop;
                const scrollHeight = barra.scrollHeight;
                const height = barra.clientHeight;
                const deltaY = e.touches[0].pageY - startY;
                
                // Prevenir bounce solo cuando estamos en los límites
                if ((scrollTop === 0 && deltaY > 0) || 
                    (scrollTop + height >= scrollHeight && deltaY < 0)) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    });
    
    // Configuración inicial según el tamaño de pantalla
    if (window.innerWidth <= 768) {
        const barraDerecha = document.getElementById('barraLateralDerecha');
        if (barraDerecha) {
            barraDerecha.classList.add('oculta');
        }
    }
});

// ========================================
// TOUCH SWIPE PARA CERRAR SIDEBARS
// ========================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const barraIzquierda = document.getElementById('barraLateralIzquierda');
    const barraDerecha = document.getElementById('barraLateralDerecha');
    
    // Swipe hacia la izquierda para cerrar sidebar izquierdo
    if (touchEndX < touchStartX - 50 && 
        barraIzquierda && 
        barraIzquierda.classList.contains('expandida')) {
        cerrarSidebars();
    }
    
    // Swipe hacia la derecha para cerrar sidebar derecho
    if (touchEndX > touchStartX + 50 && 
        barraDerecha && 
        !barraDerecha.classList.contains('oculta')) {
        cerrarSidebars();
    }
}

// ========================================
// DETECCIÓN DE ORIENTACIÓN
// ========================================

window.addEventListener('orientationchange', function() {
    // Esperar a que complete el cambio de orientación
    setTimeout(function() {
        cerrarSidebars();
    }, 300);
});

// ========================================
// PREVENIR ZOOM EN INPUTS EN iOS
// ========================================

if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        const fontSize = window.getComputedStyle(input).fontSize;
        if (parseFloat(fontSize) < 16) {
            input.style.fontSize = '16px';
        }
    });
}
// esto es lo del registro
        let currentStep = 0;
        const steps = document.querySelectorAll('.step');
        const bars = document.querySelectorAll('.progress-bar');
        const labels = document.querySelectorAll('.progress-labels span');

        function showStep(index) {
            steps.forEach((s, i) => s.classList.toggle('active', i === index));
            bars.forEach((b, i) => b.classList.toggle('active', i <= index));
            labels.forEach((l, i) => l.classList.toggle('active', i === index));

            // Scroll al inicio del formulario
            document.querySelector('.wizard-container').scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Si estamos en el paso de confirmación, actualizar resumen
            if (index === 5) {
                mostrarResumenConfirmacion();
            }
        }

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

            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        }

        function prevStep() {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
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

                <div class="resumen-card">
                    <h4><i class="bi bi-clipboard-pulse text-primary"></i> Información de Atención</h4>
                    <ul>
                        <li><strong>Motivo:</strong> ${document.getElementById('motivoConsulta').value}</li>
                        <li><strong>Fecha:</strong> ${document.getElementById('fechaIngreso').value}</li>
                        <li><strong>Hora:</strong> ${document.getElementById('horaIngreso').value}</li>
                        <li><strong>Veterinario:</strong> ${document.getElementById('veterinario').value}</li>
                        <li><strong>Prioridad:</strong> ${document.getElementById('prioridad').value}</li>
                    </ul>
                </div>
            </div>
        `;

            // Insertar el resumen antes de los botones
            const confirmStep = steps[5];
            const existingResumen = confirmStep.querySelector('.resumen-final');

            if (!existingResumen) {
                const buttonsDiv = confirmStep.querySelector('.buttons');
                buttonsDiv.insertAdjacentHTML('beforebegin', resumenHTML);
            }
        }

        // Inicializar fecha actual en campos de fecha
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('fechaIngreso').value = today;

        // Evento del botón "Volver a revisar"
        document.getElementById('btnVolver')?.addEventListener('click', function () {
            prevStep();
        });

        // Manejar el envío del formulario
        document.getElementById('vetForm').addEventListener('submit', function (event) {
            event.preventDefault();

            Swal.fire({
                title: '¿Deseas enviar el formulario?',
                html: `
                <p>Estás a punto de registrar a <strong>${document.getElementById('nombreMascota').value}</strong></p>
                <p class="text-muted">Una vez confirmado, no podrás realizar más cambios.</p>
            `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#0a932c',
                cancelButtonColor: '#6c757d',
                confirmButtonText: '<i class="bi bi-check-circle"></i> Sí, enviar',
                cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
                background: '#f9fafb',
                color: '#333',
                customClass: {
                    popup: 'rounded-4 shadow-lg'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Mostrar loading
                    Swal.fire({
                        title: 'Enviando formulario...',
                        html: 'Por favor espera un momento',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    // Simular envío (aquí irá tu petición al backend)
                    setTimeout(() => {
                        Swal.fire({
                            title: '¡Registro exitoso!',
                            html: `
                            <i class="bi bi-check-circle-fill text-success" style="font-size: 60px;"></i>
                            <p class="mt-3">El paciente <strong>${document.getElementById('nombreMascota').value}</strong> ha sido registrado correctamente.</p>
                            <p class="text-muted">Recibirás un correo de confirmación en breve.</p>
                        `,
                            icon: 'success',
                            confirmButtonColor: '#0a932c',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            // Preguntar si desea registrar otro paciente
                            Swal.fire({
                                title: '¿Deseas registrar otro paciente?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#0a932c',
                                cancelButtonColor: '#6c757d',
                                confirmButtonText: 'Sí, nuevo registro',
                                cancelButtonText: 'No, volver al dashboard'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // Resetear formulario
                                    document.getElementById('vetForm').reset();
                                    currentStep = 0;
                                    showStep(0);
                                    document.getElementById('fechaIngreso').value = today;
                                } else {
                                    // Redirigir al dashboard
                                    window.location.href = 'dashBoard.html';
                                }
                            });
                        });
                    }, 2000);
                }
            });
        });

        // Validación en tiempo real
        document.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
            input.addEventListener('blur', function () {
                if (!this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });

            input.addEventListener('input', function () {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });

        // Validar formato de email
        document.getElementById('correo').addEventListener('blur', function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('error');
                Swal.fire({
                    icon: 'error',
                    title: 'Correo inválido',
                    text: 'Por favor ingresa un correo electrónico válido',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });

        // Formatear teléfono automáticamente
        document.getElementById('telefono').addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);

            if (value.length > 6) {
                e.target.value = `+57 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
            } else if (value.length > 3) {
                e.target.value = `+57 ${value.slice(0, 3)} ${value.slice(3)}`;
            } else if (value.length > 0) {
                e.target.value = `+57 ${value}`;
            }
        });
