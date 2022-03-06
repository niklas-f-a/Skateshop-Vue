<template>
  <section class="inspirational-section">
		<img class="skyhigh" src="../assets/images/skyhigh.jpg">
		<img class="skatie" src="../assets/images/skatie.jpg">
		<img class="yella" src="../assets/images/yella.jpg">
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.inspirational-section{
	display: grid;
	grid-template-areas: "skyhigh yella"
												"skatie yella";
	.skyhigh{
		grid-area: skyhigh;
	}
	.skatie{
		grid-area: skatie;
	}
	.yella{
		grid-area: yella;
	}
	img{
		margin: .1rem;
	}
	margin: 6rem 0 8rem 0;
}
</style>