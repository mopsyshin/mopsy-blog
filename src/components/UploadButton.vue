<template>
      <router-link :to="{name: 'UploadContainer' }">
        <div class="btn-add-post">
              <img class="downarrow" src="../assets/plus.svg" alt="">
        </div>
      </router-link>
</template>
<script>
export default {
    name: 'UploadButton',
}
</script>
<style scoped>
.btn-add-post {
    position: fixed;
    bottom: 64px;
    right: 64px;
    color: #ccc;
    width: 48px;
    height: 48px;
    background-color: rgba(255,255,255, 0.5);
    border-radius: 40px;
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-add-post:hover {
    background-color: #fff;
}
.btn-add-post img {
  width: 24px;
}
@media (max-width: 880px ) {
  .btn-add-post {
    width: 32px;
    height: 32px;
  }
  .btn-add-post img {
    width: 18px;
  }
}
@media (max-width: 410px ) {
  .btn-add-post {
    width: 24px;
    height: 24px;
    border: none;
  }
  .btn-add-post img {
    width: 16px;
  }
}
</style>

