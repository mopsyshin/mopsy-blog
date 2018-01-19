<template>
      <router-link :to="{name: 'UploadContainer' }">
        <div class="btn-add-post">
              <span>+</span>
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
    color: #ccc;
    font-size: 27px;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border-radius: 40px;
    border: 1px solid #ccc;
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
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

