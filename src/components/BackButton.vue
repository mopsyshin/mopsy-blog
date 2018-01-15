<template>
    <button class="btn-back" @click="back"> &lt; back</button>
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
.btn-back {
    background-color: transparent;
    border:none;
    color: #1c1d22;
    font-size: 22px;
    border-radius: 30px;
    transition: all 0.3s;
    padding: 0;
}
.btn-back:hover {
    color: #ccc;
}
@media (max-width: 420px) {
    .btn-back {
        color: #ccc;
        font-size: 14px;
        position: relative;
        top: -5px;
        left: -5px;
    }
}
</style>


