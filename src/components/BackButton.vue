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
}
.btn-back:hover {
    color: #ccc;
}
</style>


