<template>
  <article class="order" @click="toggleShowOrder" :class="{open: isActive}">
    <div class="left">
      <h5>Beställd: {{order.createdAt.split("T").join(" ").slice(0, -5)}}</h5>
      <div class="address">
        <h5>Leveras till:</h5>
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
    order: Object,
  }, 
  data(){return{
    isActive: false
  }},
  async mounted(){
    await this.order.items.forEach(item => this.$store.dispatch(Action.GET_ONE_PRODUCT, item.ProductId))
  },
  computed: {
    products(){
      return this.$store.state.products
    }
  },
  methods: {
    toggleShowOrder(){
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
.order.open{
  height: auto;
  h6, p{
    display: block;
  }
}
.order{
  min-width: 22rem;
  margin-bottom: 1rem;
  border: 1px solid $black;
  padding: 1rem;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 50% 45% 5%;
  overflow: hidden;
  &:hover{
    cursor: pointer;
  }
  
  p{
    font-size: 12px;
    margin: 0 0 2px 0;
    display: none;
  }
  .middle{
    article{
      margin-bottom: .6rem;
      h5{
      display: none;
      }
    }
  }
  .left{
    h5{
      margin-bottom: .6rem;
    }p{
      margin-bottom: .2rem;
    }
  }
}
</style>