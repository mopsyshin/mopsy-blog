<template>
  <div class="card-wrapper" @click="toPostDetail">
    <div class="title">{{ contents.title }}</div>
    <div class="img-wrapper">
      <img :src="contents.img" alt="">
    </div>
    <div class="disc">{{ contents.category }}</div>
  </div>
</template>

<script>
export default {
  name: 'CardView',
  props: ['contents'],
  computed: {
    id() {
      return this.contents.id;
    },
  },
  methods: {
    toPostDetail() {
      this.$router.push({ name: 'DetailView', params: { id: this.id } });
    },
  },
};
</script>
<style scoped>
.card-wrapper {
  color: #ccc;
  box-sizing: border-box;
  padding: 32px;
  transition: all 0.3s;
  border-radius: 10px;
  background-color: #2b2c35;
  cursor: pointer;
}
.card-wrapper:hover {
  color: #fff;
  background-color: #1f1f25;
  transform: translate(-5px, -5px) scale(1.1);
  z-index: 10;
}
@media (hover: none) {
  .card-wrapper:hover {
    color: #ccc;
    background-color: #2b2c35;
    transform: none;
    z-index: 10;
  }
}
.title {
  width: 85%;
  font-size: 20px;
  line-height: 28px;
  font-weight: 800;
  word-break: keep-all;
  word-wrap: break-word;
}
.disc {
  text-align: right;
}
.img-wrapper {
  margin: 28px 0 20px;
  width: 100%;
  min-height: 80px;
  max-height: 300px;
  overflow: hidden;
}
.img-wrapper img {
  border-radius: 10px;
  width: 100%;

}
@media (max-width: 880px) {
  .card-wrapper {
    padding: 30px;
  }
  .title {
    font-size: 24px;
    line-height: 32px;
  }
  .img-wrapper {
    min-height: 20px;
  }
  .disc {
    font-size: 14px;
    text-align: right;
  }
}
@media (max-width: 400px) {
  .card-wrapper {
    padding: 15px;
  }
  .title {
    font-size: 16px;
    line-height: 22px;
  }
  .img-wrapper {
    margin: 20px 0px 20px;
    min-height: 20px;
  }
}
</style>
