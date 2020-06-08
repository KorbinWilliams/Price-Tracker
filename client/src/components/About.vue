<template>
  <div class="name">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 about">
            <h4>-My Products displays the products you have added from search results</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12 about">
            <h4>-It will check the current prices of procducts you have added. Be patient as the more products you have added the longer it will take</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12 about">
            <h4>
              -Once it has retrieved the current prices the colors of the prices will most likely change.
              <br />-
              <span class="blue">blue</span>: the current price is equal to the desired price
              <br />-
              <span class="green">green</span>: the current price is better or equal to your set desired price (which by default is zero)
              <br />-
              <span class="red">red</span>: the current price is worse than your set desired price
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12 about">
            <h4>-You can click on a products picture or description to get a better view of a products details. Click on the products picture to return</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>

<style>
.about {
  padding-top: 4vh;
}
</style>