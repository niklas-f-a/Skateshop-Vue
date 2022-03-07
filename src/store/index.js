import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/API/API.js'
import Action from './Action.types.js'
import Mutation from './Mutation.types.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productList: [],
    products: {}, 
    naturalSeriesId: [13, 14, 17], 
    promoProductId: 16,
    cart: []
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
    }, 
    [Mutation.ADD_TO_CART](state, id){
      const product = state.cart.find(product => product.id == id)
      if(product){
        product.amount++
      }else{
        state.cart.push({id, amount:1})
      }
    }
  },
  actions: {
    [Action.ADD_TO_CART]({commit}, {id}){
      commit(Mutation.ADD_TO_CART, id)
    },
    async [Action.GET_ONE_PRODUCT]({commit}, id){
      const response = await API.getProductById(id)
      commit(Mutation.SAVE_ONE_PRODUCT ,response.data.post)
    }, 
    async [Action.GET_PRODUCTS_BY_PAGE]({commit}, page){
      const response = await API.getProductsByPage(page)
      commit(Mutation.SAVE_PRODUCTS, response.data)
    },
    async [Action.GET_CATEGORY]({commit}, category){
      const response = await API.getProductsByCategory(category)
      commit(Mutation.SAVE_PRODUCTS, response.data)
    },
    async [Action.GET_SEARCH]({commit}, searchWord){
      const response = await API.getSearch(searchWord)
      commit(Mutation.SAVE_PRODUCTS, response.data)
    }
  },
  getters: {
    promoProduct(state){
      return state.products[state.promoProductId]
    }, 
    naturalSeries(state){
      return state.naturalSeriesId.map(productId => state.products[productId])
    }, 
    skateBoardsAndWheels(state){
      return state.productList.filter(product => product.category == 'skateboard' || product.category == 'wheel')
    },
    apparel(state){
      return state.productList.filter((product) => 
        product.category == 'hoodie' || 
        product.category == 'tshirt' || 
        product.category == 'socks'
      )
    },
    accessories(state){
      return state.productList.filter((product) => 
        product.category == 'cap' ||
        product.category == 'totebag'
      )
    },
    specialEdition(state){
      return state.productList.filter(product => product.specialEdition)
    }
  },
  modules: {
  }
})
