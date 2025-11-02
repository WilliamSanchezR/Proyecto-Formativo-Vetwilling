let currentStep = 0;
const steps = document.querySelectorAll('.step');
const bars = document.querySelectorAll('.progress-bar');
const labels = document.querySelectorAll('.progress-labels span');

// Funcion para mostrar el paso actual del formulario de registro de pacientes de laboratorio
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

// Funcion para avanzar en el formulario de registro de pacientes de laboratorio
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

// Funcion para retroceder en el formulario de registro de pacientes de laboratorio
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

// Función para pintar las opciones en un select a partir de una lista
function pintarOptionsSelect(lista, selectId) {
    const elementselect = document.getElementById(selectId);
    lista.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.id;
        option.textContent = tipo.name;

        elementselect.appendChild(option);
    });

}

// Función para consultar el JSON de tipos de documento
function consultaTipoDocumento() {
    fetch("../../assets/data/tipoDoumento.json")
        .then(response => response.json())
        .then(data => {
            pintarOptionsSelect(data, 'tipoDocumento');
        })
        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });

}

// Función para consultar el JSON de especies
function consultaEspecie() {
    fetch("../../assets/data/especie.json")
        .then(response => response.json())
        .then(data => {
            pintarOptionsSelect(data, 'especie');
        })
        .catch(error => {
            console.error("Error al cargar el JSON:", error);

        });
}



document.addEventListener("DOMContentLoaded", () => {
    consultaTipoDocumento();
    consultaEspecie();
});