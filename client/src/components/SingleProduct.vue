<template>
  <div class="singleProduct row">
    <div class="col-12">
      <div class="row">
        <div class="col-12 title">
          <h4>{{activeProduct.title}}</h4>
        </div>
      </div>
      <div class="row product-image-row">
        <div class="col-12">
          <img :src="activeProduct.image" class="single-product-image" alt="Product Image" />
        </div>
      </div>
      <div class="row product-price-row">
        <div class="col-12">
          <h3 class="product-price-text">{{activeProduct.price}}</h3>
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
}
.product-price-text {
  font-weight: bolder;
}
.product-image-row {
  padding-top: 5vh;
}
</style>