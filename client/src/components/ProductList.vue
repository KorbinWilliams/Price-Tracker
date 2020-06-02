<template>
  <div class="productList row">
    <div class="col-12">
      <div class="row title">
        <div class="col-8-offset-2">
          <h3>My products</h3>
        </div>
      </div>
      <div class="row product-row" v-for="myProduct in myProducts" :key="myProduct.id">
        <div class="col-4">
          <img
            @click="selectProduct(myProduct)"
            class="product-image"
            :src="myProduct.image"
            alt="product image"
          />
        </div>
        <div class="col-4" @click="selectProduct(myProduct)">{{myProduct.title.slice(0, 50)}}...</div>
        <div class="col-2">${{myProduct.price.$numberDecimal}}</div>
        <div class="col-2">${{myProduct.desiredPrice.$numberDecimal}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO Need to make pagination for every 4 products later
// TODO Need to make @mouseoff??
export default {
  name: "productList",
  data() {
    return {
      desiredPrice: 0
    };
  },
  methods: {
    selectProduct(Product) {
      this.$store.dispatch("setActive", {
        data: Product,
        commit: "setItem",
        commitAddress: "activeProduct"
      });
      this.$store.dispatch("setActive", {
        data: false,
        commit: "setItem",
        commitAddress: "listView"
      });
    }
  },
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
.product-image {
  height: 150px;
  width: 150px;
}
.product-row {
  padding-top: 1vh;
}
</style>