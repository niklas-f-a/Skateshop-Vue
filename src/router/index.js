import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from "@/views/Products.vue"
import Product from "@/views/SingleProduct.vue"

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
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
