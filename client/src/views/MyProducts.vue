<template>
  <div class="myProducts container-fluid">
    <navBar />
    <!-- TODO Eventually combine product list and active product to take same space v-if -->
    <div class="row">
      <div v-if="this.$store.state.listView == true" class="col-10 offset-1">
        <productList class="product-box" />
      </div>
      <div v-if="this.$store.state.listView == false" class="col-10 offset-1">
        <singleProduct class="product-box" />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/NavBar";
import productList from "../components/ProductList";
import singleProduct from "../components/SingleProduct";
import router from "@/router/index.js";

export default {
  name: "myProducts",
  mounted() {
    this.getMyProducts();
    setTimeout(this.checkCurrentPrices(), 1500);
  },
  data() {
    return {};
  },
  methods: {
    getMyProducts() {
      this.$store.dispatch("get", {
        address: "myProducts",
        commit: "setItem",
        commitAddress: "myProducts"
      });
    },
    checkCurrentPrices() {
      this.$store.dispatch("create", {
        address: "priceChecker",
        commit: "setItem",
        data: this.$store.state.myProducts,
        commitAddress: "myProducts",
        priceTrack: true
      });
    }
  },
  components: {
    productList,
    navBar,
    singleProduct
  }
};
</script>

<style>
.product-box {
  border: 2px solid black;
  margin-top: 5vh;
  background-color: darkcyan;
  height: 70vh;
}
.myProducts {
  background-color: white;
  height: 100vh;
}
</style>
