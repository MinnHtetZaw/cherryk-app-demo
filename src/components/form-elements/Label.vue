<template>
  <label class="form-label small text-secondary">{{label_name}}</label>
</template>

<script>
export default {
  name: "Label",
  props: {
    label_name: {
      type: String,
    },
  },
}
</script>

<style scoped>

</style>