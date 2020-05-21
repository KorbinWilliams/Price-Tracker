<template>
  <div class="myProducts container-fluid">
    <navBar />
    <!-- TODO Eventually combine product list and active product to take same space v-if -->
    <div class="row">
      <div class="col-5 offset-1">
        <productList class="product-box" />
      </div>
      <div class="col-5">
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