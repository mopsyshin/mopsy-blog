<template>
        <div class="detail-wrapper">
            <BackButton></BackButton>
            <div class="wrapper-title">
                <div class="title">{{ contents[0].title }}</div>
                <div class="category">{{ contents[0].category }}</div>
            </div>
            <hr>
            <div class="body-wrapper">
                <div class="body">{{ contents[0].body }}</div>
                <div class="img-wrapper">
                    <img :src="contents[0].img" alt="">
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
              { 'img' : '' },
              { 'category' : '' },
          ],
      };
  },
  created() {
    var post_id = this.$route.params.id;
    console.log(post_id);
     db.collection('post').where('id', '==', post_id).get().then(querySnapshot => {
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
  },
  methods: {
  },
  beforeRouteUpdate(to, from, next) {
    var toPostId = to.params.id;
    console.log(toPostId);
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
.detail-wrapper {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
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
    line-height: 72px;
    font-family: 'Times New Roman', Times, serif;
    resize: none;
    word-break: keep-all;
}
.body-wrapper {
    margin: 30px 0px 120px;
}
.body {
    font-size: 22px;
    line-height: 36px;
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

</style>
