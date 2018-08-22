<template>
    <div class="wrapper-btn-back">
        <div class="container-btn-back">
            <button class="btn-back" @click="back">
                <img src="@/assets/arrow.svg" alt="">
            </button>
            <button class="btn-home" @click="toHome">
                <img src="@/assets/home.svg">
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BackButton',
    methods: {
        back() {
          this.$router.go(-1);
        },
        toHome()  {
          this.$router.push({ name: 'TestList' });
        },
    },
}
</script>
<style scoped>
.wrapper-btn-back {
    width: 100%;
    height: 60px;
    margin: 0 auto;
    background-color: transparent;
    color: #ccc;
    font-size: 14px;
    transition: all 0.3s;
    position: relative;
    top: 30px;
    z-index: 1000;
}
.container-btn-back {
    max-width: 768px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
.btn-back {
    background-color: transparent;
    border: none;
    height: 60px;
    width: 60px;
    background-color: #1f1f25;
    border-radius: 100%;
    transition: all 0.3s;
}
.btn-back:hover {
    background-color: #ccc;
}
.btn-home {
    background-color: transparent;
    border: none;
    height: 60px;
    width: 60px;
    border-radius: 100%;
    transition: all 0.3s;
}
.btn-home img {
  width: 36px;
}
@media (hover: none) {
  .btn-back:hover {
    background-color: #1f1f25;
  }
}
.btn-back img {
    width: 14px;
    position: relative;
    top: 2px;
    right: 3px;
}
@media (max-width: 400px) {
    .wrapper-btn-back {
        top: 20px;
        height: 48px;
    }
    .btn-back {
        height: 48px;
        width: 48px;
        position: relative;
        left: 10px;
    }
    .btn-home {
        height: 48px;
        width: 48px;
        position: relative;
        right: 10px;
    }
    .btn-home img {
      width: 30px;
    }
    .btn-back img {
        width: 10px;
    }
}
</style>


