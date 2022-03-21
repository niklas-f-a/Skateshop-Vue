<template>
  <section class="cart-view">
    <div class="left-side-container">
      <h1>Din varukorg <span v-if="!inCartProducts.length">är tom</span></h1>
      
      <section class="cart">
        <article v-for="productInCart in inCartProducts" :key="productInCart.id">
          <ProductCard :productId="productInCart.id" inCart/>
        </article>
      </section>
    </div>
    <form
      v-if="inCartProducts.length"
      @submit.prevent="$router.push('/Checkout')"    
      >
      <span>
        <p>Leveransavg.</p>
        <p class="price">0:-</p>
      </span>
      <div class="line"></div>
      <input type="text" placeholder="Ange rabattkod">
      <div class="line"></div>
      <span>
        <p>Totalsumma</p>
        <p class="price">{{totalCost}}:-</p>
      </span>
      <button>Till Kassan</button>
    </form>
  </section>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
export default {
  components: {ProductCard},
  computed: {
    inCartProducts(){
      return this.$store.state.cart
    }, 
    totalCost(){
      return this.$store.getters.totalCost
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
.cart-view{
  max-width: 50rem;
  width: 70%;
  margin-top: 3rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  .left-side-container{
    h1{
      margin: 0 0 1rem 1rem;
      font-size: 40px;
    }
    .cart{
      min-height: 25rem;
      min-width: 25rem;
    }
  }
 form{
  padding: 1rem 0;
  position: sticky;
  top: 12rem;
  border: 1px solid #000000;
  width: 20rem;
  height: 16rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  button{
    padding: .8rem 1.8rem;
    border-radius: 4px;
    color: $orange;
    background-color: #000000;
    font-size: 1rem;
    &:hover{
      cursor: pointer;
    }
    &:active{
      background-color: $orange;
      color: #000000;
    }
  }
  input{
    width: 80%;
    padding: .8rem .4rem;
    border-radius: 4px;
    border: 1px solid #000000;
  }
  span{
    width: 80%;
    display: flex;
    justify-content: space-between;
    p{
      margin: 0;
      font-weight: bold;
    }
    .price{
      color: red;
    }
  }
  .line{
    width: 80%;
    height: 1px;
    background-color: #DDDDDD;
  }
} 
}
</style>