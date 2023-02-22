<template>
  <div class="mb-3">
    <textarea :name="name" :id="id" :rows="rows" class="form-control form-control-sm" :value="value"></textarea>
    <span class="text-danger" style="font-size: 8px;" v-if="error_message">{{error_message[0]}}</span>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
    value: {
      type: String,
    },
    rows: {
      type: Number,
      default: 1,
    },
    error_message: {
      type: String,
    },
    label: {
      type: String,
    }
  },
}
</script>

<style scoped>

</style>