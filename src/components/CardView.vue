<template>
  <router-link :to="{ name: 'DetailView', params: { post_id:post_id } }">
  <div class="card-wrapper">
    {{ contents.address }}
  </div>
  </router-link>
</template>

<script>
export default {
  name: 'CardView',
  props: ['contents'],
  data() {
    return {
      post_id: this.contents.post_id,
    };
  },
};
</script>
<style scoped>
</style>
