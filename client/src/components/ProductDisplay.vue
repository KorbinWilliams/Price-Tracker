<template>
  <div class="row">
    <div class="col-8 offset-2" id="productBox">
      <h1>Amazon price tracker</h1>
    </div>
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
  border: 2px solid black;
}
</style>