<template>
  <transition name="fadein" appear>
  <div class="wrapper-upload">
    <div class="wrapper-title">
      <BackButton></BackButton>
      <textarea v-model="getTitle" name="" id="title" rows="2" maxlength="100" placeholder="Enter 
The Title"></textarea>
      <input v-model="getCategory" type="text" class="category" placeholder="Category">
    </div>
    <div class="wrapper-body">
      
      <textarea v-model="getBody" name="" id="body" rows="8" placeholder="Write what you think"></textarea>
      <input v-model="getImg" type="text" class="img-url" placeholder="Image Url">
    </div>
    <div class="footer">
      <button class="btn-submit" @click="submit" >Submit</button>
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
        var date = moment().format("YYYYMMDDHHmmss");
        console.log(date);
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
  transition: all 0.3s;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #1c1d22;
  transition: all 0.3s;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #1c1d22;
  transition: all 0.3s;
}
:-moz-placeholder { /* Firefox 18- */
  color: #1c1d22;
  transition: all 0.3s;
}

:hover::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #ccc;
}
:hover::-moz-placeholder { /* Firefox 19+ */
  color: #ccc;
}
:hover:-ms-input-placeholder { /* IE 10+ */
  color: #cccccc;
}
:hover:-moz-placeholder { /* Firefox 18- */
  color: #ccc;
}
input, textarea {
  display: block;
  width: 100%;
  background-color: transparent;
  box-sizing: border-box;
  padding: 10px;
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
  margin: 40px 0px 0px;
  line-height: 82px;
  resize: none;
  word-break: keep-all;
}
.category {
  position: relative;
  top: -10px;
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
  margin: 20px 0px 200px;
}
.img-url {
  font-size: 14px;
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
@media (max-width: 880px) {
  .wrapper-upload {
    box-sizing: border-box;
    padding: 0px 8px;
  }
  #title {
    max-width: 80%;
    font-size: 32px;
    line-height: 40px;
    min-height: 50px;
  }
  #body {
    font-size: 16px;
  }
  .category {
    margin-top: 10px;
    top: 0;
    font-size: 16px;
  }
  input, textarea {
    display: block;
    width: 100%;
    background-color: transparent;
    box-sizing: border-box;
    padding: 0px;
    color: #cccccc;
    font-size: 22px;
  }
  .btn-submit {
    background-color: #ccc;
    color: #1c1d22;
    font-size: 16px;
    height: 40px;
  }
}

</style>

