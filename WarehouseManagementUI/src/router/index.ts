import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '../components/Layout/Layout1.vue'
import LoginView from '../views/Auth/Login.vue'
import RegisterView from '../views/Auth/Register.vue'
import Layout2 from '../components/Layout/Layout2.vue'
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
      component: Layout2,
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
      component: Layout2,
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
