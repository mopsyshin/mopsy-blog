import Vue from 'vue';
import Router from 'vue-router';
import TestList from '@/components/TestList';
import DetailView from '@/components/DetailView';
import UploadContainer from '@/components/UploadContainer';

Vue.use(Router);

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
}

export default new Router({
  mode: 'history',
  scrollBehavior,
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
