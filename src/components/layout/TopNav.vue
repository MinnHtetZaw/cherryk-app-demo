<template>
  <div class="row">
    <div class="col-12">
      <div class="top-nav border-0 py-2 px-3 mt-2 mb-3">
        <div class="d-flex justify-content-between align-items-center">

          <div class="d-flex gap-3 align-items-center">
            <i type="button" @click="back" class="fa-solid fa-arrow-left" title="Back"></i>
            <div class="d-flex align-items-center gap-2">
              <img src="../../assets/vlogo.png" style="width: 30px;" alt="">
              <h6 style="color: #8685ef" class="mb-0">Victorious Aesthetic Clinic</h6>
            </div>
          </div>
          <div v-if="auth != null" class="d-flex gap-3 align-items-center">
            <div v-if="role == 1 || role == 2">
              <i type="button" @click="doctorSchedule" class="fa-solid fa-calendar-alt"></i>
            </div>
            <div v-if="role == 0 || role == 1" class="position-relative">
              <i  @click="notification" type="button" class="fa-solid fa-bell"></i>
              <span v-if="noti_length > 0" style="font-size: 8px;" class="small position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ noti_length }}
                    </span>
            </div>
            <div>
              <img src="../../assets/icon-doctor.png" class="shadow-sm" style="width: 30px;height: 30px;border-radius: 50%;object-fit: cover;" alt="">
            </div>
            <div class="dropdown dropdown-center">
              <a style="text-decoration: none;" class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="-20,20">
                {{auth.name}}
              </a>
              <ul class="dropdown-menu border-0 shadow-lg p-0" aria-labelledby="dropdownMenuLink">
                <li>
                  <router-link class="dropdown-item" to="/profile" >
                    <i class="fa-solid fa-user me-3" ></i>
                    My Profile</router-link>
                </li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider my-0"></li>
                <li>
                  <a class="dropdown-item text-danger" href="#" @click="logout">
                    <i class="fa-solid fa-power-off me-3"></i>
                    Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import router from "@/router";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "TopNav",
  data() {
    return {
      role: '',
      user_name : localStorage.getItem('user_name'),
    }
  },
  computed: {
    ...mapState([
        'auth','token','noti_length'
    ]),
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    notification: function (){
      router.push({path: '/notification'})
    },
    logout() {
      let config = {
        method: 'post',
        url: this.getUrl('logout'),
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token'),
        },
      };
      axios(config)
          .then(res=> res.data.data)
          .then(data=>{
            if (data == 'Success') {
              this.$store.dispatch('setLogOut')
              localStorage.clear()
              router.push({path: '/'})
              Swal.fire(
                  'Logout Successful!',
                  '',
                  'success'
              )
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getNotifications: function (url){
      axios.get(url)
          .then(response => response.data)
          .then(data=>{
            this.$store.dispatch('setNoti',data.data.length)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    doctorSchedule: function (){
      router.push({path: '/doctorSchedule'})
    },
    back: function (){
      window.history.back()
    }
  },
  mounted() {
    let role = localStorage.getItem('Role')
    this.role = role
    this.getNotifications(this.getUrl('notification'))
  }
}
</script>

<style scoped>
.top-nav{
  border-radius: 5px;
  background: #ffffff !important;
  color: #808080FF !important;
  box-shadow: 0 0.125rem 0.25rem 0 rgb(36 50 66 / 20%) !important;
}
.dropdown-menu{
  align-items: stretch!important;
  background: #fff !important;
  box-shadow: 0 3px 5px 0 rgb(36 50 66 / 20%) !important;
  padding: 16px !important;
  transition: box-shadow .3s !important;
}
</style>