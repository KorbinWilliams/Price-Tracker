<template>
  <div class="myProducts container-fluid">
    <navBar />
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
</style>