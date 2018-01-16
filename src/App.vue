<template>
  <div id="app">
    <div class="app-wrapper">
      <transition name="fadein" mode="out-in" appear>
      <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
};
</script>

<style>
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
.fadein-enter-active {
  animation: fadein 0.5s;
}
.fadein-leave-active {
  animation: fadein 0.2s reverse;
}

::-webkit-scrollbar-track
 {
  -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);
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
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #eee;
 }


html, body, p, span, input, div, table, ul, li, textarea {
  margin: 0;
  padding: 0;
  border: none;
}

button:focus, input:focus, textarea:focus {
  outline: none;
}
button:hover {
  cursor: pointer;
}

a {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
body {
  background-color: #363841;
  color: #fff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
  margin-top: 60px;
}
.app-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 2040px;
}
@media (max-width: 2040px) {
  .app-wrapper {
    max-width: 1700px;
  }
}
@media (max-width: 1700px) {
  .app-wrapper {
    max-width: 1360px;
  }
}
@media (max-width: 1360px) {
  .app-wrapper {
    max-width: 1020px;
  }
}
@media (max-width: 1020px) {
  .app-wrapper {
    max-width: 680px;
  }
}
@media (max-width: 680px) {
  .app-wrapper {
    max-width: 340px;
  }
  #app {
    margin-top: 20px;
  }
}
</style>
