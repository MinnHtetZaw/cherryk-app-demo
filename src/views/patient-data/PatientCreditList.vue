<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h6 class="text-secondary fw-normal">Patient Credit List</h6>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card border-0 p-0">
          <table v-if="customers.length > 0" class="table table-hover">
            <thead>
            <tr>
              <th class="text-center text-secondary">Patient ID</th>
              <th class="text-center text-secondary">Name</th>
              <th class="text-center text-secondary">Phone</th>
              <th class="text-center text-secondary">Address</th>
              <th class="text-center text-secondary">Credit Amount ( MMK )</th>
              <th class="text-center text-secondary">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="customer in customers">
              <td class="text-center">{{customer.customer_id}}</td>
              <td class="text-start">{{customer.name}}</td>
              <td class="text-center">{{customer.phone}}</td>
              <td style="width: 250px;" class="text-start">{{customer.address}}</td>
              <td class="text-end">{{customer.credit_amount}}</td>
              <td class="d-flex justify-content-center">
                <button @click="creditDetail(customer.id)" class="btn btn-primary btn-sm">Credit Detail</button>
              </td>
            </tr>
            </tbody>
          </table>

          <div v-else>
            <div class="d-flex mb-3 justify-content-center">
              <img src="../../assets/search_not_found.svg" style="width: 500px" alt="">
            </div>
<!--            <h4 class="alert alert-warning fw-normal text-center text-secondary">There is no incoming notification!</h4>-->
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
import Search from "@/components/Search";
export default {
  name: "PatientCreditList",
  components: {Search, SideNav},
  data() {
    return {
      customers : {},
    }
  },
  methods: {
    show : function() {
      axios.get(this.$store.state.url+'customer')
          .then(response => response.data.data)
          .then(data=>{
            this.customers = data.filter(el=>el.credit_amount > 0)

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    searchItem: function(){
      let formData = new FormData(this.$refs.search)
      axios.post(this.$store.state.url+'customer-search',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.customers = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    creditDetail : function (id){
      router.push({path: '/patientCreditDetail/'+id,query: {id: id}})
    }
  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped>

</style>