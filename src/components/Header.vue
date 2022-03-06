<template>
  <header>
    <div class="top">
      <figure @click="$router.push('/')">
        <img :src="logo" alt="">
      </figure>
      <div class="search-bar">
        <input type="search" placeholder="Sök efter...">
        <i><img :src="searchIcon"></i>
      </div>
      <span><img :src="logInIcon"></span>
      <span><img :src="shoppingCartIcon"></span>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link :to="{name: 'Products', params:{category: 'Skateboards'}}">Skatebording</router-link>
      <router-link :to="{name: 'Products', params:{category: 'Apparels'}}">Kläder</router-link>
      <router-link :to="{name: 'Products', params:{category: 'Accessories'}}">Tillbehör</router-link>
      <router-link :to="{name: 'Products', params:{category: 'Special-Edition'}}">Special Edition</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  data(){return{
    logo: require('@/assets/images/sinus-header-logo.png'),
    searchIcon: require('@/assets/images/Icon_search.svg'),
    logInIcon: require('@/assets/images/login-icon.svg'),
    shoppingCartIcon: require('@/assets/images/shopping-cart-icon.svg')
}}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
header{
  width: 100%;
  display: flex;
  flex-direction: column;
  .top{
    justify-content: center;
    align-items: center;
    display: flex;
    figure{
      margin: .2rem .5rem;
      width: 8rem;
      &:hover{
        cursor: pointer;
      }
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .search-bar{
      display: flex;
      align-items: center;
      border: 1px solid $orange;
      padding: 0 .5rem 0 0;
      border-radius: 30px;
      input{
        padding: .8rem 7rem .8rem 1rem;
        border: none;
        border-radius: 30px;
        &:focus{
          outline: none;
        }
      }
    }
    span{
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $black;
      border-radius: 4px;
      margin-left: .5rem;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  nav{
    background-color: $black;
    display: flex;
    justify-content: center;
    padding: .5rem 4rem;
    a{
      color: $white;
      padding: 0 2rem;
      border-right: 1px solid $orange;
    }
    a:last-child{
      border-right: none;
    }
  }
}
</style>