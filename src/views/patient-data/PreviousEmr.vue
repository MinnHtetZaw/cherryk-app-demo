<template>
  <SideNav>
    <div class="mb-3">
      <h4 class="fw-normal text-secondary">Previous EMR</h4>
    </div>
    <div class="row">
      <div class="col-12 m-auto">
        <div class="card mb-3 rounded shadow-sm border-0 p-3">
          <div class="d-flex justify-content-between">
            <div class="mx-5">
              <img :src="patient.photo" style="width: 250px;object-fit: cover;"  alt="">
            </div>
            <table class="table table-borderless">
              <tbody>
              <tr class="text-start">
                <td>Name: {{patient.name}}</td>
              </tr>
              <tr class="text-start">
                <td>Age: {{patient.age}}</td>
              </tr>
              <tr class="text-start">
                <td>Phone: {{patient.phone}}</td>
              </tr>
              <tr class="text-start">
                <td>Email: {{patient.email}}</td>
              </tr>

              </tbody>
            </table>
            <table class="table table-borderless">
              <tbody>
              <tr class="text-start">
                <td>Date of Birth: {{patient.date_of_birth}}</td>
              </tr>
              <tr class="text-start">
                <td>Gender: {{patient.gender}}</td>
              </tr>

              <tr class="text-start">
                <td>Address: {{patient.address}}</td>
              </tr>
              <tr>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 m-auto">
        <div class="card rounded shadow-sm border-0 p-3">
          <div class="row">
            <div class="col-12">
              <form @submit.prevent="" ref="storeEmr" enctype="multipart/form-data">
                <input type="hidden" name="customer_id" :value="patient.id">
                <input type="hidden" name="customer_emr_id" :value="patient.customer_emr_id">
                <div>
                  <div class="mb-3">
                    <label class="form-label">
                      Do Patient Have Any of the Following Health Conditions?
                    </label>
                    <div class="d-flex">
                      <div v-for="health in healths">
                          <div class="form-check form-check-inline">
                            <input name="health_condition_id[]" class="form-check-input" type="checkbox" :id="'health'+health.id" :value="health.id">
                            <label class="form-check-label" :for="'health'+health.id">{{ health.name }}</label>
                          </div>
                      </div>
                    </div>
                    <div>
                      <label class="form-label">Other Health Conditions</label>
                      <textarea name="health_condition" rows="3" class="form-control mb-3 w-25" :value="emr.health_condition"></textarea>
                      <form class="d-inline" @submit.prevent="" ref="health">
                        <div class="d-flex gap-3 align-items-center">

                          <input name="name" type="text" class="form-control w-25">
                          <button @click="storeHealth" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-check"></i>
                          </button>

                        </div>
                      </form>
                    </div>
                    <hr>
                  </div>

                </div>

                <div>
                  <div class="mb-3">
                    <label class="form-label">
                      Do Patient Have Any of the Following Medications?
                    </label>
                    <div class="d-flex">
                      <div v-for="medication in medications">
                        <div class="form-check form-check-inline">
                          <input name="medication_id[]" class="form-check-input" type="checkbox" :id="'medication'+medication.id" :value="medication.id">
                          <label class="form-check-label" :for="'medication'+medication.id">{{ medication.name }}</label>
                        </div>

                      </div>
                    </div>
                    <div>
                      <label class="form-label">Other Medications</label>
                      <textarea name="medications" rows="3" class="form-control mb-3 w-25" :value="emr.medication_des"></textarea>

                      <form class="d-inline" @submit.prevent="" ref="medication">
                        <div class="d-flex gap-3 align-items-center">

                          <input name="name" type="text" class="form-control w-25">
                          <button @click="storeMedication" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-check"></i>
                          </button>

                        </div>
                      </form>
                    </div>
                    <hr>
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label class="form-label">
                      Do Patient Have Any of the Following Drug Allergies?
                    </label>
                    <div class="d-flex">
                      <div v-for="drug in drugs">
                        <div class="form-check form-check-inline">
                          <input name="drug_id[]" class="form-check-input" type="checkbox" :id="'drug'+drug.id" :value="drug.id">
                          <label class="form-check-label" :for="'drug'+drug.id">{{ drug.name }}</label>
                        </div>

                      </div>
                    </div>
                    <div>
                      <label class="form-label">Other Drug Allergies</label>
                      <textarea name="drug_allergy" rows="3" class="form-control mb-3 w-25" :value="emr.drug_allergy"></textarea>

                      <form class="d-inline" @submit.prevent="" ref="drug">
                        <div class="d-flex gap-3 align-items-center">

                          <input name="name" type="text" class="form-control w-25">
                          <button @click="storeDrug" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-check"></i>
                          </button>

                        </div>
                      </form>
                    </div>
                    <hr>
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label class="form-label">
                      Do Patient Have Any of the Following Medical History?
                    </label>
                    <div class="d-flex">
                      <div v-for="medical_history in medical_historys">
                        <div class="form-check form-check-inline">
                          <input name="medical_history_id[]" class="form-check-input" type="checkbox" :id="'medical_history'+medical_history.id" :value="medical_history.id">
                          <label class="form-check-label" :for="'medical_history'+medical_history.id">{{ medical_history.name }}</label>
                        </div>

                      </div>
                    </div>
                    <div>
                      <label class="form-label">Other Medical History</label>
                      <textarea name="medical_history" rows="3" class="form-control mb-3 w-25" :value="emr.medical_history"></textarea>

                      <form class="d-inline" @submit.prevent="" ref="medical_history">
                        <div class="d-flex gap-3 align-items-center">

                          <input name="name" type="text" class="form-control w-25">
                          <button @click="storeMedicalHistory" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-check"></i>
                          </button>

                        </div>
                      </form>
                    </div>
                    <hr>
                  </div>
                </div>

                <div>
                  <div class="mb-3">
                    <label class="form-label text-capitalize">
                      are you interested in any cosmetic dermatology services?
                    </label>
                    <div class="d-flex">
                      <div v-for="cosmetic in cosmetics">
                        <div class="form-check form-check-inline">
                          <input name="cosmetic_id[]" class="form-check-input" type="checkbox" :id="'cosmetic'+cosmetic.id" :value="cosmetic.id">
                          <label class="form-check-label" :for="'cosmetic'+cosmetic.id">{{ cosmetic.name }}</label>
                        </div>

                      </div>
                    </div>
                    <div>
                      <label class="form-label">Other Cosmetic Dermatology</label>
                      <textarea name="cosmetic_dermatology" rows="3" class="form-control mb-3 w-25" :value="emr.cosmetic_dermatology"></textarea>

                      <form class="d-inline" @submit.prevent="" ref="cosmetic">
                        <div class="d-flex gap-3 align-items-center">

                          <input name="name" type="text" class="form-control w-25">
                          <button @click="storeCosmetic" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-check"></i>
                          </button>

                        </div>
                      </form>
                    </div>
                    <hr>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label text-capitalize">do you have any following symptoms?</label>

                  <div class="d-flex gap-3">
                    <select v-model="symptom_id" @change="showSymptomUnit(symptom_id)" class="form-select w-25">
                      <option>Select Symptom</option>
                      <option :value="symptom.id" v-for="symptom in symptoms">{{ symptom.name}}</option>
                    </select>
                    <select v-model="symptom_unit_id" class="form-select w-25">
                      <option>Select Symptom Unit</option>
                      <option :value="unit.id" v-for="unit in symptom_units">{{ unit.unit}}</option>
                    </select>
                    <button @click="addSymptom(symptom_unit_id)" class="btn btn-sm btn-primary">Add</button>
                  </div>
                  <!--                  <div class="d-flex gap-3">-->
                  <!--                    <select v-model="symptom" name="symptom" class="form-select">-->
                  <!--                      <option v-for="symptom in symptoms" :key="'symptom'+symptom.id" :value="symptom.id">{{symptom.name}}</option>-->
                  <!--                    </select>-->
                  <!--                    <button @click="addSymptom(symptom)" class="btn btn-sm btn-primary">Add</button>-->
                  <!--                  </div>-->
                </div>
                <div class="mb-3">
                  <div>
                    <table class="table table-bordered">
                      <tbody>
<!--                      <tr class="table-borderless">-->
<!--                        <td>Other Symptoms</td>-->
<!--                      </tr>-->
<!--                      <tr class="table-borderless">-->
<!--                        <td>-->
<!--                          <select v-model="symptom_name" class="form-select">-->
<!--                            <option :value="symptom.id" v-for="symptom in symptoms">{{symptom.name}}</option>-->
<!--                          </select>-->
<!--                          &lt;!&ndash;                      <input v-model="symptom_name" type="text" class="form-control" id="name">&ndash;&gt;-->
<!--                        </td>-->
<!--                        <td>-->
<!--                          <input v-model="symptom_unit" type="text" class="form-control" id="unit">-->
<!--                        </td>-->
<!--                        &lt;!&ndash;                    <td>&ndash;&gt;-->
<!--                        &lt;!&ndash;                      <select id="condition" class="form-select">&ndash;&gt;-->
<!--                        &lt;!&ndash;                        <option value="Mild">Mild</option>&ndash;&gt;-->
<!--                        &lt;!&ndash;                        <option value="Moderate">Moderate</option>&ndash;&gt;-->
<!--                        &lt;!&ndash;                        <option value="Severe">Severe</option>&ndash;&gt;-->
<!--                        &lt;!&ndash;                      </select>&ndash;&gt;-->
<!--                        &lt;!&ndash;                    </td>&ndash;&gt;-->
<!--                        <td>-->
<!--                          <textarea v-model="symptom_description" id="description" name="" rows="2" class="form-control"></textarea>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                          <button @click="storeSymptomUnit" class="btn btn-primary btn-sm">-->
<!--                            <i class="fa-solid fa-check"></i>-->
<!--                          </button>-->
<!--                        </td>-->
<!--                      </tr>-->
                      <tr v-for="symptom in select_symptom">
                        <!--                    <td>-->
                        <!--                      <i class="text-danger fa-solid fa-circle-minus mb-0"></i>-->
                        <!--                    </td>-->
                        <td>
                          <i @click="deleteSymptom(symptom.id)" class="text-danger fa-solid fa-circle-minus mb-0"></i>
                        </td>
                        <td>
                          <input type="text" class="form-control border-0" readonly :value="symptom.symptom">
                          <input type="hidden" class="form-control border-0" readonly :value="symptom.symptom_id">
                        </td>
                        <td>
                          <input  type="text" class="form-control border-0" readonly :value="symptom.unit">
                          <input name="symptom_unit_id[]" type="hidden" class="form-control border-0" :value="symptom.id">
                        </td>
                        <td>
<!--                          <input type="text" name="condition[]" class="form-control">-->
                          <select name="condition[]" class="form-select">
                            <option value="Mild">Mild</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Severe">Severe</option>
                          </select>
                        </td>
                        <td>
                          <textarea  name="description[]" rows="2" class="form-control"></textarea>
                        </td>
                        <td></td>

                      </tr>


                      </tbody>
                    </table>
                  </div>

                </div>
                <div class="mb-3">
                  <label class="form-label">Medical Document</label>
                  <input type="file" name="file[]" class="form-control w-25" multiple>
                </div>
                <div class="mb-3">
                  <label class="form-label">Remark (Optional)</label>
                  <textarea name="remark" class="form-control" rows="2" value=""></textarea>
                </div>
                <div class="d-flex justify-center">
                  <button @click="storeCustomerEmr(patient.customer_emr_id)" class="btn btn-primary">Save</button>
                </div>
              </form>
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
export default {
  name: "PreviousEmr",
  components: {SideNav},
  data() {
    return {
      symptoms: null,
      select_symptom: [],
      patient : [],
      condition: [],
      other_condition: '',
      diagnosis: '',
      sympton: '',
      symptom_name : '',
      symptom_unit : '',
      symptom_unit_id : '',
      symptom_units : null,
      symptom_id : '',
      symptom_description: '',
      healths : null,
      medications : null,
      drugs: null,
      medical_historys : null,
      cosmetics : null,
      emr: [],

    }
  },
  methods: {
    alertSuccess(){
      this.$swal({
        toast: true,
        position: 'top-end',
        icon: 'success',
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 3000,
        title: 'Success',
      });
    },
    // storeErm() {
    //   let formData = new FormData(this.$refs.erm);
    //   axios.post(this.$store.state.url+'previous_emr',formData)
    //       .then(res=>data.data)
    //       .then(data => {
    //         this.alertSuccess()
    //         console.log(data)
    //
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    // },
    addSymptom(v){
      let symptom = this.symptom_units.filter(el=>el.id == v);
      let symptom_obj = {
        id : symptom[0].id,
        symptom_id : symptom[0].symptom_id,
        symptom : symptom[0].symptom,
        unit : symptom[0].unit,
      };

      console.log(symptom_obj)
      this.select_symptom.push(symptom_obj)
    },
    deleteSymptom(id){
      this.select_symptom = this.select_symptom.filter(el=>el.id != id)
    },
    // storePreviousEMR(){
    //   let previousEMR = {
    //     customer_id: this.$route.query.id,
    //     remark: this.other_condition,
    //     diagnosis: this.diagnosis,
    //     condition: this.condition,
    //     symptom_id: this.select_symptom,
    //   }
    //   console.log(previousEMR)
    //   axios.post(this.$store.state.url+'previous_emr',previousEMR)
    //       .then(res =>res.data)
    //       .then(data => {
    //         this.alertSuccess()
    //         router.push({path: '/patientDetail/' + this.$route.query.id, query: {id: this.$route.query.id}})
    //       })
    //       // .then(data=> {
    //       //       router.push({path: '/customerDetails/' + this.$route.query.id, query: {id: this.$route.query.id}})
    //       //     }
    //       // )
    //       .catch(function (error) {
    //         console.log(error);
    //         Swal.fire(
    //             'Please Try Again!',
    //             '',
    //             'error'
    //         )
    //       });
    // },

    storeSymptomUnit(){
      let symptom = {
        symptom_id : this.symptom_name,
        unit : this.symptom_unit,
        description: this.symptom_description,
      };
      axios.post(this.$store.state.url+'symptom_unit',symptom)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.alertSuccess()
            this.showSymptom()
            this.symptom_unit= this.symptom_description = ''
          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    showSymptom(){
      axios.get(this.$store.state.url+'symptom')
          .then(response => response.data.data)
          .then(data=>{
            this.symptoms = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    showSymptomUnit(id){
      axios.get(this.$store.state.url+'symptom_unit')
          .then(response => response.data.data)
          .then(data=>{
            this.symptom_units = data.filter(el=>el.symptom_id == id)
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    // EMR
    // Health Condition
    storeHealth(){
      let formData = new FormData(this.$refs.health);
      axios.post(this.$store.state.url+'health',formData)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.alertSuccess()
            this.showHealth()
            this.$refs.health.reset()
          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    showHealth(){
      axios.get(this.$store.state.url+'health')
          .then(response => response.data.data)
          .then(data=>{
            this.healths = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    // Medication
    storeMedication(){
      let formData = new FormData(this.$refs.medication);
      axios.post(this.$store.state.url+'medication',formData)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.alertSuccess()
            this.showMedication()
            this.$refs.medication.reset()
          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    showMedication(){
      axios.get(this.$store.state.url+'medication')
          .then(response => response.data.data)
          .then(data=>{
            this.medications = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    // Drug
    storeDrug(){
      let formData = new FormData(this.$refs.drug);
      axios.post(this.$store.state.url+'drug',formData)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.alertSuccess()
            this.showDrug()
            this.$refs.drug.reset()
          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    showDrug(){
      axios.get(this.$store.state.url+'drug')
          .then(response => response.data.data)
          .then(data=>{
            this.drugs = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    // MedicalHistory
    storeMedicalHistory(){
      let formData = new FormData(this.$refs.medical_history);
      axios.post(this.$store.state.url+'medical_history',formData)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.alertSuccess()
            this.showMedicalHistory()
            this.$refs.medical_history.reset()
          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    showMedicalHistory(){
      axios.get(this.$store.state.url+'medical_history')
          .then(response => response.data.data)
          .then(data=>{
            this.medical_historys = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    // MedicalHistory
    storeCosmetic(){
      let formData = new FormData(this.$refs.cosmetic);
      axios.post(this.$store.state.url+'cosmetic',formData)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.alertSuccess()
            this.showCosmetic()
            this.$refs.cosmetic.reset()
          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    showCosmetic(){
      axios.get(this.$store.state.url+'cosmetic')
          .then(response => response.data.data)
          .then(data=>{
            this.cosmetics = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    storeCustomerEmr(id){
      let formData = new FormData(this.$refs.storeEmr);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'customer_emr/'+id,formData)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.alertSuccess()
            // this.$refs.storeEmr.reset()
            router.push({path: '/patientDetail/' + this.$route.query.id, query: {id: this.$route.query.id}})

          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    }

  },
  mounted() {
    this.showSymptom()
    this.showHealth()
    this.showMedication()
    this.showDrug()
    this.showMedicalHistory()
    this.showCosmetic()

    axios.get(this.$store.state.url+'customer/'+this.$route.query.id)
        .then(response => response.data.data)
        .then(data=>{
          this.patient = data
          this.emr = data.customer_emr_obj
        })
        .catch(function (error) {
          console.log(error);
        });

  }
}
</script>

<style scoped>

</style>