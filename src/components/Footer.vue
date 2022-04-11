<template>
  <footer>
      <figure>
        <img :src="logoPortrait">
      </figure>
      <div class="about-us">
        <h5>About us</h5>
        <ul>
          <li>about us</li>
          <li>work with us</li>
          <li>Sustainability</li>
          <li>Shops</li>
        </ul>
      </div>
      <div class="customer-service">
        <h5>Customer service</h5>
        <ul>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>
      <div class="my-pages">
        <h5>My pages</h5>
        <ul>
          <li>Orders</li>
          <li>Payments</li>
          <li>Offers</li>
          <li>Profile</li>
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
  margin-top: 4rem;
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