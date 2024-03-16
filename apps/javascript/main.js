barba.init({
  transitions: [
    {
      name: 'page-transition',
      leave() {
        return gsap.to(data.current.container, {
          opacity: 0,
        });
      },
      enter() {
        return gsap.from(data.next.container, {
          opacity: 0,
        });
      },
    },
  ],

  views: [
    {
      namespace: 'home',
      beforeEnter() {
        // update the menu based on user navigation
        menu.update();
      },
      afterEnter() {
        // refresh the parallax based on new page content
        parallax.refresh();
      },
    },
  ],
});
