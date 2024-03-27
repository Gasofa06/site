import { Delay } from '/javascript/utils.js';

function InitHomeLoader() {}

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
 * Initialize locomotive scroll
 */
function InitSmoothScroll(container) {
  scroll = new LocomotiveScroll({
    el: window.scroll_container,
    name: 'smooth-scroll',
    smooth: true,
  });

  $(window).on('resize', () => {
    // Updates all element positions.
    scroll.update();
  });

  scroll.on('scroll', () => {
    // Checks where the scrollbar is and updates all ScrollTrigger instances.
    ScrollTrigger.update();
  });

  ScrollTrigger.scrollerProxy(`[${window.scroll_container_attr}]`, {
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
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: container.querySelector(`[${window.scroll_container_attr}]`).style
      .transform
      ? 'transform'
      : 'fixed',
  });

  ScrollTrigger.defaults({
    scroller: document.querySelector(`[${window.scroll_container_attr}]`),
  });

  /**
   * Remove Old Locomotive Scrollbar
   */

  const scrollbar = selectAll('.c-scrollbar');

  if (scrollbar.length > 1) {
    scrollbar[0].remove();
  }

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener('refresh', () => scroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

let OnTransitionStart = () => {
  $('html').attr('in-transition', true);
  console.log('Page transition started...');
};

let OnTransitionFinish = () => {
  $('html').attr('in-transition', true);
  scroll.init();
  scroll.stop();
};

let AfterEnter = () => {
  window.scrollTo(0, 0);
  initCookieViews();
};

/**
 * Call page initializers
 *
 * @param {object} container Barba container
 * @param {boolean} is_home True if goes home
 */
let OnPageLoad = (container, namespace) => {
  InitSmoothScroll(container);
  initScript();
  initCookieViews();

  if (namespace === 'home') {
    InitHomeLoader();
  } else {
    InitDefaultLoader();
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
          OnPageLoad(data.next.container, data.next.namespace);
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
          OnPageLoad(data.next.container, data.next.namespace);
        },
      },
    ],
  });
}

function SetScrollContainer() {
  let $body = $('body');
  window.scroll_container = $body[0];
  window.scroll_container_attr = 'data-scroll-container';
  $body.attr(window.scroll_container_attr);
}

function Main() {
  gsap.registerPlugin(ScrollTrigger);
  scroll;

  SetScrollContainer();
  InitPageTransitions();
}

Main();
