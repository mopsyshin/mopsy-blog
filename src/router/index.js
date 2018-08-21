import Vue from 'vue';
import Router from 'vue-router';
import TestList from '@/components/TestList';
import DetailView from '@/components/DetailView';
import UploadContainer from '@/components/UploadContainer';

Vue.use(Router);
export default new Router({
  mode: 'history',
  scrollBehavior: ( to, from, savedPosition ) => {
    if (to.name == 'TestList') {
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(savedPosition.x, savedPosition.y);
          return savedPosition;
        }, 300);
      } else {
        setTimeout(() => {
          window.scrollTo(0, 0);
          return { x: 0, y: 0 };
        }, 300);
      }
    } else {
      return { x: 0, y: 0 };
    }
    
  },
  routes: [
    {
      path: '/',
      name: 'TestList',
      component: TestList,
    },
    {
      path: '/post/:id',
      name: 'DetailView',
      props: true,
      component: DetailView,
    },
    {
      path: '/upload',
      name: 'UploadContainer',
      component: UploadContainer,
    },
  ],
});
