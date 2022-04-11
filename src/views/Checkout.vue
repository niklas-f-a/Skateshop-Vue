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
      <div class="form-content" v-if="!user">
        <h1>Slutför din beställning</h1>
        <span class="flex">
          <div>
            <label for="firstname">Name</label>
            <input type="text" name="name" :placeholder="userName[0]">
          </div>
          <div>
            <label for="lastname">Efternamn</label>
            <input type="text" name="lastname" :placeholder="userName[1]">
          </div>
        </span>
        <label for="deliveryadress">Leveransadress*</label><br>
        <input v-model="shippingAddress.street" class="deliveryinput" placeholder="bingovägen 33" type="text" name="deliveryadress" required>
        <span  class="flex">
          <div>
            <label for="town">Stad*</label>
            <input v-model="shippingAddress.city" type="text" placeholder="Mallis" name="town" required>
          </div>
          <div>
            <label for="postalcode">Postkod*</label>
            <input v-model="shippingAddress.zip" type="text" minlength="5" maxlength="5" placeholder="12345" name="postalcode" required>
          </div>
        </span>
        <div class="divider"></div>
        <div class="radiobuttons">
          <h1>Hur vill du betala</h1>
          <span>
            <input checked="checked" type="radio" name="payment" id="card" value="card">
            <label for="card">Med kort</label>
            <i><img src="@/assets/images/credit-card-solid.svg"></i>
          </span>
          <div class="divider-small"></div>
          <span>
            <input type="radio" name="payment" id="invoice" value="invoice">
            <label for="invoice">Faktura </label>
            <p>Betala om 30 dagar</p>
          </span>
          <div class="divider-small"></div>
          <span>
            <input type="radio" name="payment" id="swish" value="swish">
            <label for="swish">Swish</label>
          </span> 
        </div>
      </div>
      <div class="form-content" v-else>
        <h1>Slutför din beställning</h1>
        <span class="flex">
          <div>
            <label for="firstname">Name</label>
            <input type="text" name="name" :value="userName[0]">
          </div>
          <div>
            <label for="lastname">Efternamn</label>
            <input type="text" name="lastname" :value="userName[1]">
          </div>
        </span>
        <label for="deliveryadress">Leveransadress*</label><br>
        <input class="deliveryinput" :value="user.address.street" type="text" name="deliveryadress" required>
        <span  class="flex">
          <div>
            <label for="town">Stad*</label>
            <input type="text" :value="user.address.city" name="town" required>
          </div>
          <div>
            <label for="postalcode">Postkod*</label>
            <input type="text" :value="user.address.zip" minlength="5" maxlength="5" placeholder="12345" name="postalcode" required>
          </div>
        </span>
        <div class="divider"></div>
        <div class="radiobuttons">
          <h1>Hur vill du betala</h1>
          <span>
            <input checked="checked" type="radio" name="payment" id="card" value="card">
            <label for="card">Med kort</label>
            <i><img src="@/assets/images/credit-card-solid.svg"></i>
          </span>
          <div class="divider-small"></div>
          <span>
            <input type="radio" name="payment" id="invoice" value="invoice">
            <label for="invoice">Faktura </label>
            <p>Betala om 30 dagar</p>
          </span>
          <div class="divider-small"></div>
          <span>
            <input type="radio" name="payment" id="swish" value="swish">
            <label for="swish">Swish</label>
          </span> 
        </div>
      </div>
        <button>Slutför köpet</button>
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
      return this.$store.state.user
    },
    userName(){
      return this.user.name.split(' ')
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