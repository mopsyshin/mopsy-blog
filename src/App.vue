<template>
  <div id="app">
    <div class="app-wrapper">
      
      <transition name="fadein" mode="out-in" appear>
        <router-view/>
      </transition>
      
      <transition name="modalfadein">
        <SemiModal v-if="uploadComplete" :message="modalMessage"></SemiModal>
      </transition>
    </div>
  </div>
</template>

<script>
import BackButton from './components/BackButton';
import SemiModal from './components/modal/SemiModal';
// import firebase from 'firebase';

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export default {
  name: 'App',
  data() {
    return {
      uploadComplete: false,
      modalMessage: '',
    };
  },
  created() {
    this.$store.dispatch('getPost');
    this.$eventHub.$on('toggleModal', this.modalState);
  },
  methods: {
    modalState(message) {
      this.modalMessage = message;
      this.uploadComplete = true;
      setTimeout( () => {
        this.uploadComplete = false;
      }, 2000);
    },
  },
  components: {
    SemiModal: SemiModal,
  },
};
</script>

<style>
@import './suneditor/css/suneditor.css';

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes detailfadein {
  from {
    opacity: 0;
    transform: translateX(30%);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes bg-fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes modalfadein {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
.bg-fadein-enter-active {
  animation: bg-fadein 0.5s;
}
.bg-fadein-leave-active {
  animation: bg-fadein 0.2s reverse;
}
.fadein-enter-active {
  animation: fadein 0.3s;
}
.fadein-leave-active {
  animation: fadein 0.2s reverse;
}
.detailfadein-enter-active {
  animation: detailfadein 0.5s;
}
.detailfadein-leave-active {
  animation: detailfadein 0.2s reverse;
}
.modalfadein-enter-active {
  animation: modalfadein 0.5s;
}
.modalfadein-leave-active {
  animation: modalfadein 0.2s reverse;
}
::-webkit-scrollbar-track
 {
  border-radius: 2px;
  background-color: #ffffff;
  opacity: 0;
 }

 ::-webkit-scrollbar
 {
  width: 0px;
  background-color: #ffffff;
  opacity: 0;
  display: none;
 }

 ::-webkit-scrollbar-thumb
 {
  border-radius: 2px;
  background-color: #eee;
 }


html, body, p, span, input, div, table, ul, li, textarea {
  font-family: 'Avenir', 'Apple SD Gothic Neo', Helvetica, Arial, 'Malgun Gothic', Dotum, sans-serif;
  margin: 0;
  padding: 0;
  border: none;
}
select {
  padding: 10px;
  margin: 0;
  -webkit-appearance:none; /* remove the strong OSX influence from Webkit */
}
select:focus {
  outline: none;
}
button:focus, input:focus, textarea:focus {
  outline: none;
}
button:hover {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #626cff;
}
a:visited {
  text-decoration: none;
  color: #626cff;
}
body {
  width: 100vw;
  min-height: 100vh;
  background-color: #363841;
  color: #ccc;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
}
.app-wrapper {
  margin: 0 auto;
}
</style>
