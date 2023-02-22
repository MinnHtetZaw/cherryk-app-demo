<template>
  <SideNav>
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <h6 class="fw-normal text-secondary mb-0">Patient Detail</h6>
      <button @click="addProcedure(patient.id)" class="btn btn-sm btn-primary">Add Procedure <i class="fa-solid fa-plus-circle ms-2"></i></button>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="card border-0">
          <div v-if="status == 'show'">
            <img class="card-img-top mb-3" :src="patient.photo" style="height: 250px; object-fit: cover;" alt="">
            <div class="d-flex justify-content-center gap-3 align-items-center mb-3">
              <h6 class="text-center mb-0 card-title">{{ patient.name }}</h6>
              <i @click="status = 'edit'" class="fa-solid fa-pen text-warning" type="button"></i>
            </div>
            <div class="card-title px-3">
              <div class="row">
                <div class="col-5"><p>Patient ID:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.customer_id }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Status:</p></div>
                <div class="col-7">
                  <p class="mb-1">
                    <span v-if="patient.level == 0" class="badge mb-0 rounded-pill bg-primary">Customer</span>
                    <span v-if="patient.level == 1" class="badge mb-0 rounded-pill bg-primary">Gold Member</span>
                    <span v-if="patient.level == 2" class="badge mb-0 rounded-pill bg-primary">Platinum Member</span>
                    <span v-if="patient.level == 3" class="badge mb-0 rounded-pill bg-primary">Diamond Member</span></p>
                </div>
              </div>
              <div class="row">
                <div class="col-5"><p>Age:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.age }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>DOB:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.date_of_birth }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Phone:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.phone }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Email:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.email }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Occupation:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.occupation }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Gender:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.gender }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Address:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.address }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Visit:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.visit_time }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Total Amount:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.total_amount }}</p></div>
              </div>
              <div class="row">
                <div class="col-5"><p>Credit Amount:</p></div>
                <div class="col-7"><p class="mb-1">{{ patient.credit_amount }}</p></div>
              </div>

<!--              <p class="mb-1">Status:-->
<!--                <span v-if="patient.level == 0" class="badge mx-3 mb-0 rounded-pill bg-primary">Customer</span>-->
<!--                <span v-if="patient.level == 1" class="badge mx-3 mb-0 rounded-pill bg-primary">Gold Member</span>-->
<!--                <span v-if="patient.level == 2" class="badge mx-3 mb-0 rounded-pill bg-primary">Platinum Member</span>-->
<!--                <span v-if="patient.level == 3" class="badge mx-3 mb-0 rounded-pill bg-primary">Diamond Member</span></p>-->
<!--              <p class="mb-1">Age: {{ patient.age }}</p>-->
<!--              <p class="mb-1">Date of Birth: {{ patient.date_of_birth }}</p>-->
<!--              <p class="mb-1">Phone: {{ patient.phone }}</p>-->
<!--              <p class="mb-1">Email: {{ patient.email }}</p>-->
<!--              <p class="mb-1">Occupation: {{ patient.occupation }}</p>-->
<!--              <p class="mb-1">Gender: {{ patient.gender }}</p>-->
<!--              <p class="mb-1">Address: {{ patient.address }}</p>-->
<!--              <p class="mb-1">Visit: {{ patient.visit_time }}</p>-->
<!--              <p class="mb-1">Total Amount: {{patient.total_amount}} MMK</p>-->
<!--              <p class="mb-1">Credit Amount: {{patient.credit_amount}} MMK</p>-->
<!--              <hr>-->
              <div class="d-flex justify-content-center gap-3">
                <button @click="deleteCustomer(patient.id)" class="btn w-100 btn-sm btn-danger" :disabled="isLoading == true">
                  <span v-if="isLoading == true" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Delete
                </button>
              </div>
            </div>


          </div>
          <div v-if="status == 'edit'">
            <img class="card-img-top mb-3" :src="patient.photo" style="height: 250px; object-fit: cover;" alt="">
            <div class="card-body">
              <form @submit.prevent="" ref="editCustomer" enctype="multipart/form-data">
                <input type="file" name="photo" class="form-control mb-1">
                <label class="form-label">Name</label>
                <input type="text" name="name" class="form-control mb-1" :value="patient.name">
                <label class="form-label">Age</label>

                <input type="number" name="age" class="form-control mb-1" :value="patient.age">
                <label class="form-label">Phone</label>

                <input type="number" name="phone" class="form-control mb-1" :value="patient.phone">
                <label class="form-label">Email</label>

                <input type="text" name="email" class="form-control mb-1" :value="patient.email">
                <label class="form-label">Occupation</label>

                <input type="text" name="occupation" class="form-control mb-1" :value="patient.occupation">
                <label class="form-label">Date of Birth</label>

                <input type="date" name="date_of_birth" class="form-control mb-1" :value="patient.date_of_birth">
                <div class="mb-1">
                  <label class="form-label">Gender</label>
                  <div>
                    <div class="form-check form-check-inline">
                      <input :checked="patient.gender == 'male'" class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="male">
                      <label class="form-check-label" for="inlineRadio1">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input :checked="patient.gender == 'female'" class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female">
                      <label class="form-check-label" for="inlineRadio2">Female</label>
                    </div>
                  </div>
                </div>
                <label class="form-label">Address</label>
                <textarea class="form-control mb-3" name="address"  rows="2" :value="patient.address"></textarea>
                <div class="d-flex justify-content-center gap-3">
                  <button :disabled="isLoading == true" @click="status = 'show'" class="btn btn-sm btn-danger">Cancel</button>
                  <button :disabled="isLoading == true" @click="updateCustomer(patient.id)" class="btn btn-sm btn-success">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9">

        <div class="card border-0 p-0">
          <div class="d-flex justify-content-between px-3 pt-3 align-items-center">
            <h6 class="text-secondary fw-normal">Procedure History</h6>
          </div>
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="text-center text-secondary">Date</th>
                <th class="text-center text-secondary">Doctor</th>
                <th class="text-center text-secondary">Diagnosis</th>
                <th class="text-center text-secondary">Follow Up Date</th>
                <th class="text-center text-secondary">Status</th>
                <th class="text-center text-secondary">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="procedures.length < 1">
                <td class="text-center text-secondary" colspan="6">There is no data.</td>
              </tr>
              <tr v-else v-for="procedure in procedures">
                <td class="text-center">{{procedure.date}}</td>
                <td class="text-start">{{procedure.doctor}}</td>
                <td class="text-start" style="width: 200px;">{{procedure.diagnosis_excerpt}}</td>
                <td class="text-center">{{procedure.follow_up_date}}</td>
                <td class="text-center">
                  <span v-if="procedure.status == 'uncheck'" class="badge small bg-warning rounded-pill">{{procedure.status}}</span>
                  <span v-if="procedure.status == 'check'" class="badge small bg-primary rounded-pill">{{procedure.status}}</span>
                </td>
                <td class="text-center">
                  <button @click="procedureDetail(procedure.id,patient.id)" class="btn btn-primary btn-sm"> Detail <i class="fa-solid fa-circle-info ms-2"></i></button>
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
import Tab from "@/components/layout/Tab";
import router from "@/router";
import ProcedureTreatmentList from "@/components/ProcedureTreatmentList";
import Swal from "sweetalert2";
import {mapGetters} from "vuex";
export default {
  name: "PatientDetail",
  components: {ProcedureTreatmentList, Tab, SideNav},
  data() {
    return {
      patient: {},
      procedures: {},
      emr : [],
      status: 'show',
      isLoading: false,
      isEdit: false,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {

    addProcedure(id) {
      router.push({path: '/procedureAdd',query: {id: id}})
    },
    procedureDetail: function (id,p_id) {
      router.push({path: '/procedureDetail/'+id,query: {id:id,p_id}})
    },
    procedureTreatmentDetail(id) {
      router.push({path: '/procedureTreatmentDetail/'+id,query: {id:id}})
    },
    customerEmr(){
      router.push({path: '/previousEmr/'+this.patient.id,query: {id: this.patient.id}})
    },
    show(){
      axios.get(this.getUrl('customer/'+ this.$route.query.id))
          .then(response => response.data.data)
          .then(data=>{
            this.patient = data
            this.procedures = data.procedures
            this.emr = data.customer_emr_obj
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    updateCustomer(id){
      this.isLoading = true
      let formData = new FormData(this.$refs.editCustomer);
      formData.append('_method','PATCH')
      axios.post(this.getUrl('customer/'+id),formData)
        .then( res => {
          this.$store.dispatch('alertSuccess')
        })
        .catch(err => {
          this.$store.dispatch('alertError')
        })
        .finally(_=>{
          this.$refs.editCustomer.reset()
          this.show()
          this.status = 'show'
          this.isLoading = false
        })
      ;
    },
    deleteCustomer: function (id){
      if (confirm('Please Confirm to Delete!') == true){
        this.isLoading = true
        axios.delete(this.getUrl('customer/'+id))
            .then(response => {
              this.$store.dispatch('alertSuccess')
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(_=>{
              this.isLoading = false
              router.push('/patientList')
            })
      }else {

      }
    }
  },
  mounted() {
    this.show()

  }
}
</script>

<style scoped>

</style>