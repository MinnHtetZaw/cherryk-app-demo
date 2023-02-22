<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8 col-md-9">
        <div class="d-flex justify-content-center align-items-center">
          <img src="../../assets/doctors.svg" style="width: 700px;margin-top: 100px;" alt="">
        </div>
      </div>
      <div class="col-4 col-md-3 px-0">
          <div class="bg-white shadow-sm vh-100">
            <div class="d-flex vh-100 flex-column justify-content-center">
              <h3 class="fw-normal mb-3 text-center">WELCOME</h3>
              <p class="text-center text-secondary">Hello, Greeting! Please Sign In to Your Account!</p>
              <div class="row">
                <div class="col-8 m-auto">
                  <div class="my-3">
                    <div class="mb-3">
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text">
                          <i class="fa-solid fa-user"></i>
                        </span>
                        <input v-model="email" type="email" required placeholder="Enter Email" class="form-control border-0" name="email">                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text">
                          <i class="fa-solid fa-key"></i>
                        </span>
                        <input @keyup.enter="login" v-model="password" required placeholder="Enter Password" type="password" class="form-control border-0" name="password">
                      </div>
                    </div>
                    <div class="mb-3">
                      <button @click="login" class="btn btn-primary w-100">Login</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import {mapGetters, mapState} from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState([
        'token',
        'auth'
    ]),
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    login: function () {
      let login = {
        'email': this.email,
        'password': this.password,
      }
      axios.post(this.getUrl('login'),login)
          .then(res=>res.data)
          .then(data=>{
            localStorage.clear()
            localStorage.setItem('token',data.data)
            localStorage.setItem('Role',data.user.role)
            localStorage.setItem('auth',JSON.stringify(data.user))
            this.$store.dispatch('setAuth',JSON.parse(localStorage.getItem('auth')))
            this.$store.dispatch('setToken',localStorage.getItem('token'))
            router.push({path: '/dashboard'})
            this.$swal({
              toast: true,
              position: 'top-end',
              icon: 'success',
              timerProgressBar: true,
              showConfirmButton: false,
              timer: 3000,
              title: 'Login Successfully!',
            });
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire(
                'Please Try Again!',
                'Email or Password is Wrong!',
                'error'
            )
          });
    }
  },
}
</script>

<style scoped>

i{
  color: #9fa3a8;
}
.input-group{
  border: 1px solid #d1d5db;
  padding: 3px 5px;
  border-radius: 7px;
}
.input-group-text{
  background: transparent;
  border: none;
}
</style>