import Vue from 'vue';
import Router from 'vue-router';
import TestList from '@/components/TestList';
import DetailView from '@/components/DetailView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestList',
      component: TestList,
    },
    {
      path: '/post/:post_id',
      name: 'DetailView',
      component: DetailView,
      props: true,
    },
  ],
});
