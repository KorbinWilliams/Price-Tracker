<template>
  <div class="productList row">
    <div class="col-12">
      <div class="row title">
        <div class="col-8-offset-2">
          <h3>My products</h3>
        </div>
      </div>
      <div class="row" v-for="myProduct in myProducts" :key="myProduct.id">
        <div class="col-4">{{myProduct.image}}</div>
        <div class="col-4">{{myProduct.title}}</div>
        <div class="col-4">{{myProduct.price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "productList",
  computed: {
    myProducts() {
      return this.$store.state.myProducts;
    }
  }
};
</script>

<style>
.title {
  color: rgb(25, 25, 173);
  padding-top: 1vh;
  display: flex;
  justify-content: center;
}
</style>