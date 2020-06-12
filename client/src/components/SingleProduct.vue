<template>
  <div class="singleProduct row">
    <div class="col-12">
      <div class="row">
        <div class="col-12 title" @click="changeListView">
          <h4>{{activeProduct.title}}</h4>
        </div>
      </div>
      <div class="row product-image-row" @click="changeListView">
        <div class="col-12">
          <img :src="activeProduct.image" class="single-product-image" alt="Product Image" />
        </div>
      </div>
      <div class="row price-labels">
        <div class="col-4">
          <h4>original price</h4>
        </div>
        <div class="col-4">
          <h4>desired price</h4>
        </div>
        <div class="col-4">
          <h4>current price</h4>
        </div>
      </div>
      <div class="row product-price-row">
        <div class="col-4">
          <h3 class="product-price-text">${{activeProduct.originalPrice.$numberDecimal}}</h3>
        </div>
        <div class="col-4">
          <h3 class="product-price-text">${{activeProduct.desiredPrice.$numberDecimal}}</h3>
        </div>
        <div class="col-4">
          <h3 class="product-price-text">${{activeProduct.currentPrice.$numberDecimal}}</h3>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 col-md-5">
                <p>Set desired price</p>
              </div>
            </div>
          </div>
          <div class="col-5 col-md-3 offset-1">
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
          <div class="col-5">
            <button class="btn" @click="changeDesiredPrice">submit</button>
          </div>
          <div class="col-12">
            <button @click="removeProduct" class="btn btn-danger">remove item</button>
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
    },
    removeProduct() {
      let product = this.$store.state.activeProduct;
      this.$store.dispatch("delete", {
        data: product,
        address: "myProducts",
        commit: "removeItem",
        commitAddress: "myProducts"
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
  height: 20rem;
  width: 17rem;
  border: 2px solid black;
}
/* .product-price-row {
  
} */
.product-price-text {
  font-weight: bolder;
}
.product-image-row {
  padding-top: 5vh;
}
.price-labels {
  padding-top: 5vh;
}
</style>