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