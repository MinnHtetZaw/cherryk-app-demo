<template>
  <button  v-if="color === 'primary'" :type="type" :class="'btn btn-'+color+' rounded '+size">{{name}}</button>
  <button  v-else-if="color === 'warning'" :type="type" :class="'btn btn-'+color+' rounded '+size">{{name}}</button>
  <button  v-else-if="color === 'danger'" :type="type" :class="'btn btn-'+color+' rounded '+ size">{{name}}</button>
</template>

<script>
export default {
  name: "Button",
  props: ['type','name','color','path','size'],

}
</script>

<style scoped>
.btn-primary{
  background-color: #696cff;
  border: #696cff;
  box-shadow: 0 0.125rem 0.25rem 0 rgb(105 108 255 / 50%);
}
.btn-primary:hover {
  color: #fff;
  background-color: #5f61e6;
  border-color: #5f61e6;
  transform: translateY(-1.5px);
}
.btn-warning{
  color: #ffffff;
  background-color: #ffab00;
  border: #ffab00;
  box-shadow: 0 0.125rem 0.25rem 0 rgb(255 171 0 / 50%);
}
.btn-warning:hover{
  transform: translateY(-1.5px);

}
.btn-danger{
  background-color: #ff3e1d;
  border: #ff3e1d;
  box-shadow: 0 0.125rem 0.25rem 0 rgb(255 62 29 / 50%)
}
.btn-danger:hover{
  transform: translateY(-1.5px);

}
</style>