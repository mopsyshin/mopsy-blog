import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '../firebaseInit';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    loginState(state) {
      if (state.user === null) {
        return false;
      }
      return true;
    },
    isAdmin(state) {
      if (state.user === null) {
        return false;
      }
      if (state.user.email === 'mopsyshin@gmail.com') {
        return true;
      }
      return false;
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.user = payload.user;
    }
  },
  actions: {
    logout() {
      auth.signOut().then(() => {
        this.commit({
          type: 'setUserInfo',
          user: null,
        });
      }).catch((error) => {
        // An error happened.
      });
    },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          var provider = new firebase.auth.GoogleAuthProvider();
          return auth.signInWithRedirect(provider);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
      });
    },
    checkUser() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const userInfo = user;
          this.commit({
            type: 'setUserInfo',
            user: userInfo,
          });
        } else {
          // No user is signed in.
        }
      });
    },
  },
});
