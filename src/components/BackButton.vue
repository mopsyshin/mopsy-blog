<template>
    <div class="wrapper-btn-back">
        <button class="btn-back" @click="back">
            <img src="../assets/arrow.svg" alt="">
        </button>
    </div>
</template>
<script>
export default {
    name: 'BackButton',
    methods: {
        back() {
            this.$router.go(-1);
        },
    },
}
</script>
<style scoped>
.wrapper-btn-back {
    width: 100%;
    height: 60px;
    background-color: #1f1f25;
    color: #ccc;
    font-size: 14px;
}
.btn-back {
    background-color: transparent;
    border: none;
    height: 60px;
    width: 60px;
}
.btn-back img {
    width: 14px;
    position: relative;
    top: 2px;
}
@media (max-width: 400px) {
    .wrapper-btn-back {
        height: 48px;
    }
    .btn-back {
        height: 48px;
        width: 48px;
    }
    .btn-back img {
        width: 10px;
    }
}
</style>


