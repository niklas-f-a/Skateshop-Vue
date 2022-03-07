<template>
  <section>
    <ProductCard :product="product" singleProduct/>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue"
export default {
  components: {ProductCard},
  computed: {
    product(){
      return this.$store.state.products[this.$route.params.id]
    }
  }
}
</script>

<style lang='scss' scoped>
section{
  width: 80%;
  height: 100%;
}
</style>