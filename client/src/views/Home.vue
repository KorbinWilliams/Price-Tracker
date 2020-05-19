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
  mounted() {
    this.$store.dispatch("get", {
      commit: "setItem",
      address: "scraper",
      commitAddress: "searchResults",
      data: "https://www.amazon.com/s?k=dog+treat&ref=nb_sb_noss_2"
    });
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    // function returns
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