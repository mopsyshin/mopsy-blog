<template>
    <div class="container-detialview">
        <BackButton></BackButton>
        <div class="wrapper-detailview">
            <div class="wrapper-title">
                <div class="title">{{ contents[0].title }}</div>
                <div class="category">{{ contents[0].category }}</div>
            </div>
            <div class="body-wrapper">
                <div class="body" v-html="contents[0].body"></div>
            </div>
         </div>
    </div>
</template>

<script>
import db from './firebaseInit';
import BackButton from './BackButton';

export default {
  name: 'DetailView',
  data() {
      return {
          contents: [
              { 'id' : '' },
              { 'title' : '' },
              { 'body' : '' },
              { 'category' : '' },
          ],
      };
  },
  created() {
    var post_id = this.$route.params.id;
     db.collection('post').where('id', '==', post_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            var tempBody = doc.data().body;
            const data = {
                'id': doc.id,
                'title': doc.data().title,
                'body': tempBody,
                'category': doc.data().category,
            }
            var intData = [];
            intData.push(data);
            this.contents = intData;
        });
    });
  },
  methods: {
  },
  beforeRouteUpdate(to, from, next) {
    var toPostId = to.params.id;
    db.collection('post').where('id', '==', toPostId).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const data = {
                'id': doc.id,
                'title': doc.data().title,
                'body': doc.data().body,
                'img': doc.data().img,
                'category': doc.data().category,
            }
            var intData = [];
            intData.push(data);
            this.contents = intData;
        });
    });
    next();
  },
  components: {
      BackButton: BackButton,
  },
}
</script>

<style scoped>

hr {
  width: 100%;
  border: 1px solid #282A33;
}
.wrapper-detailview {
    width: 100%;
    max-width: 768px;
    margin: 80px auto;
    color: #ccc;
}

.wrapper-title {
    margin-bottom: 40px;
}
.title {
    width: 100%;
    max-width: 450px;
    background-color: transparent;
    height: auto;
    min-height: 100px;
    font-size: 64px;
    margin: 40px 0px 10px;
    font-weight: 800;
    line-height: 72px;
    resize: none;
    word-break: break-word;
}
.body-wrapper {
    margin: 30px 0px 120px;
}
.body {
    font-size: 22px;
    line-height: 36px;
    word-break: break-word;
}
.img-wrapper {
    margin-top: 50px;
    width: 100%;
}
.img-wrapper img {
    display: block;
    max-width: 100%;
    max-height: 700px;
    margin: 0 auto;
    border-radius: 20px;
}
@media (max-width: 880px ) {
    .wrapper-detailview {
        box-sizing: border-box;
        padding: 0px 8px;
    }
    .title {
        font-size: 32px;
        line-height: 40px;
        margin: 20px 0px 10px;
        min-height: 0;
        width: 60%;
    }
    .category {
        font-size: 12px;
    }
    .body {
        font-size: 16px;
        line-height: 26px;
    }
}
@media (max-width: 400px ) {
    .wrapper-detailview {
      margin-top: 60px;
  }
}
</style>
