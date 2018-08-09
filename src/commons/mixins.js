const mixin = {
  // computed: {
  //   user() {
  //     return this.$store.state.accountStore.user;
  //   },
  //   userInfo() {
  //     return this.$store.state.accountStore.userInfo;
  //   },
  //   loginState() {
  //     return this.$store.state.accountStore.loginState;
  //   },
  // },
  methods: {
    stopBodyScroll(bool) {
      if (bool === true ) {
        document.body.addEventListener("touchmove", this.freezeVp, false);
        document.body.style.overflow = 'hidden';
      } else {
        document.body.addEventListener("touchmove", this.freezeVp, true);
        document.body.style.overflow = 'auto';
      }
    },
    freezeVp(e) {
      e.preventDefault();
    },
  },
};

export default mixin;
