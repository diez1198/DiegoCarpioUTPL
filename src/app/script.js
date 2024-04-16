//Obtener todos los elementos del menú con desplegable
const dropdownMenus = document.querySelectorAll('.dropdown');

// Iterar sobre todos los elementos del menú con desplegable
dropdownMenus.forEach(dropdownMenu => {

  // Obtener el botón que abre el menú desplegable
  const dropdownToggle = dropdownMenu.querySelector('.dropdown-toggle');

  // Obtener el menú desplegable
  const dropdownMenuList = dropdownMenu.querySelector('.dropdown-menu');

  // Agregar evento al botón para abrir/cerrar el menú desplegable
  dropdownToggle.addEventListener('click', () => {
    dropdownMenuList.classList.toggle('show');
  });

  // Cerrar el menú desplegable si el usuario hace clic fuera de él
  window.addEventListener('click', e => {
    if (!dropdownMenu.contains(e.target)) {
      dropdownMenuList.classList.remove('show');
    }
  });

});