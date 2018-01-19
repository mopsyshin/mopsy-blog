<template>
    <div class="container-detialview">
        <BackButton></BackButton>
            <div class="wrapper-detailview" v-if="!editState">
                <div class="wrapper-title">
                    <div>
                        <div class="title">{{ contents[0].title }}</div>
                        <div class="category">{{ contents[0].category }}</div>
                    </div>
                    <div>
                        <div class="buttongroup">
                            <button class="btn btn-edit" @click="editPost">수정</button>
                            <button class="btn btn-delete" @click="deleteModalToggle">삭제</button>
                        </div>
                    </div>
                </div>
                <div class="body-wrapper">
                    <div class="body" v-html="contents[0].body"></div>
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
import db from './firebaseInit';
import BackButton from './BackButton';
import MessageModalForm from './modal/MessageModalForm';
import EditContainer from './EditContainer';

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
          editState: false,
          deleteMessage: "삭제하시겠습니까?",
          modalIsActive: false,
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
        confirmDelete() {
            var getPostCount = this.contents[0].id;
            console.log(getPostCount);
            db.collection('post').doc(getPostCount).update({
                    deleted: true,
                })  
                .then( () => {
                    this.$router.push({ name: 'TestList' });
                    console.log('success');
                })
                .catch( error => {
                    console.log('error');
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
        editComplete() {
            var post_id = this.$route.params.id;
            db.collection('post').where('id', '==', post_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        'id': doc.id,
                        'title': doc.data().title,
                        'body': doc.data().body,
                        'category': doc.data().category,
                    }
                    var intData = [];
                    intData.push(data);
                    this.contents = intData;
                });
            })
            .then(()=> {
                this.editState = false;
            });
      },
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
.wrapper-detailview {
    width: 100%;
    max-width: 768px;
    margin: 60px auto;
    color: #ccc;
}

.wrapper-title {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #282A33;
    padding-bottom: 40px;
}
.title {
    width: 100%;
    max-width: 410px;
    background-color: transparent;
    height: auto;
    min-height: 100px;
    font-size: 64px;
    margin: 0px 0px 10px;
    font-weight: 800;
    line-height: 72px;
    resize: none;
    word-break: break-word;
}
.category {
    color: #999;
}
.btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #aaa;
    font-size: 14px;
}
.body-wrapper {
    margin: 30px 0px 120px;
}
.body {
    font-size: 18px;
    line-height: 1.8;
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
        padding: 0px 8px;
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
        font-size: 16px;
    }
}
@media (max-width: 400px ) {
    .wrapper-detailview {
      margin-top: 60px;
  }
    .title {
      max-width: 220px;
    }
}
</style>
