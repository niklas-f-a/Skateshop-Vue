<template>
<main>
  <h1>Hello {{user.name}}</h1>
  <section class="my-account">
    <article v-if="updateInfoForm" class="contact-info">
      <h2>Contact Info</h2>
      <form @submit.prevent="updateInfo">
        <label for="name">Name</label>
        <input v-model="newInfo.name" type="text" name="name" :placeholder="user.name">
        <label for="email">Email</label>
        <input v-model="newInfo.email" type="email" name="email" :placeholder="user.email">
        <label for="city">City</label>
        <input v-model="newInfo.address.city" type="text" name="city" :placeholder="user.address.city">
        <label for="Street">Street</label>
        <input v-model="newInfo.address.street" type="text" name="street" :placeholder="user.address.street">
        <label for="zip">Zip</label>
        <input v-model="newInfo.address.zip" type="text" name="zip" :placeholder="user.address.zip">
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
        <button @click="changeInfo" class="info-btn">Change Info</button>
      </span>
    </article>
    <section class="order-history">
      <h2>Orders</h2>
      <OrderComponent v-for="order in orders" :key="order.id" :order="order" />
    </section>
  </section>
</main>
</template>

<script>
import Action from "@/store/Action.types"
import OrderComponent from "@/components/OrderComponent.vue"
export default {
  components: {OrderComponent},
  beforeMount(){
    this.$store.dispatch(Action.GET_ORDER_HISTORY)
  },
  data(){return{
    newInfo: {
      name: '',
      email: '',
      address: {
        city: '',
        street: '',
        zip: ''
      }
    }
  }},
  computed: {
    user(){
      return this.$store.state.user
    }, 
    orders(){
      return this.$store.state.orders
    }, 
    updateInfoForm(){
      return this.$store.state.updateInfoForm
    }
  },
  methods: {
    logOut(){
      this.$router.push('/')
      this.$store.dispatch(Action.LOG_OUT)
    },
    changeInfo(){
      this.$store.dispatch(Action.TOGGLE_UPDATE_INFO)
    },
    updateInfo(){
      console.log(this.user);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
main{
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 5rem;
  h1{
    margin-bottom: 1rem;
  }
  .my-account{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .order-history{
      h2{
        margin-bottom: 1rem;
      }
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
  }
}
</style>