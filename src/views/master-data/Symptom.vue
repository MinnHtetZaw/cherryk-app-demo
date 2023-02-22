<template>
  <SideNav>
    <div class="mb-3">
      <h4 class="fw-normal text-secondary">Symptom List</h4>
    </div>
    <div class="row">
      <div class="col-9">
        <div class="card rounded shadow-sm border-0 p-3">
          <table class="table table-borderless table-hover">
            <thead>
            <tr>
              <th class="text-center text-secondary fw-normal">#</th>
              <th class="text-center text-secondary fw-normal">Symptom Name</th>
              <th class="text-center text-secondary fw-normal">Description</th>
              <th class="text-center text-secondary fw-normal">Unit</th>
              <th class="text-center text-secondary fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center" v-for="(symptom,index) in symptoms" :key="'symptom'+symptom.id">
              <td>{{index + 1}}</td>
              <td>{{symptom.name}}</td>
              <td>{{symptom.description}}</td>
              <td>
                <button @click="checkUnit(symptom.id)" class="btn btn-primary btn-sm">Unit</button>
              </td>
              <td class="d-flex justify-content-center gap-2">
                <button class="btn btn-sm btn-warning" @click="edit(symptom.id)">
                  <i class="fa-solid fa-pen-to-square"></i>

                </button>
                <button class="btn btn-sm btn-danger" @click="deleteCat(symptom.id)">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-3">
        <!--        Create Category-->
        <div v-show="status == 'store'" class="card rounded shadow-sm border-0 p-3">
          <form @submit.prevent="" ref="symptom">
            <h4 class="text-secondary">Create Symptom</h4>
            <div class="mb-3">
              <label class="form-label">Symptom Type</label>
              <input type="text" name="name" class="form-control">
            </div>
<!--            <div class="mb-3">-->
<!--              <label class="form-label">Symptom Name</label>-->
<!--              <input type="text" name="name" class="form-control">-->
<!--            </div>-->
<!--            <div class="mb-3">-->
<!--              <label class="form-label">Condition</label>-->
<!--              <input type="text" name="condition" class="form-control">-->
<!--            </div>-->
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="2"></textarea>
            </div>
            <div class="mb-3">
              <button @click="storeSymptom" class="btn btn-primary w-100">Save</button>
            </div>
          </form>
        </div>

        <!--        Edit Category-->
        <div  v-show="status == 'edit'" class="card rounded shadow-sm border-0 p-3">
          <form @submit.prevent="" ref="edit_symptom">
            <h4 class="text-secondary">Edit Symptom</h4>

            <div class="mb-3">
              <label class="form-label">Symptom Name</label>
              <input type="text" name="name" class="form-control" :value="edit_symptom.name">
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="3" :value="edit_symptom.description"></textarea>
            </div>
            <div class="mb-3 d-flex justify-content-center gap-3">
              <button @click="status = 'store'" class="btn btn-danger w-100">Cancel</button>
              <button @click="updateSymptom(edit_symptom.id)" class="btn btn-primary w-100">Save</button>
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
import router from "@/router";
export default {
  name: "Symptom",
  components: {SideNav},
  data() {
    return {
      status: 'store',
      symptoms: null,
      edit_symptom : [],
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
    storeSymptom() {
      let formData = new FormData(this.$refs.symptom);
      axios.post(this.$store.state.url+'symptom',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.show()
            this.$refs.symptom.reset()
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    edit(id){
      axios.get(this.$store.state.url+'symptom/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_symptom = data
          })
          .catch(function (error) {
            console.log(error);
          });
      this.status = 'edit'
    },
    updateSymptom(id){
      let formData = new FormData(this.$refs.edit_symptom);
      formData.append('_method','PATCH')

      axios.post(this.$store.state.url+'symptom/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
              this.alertSuccess()
            this.$refs.edit_symptom.reset()
            this.status = 'store'

            this.show()
              }
          )
          .catch(function (error) {
            console.log(error)
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    deleteCat(id){
      axios.delete(this.$store.state.url+'symptom/'+id)
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
      axios.get(this.$store.state.url+'symptom')
          .then(response => response.data.data)
          .then(data=>{
            this.symptoms = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    checkUnit(id){
      router.push({path: '/symptomUnit/'+id,query: { id: id}})
    }
  },
  mounted() {
    this.show()
  }

}
</script>

<style scoped>

</style>