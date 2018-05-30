<template>
  <div class="container-testlist">
    <div class="test-list">
      <div class="list-header">
        <div>
          <div class="title">Mopsy</div>
        </div>
        <transition>
        <div class="wrapper-btn" v-if="!loginState">
          <button @click="login">login</button>
        </div>
        <div class="wrapper-btn" v-if="loginState">
          <button @click="logout">logout</button>
        </div>
        </transition>
      </div>
      <div class="wrapper-tab-category">
        <div class="tab-category">
         <categoryItem
              v-for="(item) in categoryArr" 
              :key="item.id" 
              :categoryValue="item"
              :currentCategory="currentCategory"
              @click="categorize" >
         </categoryItem>
        </div>
      </div>
      <div v-masonry transition-duration="0.3s" item-selector=".listitem">
          <cardview v-masonry-tile 
                    class="listitem" 
                    v-for="(item) in filtering" 
                    :key="item.id" 
                    :contents="item">
          </cardview>
      </div>
    </div>
    <transition name="fadein" mode="out-in" appear>
      <router-view name="DetailView" />
    </transition>
    <UploadButton v-if="loginState"></UploadButton>
  </div>
</template>

<script>
import { db } from '../firebaseInit';
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry';
import cardview from './CardView';
import UploadButton from './UploadButton';
import categoryItem from './CategoryItem';


Vue.use(VueMasonryPlugin)
export default {
  name: 'TestList',
  data() {
    return {
      temp: [],
      blocks: [],
      loadCount: 1,
      scrollPos: 0,
      categoryArr: ['All', 'Design', 'Dev', 'Think'],
      currentCategory: 'All',
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    loginState() {
      return this.$store.getters.loginState;
    },
    loadContents() {
        return window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    },
    filtering() {
      var vm = this;
      var category = vm.currentCategory;
      if(category === "All") {
				return vm.blocks;
			} else {
				return vm.blocks.filter(function(post) {
					return post.category === category;
				});
			}
    },
  },
  created() {
    db.collection('post').where('deleted', '==', false).orderBy('id', 'desc').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.temp.push(doc.data());
      });
      this.blocks = this.temp.slice(0,20);
    });
    document.addEventListener('scroll', this.onScroll);
    this.$eventHub.$on('categorize', this.categorize);
    this.checkUser();
  },
  methods: {
    checkUser() {
      this.$store.dispatch('checkUser');
    },
    logout() {
      this.$store.dispatch('logout');
    },
    login() {
      this.$store.dispatch('login');
    },
    categorize(value) {
      this.currentCategory = value;
      setTimeout(() => {
        this.$redrawVueMasonry();
      })
    },
    loadMore() {
      this.loadCount = this.loadCount + 1;
      var loadNum = this.loadCount * 20;
      this.blocks = this.temp.slice(0,loadNum);
    },
    onScroll() {
      function getScrollXY() {
        var scrOfX = 0, scrOfY = 0;
        if( typeof( window.pageYOffset ) == 'number' ) {
          //Netscape compliant
          scrOfY = window.pageYOffset;
          scrOfX = window.pageXOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
          //DOM compliant
          scrOfY = document.body.scrollTop;
          scrOfX = document.body.scrollLeft;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
          //IE6 standards compliant mode
          scrOfY = document.documentElement.scrollTop;
          scrOfX = document.documentElement.scrollLeft;
        }
        return scrOfY;
      };
      var docHeight = document.body.offsetHeight;
      var winHeight = window.innerHeight;
      var currentScroll = getScrollXY();
      var pos = docHeight - (winHeight + currentScroll);
      if ( pos < 0 ) {
        this.loadMore();
      }
    },
  },
  components: {
    cardview: cardview,
    UploadButton: UploadButton,
    categoryItem: categoryItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-header {
  margin: 0px 20px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
}
.title {
  font-size: 60px;
  font-weight: 300;
}
.title span {
  font-size: 24px;
}
.wrapper-btn {
  display: flex;
  margin-left: 16px;
}
.wrapper-btn button {
  font-size: 14px;
  color: #ffffff;
  background-color: transparent;
  border: none;
  opacity: 0.5;
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
.container-testlist {
  margin: 60px auto;
  width: 100%;
  max-width: 2040px;
}
.wrapper-tab-category {
  padding: 20px;
}
.tab-category {
  display: flex;
  
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
    margin-top: 8px;
  }
}
@media (max-width: 400px) {
  .container-testlist {
    max-width: 375px;
    margin-top: 50px;
  }
  .list-header {
    box-sizing: border-box;
    margin: 0px;
    padding: 6px 10px;
  }
  .test-list {
    box-sizing: border-box;
    padding: 0px 5px;
  }
  .listitem {
    width: 170px;
    margin: 5px;
  }
  .wrapper-tab-category {
    padding: 10px;
    margin-bottom: 10px;
  }
  .title {
    font-size: 24px;
  }
  .wrapper-btn button {
    margin-left: 0px;
    padding: 0px;
    font-size: 12px;
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
