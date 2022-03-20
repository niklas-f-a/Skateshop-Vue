<template>
  <section class="category-section">
      <h1>{{categoryTitle}}</h1>
			<div class="line"></div>
			<section class="product-cards">
				<ProductCard class="card" v-for="product in categoryProducts" :key="product.id" 
					:productId="product.id"
				/>
			</section>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue"
import Action from "@/store/Action.types.js"
export default {
	components: {ProductCard},
	data(){return{
		categoryTitle: '',
		skateCategory: ['skateboard', 'wheel'],
		apparel: ['hoodie', 'tshirt', 'socks'],
		accessories: ['cap', 'totebag']
	}},
	async beforeRouteUpdate(to, from, next){
		this.categoryTitle = to.params.category
		if(this.categoryTitle == 'Skateboards'){
				this.skateCategory.forEach( category =>  this.$store.dispatch(Action.GET_CATEGORY, category))
				next()
		}
		if(this.categoryTitle == 'Kläder'){
				this.apparel.forEach( category => this.$store.dispatch(Action.GET_CATEGORY, category))
				next()
		}
		if(this.categoryTitle == 'Tillbehör'){
				this.accessories.forEach( category => this.$store.dispatch(Action.GET_CATEGORY, category))
				next()
		}
		if(this.categoryTitle == 'Special-Edition'){
				this.$store.dispatch(Action.GET_SEARCH, 'greta')
				next()
		}
		else next(false)
	},
  mounted(){
		this.categoryTitle = this.$route.params.category
		if(this.categoryTitle == 'Skateboards'){
			this.skateCategory.forEach( category =>  this.$store.dispatch(Action.GET_CATEGORY, category))
		}
		if(this.categoryTitle == 'Kläder'){
			this.apparel.forEach( category => this.$store.dispatch(Action.GET_CATEGORY, category))
		}
		if(this.categoryTitle == 'Tillbehör'){
			this.accessories.forEach( category => this.$store.dispatch(Action.GET_CATEGORY, category))
		}
		if(this.categoryTitle == 'Special-Edition'){
			this.$store.dispatch(Action.GET_SEARCH, 'greta')
		}
	}, 
	computed: {
		categoryProducts(){
			if(this.categoryTitle == 'Skateboards'){
				return this.$store.getters.skateBoardsAndWheels
			}
			if(this.categoryTitle == 'Kläder'){
				return this.$store.getters.apparel
			}
			if(this.categoryTitle == 'Tillbehör'){
				return this.$store.getters.accessories
			}
			if(this.categoryTitle == 'Special-Edition'){
				const product = [...this.$store.getters.specialEdition, ...this.$store.getters.naturalSeries]
				return product
			}
			else return null

		}
		
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
		margin: 3rem 0 3rem 0;
		width: 100%;
		height: 1px;
		background-color: $orange;
	}
	.product-cards{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		.card{
			margin: 2rem;
		}
	}
}
</style>