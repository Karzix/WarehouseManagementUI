import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '../components/Layout/Layout1.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import Layout1 from '../components/Layout/Layout1.vue'
import Layout1Vue from '../components/Layout/Layout1.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: HomeView,
        },
        // Other routes using default layout...
      ],
    },
    {
      path: '/Login',
      component: Layout1,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: LoginView,
        },
        // Other routes using default layout...
      ],
    },
    {
      path: '/Register',
      component: Layout1,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: RegisterView,
        },
        // Other routes using default layout...
      ],
    }
  ]
})

export default router