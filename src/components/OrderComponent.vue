<template>
  <article class="order">
    <div class="left">
      <h5>Beställd: {{order.createdAt.split("T").join(" ").slice(0, -5)}}</h5>
      <div class="address">
        <h6>Leveras till:</h6>
        <p><strong>Stad:</strong> {{order.shippingCity}}</p>
        <p><strong>Adress:</strong> {{order.shippingStreet}}</p>
        <p><strong>Zip:</strong> {{order.shippingZip}}</p>
      </div>
      <p><strong>Status:</strong> {{order.status}}</p>
    </div>
    <div class="middle">
      <article v-for="item in order.items" :key="item.ProductId">
        <span>
          <p>{{products[item.ProductId].title}}</p>
          <p>{{products[item.ProductId].shortDesc}}</p>
          <p>{{products[item.ProductId].category}}</p>
        </span>
        <span>
          <p>{{item.amount}} st</p>
          <p>{{item.price}} kr</p>
        </span>
      </article>
    </div>
    <div class="right">
      <Icon icon="dashicons:arrow-down-alt2" />
    </div>
  </article>
</template>

<script>
import {Icon} from '@iconify/vue2'
import Action from "@/store/Action.types"
export default {
  components: {Icon},
  props: {
    order: Object
  }, 
  async mounted(){
    await this.order.items.forEach(item => this.$store.dispatch(Action.GET_ONE_PRODUCT, item.ProductId))
  },
  computed: {
    products(){
      return this.$store.state.products
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
.order{
  margin-bottom: 1rem;
  border: 1px solid $black;
  padding: 1rem;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 40% 50% 10%;
  height: 4rem;
  overflow: hidden;
  h6{
    display: none;
  }
  p{
    font-size: 12px;
    margin: 0 0 2px 0;
    display: none;
  }
  .right{
    article{
      margin-bottom: 1rem;
      display: flex;
      span{
        
      }
    }
  }
}
</style>