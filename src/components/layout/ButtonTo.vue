<template>
  <router-link v-if="color === 'primary'" :type="type" :class="'btn btn-'+color+' rounded text-white'" :to="path">{{ name }}</router-link>
</template>

<script>
export default {
  name: "ButtonTo",
  props: ['type','name','class','color','path'],

}
</script>

<style scoped>

</style>