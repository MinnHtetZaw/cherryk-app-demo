<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="fw-normal text-secondary">Member List</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card border-0 p-0">
          <div class="d-flex p-3 justify-content-between align-items-center">
            <form class="d-flex" @submit.prevent="" ref="search">
              <input style="background-color: transparent;" name="search" @keyup="searchItem" type="text" class="form-control form-control-sm rounded-pill" placeholder="Search">
            </form>
<!--            <div class="d-flex justify-content-end align-items-center gap-2">-->
<!--              <select v-if="isFilter == true" @change="filterByStatus(status)"  v-model="status" class="form-select form-select-sm">-->
<!--                <option value="">Status</option>-->
<!--                <option value="customer">Customer</option>-->
<!--                <option value="member">Member</option>-->
<!--              </select>-->
<!--              <select v-if="isFilter == true" @change="filterByGender(gender)" v-model="gender" name="" class="form-select form-select-sm">-->
<!--                <option value="">Gender</option>-->
<!--                <option value="Male">Male</option>-->
<!--                <option value="Female">Female</option>-->
<!--              </select>-->

<!--              <button @click="filter" class="btn btn-outline-primary btn-sm">-->
<!--                <i class="fa-solid fa-filter"></i>-->
<!--              </button>-->
<!--              <a-->
<!--                  type="button"-->
<!--                  :href="getUrl('customer-export')"-->
<!--                  download="file.xlsx"-->
<!--              >-->
<!--                <button class="btn btn-outline-success btn-sm" title="Export">-->
<!--                  <i class="fa-solid fa-file-export"></i>-->
<!--                </button>-->
<!--              </a>-->

<!--            </div>-->
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
                <th class="text-center text-secondary">Member Status</th>
                <th class="text-center text-secondary">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr class="" v-for="(patient,index) in patients" :key="'patient'+patient.id">
                <!--              <td>-->
                <!--                <img :src="patient.photo" style="width:50px;height:50px;object-fit: cover;" class="rounded-circle" alt="">-->
                <!--              </td>-->
                <td>{{index +1}}</td>
                <td class="text-start">{{patient.customer_id}}</td>
                <td class="text-start">{{patient.name}}</td>
                <td class="text-center" style="width: 60px;">{{patient.age}}</td>
                <td class="text-end">{{patient.phone}}</td>
                <td class="text-center">{{patient.date_of_birth}}</td>
                <td class="text-center">{{patient.gender}}</td>
                <td class="text-start" style="width: 250px;">{{patient.address}}</td>
                <td class="text-center">
                  <span v-if="patient.level == 1" class="badge bg-primary rounded-pill">Gold</span>
                  <span v-if="patient.level == 2" class="badge bg-info rounded-pill">Platinum</span>
                  <span v-if="patient.level == 3" class="badge bg-success rounded-pill">Diamond</span></td>
                <td class="text-center">
                  <button @click="detail(patient.id)" class="btn btn-sm btn-primary">Detail <i class="fa-solid fa-info-circle ms-2"></i></button>
<!--                  <i title="Detail" type="button"  class="fa-solid fa-circle-info text-primary fs-5"></i>-->
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
import {mapGetters} from "vuex";
import router from "@/router";
export default {
  name: "Member",
  components: {SideNav},
  data() {
    return {
      patients: null,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getCustomer: function (url){
      axios.get(this.getUrl(url))
          .then(response => response.data.data)
          .then(data=>{
            this.patients = data.filter(el=>el.level != 0)

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    detail: function(id){
      router.push({path: '/patientDetail/'+id,query:{id: id}})
    },
    searchItem: function(){
      let formData = new FormData(this.$refs.search)
      axios.post(this.getUrl('customer-search'),formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.patients = data.filter(el=>el.level != 0)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  },
  mounted() {
   this.getCustomer('customer')
  }
}
</script>

<style scoped>

</style>