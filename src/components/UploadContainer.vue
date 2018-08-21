<template>
  <transition name="fadein" mode="out-in" appear>
    <div class="container-upload">
      <BackButton></BackButton>
      <div class="wrapper-upload" >
        <div class="wrapper-title">
          <textarea v-model="getTitle" id="title" rows="2" maxlength="100" placeholder="Enter 
The Title"></textarea>
          <select class="category-select" v-model="getCategory">
            <option value="" hidden>Category</option>
            <option value="Design">Design</option>
            <option value="Dev">Dev</option>
            <option value="Think">Think</option>
          </select>
          <img class="downarrow" src="../assets/down.png" alt="">
        </div>
        <div class="wrapper-upload-img">
          <input type="text" v-model="getImgUrl" placeholder="Cover Image URL">
        </div>
        <div class="wrapper-body">
          <textarea name="" id="suneditor" cols="30" rows="10"></textarea>
        </div>

        <div class="footer">
          <button class="btn-submit" @click="submit" :disabled="submitState">Submit</button>
        </div>
      </div>
  </div>
  </transition>
</template>


<script>
import { db } from '../firebaseInit';
import Router from 'vue-router';
import moment from 'moment';
import BackButton from './BackButton';
import SUN from '../suneditor/js/suneditor.js';

var editor;
var submitState;

export default {
    name: 'UploadContainer',
    created() {
      // initialize submit button
      submitState = false;
    },
    mounted() {
      autosize(document.getElementById('title'));
      this.initEditor();
      var iframe = document.getElementById('editor_iframe');
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      innerDoc.body.addEventListener("paste",(e) => {
          e.preventDefault();
          var text = e.clipboardData.getData("text/plain");
          innerDoc.execCommand('inserttext', false, text);
      });
    }, 
    data() {
      return {
        getTitle: '',
        getCategory: '',
        getImgUrl:'',
      };
    },
    computed: {
      submitState() {
        return submitState;
      },
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
          showHiliteColor: false,
          showFontColor: false,
          showLine: false,
        });
      },
      submit() {
        // disable submit button
        submitState = true;
        // binding Contents
        var postNumbers = [];
        var getPostCount = '';
        var date = moment().format("YYYYMMDDHHmmss");
        var getBody = editor.getContent();
        var getTitle = this.getTitle;
        var getCategory = this.getCategory;
        var getImgUrl = this.getImgUrl;
        var getPostCountStr;
        
        // Blank Validation function
        var isEmpty = () => {
            return getTitle.trim() === "" || getCategory.trim() === "" || getBody.trim() === ""
        };
        
        // Blank Validation
        if (!isEmpty()) {
          // Current postNumber Counting
          db.collection('post').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              postNumbers.push(doc.data());
            });
          }).then( () => {
              getPostCount = postNumbers.length;
              getPostCountStr = getPostCount.toString();
          }).then( () => {
            // Set Data to Database
            db.collection('post').doc(getPostCountStr).set({
              title: getTitle,
              body: getBody,
              category: getCategory,
              date: date,
              id: getPostCount,
              deleted: false,
              img: getImgUrl,
              })  
              .then( () => {
                // Router trigger event Define
                this.$router.push({ name: 'TestList' });
                var message = "업로드가 완료되었습니다";
                this.$eventHub.$emit('toggleModal', message);
                this.$store.dispatch('refreshPost');
              })
              .catch( error => {
              });
          });
        } else {
          alert("Please Complete Title & Category");
          // initialize submit button
          submitState = false;
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
.category-select {
  width: 150px;
  padding-left: 20px;
  background-color: transparent;
  color: #999;
  border-color: #999;
  border-radius: 60px;
  transition: all 0.3s;
}
.category-select:hover {
  color: #fff;
  border-color: #fff;
}
.downarrow {
  width: 8px;
  position: relative;
  right: 30px;
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
  margin: 0px;
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
    margin: 40px auto;
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
.wrapper-upload-img {
  margin: 30px 0px 10px 0px;
}
.wrapper-upload-img input {
  border-radius: 8px;
  background-color: rgba(0,0,0,0.2);
  font-size: 14px;
  padding: 12px 15px;
}
.wrapper-upload-img input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #5c5965;
  transition: all 0.3s;
}
.wrapper-upload-img input::-moz-placeholder { /* Firefox 19+ */
  color: #5c5965;
  transition: all 0.3s;
}
.wrapper-upload-img input:-ms-input-placeholder { /* IE 10+ */
  color: #5c5965;
  transition: all 0.3s;
}
.wrapper-upload-img input:-moz-placeholder { /* Firefox 18- */
  color: #5c5965;
  transition: all 0.3s;
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
    margin-bottom: 20px;
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
      margin-top: 40px;
  }
}


</style>

