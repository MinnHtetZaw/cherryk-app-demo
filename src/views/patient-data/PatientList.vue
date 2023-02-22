<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="fw-normal text-secondary">Patient Lists</h6>
            <button @click="registerPatient" class="btn btn-primary btn-sm">Patient Register <i class="fa-solid fa-plus ms-2"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="patient_birthday.length > 0"  class="row">
      <div class="col-12">
        <div v-if="is_birthday == true" class="card border-0 p-3 mb-3">
          <div class="d-flex justify-content-between">
            <h5 class="">Upcoming Birthday!</h5>
            <button @click="is_birthday=false" class="btn btn-sm btn-close"></button>
          </div>
          <div class="row">
            <div class="col-3 p-3">
              <ul>
                <li v-for="patient in patient_birthday">
                  <div class="d-flex justify-content-between">
                    <a type="button" class="" @click="detail(patient.id)"><h6 class="fw-normal name-effect">{{patient.name}}</h6></a>
                    <p class="mb-0">{{patient.date_of_birth}}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-9">
              <div class="d-flex justify-content-center">
                <img src="../../assets/undraw_gifts_0ceh.svg" style="width: 300px;" alt="">
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card border-0 p-0">
          <div class="d-flex px-3 pt-3 justify-content-between align-items-center">
            <form class="d-flex" @submit.prevent="" ref="search">
              <input style="background-color: transparent;" name="search" @keyup="searchItem" type="text" class="form-control form-control-sm rounded-pill" placeholder="Search">
            </form>
            <div class="d-flex justify-content-end align-items-center gap-2">
<!--              <select v-if="isFilter == true" @change="filterByStatus(status)"  v-model="status" class="form-select form-select-sm">-->
<!--                <option value="">Status</option>-->
<!--                <option value="customer">Customer</option>-->
<!--                <option value="member">Member</option>-->
<!--              </select>-->
              <select v-if="isFilter == true" @change="filterByGender(gender)" v-model="gender" name="" class="form-select form-select-sm">
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <button @click="filter" class="btn btn-outline-primary btn-sm">
                <i class="fa-solid fa-filter"></i>
              </button>
              <a
                  type="button"
                  :href="getUrl('customer-export')"
                  download="file.xlsx"
              >
                <button class="btn btn-outline-success btn-sm" title="Export">
                  <i class="fa-solid fa-file-export"></i>
                </button>
              </a>

            </div>
          </div>

          <div>

            <table  class="table table-hover">
              <thead>
              <tr>
                <!--              <th class="text-center"></th>-->
                <th class="text-center text-secondary">#</th>
                <th class="text-center text-secondary">Patient ID</th>
                <th class="text-center text-secondary">Name</th>
                <th class="text-center text-secondary">Age</th>
                <th class="text-center text-secondary">Phone</th>
                <th class="text-center text-secondary">Date of Birth</th>
                <th class="text-center text-secondary">Gender</th>
                <th class="text-center text-secondary">Address</th>
                <th class="text-center text-secondary">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr class="" v-for="(patient,index) in patients">
                <td>{{index +1}}</td>
                <td class="text-start">{{patient.customer_id}}</td>
                <td class="text-start">{{patient.name}}</td>
                <td class="text-center" style="width: 60px;">{{patient.age}}</td>
                <td class="text-end">{{patient.phone}}</td>
                <td class="text-center">{{patient.date_of_birth}}</td>
                <td class="text-center">{{patient.gender}}</td>
                <td class="text-start" style="width: 250px;">{{patient.address}}</td>
<!--                <td class="text-center" style="width: 100px;">-->
<!--                  <span class="badge bg-primary rounded-pill">{{patient.customer_status}}</span></td>-->
                <td class="text-center">
                  <button @click="detail(patient.id)" class="btn btn-primary small btn-sm">
                    Detail <i class="fa-solid fa-info-circle ms-2"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>

  </SideNav>

</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import router from "@/router";
import {mapGetters} from "vuex";
export default {
  name: "PatientList",
  components: {SideNav},
  data() {
    return {
      patients: {},
      patient_birthday: {},
      gender: '',
      status: '',
      is_birthday: true,
      isFilter: false,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    detail: function(id){
      router.push({path: '/patientDetail/'+id,query:{id: id}})
    },
    registerPatient: function (){
      router.push({path: '/createPatient'})
    },
    searchItem: function(){
      let formData = new FormData(this.$refs.search)
      axios.post(this.$store.state.url+'customer-search',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.patients = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    filter: function (){
      this.isFilter = !this.isFilter
      this.status = this.gender = ''
      this.getCustomer('customer')
    },
    filterByGender :function (v){
      this.getCustomer('customer?gender='+v)
    },
    filterByStatus :function (v){
      this.getCustomer('customer?status='+v)
    },
    getCustomer: function (url){
      axios.get(this.getUrl(url))
          .then(response => response.data.data)
          .then(data=>{
            this.patients = data

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getCustomerBirthday: function (url){
      axios.get(this.getUrl(url))
          .then(response => response.data.data)
          .then(data=>{
            this.patient_birthday = data

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    patientExport: function (){
      axios.get(this.getUrl('customer-export'))
          .then(res => console.log(res))
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  mounted() {
    this.getCustomer('customer')
    this.getCustomerBirthday('customer-birthday')
  }
}
</script>

<style scopedD>
li::marker{
  color: #06f67d;
  font-size: 25px;
}
a{
  text-decoration: none;
}
.name-effect:hover{
  color: #06f67d;
}
</style>