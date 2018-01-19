<template>
      <router-link :to="{name: 'UploadContainer' }">
          <button class="btn-add-post">
              <span>+</span>
            </button>
      </router-link>
</template>
<script>
export default {
    name: 'UploadButton',
}
</script>
<style scoped>
.btn-add-post {
    color: #ccc;
    font-size: 27px;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border-radius: 100%;
    border: 1px solid #ccc;
    transition: all 0.3s;
}
.btn-add-post:hover {
    color: #fff;
    border: 1px solid #fff;
}

@media (max-width: 880px ) {
  .btn-add-post {
    width: 32px;
    height: 32px;
    font-size: 21px;
  }
}
</style>

