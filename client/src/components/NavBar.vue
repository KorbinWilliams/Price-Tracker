<template>
  <div class="navBar">
    <div class="row">
      <div class="col-2 offset-3">
        <router-link to="/home">Home</router-link>
      </div>
      <div class="col-2">
        <router-link to="/">My Products</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "navBar"
};
</script>

<style>
</style>