import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/home',
      },
      { path: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'multiplication', component: () => import('pages/MultiplicationPage.vue') },
      { path: 'division', component: () => import('pages/DivisionPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
