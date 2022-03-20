<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {Header, Footer}
}
</script>

<style lang="scss">
@import "./src/assets/styles/fonts-colors.scss";
*, *:before, *:after{
  box-sizing: inherit;
}
html, body, h1, h2, h3, h4, h5, ul, a{
  margin: 0;
  padding: 0;
}
html{
  box-sizing: border-box;
}
body{
  line-height: 1;
  background-color: #F9F9F9;
}
ul{
  list-style: none;
}
a, button{
  text-decoration: inherit;
  &:hover{
    cursor: pointer;
  }
}
h1, h2, h3, h4, h5, p, a{
  font-family: $my-font;
}
#app{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
