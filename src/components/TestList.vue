<template>
  <div class="container-testlist">
    <div class="test-list">
      <div class="list-header">
        <div>
          <div class="title" @click="infoState = !infoState">Mopsy</div>
          <transition name="bg-fadein" mode="out-in" appear>
          <div class="info" v-if="infoState">
            <img src="../assets/plus.svg" @click="infoState = !infoState">
            <div class="item">
              Github<span>github.com/mopsyshin</span>
            </div>
            <div class="item">
              Facebook<span>facebook.com/mopsyshin</span>
            </div>
          </div>
          </transition>
        </div>
        <transition>
        <div class="wrapper-btn" v-if="!loginState">
          <button @click="login">Login</button>
        </div>
        <div class="wrapper-btn" v-if="loginState">
          <button @click="logout">Logout</button>
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
      <router-view name="DetailView"/>
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
      scrollPos: 0,
      categoryArr: ['All', 'Design', 'Dev', 'Think'],
      currentCategory: 'All',
      infoState: false,
    };
  },
  computed: {
    blocks() {
      return this.$store.getters.blocks;
    },
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
    this.$store.dispatch('getPost');
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
        this.$store.commit('increaseLoadCount');
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
  justify-content: space-between;
  align-items: baseline;
}
.title {
  font-size: 60px;
  font-weight: 300;
  cursor: pointer;
}
.title span {
  font-size: 24px;
}
.info {
  position: fixed;
  width: 100%;
  max-width: 240px;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 700;
  background-color: rgba(255,255,255,0.95);
  color: #2b2c35;
  padding: 32px 40px 48px;
  border-radius: 8px;
}
.info img {
  transform: rotate(45deg);
  float: right;
  margin: -10px -18px 0px 0px;
  cursor: pointer;
}
.info .item span {
  display: block;
  font-weight: 400;
}
.info .item {
  margin-top: 12px;
}
.wrapper-btn {
  display: flex;
  margin-left: 16px;
}
.wrapper-btn button {
  font-size: 14px;
  background-color: #2b2c35;
  color: rgba(255,255,255,0.7);
  border-radius: 24px;
  padding: 8px 24px;
  border: none;
  transition: all 0.3s;
}
.wrapper-btn button:hover {
  background-color: #1f1f25;
  color: rgba(255,255,255,1);
}
@media (hover: none) {
  .wrapper-btn button:hover {
    background-color: inherit;
    color: inherit;
  }
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
    margin-top: 8px;
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
    padding: 8px 16px;
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
