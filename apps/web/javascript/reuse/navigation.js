function InitMenuAnimations() {
  let aa = () => {};

  function SetButtonsAnimations() {
    let btns = $('.nav-btns-list').find('button');

    $.each(btns, (key, btn) => {
      var tl = gsap.timeline({ paused: true, onStart: aa });

      tl.to($(btn).find('.link .title h1'), { color: '#f00' })
        .to($(btn).find('.link .arrow svg'), { color: '#f00' }, '<')
        .to($(btn).find('.hover-bg'), { color: '#f00' }, '<');

      $(btn).hover(
        () => tl.play(),
        () => tl.reverse(),
      );
    });
  }

  SetButtonsAnimations();
}

/**
 * Initialize Nav Menu
 */
function InitNavigationMenu() {
  let class_name = 'menu__opened';
  let nav_menu = $('#nav-menu');

  let ToggleMenuNavigation = (menu, name) => {
    menu.toggleClass(name);
  };

  $('#menu-input').on('change', () => {
    ToggleMenuNavigation(nav_menu, class_name);
  });

  let CloseMenuNavigation = (menu, name) => {
    if (menu.hasClass(name)) {
      menu.removeClass(name);
    }
  };

  $(window).on('resize', () => {
    CloseMenuNavigation(nav_menu, class_name);
  });
}

/**
 * Toggle Theme
 */
function InitToggleTheme() {
  let laptop__checkbox = document.querySelector('.laptop__toggle-theme input');
  let mobile__checkbox = document.querySelector('.mobile__toggle-theme input');

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

  [laptop__checkbox, mobile__checkbox].forEach(obj =>
    obj.addEventListener('change', () => ToggleTheme()),
  );
}

/**
 * Hide Nav Bar in Footer
 */
function InitFooterDetection() {
  let class_name = 'footer-detected';
  let navigation_menu = document.getElementById('nav-menu');
  let footer = document.getElementById('footer-page');

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

  window.addEventListener('scroll', () =>
    OnScroll(class_name, navigation_menu, footer),
  );
}

function Main() {
  InitNavigationMenu();
  InitMenuAnimations();
  // SetToggleTheme();
  // SetFooterDetection();

  return;
}

Main();
