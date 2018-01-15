<template>
  <div class="test-list">
    <div class="list-header">
      <div>
        <div class="title">Mopsy</div>
        <div class="disc">
          <p>UI Design</p>
          <p>UX Research</p>
          <p>Front-end Dev</p>
        </div>
      </div>
      <div>
        <UploadButton></UploadButton>
      </div>
    </div>
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
import UploadButton from './UploadButton';
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
        this.blocks = this.blocks.reverse();
      })
    });
  },
  components: {
    cardview: cardview,
    UploadButton: UploadButton,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-header {
  margin: 0px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.title {
  font-size: 140px;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 800;
}
@media (max-width: 880px ) {
  .title {
    font-size: 80px;
  }
}
.disc {
  font-weight: 200;
  margin-top: 10px;
  font-size: 16px;
}
.listitem {
  width: 400px;
  height: auto;
  background-color: #282A33;
  margin: 20px;
}
</style>
