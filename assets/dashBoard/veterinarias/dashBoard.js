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