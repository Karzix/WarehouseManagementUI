import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '../components/Layout/Layout1.vue'
import LoginView from '../views/Auth/Login.vue'
import RegisterView from '../views/Auth/Register.vue'
import Layout2 from '../components/Layout/Layout2.vue'
import UserView from '../views/User/User.vue'
import UserDetailsVue from '../views/User/UserDetails.vue'
import ProductVue from '../views/Product/Product.vue'
import CreateProduct from '../views/Product/Create.vue'
import Supplier from '../views/Supplier/Supplier.vue'
import CreateSupplier from '../views/Supplier/Create.vue'
import SupplierProductDetail from '../views/Supplier/Detail.vue'
import EditSupplier from '../views/Supplier/Edit.vue'
import AddProductForSupplier from '../views/Supplier/AddProduct.vue'
import CreateNewProductForSupplier from '@/views/Supplier/CreateNewProduct.vue'
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
    },
    {
      path: '/User',
      component: Layout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: UserView,
        },
        // Other routes using default layout...
      ],
    },
    {
      path: "/User/:Id",
      component: UserDetailsVue,
    },
    {
      path: '/Product',
      component: Layout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: ProductVue,
        },
        {
          path: 'Create',
          component: CreateProduct,
        }
      ],
    },
    {
      path: '/Supplier',
      component: Layout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: Supplier,
        },
        {
          path: 'Create',
          component: CreateSupplier,
        },
        {
          path: ":Id",
          component: SupplierProductDetail,
        },
        {
          path: "Edit/:Id",
          component: EditSupplier,
        },
        {
          path: "Edit/:Id/AddProduct",
          component: AddProductForSupplier,
        },
        {
          path: "Edit/:Id/CreateNewProduct",
          component: CreateNewProductForSupplier,
        },
      ],
    },
  ]
})

export default router
