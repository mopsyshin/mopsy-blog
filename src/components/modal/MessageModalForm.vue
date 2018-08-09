<template>
    <div class="wrapper-modal">
        <p class="meassage">{{ message }}</p>
        <div class="btn-group">
            <button class="btn" @click="cancel">Cancel</button>
            <button class="btn" @click="confirm">Confirm</button>
        </div> 
    </div>
</template>

<script>
import { db } from '../../firebaseInit';

export default {
    props: ['message'],
    name: "MessageModalForm",
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        confirm() {
            this.$emit('confirm');
        },
    }
}
</script>

<style scoped>
    .wrapper-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        background-color: rgba(25, 24, 31, 0.8);
        padding: 30px;
        border-radius: 20px;
    }
    .meassage {
        margin-bottom: 20px;
    }
    .btn-group {
        text-align: right;
    }
    .btn {
        width: 76px;
        height: 36px;
        border-radius: 40px;
        font-size: 13px;
        background-color: transparent;
        border: 1px solid #888;
        transition: all 0.3s;
        color: #888;
        margin-left: 5px;
    }
    .btn:hover {
        color: #cccccc;
        border: 1px solid #cccccc;
    }
    @media (hover: none) {
      .btn:hover {
        color: inherit;
        border: inherit;
      }
    }
</style>
