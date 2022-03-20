import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from "@/views/Products.vue"
import Product from "@/views/SingleProduct.vue"
import CartView from "@/views/CartView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Products/:category',
    name: 'Products',
    component: Products
  },
  {
    path: '/Product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: CartView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
