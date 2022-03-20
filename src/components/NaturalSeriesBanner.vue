<template>
  <section v-if="naturalSeries[0]" class="natural-series" >
    <div class="overlay">
      <h2>Natural-series</h2>
      <h3>Wooden patterns</h3>
      <button>Learn more</button>
    </div>
    <div class="board-images">
      <figure v-for="board in naturalSeries" :key="board.id">
        <img :src="`${BASE_URL}/images/${board.imgFile}`">
      </figure>
    </div>
  </section>    
</template>

<script>
export default {
  props: {
    naturalSeries: Array
  },
  data(){return {
    BASE_URL: process.env.VUE_APP_BASE_URL,
  }},
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
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
</style>