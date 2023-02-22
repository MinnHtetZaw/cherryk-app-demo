<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-for="link in links" class="page-item">
        <a class="page-link" @click.prevent="getData(link.url)" :class="{'active':link.active,'disabled': !link.url}" href="#">{{ link.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    links: {
      type: Array,
    },
  },
  methods: {
    getData:function(url) {
      this.$emit('getData',url)
    },
    paginateAction:function (){
      this.links[0].label = "Prev"
      this.links[this.links.length -1].label = "Next"
    }
  },
  mounted() {
    this.paginateAction()
  },
  updated() {
    this.paginateAction()
  }
}
</script>

<style scoped>

</style>