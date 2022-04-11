<template>
    <article v-if="updateInfoForm" class="contact-info">
      <h2>Contact Info</h2>
      <p>You vill have to log in again after updating changes!</p>
      <form @submit.prevent="updateInfo">
        <label for="password">Password</label>
        <input v-model="newInfo.password" 
          placeholder="8 characters"
          :class="{error: error.password}"
          required
          type="password" name="password" 
        >
        <label for="repeat-password">Repeat password</label>
        <input v-model="newInfo.repeatPassword" 
          :class="{error: error.password}"
          type="password" name="repeat-password" 
        >
        <small>{{error.password}}</small>
        <label for="email">Email</label>
        <input v-model="newInfo.email" 
          :class="{error: error.email}"
          :placeholder="user.email"
          type="email" name="email"
        >
        <small>{{error.email}}</small>
        <label for="city">City</label>
        <input v-model="newInfo.address.city" 
          :placeholder="user.address.city"
          :class="{error: error.city}"
          type="text" name="city"
        >
        <small>{{error.city}}</small>
        <label for="Street">Street</label>
        <input v-model="newInfo.address.street" 
          :placeholder="user.address.street"
          :class="{error: error.street}"
          type="text" name="street" 
        >
        <small>{{error.street}}</small>
        <label for="zip">Zip</label>
        <input v-model="newInfo.address.zip" 
          :placeholder="user.address.zip"
          :class="{error: error.zip}"
          maxlength="5"
          type="text" name="zip"
        >
        <small>{{error.zip}}</small>
        <button>Update</button>
      </form>
    </article>
    <article v-else class="contact-info">
      <h2>Contact Info</h2>
      <p>Name: {{user.name}}</p>
      <p>Email: {{user.email}}</p>
      <h2>Adress</h2>
      <p>City: {{user.address.city}}</p>
      <p>Street: {{user.address.street}}</p>
      <p>Zip: {{user.address.zip}}</p>
      <span>
        <button @click="logOut">Log out</button>
        <button @click="toggleEditInfo" class="info-btn">Change Info</button>
      </span>
    </article>
</template>

<script>
import Action from '@/store/Action.types'
export default {
  props: { user: Object },
   data(){return{
    newInfo: {
      password: '',
      repeatPassword: '',
      email: '',
      address: {
        city: '',
        street: '',
        zip: ''
      }
    },
    error: {
      password: '',
      street: '',
      zip: '', 
      city: '', 
      email: ''
    },
    minPasswordLength: 8
  }},
  computed: {
    updateInfoForm(){
      return this.$store.state.updateInfoForm
    },
  },
  methods: {
    toggleEditInfo(){
      this.$store.dispatch(Action.TOGGLE_UPDATE_INFO)
    },
    logOut(){
      this.$router.push('/')
      this.$store.dispatch(Action.LOG_OUT)
    },
    async updateInfo(){
      if(this.newInfo.password.length < this.minPasswordLength){
        this.error.password = 'PASSWORD NEEDS A MINIMUM OF 8 CHARACTERS'
      }
      else if(this.newInfo.password != this.newInfo.repeatPassword){
        this.error.password = 'PASSWORD DOES NOT MATCH'
      }
      else{
        this.error.password = ''
      }
      if(!this.newInfo.email.length > 0){
        this.newInfo.email = this.user.email
      }
      if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.newInfo.email)){
        this.error.email = 'ENTER A VALID EMAIL'
      }else{
        this.error.email = ''
      }
      if(this.newInfo.address.street.length < 3){
        this.newInfo.address.street = this.user.address.street
      }else{
        this.error.street = ''
      }
      if(!this.newInfo.address.zip.length > 0){
        this.newInfo.address.zip = this.user.address.zip
      }
      if(!/^[0-9]*$/.test(this.newInfo.address.zip) || this.newInfo.address.zip.length < 5){
        this.error.zip = 'NEEDS 5 DIGITS'
      }
      else{
        this.error.zip = ''
      }
      if(!this.newInfo.address.city.length > 0){
        this.newInfo.address.city = this.user.address.city
      }
      if(this.newInfo.address.city.length < 3){
        this.error.city = 'ENTER CITY'
      }else{
        this.error.city = ''
      }
      if(!this.error.street.length && !this.error.password.length &&
        !this.error.zip.length && !this.error.city.length && !this.error.email.length){
        this.$router.push('/')   
        await this.$store.dispatch(Action.UPDATE_USER, this.newInfo)  
      }  
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/fonts-colors.scss';
input.error{
  border: 1px solid red;
}
small{
  color:red;
}
input{
  padding: .5rem;
  border: 1px solid $black;
  border-radius: 4px;
}
label{
  margin-top: .5rem;
}
button{
  background-color: $black;
  color: $orange;
  border: none;
  width: 6rem;
  padding: .5rem;
  font-size: 12px;
  border-radius: 4px;
  margin-right: .5rem;
  &:hover{
    background-color: $orange;
    color: $black;
  }
}
.info-btn{
  background-color: transparent;
  border: 1px solid $black;
  color: $black;
}
form{
  display: flex;
  flex-direction: column;
}
</style>