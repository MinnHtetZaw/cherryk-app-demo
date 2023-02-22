<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <h6 class="fw-normal mb-3 text-secondary">Appointment Create</h6>
    </div>
  </div>
  <div class="row">
    <div class="col-3">
      <div class="card border-0 shadow-sm p-3 rounded">
          <div class="">
            <form @submit.prevent="" ref="appointment">
              <div class="mb-3">
                <label class="form-label">Select Patient Status</label>
                <select v-model="status"  name="patient_status" class="form-select form-select-sm">
                  <option value="1">New</option>
                  <option value="2">Old</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Patient Name</label>
                <input v-if="status == 1" type="text" class="form-control form-control-sm" name="patient_name">
                <input type="hidden" name="customer_id">
                <select @change="addPhone(customer_id)" v-model="customer_id" v-if="status == 2" name="patient_name" class="form-select form-select-sm">
                  <option :value="customer.id" v-for="customer in customers">{{customer.name}}</option>
                </select>

              </div>
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input type="number" id="phone" class="form-control form-control-sm" name="phone">
              </div>
              <div class="mb-3">
                <label class="form-label">Doctor Name</label>
                <select name="doctor_name" class="form-select form-select-sm js-example-basic-single" >
                  <option :value="doctor.id" v-for="doctor in doctors">{{doctor.name}}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" rows="2" class="form-control form-control-sm"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Date</label>
                <input type="date" class="form-control form-control-sm" name="date">
              </div>
              <div>
                <div class="mb-3">
                  <label class="form-label">Time</label>
                  <input type="time" class="form-control form-control-sm form-control-sm" name="time">
                </div>
              </div>
              <div>
                <div class="mb-3">
                  <button @click="appointmentCreate" type="submit" class="btn btn-primary btn-sm w-100" :disabled="isLoading == true">
                    <span v-if="isLoading == true" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Save
                  </button>
                </div>
              </div>

            </form>
          </div>
      </div>
    </div>

    <div class="col-9">
      <div class="card border-0 shadow-sm p-3 rounded">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>
  </div>
</SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from "@/router";
import Swal from "sweetalert2";
import {mapGetters} from "vuex";
export default {
  name: "AppointmentCreate",
  components: {FullCalendar, SideNav},
  data() {
    return {
      isLoading : false,
      customers : {},
      select_customer: '',
      doctors: {},
      customer_id: '',
      status : 1,
      phone: '',
      calendarOptions: {
        headerToolbar: {
          left: 'dayGridMonth timeGridDay listDay',
          center: 'title',
          right: 'prev today next'
        },
        buttonText:{
          today:    'Today',
          month:    'Month',
          week:     'Week',
          day:      'Day',
          list:     'List'
        },
        eventBorderColor: 'rgba(145, 85, 253, 0.16)',
        eventTextColor: '#696cff',
        eventBackgroundColor: 'rgba(145, 85, 253, 0.16)',
        eventDisplay: 'block',
        nowIndicator: 'true',
        dayMaxEventRows: true, // for all non-TimeGrid views
        views: {
          dayGrid: {
            dayMaxEventRows: 3 // adjust to 6 only for timeGridWeek/timeGridDay
          }
        },
        plugins: [ dayGridPlugin, interactionPlugin , bootstrap5Plugin , timeGridPlugin , listPlugin ],
        themeSystem: 'bootstrap5',
        initialView: 'dayGridMonth',
        height : 570,
        events: [

        ],
        eventClick: function(el) {
          let name = el.event._def.extendedProps.patient_name;
          let status = el.event._def.extendedProps.patient_status;
          let id = el.event._def.extendedProps.old_customer_id;
          let phone = el.event._def.extendedProps.phone;
          let appointment_id = el.event._def.publicId;
          if (status === 2){
            router.push({path: '/patientDetail/'+id,query:{id: id}})

          }else {
            router.push({path: "/createPatient",query: {name: name,phone: phone,appointment_id: appointment_id}})
          }
        },
      }
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ]),
  },
  methods: {
    selectCustomer: function (v){
      let formData = new FormData()
      formData.append('search',v)
      axios.post(this.$store.state.url+'customer-search',formData)
          .then(res=> {
            this.customers = res.data.data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    addCustomer: function (v){
      this.customer_id = v.id
    },
    addPhone(id){
      let customer = this.customers.filter(el=>el.id == id)
      $('#phone').val(customer[0].phone)
    },
    appointmentCreate() {
      this.isLoading = true
      let formData = new FormData(this.$refs.appointment)
      axios.post(this.getUrl('appointment'),formData)
          .then(res => {
            this.$store.dispatch('alertSuccess')
            this.$refs.appointment.reset()
            this.showAppointment()
          })
          .catch(err=>{
            this.$store.dispatch('alertError')
          })
          .finally(_=>{
            this.isLoading = false
          })
      ;
    },
    showAppointment:function(){
      axios.get(this.getUrl('appointment'))
          .then(response => response.data.data)
          .then(data=>{
            this.calendarOptions.events = data
          })
          .catch(function (error) {
          });
    },
    showCustomer(){
      axios.get(this.getUrl('customer'))
          .then(response => response.data.data)
          .then(data=>{
            this.customers = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getDoctors: function (){
      axios.get(this.getUrl('auth_user'))
          .then(response => response.data.data)
          .then(data=>{
            this.doctors = data
            console.log(data)
          })
          .catch(function (error) {
            console.log(error);
          });
    },

  },
  created() {
    this.showAppointment()
    $(document).ready(function() {
      $('.js-example-basic-single').select2();
    });
  },
  mounted() {
    this.getDoctors()
    this.showCustomer()
    setInterval(this.showAppointment, 10000);
  }
}
</script>

<style scoped>

</style>