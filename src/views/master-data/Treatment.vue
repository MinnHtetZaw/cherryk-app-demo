<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="fw-normal text-secondary">Treatment List</h4>
            <div class="d-flex gap-3 align-items-center">
              <div>
                <form class="d-flex" @submit.prevent="" ref="search">
                  <input style="background-color: transparent;" name="search" @keyup="searchItem" type="text" class="form-control form-control-sm rounded-pill" placeholder="Search">
                </form>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItem">Add Treatment</button>
              <!-- Modal -->
              <div class="modal fade" id="addItem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-primary">
                      <h5 class="modal-title" id="exampleModalLabel">Create New Treatment</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="" ref="treatment">
                        <div class="mb-3">
                          <label class="form-label">Code</label>
                          <input type="text" name="code" class="form-control">
                        </div>
                        <div v-if="errors">
                          <p class="text-danger my-3">{{errors.code[0]}}</p>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Name</label>
                          <input type="text" name="name" class="form-control">
                        </div>
                        <div v-if="errors">
                          <p class="text-danger my-3" >{{errors.name[0]}}</p>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Choose Body Parts</label>
                          <select name="body_part" class="form-select">
                            <option value="Face">Face</option>
                            <option value="Body">Body</option>
                            <option value="Body Injection">Body Injection</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Description</label>
                          <textarea class="form-control" name="description" rows="2"></textarea>
                        </div>
                        <div class="d-flex justify-content-end gap-3">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                          <button @click="storeItem" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            </div>

        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card rounded shadow-sm border-0 p-3">
          <table class="table table-striped table-borderless table-hover">
            <thead>
            <tr>
              <th class="text-center text-secondary fw-normal">#</th>
              <th class="text-center text-secondary fw-normal">Code</th>
              <th class="text-center text-secondary fw-normal">Name</th>
              <th class="text-center text-secondary fw-normal">Body Part</th>
              <th class="text-center text-secondary fw-normal">Description</th>
              <th class="text-center text-secondary fw-normal">Treatment Unit</th>
              <th class="text-center text-secondary fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="treatments" v-for="(treatment,index) in treatments" :key="'treatment'+treatment.id">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center">{{treatment.code}}</td>
              <td class="text-center">{{treatment.name}}</td>
              <td class="text-center">{{treatment.body_part}}</td>
              <td style="width: 350px;" class="text-center">{{treatment.description}}</td>
              <td class="text-center">
                <button @click="checkUnit(treatment.id,treatment.name)" class="btn btn-primary btn-sm">Check Unit</button>
              </td>
              <td class="d-flex justify-content-center gap-2">
                <button @click="editItem(treatment.id)" class="btn btn-warning btn-sm">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button @click="deleteItem(treatment.id)" class="btn btn-danger btn-sm">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>

          <div class="modal" tabindex="-1" id="dis_mod">
            <div class="modal-dialog">
              <div class="modal-content w-75">
                <div class="modal-header bg-primary">
                  <h5 class="modal-title">Edit Treatment</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="" ref="edit_treatment">
                    <div class="mb-3">
                      <label class="form-label">Code</label>
                      <input type="text" name="code" class="form-control" :value="edit_treatment.code">
                    </div>
                    <div v-if="edit_errors">
                      <p class="text-danger my-3" >{{edit_errors.code[0]}}</p>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Name</label>
                      <input type="text" name="name" class="form-control" :value="edit_treatment.name">
                    </div>
                    <div v-if="edit_errors">
                      <p class="text-danger my-3" >{{edit_errors.name[0]}}</p>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Choose Body Parts</label>
                      <select name="body_part" class="form-select">
                        <option :selected="edit_treatment.body_part == 'Face'" value="Face">Face</option>
                        <option :selected="edit_treatment.body_part == 'Body'" value="Body">Body</option>
                        <option :selected="edit_treatment.body_part == 'Body Injection'" value="Body Injection">Body Injection</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Description</label>
                      <textarea class="form-control" name="description" rows="2" :value="edit_treatment.description"></textarea>
                    </div>
                    <div class="mb-3">
                      <button type="submit" @click="updateTreatment(edit_treatment.id)" class="btn btn-primary w-100">
                        Update
                      </button>
                    </div>
                  </form>
                </div>

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
export default {
  name: "Treatment",
  components: {SideNav},
  data() {
    return {
      treatments : null,
      errors: null,
      edit_treatment: [],
      edit_errors: null,
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
    storeItem() {
      let formData = new FormData(this.$refs.treatment);
      axios.post(this.$store.state.url+'treatment',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.show()
            this.$refs.treatment.reset()
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
    editItem(id){
      axios.get(this.$store.state.url+'treatment/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_treatment = data
          })
          .catch(function (error) {
            console.log(error);
          });
      $('#dis_mod').show();
    },
    updateTreatment(id){
      let formData = new FormData(this.$refs.edit_treatment);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'treatment/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
                this.alertSuccess()
                this.show()
                this.$refs.edit_treatment.reset()
                this.dis_close()
              }
          )
          .catch(err=>{
            this.edit_errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    deleteItem(id){
      axios.delete(this.$store.state.url+'item/'+id)
          .then(response => response.data.data)
          .then(data=> {
            this.alertSuccess()
            this.items = this.items.filter(el =>el.id !== id)

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    dis_close(){
      $('#dis_mod').hide();
    },

    checkUnit(id,name){
      router.push({path: '/treatmentUnit/'+id,query: { id: id,name: name}})
    },
    show: function(){
      axios.get(this.$store.state.url+'treatment')
          .then(res => res.data.data)
          .then(data=>{
            this.treatments = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    searchItem: function (){
      let formData = new FormData(this.$refs.search)
      axios.post(this.$store.state.url+'treatment-search',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.treatments = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped>

</style>