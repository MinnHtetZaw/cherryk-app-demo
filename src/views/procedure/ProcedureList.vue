<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
          <h6 class="fw-normal mb-3 text-secondary">Procedure List</h6>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-12">
        <div class="card border-0 p-0">
<!--          <div class="d-flex p-3 justify-content-between align-items-center">-->
<!--            <Search @search=""></Search>-->
<!--            <div class="d-flex justify-content-end align-items-center gap-2">-->
<!--              <input type="date" class="form-control form-control-sm" v-model="filter_date">-->
<!--              <button @click="filterDate(filter_date)" class="btn btn-outline-primary btn-sm">-->
<!--                <i class="fa-solid fa-filter"></i>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="text-center text-secondary">#</th>
              <th class="text-center text-secondary">Date</th>
              <th class="text-center text-secondary">Patient ID</th>
              <th class="text-center text-secondary">Name</th>
              <th class="text-center text-secondary">Age</th>
              <th class="text-center text-secondary">Doctor Name</th>
              <th class="text-center text-secondary">Diagnosis</th>
              <th class="text-center text-secondary">Status</th>
              <th class="text-center text-secondary">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center" v-for="procedure in procedures">
              <td>{{procedure.id}}</td>
              <td>{{procedure.date}}</td>
              <td class="text-center">{{procedure.customer_ID}}</td>
              <td class="text-start">{{procedure.customer_name}}</td>
              <td class="text-center">{{procedure.customer_age}}</td>
              <td class="text-start">{{procedure.doctor}}</td>
              <td style="width: 200px;" class="text-start">{{procedure.diagnosis}}</td>
              <td class="text-center">
                <span v-if="procedure.status == 'uncheck'" class="badge bg-warning rounded-pill small">{{procedure.status}}</span>
                <span v-if="procedure.status == 'check'" class="badge bg-primary rounded-pill small">{{procedure.status}}</span>
              </td>
              <td class="text-center">
                <button @click="check(procedure.id)" class="btn small btn-primary btn-sm">Check</button>
              </td>
            </tr>
            </tbody>
          </table>
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
import Search from "@/components/Search";
export default {
  name: "ProcedureTreatmentList",
  components: {Search, SideNav},
  data() {
    return {
      procedures: {},
      filter_date: '',
      categories: null ,
      subcategories: null,
      items: null
    }
  },
  computed: {
    
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {

    

    detail: function(id){
      router.push({path:'/procedurePayment/'+id,query: {id: id}})
    },
    getProcedure : function (url){
      axios.get(url)
          .then( res => res.data.data)
          .then(data => this.procedures = data.filter(el=>el.status != 'check'))
          .catch(function (error) {
            console.log(error);
          });
    },
    check : function (id){
      router.push({path: '/procedureCheck/'+id,query: {id: id}})
    },
    filterDate: function (data){
      this.getProcedure(this.getUrl('procedure?filter_date='+data))
    }
  },
  mounted() {
    this.getProcedure(this.getUrl('procedure'))
  
   
  }
}
</script>

<style scoped>

</style>