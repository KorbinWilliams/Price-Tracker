<template>
  <div class="navBar">
    <div class="row" id="navBox">
      <div class="col-6">
        <router-link to="/home" class="links">
          <button class="btn btn-info">Home</button>
        </router-link>
      </div>
      <div class="col-6">
        <router-link to="/myProducts" class="links">
          <button class="btn btn-info">My Products</button>
        </router-link>
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
  border-bottom: 2px solid black;
  background-color: rgb(185, 185, 185);
}
.links {
  color: blue;
}
</style>