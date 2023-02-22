<template>
  <router-view></router-view>
</template>
<script>
import '../src/assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import axios from "axios";
export default {
  methods: {
    setAuth() {
      if (localStorage.getItem('auth') && localStorage.getItem('token')){
        this.$store.dispatch('setAuth',JSON.parse(localStorage.getItem('auth')))
        this.$store.dispatch('setToken',localStorage.getItem('token'))
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
      }
    }
  },
  created() {
    this.setAuth()
  }
}

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
*{
  font-family: 'Roboto', sans-serif;
}

body{
  background-color: #f6f8f9 !important;
}
</style>
