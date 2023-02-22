<template>
  <div class="w-25">
    <div class="input-group">
      <input @keyup="search" v-model="keyword" type="text" class="form-control form-control-sm rounded-pill" :placeholder="placeholder">
<!--      <button  class="btn btn-outline-primary">-->
<!--        <i class="fa-solid fa-search"></i>-->
<!--      </button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: null,
    }
  },
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
  },
  methods: {
    search() {
      this.$emit('search',this.keyword)
    }
  },
}
</script>

<style scoped>

</style>