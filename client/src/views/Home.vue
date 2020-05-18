<template>
  <div class="home container">
    <div class="row">nav bar</div>
    <div class="row">products that hit wanted price</div>
  </div>
</template>

<script>
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
  }
};
</script>

<style>
</style>