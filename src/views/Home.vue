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
    <ProductsByFour :products="firstFourProducts"/>
    <section class="natural-series">
      <div class="overlay">
        <h2>Natural-series</h2>
        <h3>Wooden patterns</h3>
        <button>Learn more</button>
      </div>
      <!-- <div class="board-images">
        <figure v-for="board in naturalSeries" :key="board.id">
          <img :src="`${BASE_URL}/images/${board.imgFile}`">
        </figure>
      </div> -->
    </section>    
    <ProductsByFour :products="secondFourProducts"/>
    <InspirationSectionImages />
    <ProductsByFour :products="thirdFourProducts"/>
    <ProductsByFour :products="fourthFourProducts"/>
  </main>
</template>

<script>
import Action from '@/store/Action.types.js'
import ProductsByFour from '@/components/ProductsByFour.vue'
import InspirationSectionImages from '@/components/InspirationSectionImages.vue'

export default {
  components: {ProductsByFour, InspirationSectionImages},
  data(){return{
    BASE_URL: process.env.VUE_APP_BASE_URL,
    firstPagesOfProducts: [1, 2], 
  }},
  async mounted(){
    await this.$store.dispatch(Action.GET_ONE_PRODUCT, this.$store.state.promoProductId)
    this.firstPagesOfProducts.forEach(page => this.$store.dispatch(Action.GET_PRODUCTS_BY_PAGE, page))
    
  },
  computed: {
    promoProduct(){
      return this.$store.getters.promoProduct
    },
    naturalSeries(){
      return this.$store.getters.naturalSeries
    },
    firstFourProducts(){
      return this.$store.state.productList.slice(0, 4)
    }, 
    secondFourProducts(){
      return this.$store.state.productList.slice(4, 8)
    },
    thirdFourProducts(){
      return this.$store.state.productList.slice(8, 12)
    },
    fourthFourProducts(){
      return this.$store.state.productList.slice(12, 16)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
main{
  display: flex;
  flex-direction: column;
  align-items: center;
  .hero{
    background-image: url('../assets/images/patrick-tomasso-unsplash.jpg'), linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3));
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: overlay;
    width: 100vw;
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
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
  .natural-series{
    margin: 3rem 0 5rem 0;
    width: 75%;
    height: 25rem;
    background-image: url("../assets/images/keith-misner-unsplash.jpg");
    background-repeat: none;
    background-size: cover;
    display: flex;
    align-items: center;
    .overlay{
      background-color: rgba(0,0,0,0.4);
      width: 60%;
      height: 100%;
      padding: 2rem;
      h2, h3{
        color: $white;
        margin-bottom: .5rem;
      }
      h2{
        font-size: 3rem;
      }
      button{
        margin-top: 2rem;
        background-color: transparent;
        border: 1px solid $white;
        color: $white;
        padding: .6rem 1.5rem;
        border-radius: 4px;
      }
    }
    .board-images{
      display: flex;
      figure:nth-child(1){
        transform: translateX(4.5rem);
      }
      figure:nth-child(2){
        transform: translateX(2.5rem);
      }
      figure{
        height: 20rem;
        margin: 0;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>