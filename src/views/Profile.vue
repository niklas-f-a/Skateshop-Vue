<template>
<main>
  <h1>Hello {{user.name}}</h1>
  <section class="my-account">
    <UserInfoSection :user="user"/>
    <section class="order-history">
      <h2>Orders</h2>
      <OrderComponent v-for="order in orders" :key="order.id" :order="order" />
    </section>
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
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  padding: 3rem 5rem;
  h1{
    margin: 1rem;
  }
  .my-account{
    max-width: 70%;
    display: grid;
    grid-template-columns: 1fr 20rem;
  }
  .order-history{
      h2{
        margin-bottom: 1rem;
      }
  }
}
</style>