import { createStore } from 'vuex'
import Swal from "sweetalert2";
import axios from "axios";

export default createStore({
  state: {
    url: 'http://127.0.0.1:8000/api/',
    auth: null,
    token: null,
    noti_length: '',
    // url: 'http://backend.victoriousskinclinic.com/api/',
    card: 'card mb-3 border-0 shadow-sm p-3 rounded',
    table_normal: 'table table-borderless table-striped table-hover',
  },
  getters: {
    getUrl:(state)=>(uri)=> state.url+uri,
  },
  mutations: {
  },
  actions: {
    setAuth({state},auth){
      return this.state.auth = auth
    },

    setToken({state},token){
      return this.state.token = token
    },
    setLogOut({state}){
       this.state.auth = null
       this.state.token = null
    },
    setNoti({state},x){
      this.state.noti_length = x
    },
    alertError(){
      Swal.fire(
          'Please Try Again!',
          '',
          'error'
      )
    },
    alertSuccess(){
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 3000,
        title: 'Success',
      });
    },
  },
  modules: {
  }
})
