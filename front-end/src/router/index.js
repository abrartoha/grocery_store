import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect: { name: 'Home'},
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/cart/:productId?',
      name: 'Cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/admin/:productId?',
      name: 'Admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/orderHistory/',
      name: 'OrderHistory',
      component: () => import('../views/OrderHistoryView.vue')
    }
  ],

})

export default router
