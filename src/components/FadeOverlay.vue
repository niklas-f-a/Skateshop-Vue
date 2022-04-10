<template>
  <div v-if="modal" class="fade-overlay"></div>
</template>

<script>
export default {
  computed: {
    modal(){
      return this.$store.state.showModal
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