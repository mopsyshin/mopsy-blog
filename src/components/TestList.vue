<template>
  <div class="container-testlist">
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
    <div class="footer" @click="loadMore">
      <button class="btn-scroll" >Load more</button>
    </div>
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
      temp: [],
      blocks: [],
      loadCount: 1,
      scrollPos: 0,
    };
  },
  created() {
    db.collection('post').orderBy('date').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.temp.push(doc.data());
      });
      this.temp = this.temp.reverse();
      this.blocks = this.temp.slice(0,20);
    });
  },
  // computed: {
  //   loadContents() {
  //       return window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
  //   },
  // },
  methods: {
    loadMore() {
      this.loadCount = this.loadCount + 1;
      var loadNum = this.loadCount * 20;
      this.blocks = this.temp.slice(0,loadNum);
    },
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

.disc {
  font-weight: 200;
  margin-top: 10px;
  font-size: 16px;
}
.listitem {
  width: 300px;
  height: auto;
  background-color: transparent;
  margin: 20px;

}
.footer {
  width: 100%;
  height: 300px;
  padding: 20px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
}
.btn-scroll {
  width: 140px;
  height: 60px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ccc;
  font-size: 18px;
  border-radius: 40px;
  transition: all 0.3s;
}
.btn-scroll:hover {
  background-color: #2b2c35;
}
.container-testlist {
  margin: 60px auto;
  width: 100%;
  max-width: 2040px;
}
@media (max-width: 2040px) {
  .container-testlist {
    max-width: 1700px;
  }
}
@media (max-width: 1700px) {
  .container-testlist {
    max-width: 1360px;
  }
}
@media (max-width: 1360px) {
  .container-testlist {
    max-width: 1020px;
  }
}
@media (max-width: 1020px) {
  .container-testlist {
    max-width: 680px;
  }
}
@media (max-width: 680px) {
  .container-testlist {
    max-width: 375px;
    margin-top: 20px;
  }
  .title {
    font-size: 80px;
  }
}
@media (max-width: 400px) {
  .list-header {
    margin: 0px 5px 20px;
  }
  .test-list {
    box-sizing: border-box;
    padding: 0px 5px;
  }
  .listitem {
    width: 170px;
    margin: 5px;
  }
  .btn-scroll {

  }
}
@media (max-width: 361px) {
  .listitem {
    width: 160px;
    margin: 5px;
  }
}
@media (max-width: 341px) {
  .list-header {
    font-size: 60px;
    margin: 0px 5px 20px;
  }
  .test-list {
    box-sizing: border-box;
    padding: 0px 5px;
  }
  .listitem {
  width: 140px;
  height: auto;
  background-color: transparent;
}
}
</style>
