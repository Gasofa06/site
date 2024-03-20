let CloseMenuNavigation = (menu, name) => {
  if (menu.classList.contains(name)) {
    menu.classList.remove(name);
  }
};

let ToggleMenuNavigation = (menu, name) => {
  menu.classList.toggle(name);
};

function SetMenuNavigation() {
  let class_name = 'menu__opened';
  let nav_menu = document.getElementById('navigation-menu');

  let checkbox = document.getElementById('menu-input');
  checkbox.addEventListener('change', () =>
    ToggleMenuNavigation(nav_menu, class_name),
  );

  addEventListener('resize', () => CloseMenuNavigation(nav_menu, class_name));
}

// TODO
let ToggleTheme = () => {
  let theme = document.documentElement.getAttribute('theme');

  if (theme === 'light') theme = 'dark';
  else if (theme === 'dark') theme = 'light';

  document.documentElement.setAttribute('theme', theme);

  try {
    localStorage.setItem('data-theme', theme);
  } catch (_error) {
    alert(_error);
  }
};

// TODO
function SetToggleTheme() {
  let laptop__checkbox = document.querySelector('.laptop__toggle-theme input');
  let mobile__checkbox = document.querySelector('.mobile__toggle-theme input');

  [laptop__checkbox, mobile__checkbox].forEach(obj =>
    obj.addEventListener('change', () => ToggleTheme()),
  );
}

// TODO
let OnScroll = (name, menu, footer) => {
  let offest = 642;
  let y = window.scrollY;

  let footer_height = footer.clientHeight;
  let footer_top = footer.offsetTop;

  if (y >= footer_top - offest && y < footer_top + footer_height - offest) {
    menu.classList.add(name);
  } else if (menu.classList.contains(name)) {
    menu.classList.remove(name);
  }
};

// TODO
function SetFooterDetection() {
  let class_name = 'footer-detected';
  let navigation_menu = document.getElementById('navigation-menu');
  let footer = document.getElementById('footer-page');

  window.addEventListener('scroll', () =>
    OnScroll(class_name, navigation_menu, footer),
  );
}

function Main() {
  SetMenuNavigation();
  // SetToggleTheme();
  // SetFooterDetection();

  return;
}

Main();
