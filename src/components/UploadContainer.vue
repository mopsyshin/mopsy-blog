<template>
  <transition name="fadein" mode="out-in" appear>
    <div class="container-upload">
      <BackButton></BackButton>
      <div class="wrapper-upload" >
        <div class="wrapper-title">
          <textarea v-model="getTitle" id="title" rows="2" maxlength="100" placeholder="Enter 
The Title"></textarea>
          <input v-model="getCategory" type="text" class="category" placeholder="Category">
        </div>
        <div class="wrapper-body">
          <textarea name="" id="suneditor" cols="30" rows="10"></textarea>
        </div>
        <div class="footer">
          <button class="btn-submit" @click="submit">Submit</button>
        </div>
      </div>
  </div>
  </transition>
</template>
<script>
import db from './firebaseInit';
import Router from 'vue-router';
import moment from 'moment';
import BackButton from './BackButton';
import SUN from '../suneditor/js/suneditor.js';

var editor;

export default {
    name: 'UploadContainer',
    mounted() {
      autosize(document.getElementById('title'));
      this.initEditor();
    }, 
    data() {
      return {
        getTitle: '',
        getCategory: '',
      };
    },
    methods: {
      initEditor() {
        // suneidtor Define & init
        editor = SUNEDITOR.create('suneditor',{
          videoX : 600,
          videoY : 320,
          width : '100%',
          height: 'auto',
          editorIframeFont: "'Apple SD Gothic Neo', Helvetica, Arial, 'Malgun Gothic', Dotum, sans-serif;",
          showUnderline : false,
          showItalic : false,
          showInOutDent : false,
          showCodeView : false,
          showUndo : false,
          showRedo : false,
          showAlign : false,
          showList : false,
          showTable : false,
          showFullScreen : false,
        });
      },
      submit() {
        // binding Contents
        var postNumbers = [];
        var getPostCount = '';
        var date = moment().format("YYYYMMDDHHmmss");
        var getBody = editor.getContent();
        var getTitle = this.getTitle;
        var getCategory = this.getCategory;
        
        // Blank Validation function
        var isEmpty = function() {
            return getTitle.trim() === "" || getCategory.trim() === "" || getBody.trim() === ""
        };
        console.log(isEmpty());

        // Blank Validation
        if (!isEmpty()) {
          console.log('pass');
          // Router trigger event Define
          var goList = () => {
            this.$router.push({ name: 'TestList' });
          };

          // Current postNumber Counting
          db.collection('post').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              postNumbers.push(doc.data());
            });
          }).then( function(){
              getPostCount = postNumbers.length;
              getPostCount = getPostCount.toString();
              console.log(getPostCount);
          }).then( function() {
            // Set Data to Database
            db.collection('post').doc(getPostCount).set({
              title: getTitle,
              body: getBody,
              category: getCategory,
              date: date,
              id: getPostCount,
              })  
              .then(function() {
                goList();
                console.log('success');
              })
              .catch(function(error){
                console.log('error');
              });
          });
        } else {
          console.log('fail');
          alert("Please Complete Title & Category");
        
        };
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

.header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
  font-weight: 800;
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
@media (max-width: 400px ) {
    .wrapper-upload {
      margin-top: 60px;
  }
}


</style>

