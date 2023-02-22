<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h6 class="fw-normal text-secondary">Appointment List</h6>
        </div>
        <div v-if="isEdit == true && edit_appointment" class="card mb-3 border-0 p-3">
          <h5 class="fw-normal text-secondary">Edit Appointment</h5>
          <form @submit.prevent="" ref="editAppointment">
            <div class="row">
              <div class="col-3">
                <label class="form-label">Patient Name</label>
                <textarea readonly name="patient_name" class="form-control" rows="1" :value="edit_appointment.patient_name"></textarea>
              </div>
              <div class="col-3">
                <label class="form-label">Doctor Name</label>
                <select name="doctor_name" class="form-select js-example-basic-single" >
                  <option :value="doctor.id" :selected="edit_appointment.doctor_id == doctor.id" v-for="doctor in doctors">{{doctor.name}}</option>
                </select>
              </div>
              <div class="col-2">
                <label class="form-label">Phone</label>
                <input name="phone" type="number" class="form-control" :value="edit_appointment.phone">
              </div>
              <div class="col-2">
                <label class="form-label">Date</label>
                <input name="date" type="date" class="form-control" :value="edit_appointment.date">
              </div>
              <div class="col-2">
                <label class="form-label">Time</label>
                <input name="time" type="time" class="form-control" :value="edit_appointment.time">
                <input name="patient_status" type="hidden" :value="edit_appointment.patient_status">
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="2" :value="edit_appointment.description"></textarea>
              </div>
            </div>
            <div class="mb-3 d-flex justify-content-center gap-3">
              <button :disabled="isLoading == true" @click="isEdit = false" class="btn btn-danger">
                Cancel
              </button>
              <button @click="updateAppointment(edit_appointment.id)" class="btn btn-primary" :disabled="isLoading == true">
                <span v-if="isLoading == true" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Update
              </button>

            </div>
          </form>
        </div>
        <div v-else class="card border-0 p-0">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="text-secondary text-center">#</th>
              <th class="text-secondary text-center">Date</th>
              <th class="text-secondary text-center">Time</th>
              <th class="text-secondary text-center">Patient Name</th>
              <th class="text-secondary text-center">Phone</th>
              <th class="text-secondary text-center">Doctor Name</th>
              <th class="text-secondary text-center">Description</th>
              <th class="text-secondary text-center">Status</th>
              <th class="text-secondary text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="appointment in appointments" v-if="appointments.length > 0">
              <td class="text-center">{{appointment.id}}</td>
              <td class="text-center">{{appointment.date}}</td>
              <td class="text-center">{{appointment.time}}</td>
              <td class="text-start">{{appointment.patient_name}}</td>
              <td class="text-center">{{appointment.phone}}</td>
              <td class="text-start">{{appointment.doctor_name}}</td>
              <td style="width: 400px;" class="text-start">{{appointment.description}}</td>
              <td class="text-center">
                <span v-if="appointment.patient_status == 1" class="badge rounded-pill bg-primary px-3 small">New</span>
                <span v-if="appointment.patient_status == 2" class="badge rounded-pill bg-info px-3 small">Old</span>
              </td>
              <td>
                <div class="d-flex mt-2 justify-content-center gap-3">
                  <i type="button" @click="editAppointment(appointment.id)" class="fa-solid text-warning fa-pen"></i>
                  <i type="button" @click="deleteAppointment(appointment.id)"  class="fa-solid text-danger fa-trash"></i>
                </div>
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
import {mapGetters} from "vuex";
import axios from "axios";
import router from "@/router";
export default {
  name: "AppointmentList",
  components: {SideNav},
  data() {
    return {
      appointments: {},
      doctors: {},
      isEdit: false,
      edit_appointment: {},
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getAppointments: function (){
      axios.get(this.getUrl('appointment'))
          .then(response => response.data.data)
          .then(data=>{
            this.appointments = data
          })
          .catch(function (error) {
          });
    },
    getDoctors: function (){
      axios.get(this.getUrl('auth_user'))
          .then(response => response.data.data)
          .then(data=>{
            this.doctors = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    editAppointment: function (id){
      this.isEdit = true
      axios.get(this.getUrl('appointment/'+id))
          .then(response => response.data.data)
          .then(data => {
            this.edit_appointment = data
            console.log(this.edit_appointment)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    updateAppointment: function (id){
      this.isLoading = true
      let formData = new FormData(this.$refs.editAppointment);
      formData.append('_method','PATCH')
      axios.post(this.getUrl('appointment/'+id),formData)
          .then( res => {
            this.$store.dispatch('alertSuccess')
            this.$refs.editAppointment.reset()
          })
          .catch(err=>{
            this.$store.dispatch('alertError')
            console.log(err)
          })
          .finally(_=>{
            this.isLoading = false
            this.isEdit  = false
            this.getAppointments()
          })
      ;
    },
    deleteAppointment: function (id){
      this.isLoading = true
      axios.delete(this.getUrl('appointment/'+id))
          .then(response => {
            this.$store.dispatch('alertSuccess')
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(_=>{
            this.isLoading = false
            this.getAppointments()
          })
      ;
    }
  },
  mounted() {
    this.getAppointments()
    this.getDoctors()
  }
}
</script>

<style scoped>

</style>