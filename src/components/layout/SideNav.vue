<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 px-0 col-md-2 shadow-lg side-nav">
        <ul class="nav mx-3 mt-3 flex-column">
          <li v-if="role == 0 || role == 1" class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/dashboard">
              <i class="fa-solid fa-chart-pie me-2"></i>
              Dashboard</router-link>
          </li>
          <li class="accordion accordion-flush" id="customerData">
              <a class="accordion-button px-1 collapsed nav-link" type="button" data-bs-toggle="collapse" data-bs-target="#customer" aria-expanded="false" aria-controls="customer">
                <i class="fa-solid fa-hospital-user me-3"></i>
                Patient Data
              </a>
              <div id="customer" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#customerData">
                  <ul class="">
                    <li class="nav-item">
                      <router-link to="/createPatient" class="nav-link">Patient Register</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/patientList" class="nav-link">Patient List</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/member" class="nav-link">Member List</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/patientCreditList" class="nav-link">Patient Credit List</router-link>
                    </li>
                  </ul>
              </div>
          </li>
          <li class="accordion accordion-flush" id="procedure">
              <a class="accordion-button px-1 collapsed nav-link" type="button" data-bs-toggle="collapse" data-bs-target="#procedureData" aria-expanded="false" aria-controls="procedureData">
                <i class="fa-solid fa-procedures me-3"></i>
                Procedure
              </a>
              <div id="procedureData" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#procedure">
                  <ul class="">
                    <li class="nav-item">
                      <router-link to="/procedureList" class="nav-link">Procedure list</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/procedureHistory" class="nav-link">Procedure History</router-link>
                    </li>
                  </ul>
              </div>
          </li>

          <li class="accordion accordion-flush" id="appointment">
              <a class="accordion-button px-1 collapsed nav-link" type="button" data-bs-toggle="collapse" data-bs-target="#appointmentData" aria-expanded="false" aria-controls="appointmentData">
                <i class="fa-solid fa-calendar-days me-3"></i>
                Appointment
              </a>
              <div id="appointmentData" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#appointment">
                  <ul class="">
                    <li class="nav-item">
                      <router-link to="/appointmentCreate" class="nav-link">Appointment Create</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/appointmentList" class="nav-link">Appointment List</router-link>
                    </li>
                  </ul>
              </div>
          </li>

<!--          Admin-->
          <li v-if="role == 0 || role == 1" class="accordion accordion-flush" id="admin">
            <a class="accordion-button px-1 collapsed nav-link" type="button" data-bs-toggle="collapse" data-bs-target="#adminData" aria-expanded="false" aria-controls="adminData">
              <i class="fa-solid fa-user-gear me-3"></i>
              Admin
            </a>
            <div id="adminData" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#admin">
              <ul class="">
                <li class="nav-item">
                  <router-link to="/stockCount" class="nav-link">Stock Count & Price </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/purchaseList" class="nav-link">Purchase List</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/supplierList" class="nav-link">Supplier List</router-link>
                </li>
              </ul>
            </div>
          </li>

<!--          Finance-->
          <li v-if="role == 0 || role == 1" class="accordion accordion-flush" id="finance">
            <a class="accordion-button px-1 collapsed nav-link" type="button" data-bs-toggle="collapse" data-bs-target="#financeData" aria-expanded="false" aria-controls="financeData">
              <i class="fa-solid fa-file-invoice-dollar me-3"></i>
              Financial Report
            </a>
            <div id="financeData" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#finance">
              <ul class="">
                <li class="nav-item">
                  <router-link to="/profitLoss" class="nav-link">Profit & Loss</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/expense" class="nav-link">Expense List</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/income" class="nav-link">Income List</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/fixedAsset" class="nav-link">Fixed Asset</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/bankAccount" class="nav-link">Bank Account</router-link>
                </li>
              </ul>
            </div>
          </li>

          <li v-if="role == 0 || role == 1 || role == 3" class="accordion accordion-flush" id="sale">
              <a class="accordion-button px-1 collapsed nav-link" type="button" data-bs-toggle="collapse" data-bs-target="#saleData" aria-expanded="false" aria-controls="saleData">
                <i class="fa-solid fa-bag-shopping me-3"></i>
                Sale
              </a>
              <div id="saleData" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#sale">
                  <ul class="">
                    <li class="nav-item">
                      <router-link to="/salePage" class="nav-link">Sale Page</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/saleHistory" class="nav-link">Sale History</router-link>
                    </li>
                  </ul>
              </div>
          </li>

          <li v-if="role == 0 || role == 1" class="accordion accordion-flush" id="accordionFlushExample">
            <a class="accordion-button px-1 collapsed nav-link" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              <i class="fa-solid fa-file-medical me-3"></i>
              Master Data
            </a>
            <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <ul class="">
                <li class="nav-item">
                  <router-link to="/category" class="nav-link">Category List</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/subcategory" class="nav-link">Subcategory List</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/brand" class="nav-link">Brand List</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/item" class="nav-link">Medicine List</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/procedureItem" class="nav-link">Procedure Medicine</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/machine" class="nav-link">Machine List</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/treatment" class="nav-link">Treatment Create</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/treatmentUnitList" class="nav-link">Treatment List</router-link>
                </li>
              </ul>
            </div>
          </li>


        </ul>
      </div>
      <div class="col-10 main" style="overflow: scroll;">
        <TopNav></TopNav>
<!--        <div class="row">-->
<!--          <div class="col-12">-->
<!--            <div class="top-nav border-0 py-1 px-3 mt-2 mb-3">-->
<!--              <div class="d-flex justify-content-between align-items-center">-->

<!--                <div class="d-flex gap-3 align-items-center">-->
<!--                  <i type="button" @click="back" class="fa-solid fa-arrow-left" title="Back"></i>-->
<!--                  <div class="d-flex align-items-center gap-2">-->
<!--                    <img src="../../assets/vlogo.png" style="width: 30px;" alt="">-->
<!--                    <h6 class="fw-normal text-white mb-0">Victorious Aesthetic Clinic</h6>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-if="auth != null" class="d-flex gap-3 align-items-center">-->
<!--                  <div v-if="role == 1 || role == 2">-->
<!--                    <i type="button" @click="doctorSchedule" class="fa-solid fa-calendar-alt"></i>-->
<!--                  </div>-->
<!--                  <div v-if="role == 0 || role == 1" class="position-relative">-->
<!--                    <i  @click="notification" type="button" class="fa-solid fa-bell"></i>-->
<!--                    <span v-if="noti_length > 0" style="font-size: 8px;" class="small position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">-->
<!--                    {{ noti_length }}-->
<!--                    </span>-->
<!--                  </div>-->

<!--                  <div>-->
<!--                    <img src="../../assets/icon-doctor.png" class="shadow-sm" style="width: 30px;height: 30px;border-radius: 50%;object-fit: cover;" alt="">-->
<!--                  </div>-->
<!--                  <div class="dropdown dropdown-center">-->
<!--                    <a style="text-decoration: none;" class="dropdown-toggle text-white" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="-20,20">-->
<!--                      {{auth.name}}-->
<!--                    </a>-->
<!--                    <ul class="dropdown-menu border-0 shadow-lg p-0" aria-labelledby="dropdownMenuLink">-->
<!--                      <li>-->
<!--                        <router-link class="dropdown-item" to="/profile" >-->
<!--                          <i class="fa-solid fa-user me-3" ></i>-->
<!--                          My Profile</router-link>-->
<!--                      </li>-->
<!--                      <li><a class="dropdown-item" href="#">Another action</a></li>-->
<!--                      <li><hr class="dropdown-divider my-0"></li>-->
<!--                      <li>-->
<!--                        <a class="dropdown-item text-danger" href="#" @click="logout">-->
<!--                        <i class="fa-solid fa-power-off me-3"></i>-->
<!--                        Logout</a>-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </div>-->
<!--                </div>-->


<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <slot></slot>
        <div class="row">
          <div class="col-12">
            <footer class="footer mt-2 py-2 rounded">
              <div class="">
                <div class="d-flex justify-content-between">
                  <span style="font-size: 10px;" class="text-start text-muted mb-0"> Development By Min Khant | May Myat Moe </span>
                  <span style="font-size: 10px;" class="text-center text-muted mb-0"> © 2022 K-Win Technologies </span>
                  <span style="font-size: 10px;" class="text-end text-muted mb-0"> All right reserved. </span>
                </div>
              </div>
            </footer>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>


import {mapGetters, mapState} from "vuex";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import TopNav from "@/components/layout/TopNav";

export default {
  name: "SideNav",
  components: {TopNav},
  data() {
    return {
      role: '',
      user_name : localStorage.getItem('user_name'),
    }
  },
  computed: {
    ...mapState([
       'auth',
       'token',
        'noti_length'
    ]),
    ...mapGetters([
        'getUrl'
    ]),
  },
  methods: {
    notification: function (){
      router.push({path: '/notification'})
    },
    profileDetail: function (){
      router.push({path: '/profile'})
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
router-link.active{
  color: #42b983;
}
.nav-item{
  padding: 0.3px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.side-nav{
  background-image: linear-gradient(to right bottom, #8685ef, #7187ef, #5a89ee, #3d8aec, #008be9);
  overflow-y: scroll;
  overflow-x: unset;
  height: 100vh !important;
}
.nav-item > .nav-link{
  color: #fff !important;
}
.nav-link{
  color: #757575 !important;
  padding: 5px !important;

}
.nav-link:hover{
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
}
.nav-link.active{
  border-radius: 5px;
  padding: 5px !important;
  background: rgba(255, 255, 255, 0.5);
  color: #696cff !important;
}
.accordion-button{
  font-size: 14px !important;
  background-color: transparent !important;
}
.accordion-button.nav-link{
  color: #fff !important;
}
.accordion-button{
  transition: .5s !important;
  /*padding: 8px 16px 8px 16px !important;*/
}
.accordion-button:not(.collapsed) {

  background-color: transparent !important;
  box-shadow: none !important;
}
.accordion-header>.accordion-button{
  background-color: #fff !important;
}
</style>