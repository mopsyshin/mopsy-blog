<template>
  <transition name="fadein" appear>
  <div class="wrapper-upload">
    <div class="wrapper-title">
      <BackButton></BackButton>
      <textarea v-model="getTitle" name="" id="title" rows="2" maxlength="100" placeholder="Enter the       Title"></textarea>
      <input v-model="getCategory" type="text" class="category" placeholder="Category">
    </div>
    <hr>
    <div class="wrapper-body">
      
      <textarea v-model="getBody" name="" id="body" rows="5" placeholder="body"></textarea>
      <input v-model="getImg" type="text" class="category" placeholder="Image Url">
    </div>
    <div class="footer">
      <!-- <router-link :to="{ name: 'DetailView', params: { id:id } }"> -->
      <button class="btn-submit" @click="submit" >submit</button>
      <!-- </router-link> -->
    </div>
  </div>
  </transition>
</template>
<script>
import db from './firebaseInit';
import Router from 'vue-router';
import moment from 'moment';
import BackButton from './BackButton';

export default {
    name: 'UploadContainer',
    data() {
      return {
        getTitle: '',
        getBody: '',
        getCategory: '',
        getImg: '',
      };
    },
    mounted() {
      autosize(document.getElementById('title'));
      autosize(document.getElementById('body'));
    },
    methods: {
      submit() {
        var date = moment().format("YYYY-MM-DD HH:mm:ss");
        db.collection('post').doc(date).set({
          title: this.getTitle,
          body: this.getBody,
          category: this.getCategory,
          img: this.getImg,
          date: date,
          id: date,
        })
        .then(function() {
          console.log('success');
        })
        .catch(function(error){

        });
        this.$router.push({ name: 'TestList' });
      },
    },
    components: {
      BackButton: BackButton,
    },
}
</script>
<style scoped>


::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #1c1d22;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #1c1d22;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #1c1d22;
}
:-moz-placeholder { /* Firefox 18- */
  color: #1c1d22;
}
input, textarea {
  display: block;
  width: 100%;
  margin: 10px;
  background-color: transparent;
  box-sizing: border-box;
  padding: 20px;
  color: #cccccc;
  font-size: 22px;
}
textarea {
  line-height: 36px;
}


hr {
  width: 100%;
  border: 1px solid #282A33;
}
.wrapper-title {
  width: 100%;
}
#title {
  width: 100%;
  max-width: 500px;
  background-color: transparent;
  height: auto;
  min-height: 100px;
  font-size: 64px;
  margin: 40px 0px 10px;
  line-height: 82px;
  font-family: 'Times New Roman', Times, serif;
  resize: none;
  word-break: keep-all;
}
#body {
  resize: none;
  word-break: keep-all;
}
.wrapper-body {
  margin-top: 20px;
}
.wrapper-upload {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
}
.footer {
  text-align: right;
  margin-bottom: 200px;
}
.btn-submit {
  width: 100px;
  height: 48px;
  border-radius: 40px;
  font-size: 20px;
  background-color: transparent;
  border: 1px solid #1c1d22;
  transition: all 0.3s;
}
.btn-submit:hover {
  color: #cccccc;
  border: 1px solid #cccccc;
}

</style>

