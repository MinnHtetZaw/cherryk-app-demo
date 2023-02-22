<template>
    <table class="table table-hover">
      <thead>
      <tr class="text-secondary ">
        <th class="text-center fw-normal">#</th>
        <th class="text-center fw-normal">Appointment Date</th>
<!--        <th class="text-center fw-normal">Treatment Unit</th>-->
        <th class="text-center fw-normal">Total Amount</th>
        <th class="text-center fw-normal">Advance</th>
        <th class="text-center fw-normal">Balance</th>
        <th class="text-center fw-normal">Status</th>
        <th class="text-center fw-normal">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="procedure_treatments" class="text-center" v-for="(procedure_treatment,index) in procedure_treatments" :key="procedure_treatment.id">
        <td>{{index +1}}</td>
        <td>{{procedure_treatment.appointment_date}}</td>
        <td>{{procedure_treatment.treatment_unit_name}}</td>
        <td>{{procedure_treatment.total_amount}}</td>
        <td>{{procedure_treatment.advance}}</td>
        <td>{{procedure_treatment.balance}}</td>
        <td>{{procedure_treatment.status}}</td>
        <td>
          <button @click="procedureTreatmentDetail(procedure_treatment.id,procedure_treatment.procedure_id,index)" class="btn btn-primary btn-sm">Detail</button>
<!--          <v-btn class="text-capitalize" :to="{path: '/procedureTreatmentDetail/'+procedure_treatment.id,query: {id: procedure_treatment.id, procedure_id: procedure_treatment.procedure_id,index: index+1}}" small color="success">Detail</v-btn>-->
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "ProcedureTreatmentList",
  data() {
    return {
      treatments: null,
      units: null,
    }
  },
  props: ['procedure_treatments','id'],
  methods: {
    procedureTreatmentDetail(id,procedure_id,index) {
      router.push({path: '/procedureTreatmentDetail/'+id,query: {id:id, procedure_id: procedure_id, index: index}})
    }
  },
  mounted() {
    axios.get(this.$store.state.url+'treatment')
        .then( res => res.data.data)
        .then(data =>
            this.treatments = data
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'treatment_unit')
        .then( res => res.data.data)
        .then(data =>
            this.units = data
        )
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<style scoped>

</style>