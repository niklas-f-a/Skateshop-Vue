<template>
  <main>
    <section class="hero">
      <span>
        <h1>THE URBAN CHAMELEON</h1>
        <h3>GET IT NOW</h3>
        <button>Learn more</button>
      </span>
      <figure>
        <img v-if="promoProduct" :src="`${BASE_URL}/images/${promoProduct.imgFile}`" alt="">
      </figure>
    </section>
    <ProductsByFour />
  </main>
</template>

<script>
import Action from '@/store/Action.types.js'
import ProductsByFour from '@/components/ProductsByFour.vue'

export default {
  components: {ProductsByFour},
  data(){return{
    BASE_URL: process.env.VUE_APP_BASE_URL,
    promoProductId: 16,
    firstPagesOfProducts: [1, 2]
  }},
  async mounted(){
    await this.$store.dispatch(Action.GET_ONE_PRODUCT, this.promoProductId)
    this.firstPagesOfProducts.forEach(page => this.$store.dispatch(Action.GET_PRODUCTS_BY_PAGE, page))
    
  },
  computed: {
    promoProduct(){
      return this.$store.state.products[this.promoProductId]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
.hero{
  background-image: url('../assets/images/patrick-tomasso-unsplash.jpg'), linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3));
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: overlay;
  width: 100%;
  display: flex;
  justify-content: center;
  span{
    margin-top: 3rem;
  }
  h1, h3, button{
    color: $white;
    margin-bottom: 1rem;
  }
  h1{
    font-family: $promo-font;
    font-size: 3rem;
  }
  h3{
    font-size: 2rem;
  }
  button{
    background-color: transparent;
    padding: .5rem 2rem;
    border: 1px solid $white;
    border-radius: 10px;
    font-size: 1.5rem;
    transition: background-color .5s;
    transition: color .5s;
    margin-top: 1rem;
    &:hover{
      background-color: $black;
      color: $orange;
      border: none;
    }
  }
  figure{
    max-width: 30rem;
    max-height: 35rem;
    img{
      max-width: 100%;
      max-height: 100%;
      transform: rotate(30deg);
    }
  }
}
</style>