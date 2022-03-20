<template>
  <section>
    <ProductCard :productId="productId" singleProduct/>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue"
export default {
  components: {ProductCard},
  computed: {
    productId(){
      return this.$route.params.id
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