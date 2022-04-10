<template>
  <div v-if="login" class="fade-overlay"></div>
</template>

<script>
export default {
  computed: {
    login(){
      return this.$store.state.loginModal
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-overlay{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000000;
    opacity: .3;
  }
</style>