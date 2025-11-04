/* ============================================================
   ARCHIVO: theme-switcher.js
   INSTRUCCIÓN: Agregar al final de tu HTML, después de tus otros scripts
   ============================================================ */

// Función para cambiar el tema
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Aplicar nuevo tema
    html.setAttribute('data-theme', newTheme);
    
    // Guardar en localStorage
    localStorage.setItem('theme', newTheme);
    
    // Actualizar icono del botón (si existe)
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (newTheme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill';
        } else {
            themeIcon.className = 'bi bi-moon-stars-fill';
        }
    }
    
    // Actualizar texto del botón (si existe)
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn && themeBtn.textContent) {
        themeBtn.textContent = newTheme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    }
    
    console.log(`✅ Tema cambiado a: ${newTheme}`);
}

// Cargar tema guardado al iniciar la página
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    // Aplicar tema guardado
    html.setAttribute('data-theme', savedTheme);
    
    // Actualizar icono
    if (themeIcon) {
        if (savedTheme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill';
        } else {
            themeIcon.className = 'bi bi-moon-stars-fill';
        }
    }
    
    console.log(`✅ Tema cargado: ${savedTheme}`);
}

// Cargar tema cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSavedTheme);
} else {
    loadSavedTheme();
}