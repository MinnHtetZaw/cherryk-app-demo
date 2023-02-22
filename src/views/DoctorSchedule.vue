<template>
<SideNav>
  <div class="row">
    <div class="row">
      <div class="col-12">
        <div class="card border-0 shadow-sm p-3 rounded">
          <FullCalendar :options="calendarOptions" />
        </div>
      </div>
    </div>
  </div>
</SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import {mapGetters, mapState} from "vuex";
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import router from "@/router";
import axios from "axios";
export default {
  name: "DoctorSchedule",
  components: {FullCalendar, SideNav },
  data() {
    return {
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
    ...mapState([
       'auth'
    ]),
    ...mapGetters([
        'getUrl',
    ])
  },
  methods: {
    showAppointment:function(){
      axios.get(this.getUrl('appointment'))
          .then(response => response.data.data)
          .then(data=>{
            this.calendarOptions.events = data.filter(el=>el.doctor_id == this.auth.id)
          })
          .catch(function (error) {
          });
    },
  },
  mounted() {
    this.showAppointment()
  }
}
</script>

<style scoped>

</style>