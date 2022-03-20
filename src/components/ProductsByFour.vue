<template>
  <section class="products-by-four">
    <ProductCard v-for="product in products" :key="product.id"
      :productID="product.id"
    />
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue"
export default {
  props: {
    products: Array
  },
  components: {ProductCard}
}
</script>

<style lang="scss" scoped>
.products-by-four{
  width: 80%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}
</style>