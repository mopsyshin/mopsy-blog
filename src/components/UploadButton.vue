<template>
      <router-link :to="{name: 'UploadContainer'}">
          <p class="btn-add-post">+ Add Post</p>
      </router-link>
</template>
<script>
export default {
    name: 'UploadButton',
}
</script>
<style scoped>
.btn-add-post {
    color: #fff;
    font-size: 16px;
}
@media (max-width: 880px ) {
  .btn-add-post {
    font-size: 12px;
  }
}
</style>

