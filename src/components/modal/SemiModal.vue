<template>
    <div class="wrapper-semimodal">
        <p class="message">{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: ['message'],
    name: 'SemiModal',
}
</script>

<style scoped>
    .message {
        color: #ccc;
        font-weight: 400;
        font-size: 13px;
    }
    .wrapper-semimodal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 12px 24px;
        border-radius: 5px;
        background-color: #1e1d22;
        box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
    }
    @media (max-width: 420px) {
        .wrapper-semimodal {
            top: 10px;
            right: 10px;
        }
    }
</style>


