<template>
  <dialog open>
    <span>
      <i @click="changeModal" class="go-back"><Icon icon="mdi:chevron-left" width="25"/></i>
      <i class="close" @click="closeModal"><Icon icon="ci:close-big" width="25" /></i>
    </span>
    <h2>SignUp</h2>
    <form @submit.prevent="signUp">
      <label for="name">Name</label>
      <input type="text" id="name" placeholder="Bingo Berra"
        :class="{error: error.name}"
        @input="validateCharacters" 
        v-model="name" 
      >
      <small>{{error.name}}</small>
      <label for="email">Email</label>
      <input type="text" id="email" placeholder="bingo@berra.com"
        v-model="email" 
        :class="{error: error.email}"
      >
      <small>{{error.email}}</small>
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="minimum 8 characters"
        v-model="password" 
        :class="{error: error.password}"
      >
      
      <label for="repeat-password">Repeat Password</label>
      <input type="password" id="repeat-password" placeholder="repeat password"
        v-model="repeatPassword" 
        :class="{error: error.password}"
      >
      <small>{{error.password}}</small>
      <h2>Adress</h2>
      <label for="street">Street</label>
      <input type="text" id="street" placeholder="jörgansväg 33"
        v-model="street" 
        :class="{error: error.street}"
      >
      <small>{{error.street}}</small>
      <label for="zip">Zip</label>
      <input type="text" maxlength="5" minlength="5" placeholder="12345"
        v-model="zip" 
        :class="{error: error.zip}"
      >
      <small>{{error.zip}}</small>
      <label for="city">City</label>
      <input type="text" id="city" placeholder="City"
        v-model="city" 
        :class="{error: error.city}"
      >
      <small>{{error.city}}</small>
      <span>
        <button>Sign up</button>
        <button class="cancel" @click="changeModal">Cancel</button>
    </span>
    </form>
  </dialog>
</template>

<script>
import {Icon} from '@iconify/vue2'
import Action from "@/store/Action.types"
export default {
  destroyed(){
    this.changeModal()
  },
  components: {Icon},
  data(){return {
    minPasswordLength: 8,
    email: '', 
    name: '',
    password: '', 
    repeatPassword: '',
    street: '',
    zip: null,
    city: '',
    validName: false, 
    noNumberInName: false,
    validPassword: false,
    validZip: false,
    validCity: false, 
    validEmail: false, 
    validStreet: false,
    registerSuccess: false,
    error: {
      name: '', 
      password: '', 
      street: '',
      zip: '', 
      city: '', 
      email: ''
    }
  }},
  methods: {
    validateCharacters(e){ 
      if(e.target.value.match(/^[A-ZÅÄÖa-zåäö\s]+$/)){
        this.noNumberInName = true
        this.error.name = ''      
      }else {        
        this.error.name = 'NO NUMBERS'
        this.noNumberInName = false
      }if(e.target.value < 1){
        this.error.name = ''
      }
    },
    async signUp(){
      if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.email)){
        this.error.email = 'ENTER A VALID EMAIL'
      }else{
        this.error.email = ''
        this.validEmail = true
      }
      if(!/\s/.test(this.name.trim())){
        this.error.name = 'NEEDS FIRST- AND LASTNAME'
      }else{
        this.validName = true
      }
      if(this.password.length < this.minPasswordLength){
        this.error.password = 'PASSWORD NEEDS A MINIMUM OF 8 CHARACTERS'
      }
      if(this.password != this.repeatPassword){
        this.error.password = 'PASSWORD DOES NOT MATCH'
      }
      if(this.password.length >= this.minPasswordLength && this.password == this.repeatPassword){
        this.validPassword = true
        this.error.password = ''
      }
      if(this.street.length < 2){
        this.error.street = 'ENTER STREET NAME'
      }else{
        this.error.street = ''
        this.validStreet = true
      }
      if(!/^[0-9]*$/.test(this.zip) || this.zip.length < 5){
        this.error.zip = 'NEEDS 5 DIGITS'
      }
      else{
        this.error.zip = ''
        this.validZip = true
      }
      if(this.city.length < 3){
        this.error.city = 'ENTER CITY'
      }else{
        this.validCity = true
        this.error.city = ''
      }
      if( this.validName && this.noNumberInName && this.validPassword && this.validZip
          && this.validCity && this.validEmail && this.validStreet){
            
            const newUser = {
              email: this.email, 
              password: this.password, 
              name: this.name, 
              address:{
                city: this.city, 
                street: this.street, 
                zip: this.zip
              }
            }
          await this.$store.dispatch(Action.REGISTER_USER, newUser)
          this.$store.dispatch(Action.TOGGLE_SHOW_MODAL)
      }
    },
    closeModal(){
      this.$store.dispatch(Action.TOGGLE_SHOW_MODAL)
    },
    changeModal(){
      this.$store.dispatch(Action.CHANGE_MODAL, 'login')
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
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    span{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .close,.go-back{
        &:hover{
          cursor: pointer;
        }
      }
    }
    small{
      color: rgb(240, 0, 0);
    }
    input.error{
      border: 1px solid red;
    }
    h2{
      margin-top: 1rem;
    }
    form{
      display: flex;
      flex-direction: column;
      width: 80%;
      height: 80%;
      label{
        margin-top: .5rem;
      }
      input{
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
        margin: 1rem;
        &:active{
          background-color: $orange;
          color: $black;
        }
      }
      .cancel{
        background-color: transparent;
        color: $black;
        &:hover{
          background-color: $orange;
        }
      }
    }
  }
</style>