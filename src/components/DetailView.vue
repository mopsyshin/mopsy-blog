<template>
  <div class="detail-wrapper">
      <div>{{ contents[0].title }}</div>
      <div>{{ contents[0].body }}</div>
      <img :src="contents[0].img" alt="">
  </div>
</template>

<script>
import db from './firebaseInit';

export default {
  name: 'DetailView',
  data() {
      return {
          contents: [
              { 'id' : '' },
              { 'title' : '' },
              { 'body' : '' },
              { 'img' : '' },
          ],
      };
  },
  created() {
    var post_id = this.$route.params;
     db.collection('post').where('post_id', '==', post_id.post_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const data = {
                'id': doc.id,
                'title': doc.data().post_title,
                'body': doc.data().post_body,
                'img': doc.data().post_img,
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
    var toPostId = to.params.post_id;
    console.log(toPostId);
    db.collection('post').where('post_id', '==', toPostId).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const data = {
                'id': doc.id,
                'title': doc.data().post_title,
                'body': doc.data().post_body,
                'img': doc.data().post_img,
            }
            var intData = [];
            intData.push(data);
            this.contents = intData;
        });
    });
    next();
  },
}
</script>

<style scoped>

</style>
