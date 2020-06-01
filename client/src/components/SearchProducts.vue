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
            <button @click="searchForProducts">search</button>
          </div>
        </div>
        <div class="col-4">
          <!-- make 3 buttons with ebay amazon and bestbuy symbols -->
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="row" v-for="(searchResult, index) in searchResults1" :key="index">
            <div class="col">
              <div class="row">
                <div class="col-12">{{searchResult.image}}</div>
              </div>
              <div class="row">
                <div class="col-12">{{searchResult.title.slice(0, 50)}}...</div>
              </div>
              <div class="row">
                <div class="col-9">{{searchResult.price}}</div>
                <div class="col-3">
                  <button @click="addProduct(searchResult)">track product</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row pageBtn">
            <div v-if="page == 1" class="col">
              <button @click="nextSearchResults">Next page</button>
            </div>
            <div v-if="page == 2" class="col">
              <button @click="nextSearchResults">Previous page</button>
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
      searchQuery: "dog toys",
      page: 1
    };
  },
  methods: {
    modifyQuery() {
      let query = this.searchQuery.split(" ");
      let newQuery = "";
      for (let i = 0; i < query.length; i++) {
        let item = query[i];
        item += "+";
        newQuery += item;
      }
      let queryLength = newQuery.length - 1;
      newQuery = newQuery.slice(0, queryLength);
      return newQuery;
    },
    searchForProducts() {
      // TODO Make this more flexible later
      this.$store.dispatch("create", {
        commit: "setItem",
        address: "scraper",
        commitAddress: "searchResults",
        data: {
          url:
            "https://www.amazon.com/s?k=" +
            this.modifyQuery() +
            "&ref=nb_sb_noss_2"
        }
      });
    },
    addProduct(product) {
      console.log(product);
      product.url =
        "https://www.amazon.com/s?k=" +
        this.modifyQuery() +
        "&ref=nb_sb_noss_2";
      product.price = parseFloat(product.price);

      this.$store.dispatch("create", {
        commit: "addItem",
        address: "myProducts",
        commitAddress: "MyProducts",
        data: product
      });
    },
    nextSearchResults() {
      if (this.page == 1) {
        this.page = 2;
      } else {
        this.page = 1;
      }
    }
  },
  computed: {
    searchResults1() {
      if (this.page == 1) {
        return this.$store.state.searchResults.slice(0, 5);
      } else {
        return this.$store.state.searchResults.slice(5, 10);
      }
    }
  }
};
</script>

<style>
#searchBox {
  background-color: chartreuse;
  margin-top: 5vh;
  height: 60vh;
  border: 2px solid black;
}
.searchBar {
  border-bottom: 2px solid black;
}
.pageBtn {
  padding-top: 5rem;
}
</style>