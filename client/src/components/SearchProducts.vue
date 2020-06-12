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
                <div class="col-12 col-md-9">{{searchResult.price}}</div>
                <div class="col-12 col-md-3">
                  <button class="btn btn-success" @click="addProduct(searchResult)">track product</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.$store.state.searchResults.length > 1" class="row pageBtn">
            <div class="col">
              <button @click="nextSearchResults(1)">1</button>
              <button @click="nextSearchResults(2)">2</button>
              <button @click="nextSearchResults(3)">3</button>
              <button @click="nextSearchResults(4)">4</button>
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
    modifyPrice(product) {
      console.log(product);
      let price = product.price;
      if (price.indexOf("$") != -1) {
        product.price = price.substring(1, product.price.length);
      }
      return product;
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
      if (this.$store.state.myProducts.length < 3) {
        product.url =
          "https://www.amazon.com/s?k=" +
          this.modifyQuery() +
          "&ref=nb_sb_noss_2";
        //NOTE Somethings going wrong here. Need to remove $ from price
        this.modifyPrice(product);
        product.originalPrice = parseFloat(product.price);
        product.currentPrice = parseFloat(product.price);
        product.colorCode = "col-4 blue";

        this.$store.dispatch("create", {
          commit: "addItem",
          address: "myProducts",
          commitAddress: "MyProducts",
          data: product
        });
      }
    },
    nextSearchResults(num) {
      this.page = num;
    }
  },
  computed: {
    searchResults1() {
      if (this.page == 1) {
        return this.$store.state.searchResults.slice(0, 3);
      } else if (this.page == 2) {
        return this.$store.state.searchResults.slice(3, 6);
      } else if (this.page == 3) {
        return this.$store.state.searchResults.slice(6, 9);
      } else {
        return this.$store.state.searchResults.slice(
          9,
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
  height: 100%;
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