<template>
  <div class="singleProduct row">
    <div class="col-12" @click="changeListView">
      <div class="row">
        <div class="col-12 title">
          <h4>{{activeProduct.title}}</h4>
        </div>
      </div>
      <div class="row product-image-row">
        <div class="col-12">
          <img :src="activeProduct.image" class="single-product-image" alt="Product Image" />
        </div>
      </div>
      <div class="row product-price-row">
        <div class="col-12">
          <h3 class="product-price-text">{{activeProduct.price}}</h3>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-3 offset-3">
            <div class="form-group">
              <input
                type="text"
                name="desiredPriceForm"
                class="form-control"
                placeholder="desired price"
                v-model="desiredPrice"
              />
            </div>
          </div>
          <div class="col-2">
            <button @click="changeDesiredPrice">submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singleProduct",
  data() {
    return {
      desiredPrice: 0
    };
  },
  methods: {
    changeListView() {
      this.$store.dispatch("setActive", {
        data: true,
        commit: "setItem",
        commitAddress: "listView"
      });
    },
    changeDesiredPrice() {
      let product = this.$store.state.activeProduct;
      this.$store.dispatch("edit", {
        data: {
          _id: product._id,
          authorId: product.authorId,
          image: product.image,
          price: product.price,
          title: product.title,
          url: product.url,
          desiredPrice: this.desiredPrice
        },
        address: "myProducts",
        commitAddress: "myProducts",
        commit: "editItem"
      });
    }
  },
  computed: {
    activeProduct() {
      return this.$store.state.activeProduct;
    }
  }
};
</script>

<style>
.single-product-image {
  height: 30vh;
  width: 70vw;
  border: 2px solid black;
}
.product-price-row {
  padding-top: 5vh;
}
.product-price-text {
  font-weight: bolder;
}
.product-image-row {
  padding-top: 5vh;
}
</style>