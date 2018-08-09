const mixin = {
  methods: {
    stopBodyScroll(bool) {
      if (bool === true ) {
        document.body.style.position = 'fixed';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.position = 'static';
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    },
    // freezeVp(e) {
    //   e.preventDefault();
    // },
  },
};

export default mixin;
