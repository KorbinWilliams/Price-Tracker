<template>
  <div class="navBar">
    <div class="row" id="navBox">
      <div class="col-2 offset-3">
        <router-link to="/home" class="links">Home</router-link>
      </div>
      <div class="col-2">
        <router-link to="/myProducts" class="links">My Products</router-link>
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
#navBox {
  border: 2px solid black;
  background-color: rgb(185, 185, 185);
}
.links {
  color: blue;
}
</style>