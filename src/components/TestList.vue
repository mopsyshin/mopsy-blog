<template>
  <div class="test-list">
    <div v-masonry transition-duration="0.3s" item-selector=".listitem">
        <cardview v-masonry-tile class="listitem" v-for="(item, index) in blocks" :key="item.id" :contents="item">

        </cardview>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit';
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry';
import cardview from './CardView';
Vue.use(VueMasonryPlugin)
export default {
  name: 'TestList',
  data() {
    return {
      blocks: [],
    };
  },
  created() {
    db.collection('post').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.blocks.push(doc.data());
      })
    });
  },
  components: {
    cardview: cardview,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.listitem {
  width: 200px;
  height: 300px;
  background-color: #ccc;
  margin: 10px;
}
</style>
