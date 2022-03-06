<template>
  <article class="product-card">
		<figure>
			<img :src="`${BASE_URL}/images/${product.imgFile}`">
		</figure>
		<div class="card-info">
			<h3>product</h3>
			<h4>{{product.title}}</h4>
			<p>{{product.longDesc}}</p>
			<span>
				<p>{{product.price}} :-</p>
				<button>Add to cart</button>
			</span>

		</div>
  </article>
</template>

<script>
export default {
	props: {
		product: Object
	},
	data(){return{
		BASE_URL: process.env.VUE_APP_BASE_URL,
	}}
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
.card-info{
	padding: 1rem;
	height: 13rem;
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
			padding: 0 1rem;
			height: 2.2rem;
			transition: background-color .3s;
			transition: color .3s;
			&:hover{
				background-color: $white;
				color: $black;
			}
		}
	}
}
</style>