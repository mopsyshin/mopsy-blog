<template>
    <div class="container-detailview" ref='bg'>
        <BackButton></BackButton>
            <div class="wrapper-detailview" v-if="!editState">
                <div class="wrapper-title">
                    <div>
                        <div class="title">{{ contents.title }}</div>
                        <div class="category">{{ contents.category }}</div>
                    </div>
                    <div>
                        <div class="button-group" v-if="isAdmin">
                            <div class="btn btn-edit" @click="editPost">수정</div>
                            <div class="btn btn-delete" @click="deleteModalToggle">삭제</div>
                        </div>
                    </div>
                </div>
                <div class="img-wrapper" v-if="contents.img != ''">
                    <img :src="contents.img">
                </div>
                <div class="body-wrapper">
                    <div class="body" v-html="contents.body"></div>
                </div>
            </div>
            <div class="wrapper-editcontainer"  v-if="editState">
                <EditContainer v-on:editStateChange="editComplete"></EditContainer>
            </div>
        <transition name="bg-fadein" mode="out-in">
            <div class="modal-background" v-if="modalIsActive">
              <MessageModalForm :message="deleteMessage" v-on:cancel="cancelDelete" v-on:confirm="confirmDelete"></MessageModalForm>
            </div>
        </transition>
    </div>
</template>

<script>
import { db } from '../firebaseInit';
import BackButton from './BackButton';
import MessageModalForm from './modal/MessageModalForm';
import EditContainer from './EditContainer';

export default {
  name: 'DetailView',
  data() {
    return {
      editState: false,
      deleteMessage: "삭제하시겠습니까?",
      modalIsActive: false,
      error: null,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    contents() {
      let data = this.$store.state.posts.find(item => item.id == this.id);
      if (data) {
        return data;
      }
      return {
        'id': '',
        'title': '',
        'body': '',
        'category': '',
        'img': '',
      };
    },
  },
  methods: {
    confirmDelete() {
      var id = this.id.toString();
      db.collection('post').doc(id).update({
          deleted: true,
        })  
        .then( () => {
          this.$router.push({ name: 'TestList' });
          this.$store.dispatch('refreshPost');
        })
        .catch( error => {
        });
    },
    deleteModalToggle() {
        this.modalIsActive = true;
    },
    cancelDelete() {
        this.modalIsActive = false;
    },
    editPost() {
        this.editState = true;
    },
    editComplete(bool) {
      if ( bool ) {
        this.$store.dispatch('refreshPost');    
      }
      this.editState = false;
    },
  },
  components: {
      BackButton: BackButton,
      MessageModalForm: MessageModalForm,
      EditContainer: EditContainer,
  },
}
</script>

<style scoped>
hr {
  width: 100%;
  border: 1px solid #282A33;
}
.container-detailview {
    width: 100vw;
    background-color: #363841;
    z-index: 100;
    top: 0;
    left: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.wrapper-detailview {
    width: 100%;
    max-width: 768px;
    margin: 60px auto;
    color: #ccc;
}
.wrapper-title {
    margin-bottom: 40px;
    border-bottom: 1px solid #282A33;
    min-height: 10vh;
    padding-bottom: 40px;
}
.title {
    width: 100%;
    max-width: 520px;
    background-color: transparent;
    height: auto;
    min-height: 100px;
    font-size: 48px;
    margin: 20px 0px 10px;
    font-weight: 800;
    line-height: 60px;
    resize: none;
    word-break: keep-all;
    word-wrap: break-word;
}
.category {
    color: #999;
}
.button-group {
  text-align: right;
}
.btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #aaa;
    font-size: 14px;
    display: inline-block;
    margin-right: 10px;
}
.body-wrapper {
    margin: 30px 0px 0px;
}
.body {
    font-size: 18px !important;
    line-height: 1.8 !important;
    letter-spacing: -0.3px;
    word-break: break-word;
    color: #ccc !important;
    background-color: transparent !important;
    word-wrap: break-word;
    word-break: keep-all;
    padding-bottom: 40px;
}
.body p img {
    border-radius: 10px;
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
    border-radius: 10px;
}
.modal-background {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 10000;
    background-color: rgba(0,0,0,0.3);
}

@media (max-width: 880px ) {
    .wrapper-detailview {
        box-sizing: border-box;
        padding: 0px 20px;
    }
    .title {
        font-size: 32px;
        line-height: 40px;
        margin: 20px 0px 10px;
        min-height: 0;
    }
    .category {
        font-size: 12px;
    }
    .body {
        font-size: 16px !important;
    }
}
@media (max-width: 400px ) {
    .wrapper-detailview {
      margin-top: 36px;
     }
    .wrapper-title {
        margin-bottom: 20px;
        border-bottom: 1px solid #282A33;
        min-height: 10vh;
        padding-bottom: 20px;
    }
    .title {
      max-width: 300px;
    }
    .btn {
        font-size: 12px;
    }
    .body-wrapper {
        margin: 10px 0px 0px;
    }
    .body {
        font-size: 14px !important;
    }

}
</style>
