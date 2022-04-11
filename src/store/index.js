import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/API/API.js'
import Action from './Action.types.js'
import Mutation, { SET_ERROR_ON_PAGE } from './Mutation.types.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
    user: {},
    loggedIn: false,
    error: {
      messageOnPage: "", 
      messageOnModal: ""
    },
    showModal: false,
    currentModal: 'login',
    productList: [],
    products: {}, 
    naturalSeriesId: [13, 14, 17], 
    promoProductId: 16,
    cart: [],
    updateInfoForm: false
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
    }, 
    [Mutation.DECREASE_ITEM_IN_CART](state, id){
      const productToDecrease = state.cart.find(product => product.id == id)
      if(productToDecrease.amount == 1){
        return productToDecrease.amount = 1
      }else{
        productToDecrease.amount--
      }
    }, 
    [Mutation.REMOVE_FROM_CART](state, id){
      state.cart.splice(state.cart.findIndex(product => product.id == id), 1)
    }, 
    [Mutation.SET_ERROR_ON_PAGE](state, error){
      state.error.messageOnPage = error
    }, 
    [Mutation.SET_ERROR_ON_MODAL](state, error){
      state.error.messageOnModal = error
    }, 
    [Mutation.CLEAR_ERROR](state){
      state.error.messageOnPage = ""
      state.error.messageOnModal = ""
    },
    [Mutation.EMPTY_CART](state){
      state.cart = []
    }, 
    [Mutation.LOG_IN_LOG_OUT](state){
      state.loggedIn = !state.loggedIn
    }, 
    [Mutation.SAVE_ORDER_HISTORY](state, orders){
      state.orders = orders
    },
    [Mutation.TOGGLE_SHOW_MODAL](state){
      state.showModal = !state.showModal
    },
    [Mutation.CHANGE_MODAL](state, toModal){
      state.currentModal = toModal
    },
    [Mutation.STORE_USER_INFO](state, userInfo){
      state.user = userInfo
    },
    [Mutation.DISPOSE_USER](state){
      state.user = {}
    },
    [Mutation.TOGGLE_UPDATE_INFO](state){
      state.updateInfoForm = !state.updateInfoForm
    },
  },
  actions: {
    [Action.TOGGLE_UPDATE_INFO]({commit}){
      commit(Mutation.TOGGLE_UPDATE_INFO)
    },
    [Action.LOG_OUT]({commit}){
      commit(Mutation.LOG_IN_LOG_OUT)
      commit(Mutation.DISPOSE_USER)
      API.clearToken()
    },
    [Action.STORE_USER_INFO]({commit}, userInfo){
      commit(Mutation.STORE_USER_INFO, userInfo)
    },
    [Action.CHANGE_MODAL]({commit}, toModal){
      commit(Mutation.CHANGE_MODAL, toModal)
    },
    async [Action.GET_ORDER_HISTORY]({commit}){
      const response = await API.getOrderHistory()
      commit(Mutation.SAVE_ORDER_HISTORY, response.data)
    },
    async [Action.LOG_IN]({commit}, user){
      const response = await API.logIn(user)
      if(response.error){
        commit(Mutation.SET_ERROR_ON_MODAL, response.error)
      }else{
        API.setToken(response.data.token)
        commit(Mutation.LOG_IN_LOG_OUT)
        commit(Mutation.CLEAR_ERROR)
      }
    },
    async [Action.UPDATE_USER]({commit}, newInfo){
      await API.updateUserInfo(newInfo)
      commit(Mutation.DISPOSE_USER)
      commit(Mutation.LOG_IN_LOG_OUT)
    },
    async [Action.REGISTER_USER]({commit}, newUser){
      const response = await API.registerUser(newUser)
      if(response.error){
        commit(Mutation.SET_ERROR_ON_MODAL, response.error)
      }
      else{
        API.setToken(response.data.token)
        commit(Mutation.LOG_IN)
        commit(Mutation.CLEAR_ERROR)
      }
    },
    [Action.TOGGLE_SHOW_MODAL]({commit}){
      commit(Mutation.TOGGLE_SHOW_MODAL)
    },
    [Action.EMPTY_CART]({commit}){
      commit(Mutation.EMPTY_CART)
    },
    [Action.CLEAR_ERROR]({commit}){
      commit(Mutation.CLEAR_ERROR)
    },
    [Action.REMOVE_FROM_CART]({commit}, id){
      commit(Mutation.REMOVE_FROM_CART, id)
    },
    [Action.DECREASE_ITEM_IN_CART]({commit}, id){
      commit(Mutation.DECREASE_ITEM_IN_CART, id)
    },
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
    }, 
    async [Action.REGISTER_ORDER]({commit}, payload){
       const response = await API.registerOrder(payload)
       if(response.error){
         commit(SET_ERROR_ON_PAGE, response.error)
       }  
    }
  },
  getters: {
    totalCost(state){
      return state.cart.reduce((acc, cur) => {
        return acc + cur.amount * state.products[cur.id].price
      }, 0)
    },
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
