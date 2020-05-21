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
            <button>search</button>
          </div>
        </div>
        <div class="col-4">
          <!-- make 3 buttons with ebay amazon and bestbuy symbols -->
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="row" v-for="searchResult in searchResults" :key="searchResult.id">
            <div class="col-3">{{searchResult.image}}</div>
            <div class="col-3">{{searchResult.title}}</div>
            <div class="col-3">{{searchResult.price}}</div>
            <div class="col-3">
              <button @click="addProduct(searchResult)">track product</button>
            </div>
          </div>
        </div>
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
  },
  methods: {
    searchForProducts() {
      // TODO Make this more flexible later
      this.$store.dispatch("create", {
        commit: "setItem",
        address: "scraper",
        commitAddress: "searchResults",
        data: {
          url: "https://www.amazon.com/s?k=dog+treat&ref=nb_sb_noss_2"
        }
      });
    },
    addProduct(product) {
      this.$store.dispatch("create", {
        commit: "addItem",
        address: "myProducts",
        commitAddress: "MyProducts",
        data: product
      });
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults;
    }
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