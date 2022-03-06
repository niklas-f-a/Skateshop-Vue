import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/API/API.js'
import Action from './Action.types.js'
import Mutation from './Mutation.types.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productList: [],
    products: {}
  },
  mutations: {
    [Mutation.SAVE_PRODUCTS](state, products){
      for(let product of products){
        if(!state.products[product.id]){
          state.productList.push(product)
          Vue.set(state.products, product.id, product)
        }
      }
    },
    [Mutation.SAVE_ONE_PRODUCT](state, product){
      if(!state.products[product.id]){
        state.productList.push(product)
        Vue.set(state.products, product.id, product)
      }
    }
  },
  actions: {
    async [Action.GET_ONE_PRODUCT]({commit}, id){
      const response = await API.getProductById(id)
      commit(Mutation.SAVE_ONE_PRODUCT ,response.data.post)
    }, 
    async [Action.GET_PRODUCTS_BY_PAGE]({commit}, page){
      const response = await API.getProductsByPage(page)
      commit(Mutation.SAVE_PRODUCTS, response.data)
    }
  },
  modules: {
  }
})
