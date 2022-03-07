<template>
  <article class="product-card"
    @click="$router.push(`/product/${product.id}`)"
    :class="{singleProduct}"
  >
		<figure>
			<img :src="`${BASE_URL}/images/${product.imgFile}`">
		</figure>
		<div class="card-info">
			<h3 v-if="!singleProduct">product</h3>
			<h4 v-if="!singleProduct">{{product.title}}</h4>
			<h1 v-else>{{product.title}}</h1>
			<p>{{product.shortDesc}}</p>
			<p v-if="singleProduct">{{product.longDesc}}</p>
			<span>
				<p>{{product.price}} :-</p>
				<button @click.stop="addToCart(product)">Add to cart</button>
			</span>
		</div>
  </article>
</template>

<script>
import Action from "@/store/Action.types.js"
export default {
	props: {
		product: Object,
    singleProduct: Boolean
	},
  methods: {
    addToCart(product){
      this.$store.dispatch(Action.ADD_TO_CART, product)
    }
  },
	data(){return{
		BASE_URL: process.env.VUE_APP_BASE_URL,
	}}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
.singleProduct.product-card{
  width: 50rem;
  height: 25rem;
  box-shadow: none;
  display: flex;
  margin: 5rem auto;
  figure{
    height: 100%;
    width: 50%;
    padding: 5rem;
  }
  .card-info{
    height: 100%;
    width: 40%;
    justify-content: flex-start;
    padding-left: 2rem;
    h1{
      font-family: $promo-font;
      font-size: 5rem;
    }
    p{
      width: 18rem;
    }
    span{
      margin: auto 0 0 0;
      justify-content: space-between;
      button{
        font-size: 1.5rem;
        width: 20rem;
      }
    }
  }
}
.card-info{
	padding: 1rem;
	height: 12rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.product-card{
	width: 15rem;
	box-shadow: $card-shadow;
	margin: .5rem;
	overflow: hidden;
	figure{
		padding: 1rem 0 1rem 0;
		margin: 0;
		width: 100%;
		height: 10rem;
		background-color: $yellow;
		display: flex;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
		img{
			margin: auto;
			max-width: 100%;
			max-height: 100%;
		}
	}
	h4, p{
		color: #7c7272;
	}
	span{
		display: flex;
		justify-content: space-between;
		align-items: center;
		p{
			color: $black;
			font-size: 1.1rem;
			margin: 0;
		}
		button{
			background-color: $black;
			border: 1px solid $black;
			border-radius: 6px;
			color: $white;
			transition: background-color .3s;
			transition: color .3s;
      padding: .5rem 1rem;
			&:hover{
				background-color: $white;
				color: $black;
			}
		}
	}
}
</style>