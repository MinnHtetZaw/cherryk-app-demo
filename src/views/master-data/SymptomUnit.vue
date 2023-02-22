<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <h4 class="text-secondary fw-normal">Symptom Unit List</h4>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-9">
      <div class="card shadow-sm rounded border-0 p-3">
        <h5 class="text-secondary fw-normal">{{symptom.name}}'s Unit</h5>
        <table class="table table-borderless">
          <thead>
          <tr>
            <th class="text-secondary fw-normal text-center">No.</th>
            <th class="text-secondary fw-normal text-center">Symptom Unit</th>
            <th class="text-secondary fw-normal text-center">Description</th>
            <th class="text-secondary fw-normal text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(symptom_unit,index) in symptom.symptom_units">
            <td class="text-center">{{index + 1}}</td>
            <td class="text-center">{{symptom_unit.unit}}</td>
            <td class="text-center">{{symptom_unit.description}}</td>
            <td class="d-flex justify-content-center gap-3">
              <button @click="editSymptomUnit(symptom_unit.id)" class="btn btn-sm btn-warning">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button @click="deleteSymptomUnit(symptom_unit.id)" class="btn btn-sm btn-danger">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-3">
      <div v-if="status == 'store'" class="card shadow-sm rounded border-0 p-3">
        <h5 class="fw-normal mb-3 text-secondary">Create Symptom Unit</h5>
        <form @submit.prevent="" ref="symptomUnit">
          <div class="mb-3">
            <label class="form-label">Symptom Unit</label>
            <input type="text" class="form-control" name="unit">
          </div>
          <input type="hidden" name="symptom_id" :value="symptom.id">
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea name="description" rows="3" class="form-control"></textarea>
          </div>
          <div class="mb-3">
            <button @click="storeSymptomUnit" class="btn btn-primary w-100">Save</button>
          </div>
        </form>
      </div>

<!--      Edit-->
      <div v-if="status == 'edit'" class="card shadow-sm rounded border-0 p-3">
        <h5 class="fw-normal mb-3 text-secondary">Edit Symptom Unit</h5>
        <form @submit.prevent="" ref="editSymptomUnit">
          <div class="mb-3">
            <label class="form-label">Symptom Unit</label>
            <input type="text" class="form-control" name="unit" :value="symptomUnit.unit">
          </div>
          <input type="hidden" name="symptom_id" :value="symptom.id">
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea name="description" rows="3" class="form-control" :value="symptomUnit.description"></textarea>
          </div>
          <div class="d-flex justify-content-center gap-3 mb-3">
            <button @click="status = 'store'" class="btn btn-danger">Cancel</button>
            <button @click="updateSymptomUnit(symptomUnit.id)" class="btn btn-primary">Update</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "SymptomUnit",
  components: {SideNav},
  data() {
    return {
      symptom : [],
      symptomUnit: [],
      status : 'store',
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
    storeSymptomUnit() {
      let formData = new FormData(this.$refs.symptomUnit);

      axios.post(this.$store.state.url+'symptom_unit',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.show()
            this.$refs.symptomUnit.reset()
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
    editSymptomUnit(id){
      axios.get(this.$store.state.url+'symptom_unit/'+id)
          .then(res=>res.data.data)
          .then(data=>{
            this.symptomUnit = data
          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
      this.status = 'edit'
    },
    updateSymptomUnit(id){
      let formData = new FormData(this.$refs.editSymptomUnit);
      formData.append('_method','PATCH')

      axios.post(this.$store.state.url+'symptom_unit/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
                this.alertSuccess()
                this.show()
                this.$refs.editSymptomUnit.reset()
                this.status = 'store'
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteSymptomUnit(id){
      axios.delete(this.$store.state.url+'symptom_unit/'+id)
          .then(response => response.data.data)
          .then(data=> {
            this.alertSuccess()
            this.show()

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    show(){
      axios.get(this.$store.state.url+'symptom/'+ this.$route.query.id)
          .then(response => response.data.data)
          .then(data=>{
            this.symptom = data
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped>

</style>