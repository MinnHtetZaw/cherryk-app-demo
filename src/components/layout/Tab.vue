<template>
  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <slot></slot>
  </ul>

</template>

<script>
export default {
  name: "Tab",
}
</script>

<style>
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
  color: #fff;
  background-color: #696cff;
}
.nav-link{
  color: #696cff;
}

</style>