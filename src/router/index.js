import Vue from 'vue';
import Router from 'vue-router';
import TestList from '@/components/TestList';
import DetailView from '@/components/DetailView';
import UploadContainer from '@/components/UploadContainer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestList',
      component: TestList,
      children: [
        {
          path: '/post/:id',
          name: 'DetailView',
          props: true,
          components: {
            DetailView,
          },
        },
      ],
    },
    {
      path: '/upload',
      name: 'UploadContainer',
      component: UploadContainer,
    },
  ],
});
