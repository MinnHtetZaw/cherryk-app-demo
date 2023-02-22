<template>
  <div class="">
<!--    <label v-if="label" class="form-label">{{label}}</label>-->
    <select :name="name" :id="id" class="form-select form-select-sm">
      <option>{{ option_title }}</option>
      <slot></slot>
    </select>
    <span class="text-danger" style="font-size: 8px;" v-if="error">{{error[0]}}</span>
  </div>
</template>

<script>
export default {
  name: "Select",
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
    option_title: {
      type: String,
    },
    error: {
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