document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header');
    const toggleHeaderBtn = document.getElementById('toggle-header-btn');
    const mainContent = document.getElementById('main-content');

    // --- Lógica para ocultar/mostrar el header ---
    if (toggleHeaderBtn && header && mainContent) {
        toggleHeaderBtn.addEventListener('click', () => {
            header.classList.toggle('header-hidden');
            mainContent.classList.toggle('main-content-fullscreen');

            // Cambiar el texto del botón para indicar la acción
            if (header.classList.contains('header-hidden')) {
                toggleHeaderBtn.innerHTML = '↓';
                toggleHeaderBtn.style.bottom = '0px'; // Ajustar posición cuando está oculto
            } else {
                toggleHeaderBtn.innerHTML = '↑';
                toggleHeaderBtn.style.bottom = '-30px'; // Volver a la posición original
            }
        });
    }

    // --- Lógica para menús desplegables (mejor para móviles) ---
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        dropbtn.addEventListener('click', function(event) {
            // Prevenir que el link navegue si es un menú desplegable
            if (window.innerWidth < 768) { // Activar solo en pantallas pequeñas
                 event.preventDefault();
            }

            // Cerrar otros menús abiertos
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Abrir/cerrar el menú actual
            dropdown.classList.toggle('active');
        });
    });

    // Cerrar menús si se hace clic fuera de ellos
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Añadir una clase 'active' para controlar la visibilidad en JS
    // Es un enfoque más robusto que solo :hover
    const style = document.createElement('style');
    style.innerHTML = `
        .dropdown.active .dropdown-content {
            display: block;
        }
    `;
    document.head.appendChild(style);
});
