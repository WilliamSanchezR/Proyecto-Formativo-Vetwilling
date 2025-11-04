// Gráfico de Ingresos
const ctxIngresos = document.getElementById('graficoIngresos').getContext('2d');
    new Chart(ctxIngresos, {
        type: 'line',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [{
                label: 'Ingresos 2024',
                data: [29550, 30600, 31700, 32400, 35330, 38200],
                borderColor: '#0A932c',
                backgroundColor: 'rgba(10, 147, 44, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Servicios (Donut)
const ctxServicios = document.getElementById('graficoServicios').getContext('2d');
    new Chart(ctxServicios, {
        type: 'doughnut',
        data: {
            labels: ['Consultas', 'Vacunación', 'Cirugías', 'Emergencias'],
            datasets: [{
                data: [45, 28, 18, 9],
                backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '70%'
        }
    });

    // Botones de periodo
    document.querySelectorAll('.boton-periodo').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.boton-periodo').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            console.log('Periodo seleccionado:', this.dataset.periodo);
        });
    });

// Funciones de exportación
function exportarPDF() {
    alert('Exportando reporte a PDF...');
    // Aquí iría la lógica de exportación a PDF
}

    function exportarExcel() {
        alert('Exportando reporte a Excel...');
        // Aquí iría la lógica de exportación a Excel
    }