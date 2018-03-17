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
        width: 80px;
        border-radius: 100px;
        transition: all 0.3s;
        background-color: transparent;
        margin: 0px 5px;
        cursor: pointer;
        text-align: center;
    }
    .item.active {
        color: #2b2c35;
        /* background-color: #ccc; */
    }
    .item::before {
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
    }

</style>

