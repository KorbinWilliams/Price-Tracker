<template>
  <div class="searchProducts row" id="searchBox">
    <div class="col-12">
      <div class="row searchBar">
        <div class="col-4 offset-4">
          <p>search for products</p>
          <div class="form-group">
            <input
              type="text"
              name="search"
              class="form-control"
              placeholder="search products"
              v-model="searchQuery"
            />
          </div>
        </div>
        <div class="col-4">
          <!-- make 3 buttons with ebay amazon and bestbuy symbols -->
        </div>
      </div>
      <div class="row">
        <div class="col">v-for search results product/price and add product</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchProducts",
  data() {
    return {
      searchQuery: "dog toys"
    };
  }
};
</script>

<style>
#searchBox {
  background-color: chartreuse;
  margin-top: 5vh;
  height: 60vh;
}
.searchBar {
  border: 2px solid black;
}
</style>