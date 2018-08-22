import Vue from 'vue';
import Vuex from 'vuex';
import { db, auth } from '../firebaseInit';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    loadCount: 1,
    posts: [],
    currentCategory: 'All',
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
    blocks(state) {
      if (state.posts.length) {
        return state.posts.slice(0, state.loadCount * 20);
      }
      return [];
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.user = payload.user;
    },
    setPosts(state, payload) {
      state.posts.push(payload.data);
    },
    increaseLoadCount(state) {
      state.loadCount += 1;
    },
    clearPosts (state) {
      state.posts = [];
    },
    categorize(state, payload) {
      state.currentCategory = payload.value;
    },
  },
  actions: {
    getPost() {
      db.collection('post').where('deleted', '==', false).orderBy('id', 'desc').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          this.commit({
            type: 'setPosts',
            data,
          });
        });
      });
    },
    refreshPost() {
      this.commit('clearPosts');
      this.dispatch('getPost');
    },
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
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          var provider = new firebase.auth.GoogleAuthProvider();
          return auth.signInWithRedirect(provider);
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
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
