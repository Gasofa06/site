import { Delay } from '/javascript/utils.js';

function animationLoadHome() {
  let tl = gsap.timeline();

  tl.set('#loader > .screen', {
    scale: 1,
  });

  tl.call(function () {
    scroll.stop();
  });

  tl.to(
    '#loader',
    {
      opacity: 1,
      duration: 0.3,
    },
    1,
  );

  tl.to(
    '#loader > .screen',
    {
      borderRadius: '16px',
      duration: 0.1,
    },
    '<',
  );

  tl.to(
    '#loader > .screen',
    {
      scale: 0.9,
      duration: 0.6,
      ease: 'power1.inOut',
    },
    '<',
  );

  (function () {
    let colors = {
      black: '#000000',
      red: '#ff2a00',
      blue: '#466cf7',
      yellow: '#f9e169',
      gray: '#f0f0f0',
      green: '#58d381',
    };

    Object.entries(colors).map(([key, clr], idx) => {
      if (idx === 0) {
        tl.set(
          '#loader .logo rect',
          {
            fill: clr,
          },
          '-=0.15',
        );

        tl.set('#loader .logo', {
          y: 64,
          opacity: 1,
        });

        tl.to('#loader .logo', {
          y: 0,
          duration: 0.25,
        });
      } else {
        tl.to(
          '#loader .logo rect',
          {
            fill: clr,
            duration: 0,
          },
          '+=0.15',
        );
      }
    });

    tl.to(
      '#loader .logo',
      {
        y: -64,
        duration: 0.25,
      },
      '+=0.35',
    );
  })();

  tl.to(
    '#loader > .screen',
    {
      scale: 1,
      duration: 0.6,
      ease: 'power1.inOut',
    },
    '+=0.4',
  );

  tl.to(
    '#loader > .screen',
    {
      borderRadius: '0px',
      duration: 0.1,
    },
    '-=0.1',
  );

  tl.to(
    '#loader',
    {
      opacity: 0,
      duration: 0.1,
    },
    '<',
  );

  tl.call(function () {
    scroll.start();
  });
}

function animLoadDefault() {}

/**
 * Animation - Page transition out
 */
function PageTransitionOut() {
  var tl = gsap.timeline();

  if ($(window).width() > 540) {
    tl.set('main .once-in', {
      y: '50vh',
    });
  } else {
    tl.set('main .once-in', {
      y: '20vh',
    });
  }

  tl.call(function () {
    scroll.start();
  });

  tl.to('main .once-in', {
    duration: 1,
    y: '0vh',
    stagger: 0.05,
    ease: 'Expo.easeOut',
    delay: 0.8,
    clearProps: 'true',
  });
}

/**
 * Animation - Page transition in
 */
function PageTransitionIn() {
  var tl = gsap.timeline();

  tl.call(function () {
    scroll.stop();
  });

  tl.set('.loading-screen', {
    top: '100%',
  });

  tl.set('.loading-words', {
    opacity: 0,
    y: 0,
  });

  tl.set('html', {
    cursor: 'wait',
  });

  if ($(window).width() > 540) {
    tl.set('.loading-screen .rounded-div-wrap.bottom', {
      height: '10vh',
    });
  } else {
    tl.set('.loading-screen .rounded-div-wrap.bottom', {
      height: '5vh',
    });
  }

  tl.to('.loading-screen', {
    duration: 0.5,
    top: '0%',
    ease: 'Power4.easeIn',
  });

  if ($(window).width() > 540) {
    tl.to(
      '.loading-screen .rounded-div-wrap.top',
      {
        duration: 0.4,
        height: '10vh',
        ease: 'Power4.easeIn',
      },
      '=-.5',
    );
  } else {
    tl.to(
      '.loading-screen .rounded-div-wrap.top',
      {
        duration: 0.4,
        height: '10vh',
        ease: 'Power4.easeIn',
      },
      '=-.5',
    );
  }

  tl.to('.loading-words', {
    duration: 0.8,
    opacity: 1,
    y: -50,
    ease: 'Power4.easeOut',
    delay: 0.05,
  });

  tl.set('.loading-screen .rounded-div-wrap.top', {
    height: '0vh',
  });

  tl.to(
    '.loading-screen',
    {
      duration: 0.8,
      top: '-100%',
      ease: 'Power3.easeInOut',
    },
    '=-.2',
  );

  tl.to(
    '.loading-words',
    {
      duration: 0.6,
      opacity: 0,
      ease: 'linear',
    },
    '=-.8',
  );

  tl.to(
    '.loading-screen .rounded-div-wrap.bottom',
    {
      duration: 0.85,
      height: '0',
      ease: 'Power3.easeInOut',
    },
    '=-.6',
  );

  tl.set(
    'html',
    {
      cursor: 'auto',
    },
    '=-0.6',
  );

  if ($(window).width() > 540) {
    tl.set('.loading-screen .rounded-div-wrap.bottom', {
      height: '10vh',
    });
  } else {
    tl.set('.loading-screen .rounded-div-wrap.bottom', {
      height: '5vh',
    });
  }

  tl.set('.loading-screen', {
    top: '100%',
  });

  tl.set('.loading-words', {
    opacity: 0,
  });
}

/**
 * Initialize Locomotive Scroll.
 * Set Scroll Trigger methods.
 */
function InitSmoothScroll() {
  let scroll_attr = `[${window.scroll_attr}]`;
  let scroll_container = $(scroll_attr)[0];

  scroll = new LocomotiveScroll({
    el: scroll_container,
    name: 'smooth-scroll',
    smooth: true,
  });

  $(window).on('resize', () => {
    // Called each time the size of the window changes.
    // Refresh ScrollTrigger and update LocomotiveScroll.
    scroll.update();
  });

  scroll.on('scroll', () => {
    // Called each time the user scrolls.
    // Checks where the scrollbar is and updates ScrollTrigger instances.
    ScrollTrigger.update();
  });

  ScrollTrigger.scrollerProxy(scroll_attr, {
    scrollTop: function (value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect: function () {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.defaults({
    scroller: scroll_container,
  });

  ScrollTrigger.addEventListener('refresh', () => {
    // Called each time the window updates.
    // Refresh ScrollTrigger and update LocomotiveScroll.
    scroll.update();
  });
}

let OnTransitionStart = () => {
  $('html').attr('in-transition', true);
};

let OnTransitionFinish = () => {
  $('html').attr('in-transition', true);
  scroll.init();
  scroll.stop();
};

let AfterEnter = () => {
  window.scrollTo(0, 0);
};

/**
 * Prepare the page.
 *
 * @param {string} namespace Name of the next page.
 */
let OnPageLoad = namespace => {
  InitSmoothScroll();

  /*
  (function () {
    select('body').classList.remove('is-loading');
    initWindowInnerheight();
    initCheckTouchDevice();
    initHamburgerNav();
    initMagneticButtons();
    initStickyCursorWithDelay();
    initVisualFilter();
    initScrolltriggerNav();
    initScrollLetters();
    initTricksWords();
    initContactForm();
    initTimeZone();
    initLazyLoad();
    initPlayVideoInview();
    initScrolltriggerAnimations();
  })();*/

  if (namespace === 'home') {
    animationLoadHome();
  } else {
    animLoadDefault();
  }
};

/**
 * Initialize page transition
 */
function InitPageTransitions() {
  barba.hooks.before(() => {
    OnTransitionStart();
  });

  barba.hooks.after(() => {
    OnTransitionFinish();
  });

  barba.hooks.enter(() => {
    scroll.destroy();
  });

  barba.hooks.afterEnter(() => {
    AfterEnter();
  });

  barba.init({
    sync: true,
    debug: true,
    timeout: 8000,
    preventRunning: true,
    transitions: [
      {
        name: 'default',
        once(data) {
          OnPageLoad(data.next.namespace);
        },
        async leave(data) {
          PageTransitionIn(data.current);
          await Delay(495);
          data.current.container.remove();
        },
        async enter(data) {
          PageTransitionOut(data.next);
          initNextWord(data);
        },
        async beforeEnter(data) {
          ScrollTrigger.getAll().forEach(t => t.kill());
          scroll.destroy();
          initSmoothScroll(data.next.container);
          initScript();
        },
      },
      {
        name: 'to-home',
        from: {},
        to: {
          namespace: ['home'],
        },
        once(data) {
          OnPageLoad(data.next.namespace);
        },
      },
    ],
  });
}

/**
 * Set scroll container.
 */
function SetScrollContainer() {
  window.scroll_attr = 'data-scroll-container';

  let $scroll_container = $('body');
  $scroll_container.attr(window.scroll_attr, '');
}

/**
 * Main function.
 */
function Main() {
  gsap.registerPlugin(ScrollTrigger);
  scroll;

  SetScrollContainer();
  InitPageTransitions();
}

Main();
