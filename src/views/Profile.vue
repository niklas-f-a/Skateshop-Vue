<template>
<main>
  <section class="my-account">
  <h1>Hello {{user.name}}</h1>
    <UserInfoSection :user="user"/>
  </section>
  <section class="order-history">
      <h2>Orders</h2>
      <OrderComponent v-for="order in orders" :key="order.id" :order="order" />
    </section>
</main>
</template>

<script>
import Action from "@/store/Action.types"
import OrderComponent from "@/components/OrderComponent.vue"
import UserInfoSection from "@/components/UserInfoSection.vue"
export default {
  components: {OrderComponent, UserInfoSection},
  beforeMount(){
    this.$store.dispatch(Action.GET_ORDER_HISTORY)
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    orders(){
      return this.$store.state.orders
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
main{
  width: 80%;
  height: 100%;
  padding: 5rem 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  h1{
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>