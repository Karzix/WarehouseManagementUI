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
import InboundReceipt from '../views/InboundReceipt/Index.vue'
import Warehouse from '../views/Warehouse/Index.vue'
import CreateWarehouse from '../views/Warehouse/Create.vue'
import DetailWarehouse from "../views/Warehouse/Detail.vue";
import EditWarehouse from "../views/Warehouse/Edit.vue";
import CreateOutboundReceipt from '../views/OutboundReceipt/Create.vue';
import CreateInboundReceipt from '../views/InboundReceipt/Create.vue';
import Cookies from 'js-cookie'

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
    {
      path: '/InboundReceipt',
      component: Layout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: InboundReceipt,
        },
        {
          path: 'Create',
          component: CreateInboundReceipt,
        },
        {
          path: ":Id",
          component: DetailWarehouse,
        },
        {
          path: "Edit/:Id",
          component: EditWarehouse,
        }
      ],
    },
    {
      path: '/Warehouse',
      component: Layout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: Warehouse,
        },
        {
          path: 'Create',
          component: CreateWarehouse,
        },
        {
          path: ":Id",
          component: DetailWarehouse,
        },
        {
          path: "Edit/:Id",
          component: EditWarehouse,
        }
      ],
    },
    {
      path: '/OutboundReceipt',
      component: Layout,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: InboundReceipt,
        },
        {
          path: 'Create',
          component: CreateOutboundReceipt,
        }
      ],
    },
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get('accessToken');
  
  if (to.meta.requiresAuth && !isAuthenticated && to.path !== '/login') {
    next({ path: '/login' });  
  } else {
    next(); // Continue to the requested route
  }
});
export default router
