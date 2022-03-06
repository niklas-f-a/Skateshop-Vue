<template>
  <section class="category-section">
      <h1>{{category}}</h1>
			<div class="line"></div>
			<section>
				<ProductCard />
			</section>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue"
export default {
	components: {ProductCard},
	data(){return{
		category: this.$route.params.category
	}},
	mounted(){
		
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
.category-section{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 4rem;
	width: 80%;
	h1{
		align-self: flex-start;
		margin-left: 5rem;
		font-size: 2.5rem;
	}
	.line{
		margin-top: 3rem;
		width: 100%;
		height: 1px;
		background-color: $orange;
	}
}
</style>