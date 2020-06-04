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
            <button class="btn" @click="searchForProducts">search</button>
          </div>
        </div>
        <div class="col-4">
          <!-- make 3 buttons with ebay amazon and bestbuy symbols -->
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div
            class="row searchResult"
            v-for="(searchResult, index) in searchResults1"
            :key="index"
          >
            <div class="col">
              <div class="row"></div>
              <div class="row">
                <div class="col-4">
                  <img class="searchImage" :src="searchResult.image" alt />
                </div>
                <div class="col-8">{{searchResult.title.slice(0, 50)}}...</div>
              </div>
              <div class="row">
                <div class="col-9">{{searchResult.price}}</div>
                <div class="col-3">
                  <button class="btn btn-success" @click="addProduct(searchResult)">track product</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row pageBtn">
            <div class="col">
              <button @click="nextSearchResults(1)">1</button>
              <button @click="nextSearchResults(2)">2</button>
              <button @click="nextSearchResults(3)">3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO Fix pagination may need to add more results to equal 12
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
      // NOTE Replaces spaces in searchQuery with +'s
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
    // NOTE Takes in a query converts it to an amazon search and returns the top 10 results
    searchForProducts() {
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
    // NOTE Takes in a search result converts it to myProduct format and saves it
    addProduct(product) {
      console.log(product);
      product.url =
        "https://www.amazon.com/s?k=" +
        this.modifyQuery() +
        "&ref=nb_sb_noss_2";
      product.originalPrice = parseFloat(product.price);
      product.currentPrice = parseFloat(product.price);

      this.$store.dispatch("create", {
        commit: "addItem",
        address: "myProducts",
        commitAddress: "MyProducts",
        data: product
      });
    },
    nextSearchResults(num) {
      if (num == 1) {
        this.page = 1;
      } else if (num == 2) {
        this.page = 2;
      } else if (num == 3) {
        this.page = 3;
      }
    }
  },
  computed: {
    searchResults1() {
      if (this.page == 1) {
        return this.$store.state.searchResults.slice(0, 4);
      } else if (this.page == 2) {
        return this.$store.state.searchResults.slice(4, 8);
      } else {
        return this.$store.state.searchResults.slice(
          8,
          this.$store.state.searchResults.length
        );
      }
    }
  }
};
</script>

<style>
#searchBox {
  background-color: rgb(248, 234, 34);
  margin-top: 5vh;
  height: 60vh;
  border: 2px solid black;
}
.searchBar {
  border-bottom: 2px solid black;
}
.searchResult {
  border-top: 2px solid black;
}
.searchImage {
  height: 100px;
  width: 100px;
}
</style>