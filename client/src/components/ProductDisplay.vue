<template>
  <div class="row">
    <div class="col-8 offset-2" id="productBox">product display</div>
  </div>
</template>

<script>
export default {
  name: "productDisplay"
};
</script>

<style>
#productBox {
  margin-top: 5vh;
  height: 20vh;
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>