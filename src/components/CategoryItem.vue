<template>
  <div class="item" 
        :class="{ active : isActive }"
        @click="clickme"
        >
      {{ value }}
  </div>
</template>

<script>
export default {
  props: ['categoryValue', 'currentCategory'],
  data() {
      return {
          value : this.categoryValue,
      };
  },
  computed: {
      isActive() {
          return this.currentCategory == this.value;
      }
  },
  methods: {
      clickme() {
          var value = this.value;
          this.$eventHub.$emit('categorize', value);
      },
  },
}
</script>

<style scoped>
    .item {
        border-radius: 100px;
        transition: all 0.3s;
        background-color: transparent;
        padding: 12px 32px;
        margin: 0px 3px;
        cursor: pointer;
        text-align: center;
        color: #aaa;
        border: 1px solid transparent;
    }
    .item:hover {
        color: #ccc;
        border: 1px solid #ccc;
    }
    .item.active {
        color: #2b2c35;
        background-color: #ccc;
        border: 1px solid #ccc;
    }
    /* .item::before {
        content: '';
        display: block;
        position: absolute;
        width: 90px;
        height: 42px;
        z-index: -1;
        background-color: #ccc;
        transform: translate(-5px, -10px) scale(0.7);
        opacity: 0;
        border-radius: 100px;
        transition: all 0.3s;
    }
    .item.active::before {
        content: '';
        transform: translate(-5px, -10px) scale(1);
        opacity: 1;
    } */
    @media (max-width: 400px ) {
        .item {
            font-size: 14px;
            padding: 6px 14px;
            margin: 0px 1px;
        }
        /* .item::before {
            content: '';
            display: block;
            position: absolute;
            width: 64px;
            height: 32px;
            z-index: -1;
            background-color: #ccc;
            transform: translate(-8px, -8px) scale(0.7);
            opacity: 0;
            border-radius: 100px;
            transition: all 0.3s;
        }
        .item.active::before {
            content: '';
            transform: translate(-8px, -8px) scale(1);
            opacity: 1;
        } */
    }
</style>

