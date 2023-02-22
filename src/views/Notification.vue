<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h6 class="fw-normal text-secondary">Notifications</h6>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8 m-auto">

        <div class="list-group" >
          <a  class="list-group-item" v-if="notifications.length > 0" v-for="noti in notifications">
            <div class="d-flex w-100 justify-content-between">
              <div class="d-flex gap-3 align-items-center">
                <a @click="markAsRead(noti.id)" title="Mark as read">
                  <i  class="fa-solid fa-circle-check"></i>
                </a>
                <p class="mb-0 fw-normal">
                  New patient, <a type="button" @click.prevent="detail(noti.message['id'])" class="fw-bold">{{noti.message['name']}}</a> has just registered!
                </p>
              </div>
              <small>{{noti.time}}</small>
            </div>
          </a>
        </div>
<!--        <div :class="card">-->
<!--          <div v-if="notifications.length > 0" v-for="noti in notifications">-->
<!--            <div class="alert alert-primary" role="alert">-->
<!--              <div class="d-flex justify-content-between align-items-center">-->
<!--                <div class="d-flex gap-3 align-items-center">-->
<!--                  <a @click="markAsRead(noti.id)" title="Mark as read">-->
<!--                    <i  class="fa-solid fa-circle-check"></i>-->
<!--                  </a>-->
<!--                  <h6 class="mb-0 fw-normal">-->
<!--                    New patient, <a type="button" @click.prevent="detail(noti.message['id'])" class="fw-bold text-primary">{{noti.message['name']}}</a> has just registered!-->
<!--                  </h6>-->
<!--                </div>-->

<!--                <p class="mb-0 text-secondary">-->
<!--                  {{noti.time}}-->
<!--                </p>-->
<!--              </div>-->

<!--            </div>-->

<!--          </div>-->
<!--          <div v-else>-->
<!--            <div class="d-flex mb-3 justify-content-center">-->
<!--              <img src="../assets/search_not_found.svg" style="width: 500px" alt="">-->
<!--            </div>-->
<!--            <h4 class="alert alert-warning fw-normal text-center text-secondary">There is no incoming notification!</h4>-->
<!--          </div>-->
<!--          {{notifications.data}}-->
<!--        </div>-->
      </div>
    </div>
  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import {mapGetters, mapState} from "vuex";
import router from "@/router";
import Swal from "sweetalert2";
export default {
  name: "Notification",
  components: {SideNav},
  data() {
    return {
      notifications: {},
    }
  },
  computed: {
    ...mapState([
       'card',
    ]),
    ...mapGetters([
        'getUrl',
    ])
  },
  methods: {
    getNotifications: function (url){
      axios.get(url)
          .then(response => response.data)
          .then(data=>{
            this.notifications = data.data
            this.$store.dispatch('setNoti',this.notifications.length)
            console.log(this.notifications.length)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    markAsRead:function (x) {
      let data = {
        id: x,
      }
      axios.post(this.getUrl('notification'), data)
          .then(res => res.data.data)
          .then(data => {
            this.getNotifications(this.getUrl('notification'))
            Swal.fire(
                '',
                'Mark as read!',
                'success'
            )
            }
          )
          .catch(function (error) {
            console.log(error)
          })
    },
    detail: function (id){
      router.push({path: '/patientDetail/'+id,query:{id: id}})
    }
  },
  mounted() {
    this.getNotifications(this.getUrl('notification'))
  }
}
</script>

<style scoped>
.noti-name{
  color: #06f67d;
}
a{
  text-decoration: none;
}
</style>