<template>
  <SideNav>
    <div class="mb-3">
      <h6 class="fw-normal text-secondary">Patient Register</h6>
    </div>
    <div class="row">
      <div class="col-12 m-auto">
        <div class="card rounded shadow-sm border-0 p-3">
          <div class="row">
<!--            <div class="col-7">-->
<!--              <div>-->
<!--                <img @click="openFile" id="backgroundImg" src="../../assets/cover-image.jpeg" class="img-fluid rounded-4 shadow-sm" alt="...">-->
<!--              </div>-->
<!--            </div>-->
            <div class="col-7 m-auto">
              <div>
<!--                <h4 style="color: #8192ff;" class="text-center text-capitalize mb-3">Patient Registration Form</h4>-->
                <form @submit.prevent="" ref="patient" enctype="multipart/form-data">
                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" name="name" v-if="this.$route.query.name" :value="this.$route.query.name">
                        <input type="text" class="form-control" name="name" v-else>
                        <span v-if="errors.name" class="text-danger small">{{errors.name[0]}}</span>
                        <input v-if="this.$route.query.appointment_id" type="hidden" class="form-control" name="appointment_id" :value="this.$route.query.appointment_id">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Age <span class="text-danger">*</span></label>
                        <input type="number" class="form-control" name="age">
                        <span v-if="errors.age" class="text-danger small">{{errors.age[0]}}</span>

                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Gender <span class="text-danger">*</span></label>
                        <div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="male">
                            <label class="form-check-label" for="inlineRadio1">Male</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female">
                            <label class="form-check-label" for="inlineRadio2">Female</label>
                          </div>
                        </div>
                        <span v-if="errors.gender" class="text-danger small">{{errors.gender[0]}}</span>

                      </div>
                    </div>
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Date of Birth <span class="text-danger">*</span></label>
                        <input type="date" class="form-control" name="date_of_birth">
                        <span v-if="errors.date_of_birth" class="text-danger small">{{errors.date_of_birth[0]}}</span>

                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" name="email">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="mb-3">
                        <label class="form-label">Phone <span class="text-danger">*</span></label>
                        <input type="number" class="form-control" name="phone" v-if="this.$route.query.phone" :value="this.$route.query.phone">
                        <input type="number" class="form-control" name="phone" v-else>
                        <span v-if="errors.phone" class="text-danger small">{{errors.phone[0]}}</span>

                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Occupation</label>
                    <input type="text" class="form-control" name="occupation">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Address <span class="text-danger">*</span></label>
                    <textarea class="form-control" name="address" rows="3"></textarea>
                    <span v-if="errors.address" class="text-danger small">{{errors.address[0]}}</span>

                  </div>
                  <div class="mb-3">
                    <label class="form-label">Choose Photo</label>
                    <input type="file" id="fileInput" class="form-control" name="photo">
                  </div>

                  <div class="mb-3">
                    <button @click="storePatient" type="button" class="btn btn-primary w-100" :disabled="isLoading == true">
                      <span v-if="isLoading == true">
                         <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          Saving...
                      </span>
                      <span v-else>Register</span>

                    </button>
                  </div>


                </form>
              </div>
            </div>
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
import Swal from "sweetalert2";
import {mapGetters} from "vuex";
export default {
  name: "CreatePatient",
  components: {SideNav},
  data() {
    return {
      photo : '',
      isLoading: false,
      errors : {}
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    openFile() {
      let fileInput = document.getElementById('fileInput');
      let backgroundImg = document.getElementById("backgroundImg");
      fileInput.click();
      fileInput.addEventListener('change', function () {
        let file = fileInput.files[0]
        this.photo = file
        console.log(this.photo.name)

        const reader = new FileReader();
        reader.onload = function () {
          backgroundImg.src = reader.result;
          this.photo = reader.result
        }
        reader.readAsDataURL(file)
      })
    },

    storePatient : function() {
      this.isLoading = true
      let formData = new FormData(this.$refs.patient);
      axios.post(this.getUrl('customer'),formData)
          .then( res =>{
            this.$store.dispatch('alertSuccess')
            this.$refs.patient.reset()
            // router.push({path: '/patientDetail/' + data.id, query: {id: data.id}})
          })
          .catch(err=>{
            this.errors = err.response.data.errors
          })
          .finally(_=>{
            this.isLoading = false
          })
      ;
    },

  },
}
</script>

<style scoped>

</style>