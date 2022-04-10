<template>
<main>
  <button>Log out</button>
  <h1>Hello {{user.name}}</h1>
  <section class="my-account">
    <article class="contact-info">
      <h2>Contact Info</h2>
      <p>Namn: {{user.name}}</p>
      <p>Email: {{user.email}}</p>
      <h2>Adress</h2>
      <p>Stad: {{user.address.city}}</p>
      <p>Gata: {{user.address.street}}</p>
      <p>Postkod: {{user.address.zip}}</p>
    </article>
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
export default {
  components: {OrderComponent},
  beforeMount(){
    this.$store.dispatch(Action.GET_ORDER_HISTORY)
  },
  computed: {
    user(){
      return this.$store.state.user
    }, 
    orders(){
      return this.$store.state.orders
    }, 
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/fonts-colors.scss";
main{
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 5rem;
  .my-account{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .order-history{
      h2{
        margin-bottom: 1rem;
      }
    }
  }
}
</style>