<template>
  <article v-if="product" class="product-card"
    @click="$router.push(`/product/${product.id}`)"
    :class="{singleProduct, inCart}"
  >
		<figure>
			<img :src="`${BASE_URL}/images/${product.imgFile}`">
		</figure>
		<div class="card-info">
			<i class="delete-icon" 
				v-if="inCart"
				@click.stop="removeItemFromCart(productId)"
				>
					<img :src="trashIcon">
			</i>
			<h3 v-if="!singleProduct">product</h3>
			<h4 v-if="!singleProduct">{{product.title}}</h4>
			<h1 v-else>{{product.title}}</h1>
			<p>{{product.shortDesc}}</p>
			<p v-if="singleProduct || inCart">{{product.longDesc}}</p>
			<span>
				<span class="in-cart-controller" v-if="inCart">
					<button @click.stop="decrease(productId)">-</button>
					<p>{{amount}}</p>
					<button @click.stop="addToCart(product)">+</button>
				</span>
				<p v-if="inCart">{{totalPriceForProduct}} :-</p>
				<p v-else>{{product.price}} :-</p>
				<button 
					@click.stop="addToCart(product)"
					v-if="!inCart"
				>
					Add to cart
				</button>
			</span>
		</div>
  </article>
</template>

<script>
import Action from "@/store/Action.types.js"
export default {
	props: {
		productId: Number,
    singleProduct: Boolean,
		inCart: Boolean
	},
  methods: {
    addToCart(product){
      this.$store.dispatch(Action.ADD_TO_CART, product)
    }, 
		decrease(id){
			this.$store.dispatch(Action.DECREASE_ITEM_IN_CART, id)
		}, 
		removeItemFromCart(id){
			this.$store.dispatch(Action.REMOVE_FROM_CART, id)
		}
  },
	data(){return{
		BASE_URL: process.env.VUE_APP_BASE_URL,
		trashIcon: require('@/assets/images/trash-can-solid.svg')
	}},
	computed: {
		product(){
			return this.$store.state.products[this.productId]
		}, 
		amount(){
			return this.$store.state.cart.find(product => this.productId == product.id).amount
		}, 
		totalPriceForProduct(){
			return this.amount * this.product.price
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
.inCart.product-card{
	display: flex;
	width: 25rem;
	height: 10rem;
	.card-info{
		height: 100%;
		font-size: 70%;
		justify-content: center;
		position: relative;
		.delete-icon{
			width: .8rem;
			position: absolute;
			top: .6rem;
			right: .8rem;
			&:hover{
				cursor: pointer;
			}
		}
	}
	figure{
		width: 70%;
		height: 100%
	}
	.in-cart-controller{
		button{
			margin: 0 .4rem;
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			padding: 0rem;
		}
	}
}
.singleProduct.product-card{
  width: 50rem;
  height: 25rem;
  box-shadow: none;
  display: flex;
  margin: 5rem auto;
  figure{
    height: 100%;
    width: 50%;
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
			&:active{
				transform: scale(1.05);
			}
		}
	}
}
</style>