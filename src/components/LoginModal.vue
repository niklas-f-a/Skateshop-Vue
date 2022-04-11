<template>
  <dialog v-if="loginModalOpen && currentModal === 'login'" open>
    <span class="close" @click="closeModal"><Icon icon="ci:close-big" width="25" /></span>
    <h2>Login</h2>
    <form @submit.prevent="logIn">
      <label for="username">Email:</label>
      <input v-model="email" type="text">
      <label for="password">Password:</label>
      <input v-model="password" type="password">
      <button>Login</button>
      <p v-if="error" class="error">{{error}}</p>
    </form>
    <p @click="showSignUp">Create new account</p>
  </dialog>
  <RegistrationForm v-else-if="loginModalOpen && currentModal === 'signup'" />
</template>

<script>
import RegistrationForm from "@/components/RegistrationForm"
import Action from "@/store/Action.types"
import {Icon} from '@iconify/vue2'
export default {
  components: {Icon, RegistrationForm},
  data(){return{
    email: "customer@example.com", 
    password: "password",
    closeIcon: require('../assets/images/xmark-solid.svg')
  }},
  computed: {
    currentModal(){
      return this.$store.state.currentModal
    },
    loginModalOpen(){
      return this.$store.state.showModal
    },
    error(){
      return this.$store.state.error.messageOnModal
    }
  }, 
  methods: {
    async logIn(){
      await this.$store.dispatch(Action.LOG_IN, {email: this.email, password: this.password})
      if(!this.error){
        this.$store.dispatch(Action.TOGGLE_SHOW_MODAL)
      }
    },
    closeModal(){
      this.$store.dispatch(Action.TOGGLE_SHOW_MODAL)
    },
    showSignUp(){
      this.$store.dispatch(Action.CHANGE_MODAL, 'signup')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
  dialog{
    position: absolute;
    top: 6rem;
    background-color: #FFFFFF;
    z-index: 5;
    width: 25rem;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    .close{
      align-self: flex-end;
      &:hover{
        cursor: pointer;
      }
    }
    .error{
      color: red;
    }
    h2{
      margin-bottom: 1rem;
    }
    form{
      display: flex;
      flex-direction: column;
      width: 80%;
      height: 80%;
      label{
        margin-bottom: .3rem;
      }
      input{
        margin-bottom: 1rem;
        padding: .5rem;
        border: 1px solid $black;
        border-radius: 4px;
      }
      button{
        background-color: $black;
        color: $orange;
        width: 7rem;
        padding: .5rem;
        font-size: 16px;
        border: 1px solid $black;
        border-radius: 4px;
        margin: auto;
        &:active{
          background-color: $orange;
          color: $black;
        }
      }
    }
    p{
      color: $orange;
      &:hover{
        cursor: pointer;
      }
    }
  }
</style>