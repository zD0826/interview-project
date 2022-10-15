import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./views/home/index.vue'),
  },
  {
    path: '/question1',
    component: () => import('./views/question1/index.vue'),
  },
  {
    path: '/question2',
    component: () => import('./views/question2/index.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }