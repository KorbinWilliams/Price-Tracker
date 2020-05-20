<template>
  <div class="home container-fluid">
    <navBar />
    <productDisplay />
    <searchProducts />
  </div>
</template>

<script>
import navBar from "../components/NavBar";
import productDisplay from "../components/ProductDisplay";
import searchProducts from "../components/SearchProducts";
import router from "@/router/index.js";

export default {
  name: "home",
  // mounted() {
  //   // https://www.amazon.com/s?k=car&ref=nb_sb_noss_2
  //   this.$store.dispatch("create", {
  //     commit: "setItem",
  //     address: "scraper",
  //     commitAddress: "searchResults",
  //     data: {
  //       url: "https://www.amazon.com/s?k=dog+treat&ref=nb_sb_noss_2"
  //     }
  //   });
  // },
  data() {
    return {};
  },
  methods: {},
  computed: {
    searchResults() {
      return this.$store.state.searchResults;
    }
  },
  components: {
    navBar,
    productDisplay,
    searchProducts
  }
};
</script>

<style>
</style>