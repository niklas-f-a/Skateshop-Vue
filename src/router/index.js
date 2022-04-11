import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from "@/views/Products.vue"
import Product from "@/views/SingleProduct.vue"
import CartView from "@/views/CartView.vue"
import Checkout from "@/views/Checkout.vue"
import Profile from "@/views/Profile.vue"

import * as API from "@/API/API"
import Action from "@/store/Action.types"


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
  },
  {
    path: '/Checkout',
    name: 'Checkout',
    component: Checkout,
    beforeEnter(to, from, next){
      if(router.app.$store.state.loggedIn){
        API.getMe().then(res => {
          router.app.$store.dispatch(Action.STORE_USER_INFO, res.data)
        })
      }
      next()
    }
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    beforeEnter(to, from, next){
      API.getMe().then( res => {
        if(res.error){
          next({name: 'Home'})
        }else{
          router.app.$store.dispatch(Action.STORE_USER_INFO, res.data)
          next()
        }
      })   
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
