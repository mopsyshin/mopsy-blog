<template>
  <router-link :to="{ name: 'DetailView', params: { id:id } }">
    <div class="card-wrapper">
      <div class="title">{{ contents.title }}</div>
      <div class="img-wrapper">
        <!-- <img :src="contents.img" alt=""> -->
      </div>
      <div class="disc">{{ contents.category }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CardView',
  props: ['contents'],
  data() {
    return {
      id: this.contents.id,
    };
  },
};
</script>
<style scoped>
.card-wrapper {
  color: #ddd;
  box-sizing: border-box;
  padding: 40px;
}
.title {
  width: 70%;
  font-size: 32px;
  line-height: 40px;
  font-weight: 800;
  word-break: keep-all;
}
.disc {
  text-align: right;
}
.img-wrapper {
  margin: 40px 0 20px;
  width: 100%;
  min-height: 100px;
  max-height: 300px;
  overflow: hidden;
}
.img-wrapper img {
  width: 100%;
}
</style>
