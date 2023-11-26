import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Layout from "../components/Layout/Layout1.vue";
import LoginView from "../views/Auth/Login.vue";
import RegisterView from "../views/Auth/Register.vue";
import Layout2 from "../components/Layout/Layout2.vue";
import UserView from "../views/User/User.vue";
import ProductVue from "../views/Product/Product.vue";
import Supplier from "../views/Supplier/Supplier.vue";
import CreateSupplier from "../views/Supplier/Create.vue";
import SupplierProductDetail from "../views/Supplier/Detail.vue";
import EditSupplier from "../views/Supplier/Edit.vue";
import AddProductForSupplier from "../views/Supplier/AddProduct.vue";
import CreateNewProductForSupplier from "@/views/Supplier/CreateNewProduct.vue";
import InboundReceipt from "../views/InboundReceipt/Index.vue";
import Warehouse from "../views/Warehouse/Index.vue";
import CreateOutboundReceipt from "../views/OutboundReceipt/Create.vue";
import CreateInboundReceipt from "../views/InboundReceipt/Create.vue";
import InboundReceiptDeatail from "../views/InboundReceipt/Deatail.vue";
import OutboundReceipt from "../views/OutboundReceipt/Index.vue";
import OutboundReceiptDeatail from "../views/OutboundReceipt/Deatail.vue";
import ProductRemainming from '../views/ProductRemainming/Index.vue';
import Cookies from "js-cookie";
import * as jwt from "jsonwebtoken";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: HomeView,
        },
        // Other routes using default layout...
      ],
    },
    {
      path: "/Login",
      component: Layout2,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: LoginView,
        },
        // Other routes using default layout...
      ],
    },
    {
      path: "/Register",
      component: Layout2,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: RegisterView,
        },
        // Other routes using default layout...
      ],
    },
    {
      path: "/User",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: UserView,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        // Other routes using default layout...
      ],
    },
    {
      path: "/Product",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: ProductVue,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
      ],
    },
    {
      path: "/Supplier",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: Supplier,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: "Create",
          component: CreateSupplier,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: ":Id",
          component: SupplierProductDetail,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: "Edit/:Id",
          component: EditSupplier,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: "Edit/:Id/AddProduct",
          component: AddProductForSupplier,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: "Edit/:Id/CreateNewProduct",
          component: CreateNewProductForSupplier,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
      ],
    },
    {
      path: "/InboundReceipt",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: InboundReceipt,
        },
        {
          path: "Create",
          component: CreateInboundReceipt,
        },
        {
          path: "Deatail/:Id",
          component: InboundReceiptDeatail,
        },
      ],
    },
    {
      path: "/Warehouse",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: Warehouse,
        },
        {
          path: "Deatail/:Id",
          component: ProductRemainming,
        },
      ],
    },
    {
      path: "/OutboundReceipt",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: OutboundReceipt,
        },
        {
          path: "Create",
          component: CreateOutboundReceipt,
        },
        {
          path: "Deatail/:Id",
          component: OutboundReceiptDeatail,
        }
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get("accessToken");
  const userRoles: string[] = getRolesFromToken(Cookies.get('accessToken')?.toString() || '') ??[];

  if (to.meta.requiresAuth && !isAuthenticated && to.path !== "/login") {
    next({ path: "/login" });
  } 
  else if(to.meta.roles && !hasPermission(userRoles, to.meta.roles as string[])){
    next({ path: "/403" });
  }
  else {
    next(); // Continue to the requested route
  }
});

function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
function getRolesFromToken(token: string): string[] | null {
  try {
    var token = Cookies.get('accessToken')?.toString() ?? "";
    const decodedToken = jwt.decode(token ?? '') as TokenPayload;
    console.log(decodedToken);
    return decodedToken.Roles || [];
  } catch (error) {
    console.error(error);
    return null;
  }
}
interface TokenPayload {
  [x: string]: never[];
}
export default router;