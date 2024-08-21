
const dropdownMenus = document.querySelectorAll('.dropdown');


dropdownMenus.forEach(dropdownMenu => {

  const dropdownToggle = dropdownMenu.querySelector('.dropdown-toggle');

  const dropdownMenuList = dropdownMenu.querySelector('.dropdown-menu');


  dropdownToggle.addEventListener('click', () => {
    dropdownMenuList.classList.toggle('show');
  });


  window.addEventListener('click', e => {
    if (!dropdownMenu.contains(e.target)) {
      dropdownMenuList.classList.remove('show');
    }
  });

});