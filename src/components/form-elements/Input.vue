<template>
<!--    <label v-if="label" class="form-label">{{label}}</label>-->
  <div>
    <input :type="type" :id="id" class="form-control form-control-sm" :name="name" :value="value">
    <span class="text-danger" style="font-size: 10px;" v-if="error_message">{{error_message[0]}}</span>
  </div>

</template>

<script>
export default {
  name: "Input",
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
    },
    id: {
      type: String,
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