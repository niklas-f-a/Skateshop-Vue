<template>
  <footer>
      <figure>
        <img :src="logoPortrait">
      </figure>
      <div class="about-us">
        <h5>Om oss</h5>
        <ul>
          <li>Om oss</li>
          <li>Jobba med oss</li>
          <li>Hållbarhet</li>
          <li>Våra butiker</li>
        </ul>
      </div>
      <div class="customer-service">
        <h5>Kundtjänst</h5>
        <ul>
          <li>FAQ</li>
          <li>Kontakt</li>
        </ul>
      </div>
      <div class="my-pages">
        <h5>Mina sidor</h5>
        <ul>
          <li>Mina beställningar</li>
          <li>Mina betalningar</li>
          <li>Mina erbjudanden</li>
          <li>Min Profil</li>
        </ul>
      </div>
  </footer>
</template>

<script>
export default {
  data(){return{
    logoPortrait: require('@/assets/images/sinus-logo-portrait.png')
  }}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
footer{
  background-color: $black;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-content: space-around;
  padding: 2rem 5rem;
  h5{
    color: $orange;
    font-size: 16px;
  }
  figure{
    width: 7rem;
    height: 7rem;
    margin: 0;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  li{
    margin-top: .8rem;
    color: $white;
    font-size: 14px;
  }
}
</style>