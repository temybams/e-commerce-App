import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import Signup from '../views/Signup.vue';
import ProductList from '../views/ProductList.vue';
import AddProduct from '../views/AddProduct.vue';
import UpdateProduct from '../views/UpdateProduct.vue'; 
import store from '../store';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/products', name: 'ProductList', component: ProductList },
  { path: '/addproduct', name: 'AddProduct', component: AddProduct },
  { path: '/updateproduct/:id', name: 'UpdateProduct', component: UpdateProduct }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
