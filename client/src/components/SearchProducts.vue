<template>
  <div class="searchProducts row" id="searchBox">
    <div class="col-10 offset-1">
      <div class="row">
        <div class="col-4 offset-4">search box</div>
      </div>
      <div class="row">
        <div class="col">v-for search results product/price and add product</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchProducts"
};
</script>

<style>
#searchBox {
  background-color: chartreuse;
  margin-top: 5vh;
  height: 60vh;
}
</style>