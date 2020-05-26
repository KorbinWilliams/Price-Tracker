<template>
  <div class="singleProduct row">
    <div class="col-12">
      <div class="row">
        <div class="col-12 title">
          <h4>{{activeProduct.title}}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <img :src="activeProduct.image" class="single-product-image" alt="Product Image" />
        </div>
      </div>
      <div class="row product-price-row">
        <div class="col-12">
          <h4 class="product-price-text">{{activeProduct.price}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singleProduct",
  computed: {
    activeProduct() {
      return this.$store.state.activeProduct;
    }
  }
};
</script>

<style>
.single-product-image {
  height: 30vh;
  width: 70vw;
  border: 2px solid black;
}
.product-price-row {
  padding-top: 5vh;
  text-decoration: blink navy;
}
</style>