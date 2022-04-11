<template>
  <main>
    <section class="success" v-if="orderSent">
      <h1>Your order has been sent</h1>
      <h2>Thanks for shopping with us!</h2>
    </section>
    <form @submit.prevent="completeTransaction" 
      v-else
    >
      <h4 class="error" v-if="error">{{error}}</h4>
      <div class="form-content" v-if="user.name">
        <h1>Complete you order</h1>
        <span class="flex">
          <div>
            <label for="firstname">First name</label>
            <input :value="userName[0]" type="text" name="name" >
          </div>
          <div>
            <label for="lastname">Last name</label>
            <input :value="userName[1]" type="text" name="lastname" >
          </div>
        </span>
        <label for="deliveryadress">Delivery address*</label><br>
        <input :value="user.address.street" class="deliveryinput"  type="text" name="deliveryadress" required>
        <span  class="flex">
          <div>
            <label for="town">City*</label>
            <input :value="user.address.city" type="text" placeholder="Mallis" name="town" required>
          </div>
          <div>
            <label for="postalcode">Zip*</label>
            <input :value="user.address.zip" type="text" minlength="5" maxlength="5" placeholder="12345" name="postalcode" required>
          </div>
        </span>
        <div class="divider"></div>
        <div class="radiobuttons">
          <h1>How would you like to pay</h1>
          <span>
            <input checked="checked" type="radio" name="payment" id="card" value="card">
            <label for="card">Card</label>
            <i><img src="@/assets/images/credit-card-solid.svg"></i>
          </span>
          <div class="divider-small"></div>
          <span>
            <input type="radio" name="payment" id="invoice" value="invoice">
            <label for="invoice">Invoice </label>
            <p>Pay in 30 days</p>
          </span>
          <div class="divider-small"></div>
          <span>
            <input type="radio" name="payment" id="swish" value="swish">
            <label for="swish">Swish</label>
          </span> 
        </div>
      </div>
      <div class="form-content" v-else>
        <h1>Complete your order</h1>
        <span class="flex">
          <div>
            <label for="firstname">First name</label>
            <input type="text" name="name">
          </div>
          <div>
            <label for="lastname">Last name</label>
            <input type="text" name="lastname">
          </div>
        </span>
        <label for="deliveryadress">Delivery address*</label><br>
        <input class="deliveryinput" type="text" name="deliveryadress" required>
        <span  class="flex">
          <div>
            <label for="town">City*</label>
            <input type="text" name="town" required>
          </div>
          <div>
            <label for="postalcode">Zip*</label>
            <input type="text" minlength="5" maxlength="5" placeholder="12345" name="postalcode" required>
          </div>
        </span>
        <div class="divider"></div>
        <div class="radiobuttons">
          <h1>How would you like to pay</h1>
          <span>
            <input checked="checked" type="radio" name="payment" id="card" value="card">
            <label for="card">Card</label>
            <i><img src="@/assets/images/credit-card-solid.svg"></i>
          </span>
          <div class="divider-small"></div>
          <span>
            <input type="radio" name="payment" id="invoice" value="invoice">
            <label for="invoice">Invoice </label>
            <p>Pay in 30 days</p>
          </span>
          <div class="divider-small"></div>
          <span>
            <input type="radio" name="payment" id="swish" value="swish">
            <label for="swish">Swish</label>
          </span> 
        </div>
      </div>
        <button>Complete transaction</button>
    </form>
  </main>
</template>

<script>
import Action from "@/store/Action.types";
export default {
  beforeDestroy(){
    this.$store.dispatch(Action.CLEAR_ERROR)
  },
  data(){return{
    orderSent: false,
    shippingAddress: {
      city: "",
      street: "",
      zip: ""
    }, 
  }},
  computed: {
    inCart(){
      return this.$store.state.cart
    }, 
    error(){
      return this.$store.state.error.messageOnPage
    },
    user(){
      if(typeof this.$store.state.user != "undefined"){
        return this.$store.state.user
      }
      else{
        return null
      }
    },
    userName(){
      if(this.user){
        return this.user.name.split(' ')
      }
      else{
        return null
      }
    }
  },
  methods: {
    async completeTransaction(){
      let shippingAdress = {}
      if(!this.user){
        shippingAdress = this.shippingAddress
      }else{
        shippingAdress = {
          city: this.user.address.city,
          street: this.user.address.street,
          zip: this.user.address.zip
        }
      }
      const infoToSend = {
        items: this.inCart.map(product => Array(product.amount).fill(product.id)).flat(), 
        shippingAdress
      }
      await this.$store.dispatch(Action.REGISTER_ORDER, infoToSend)
      if(!this.error){
        this.orderSent = true
        this.$store.dispatch(Action.CLEAR_ERROR)
        this.$store.dispatch(Action.EMPTY_CART)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
main{
  background-color: $white;
  padding-top: 4rem;
  .success{
    height: 25rem;
    h1{
      text-align: center;
      margin: .8rem;
    }
  }
  .error{
    color: red;
    margin-bottom: 1rem;
  }
  .form-content{
    width: 60%;
  }
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid $black;
    padding: 2rem;
    background-color: #FFFFFF;
    width: 50rem;
    h1{
        margin: 0 auto 1.4rem auto;
        text-align: center;
      }
    input[type=text], input[type=number]{
      padding: .5rem;
      border-radius: 4px;
      border: 1px solid $black;
      margin-bottom: 1rem;
    }
    .deliveryinput{
      width: 100%;
    }
    .flex{
      display: flex;
      justify-content: space-between;
      div{
        display: flex;
        flex-direction: column;
        input{
          width: 13rem;
        }
      }
    }
    .divider{
      margin: 2rem 0;
      width: 100%;
      height: 1px;
      background-color: lightgray;
    }
    .divider-small{
      margin: 2px;
      width: 100%;
      height: 1px;
      background-color: lightgray;
    }
    .radiobuttons{
      display: flex;
      flex-direction: column;
      width: 15rem;
      margin: auto;
      span{
        width: 100%;
        display: flex;
        margin: .4rem 0;
        align-items: center;
        p{
          color: lightgray;
          margin: auto 1px auto auto;
        }
        input[type=radio]{
         margin-top: -1px;
         vertical-align: middle;
        }
        i{
          margin: auto 1px auto auto;
          img{
            width: 16px;
          }
        }
      }
    }
    button{
      margin-top: 2rem;
      align-self: center;
      background-color: $black;
      color: $orange;
      padding: 1rem 2rem;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      &:active{
        background-color: $orange;
        color: $black;
      }
    }
  }
}
</style>