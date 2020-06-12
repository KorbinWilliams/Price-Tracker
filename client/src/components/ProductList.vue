<template>
  <div class="productList row">
    <div class="col-12">
      <div class="row title">
        <div class="col-12 col-md-8">
          <h3 v-show="info == false">My products</h3>
          <h3 v-show="info == true">About</h3>
        </div>
        <div class="col-6 col-md-2">
          <button class="btn btn-info" @click="checkCurrentPrices">check prices</button>
        </div>
        <div class="col-6 col-md-2">
          <button @click="viewInfo" class="btn btn-info">Info</button>
        </div>
      </div>
      <div class="row">
        <div v-show="info == false" class="col-12">
          <div class="row product-row" v-for="(myProduct, index) in myProducts" :key="myProduct.id">
            <div class="col-12 col-md-6">
              <img
                @click="selectProduct(myProduct)"
                class="product-image"
                :src="myProduct.image"
                alt="product image"
              />
            </div>
            <div class="col-12 col-md-6" @click="selectProduct(myProduct)">
              <h3 class="productTitle">{{myProduct.title.slice(0, 50)}}...</h3>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-4">
                  <p>original price</p>
                </div>
                <div class="col-4">
                  <p>desired price</p>
                </div>
                <div class="col-4">
                  <p>current price</p>
                </div>
              </div>
              <div class="row">
                <div class="col-4">${{myProduct.originalPrice.$numberDecimal}}</div>
                <div class="col-4">${{myProduct.desiredPrice.$numberDecimal}}</div>
                <div
                  :id="index"
                  :class="myProduct.colorCode"
                >${{myProduct.currentPrice.$numberDecimal}}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="info == true" class="col-12">
          <about />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO Experiment with pagination based on number of products in myProducts
import about from "./About";

export default {
  name: "productList",
  mounted() {},
  data() {
    return {
      desiredPrice: 0,
      info: false
    };
  },
  watch: {},
  methods: {
    selectProduct(Product) {
      this.$store.dispatch("setActive", {
        data: Product,
        commit: "setItem",
        commitAddress: "activeProduct"
      });
      this.$store.dispatch("setActive", {
        data: false,
        commit: "setItem",
        commitAddress: "listView"
      });
    },
    viewInfo() {
      if (this.info == false) {
        this.info = true;
      } else {
        this.info = false;
      }
    },
    checkCurrentPrices() {
      this.$store.dispatch("create", {
        address: "priceChecker",
        commit: "setItem",
        data: this.$store.state.myProducts,
        commitAddress: "myProducts",
        priceTrack: true
      });
    }

    // NOTE Original idea for price tracker ---
    // priceChecker() {
    //   const myProducts = this.$store.state.myProducts;
    //   for (let i = 0; i < myProducts.length; i++) {
    //     let product = myProducts[i];
    //     let curElem = document.getElementById(`${i}`);
    //     if (product.currentPrice < product.desiredPrice) {
    //       curElem.className = "col-4 grnTxt";
    //     } else if (product.currentPrice > product.desiredPrice) {
    //       curElem.className = "col-4 redTxt";
    //     } else {
    //       curElem.className = "col-4 blueTxt";
    //     }
    //   }
    // }
  },
  computed: {
    myProducts() {
      return this.$store.state.myProducts;
    }
  },
  components: {
    about
  }
};
</script>

<style>
.title {
  color: black;
  padding-top: 1vh;
  display: flex;
  justify-content: center;
}
.product-image {
  border: 2px solid black;
  height: 150px;
  width: 150px;
}
.product-row {
  border-top: 2px solid black;
  padding-top: 1vh;
}
.productTitle {
  color: blue;
  text-decoration: underline;
}
.red {
  color: rgb(218, 14, 14);
  text-shadow: 1px 1px black;
}
.green {
  color: green;
  text-shadow: 1px 1px black;
}
.blue {
  color: blue;
  text-shadow: 1px 1px black;
}
</style>