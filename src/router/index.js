import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

// Create all routes
const routes = [
  {
    path: '/calculator',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'GraphView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GraphView.vue')
  },
  {
    path: '/todolist',
    name: 'ToDoList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ToDoList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
