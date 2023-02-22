<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="d-flex mb-3 justify-content-between align-items-center">
          <h4 class="fw-normal text-secondary">Procedure Medicine List</h4>
          <div class="d-flex align-items-center gap-3">
            <div>
              <form class="d-flex" @submit.prevent="" ref="search">
                <input style="background-color: transparent;" name="search" @keyup="searchItem" type="text" class="form-control form-control-sm rounded-pill" placeholder="Search">
              </form>
            </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItem">Add Item</button>
          </div>

          <!-- Modal -->
          <div class="modal fade" id="addItem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header bg-primary">
                  <h5 class="modal-title" id="exampleModalLabel">Create New Procedure Medicine</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="" ref="item">
                    <div class="mb-3">
                      <label class="form-label">Code</label>
                      <input type="text" name="code" class="form-control">
                      <div v-if="errors">
                        <p class="text-danger my-3" >{{errors.code[0]}}</p>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Name</label>
                      <input type="text" name="name" class="form-control">
                      <div v-if="errors">
                        <p class="text-danger my-3" >{{errors.name[0]}}</p>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Choose Brand</label>
                      <select name="brand_id" class="form-select">
                        <option :value="brand.id" v-for="brand in brands" :key="'brand'+brand.id">{{brand.name}}</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Description</label>
                      <textarea class="form-control" name="description" rows="2"></textarea>
                    </div>
                    <div class="d-flex justify-content-end gap-3">
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      <button @click="storeItem" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                    </div>
                  </form>
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
              <th class="text-center text-secondary fw-normal">Brand</th>
              <th class="text-center text-secondary fw-normal">Description</th>
              <th class="text-center text-secondary fw-normal">Unit</th>
              <th class="text-center text-secondary fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in items" :key="'item'+item.id">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center">{{item.code}}</td>
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.brand}}</td>
              <td class="text-center">{{item.description}}</td>
              <td class="text-center">
                <button class="btn btn-primary btn-sm" @click="checkUnit(item.id,item.name)">Unit</button>
              </td>
              <td class="d-flex justify-content-center gap-2">
                <button @click="editItem(item.id)" class="btn btn-warning btn-sm">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button @click="deleteItem(item.id)" class="btn btn-danger btn-sm">
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
                  <h5 class="modal-title">Edit Procedure Medicine</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="" ref="edit_item">
                    <div class="mb-3">
                      <label class="form-label">Code</label>
                      <input type="text" name="code" class="form-control" :value="edit_item.code">
                      <div v-if="edit_errors">
                        <p class="text-danger my-3" >{{edit_errors.code[0]}}</p>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Name</label>
                      <input type="text" name="name" class="form-control" :value="edit_item.name">
                      <div v-if="edit_errors">
                        <p class="text-danger my-3" >{{edit_errors.name[0]}}</p>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Choose Brand</label>
                      <select name="brand_id" class="form-select">
                        <option :value="brand.id" v-for="brand in brands" :key="'brand'+brand.id">{{brand.name}}</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Description</label>
                      <textarea class="form-control" name="description" rows="2" :value="edit_item.description"></textarea>
                    </div>
                    <div class="mb-3">
                      <button @click="updateItem(edit_item.id)" class="btn btn-primary w-100">Update</button>
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
export default {
  name: "ProcedureItem",
  components: {SideNav},
  data() {
    return {
      status: 'store',
      brands: null,
      items: null,
      errors: null,
      edit_item: [],
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
      let formData = new FormData(this.$refs.item);
      axios.post(this.$store.state.url+'procedure_item',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.$refs.item.reset()
            this.show()
          })
          .catch(err=>{
            this.errors = err.response.data.errors
          });
    },
    editItem(id){
      axios.get(this.$store.state.url+'procedure_item/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_item = data
          })
          .catch(function (error) {
            console.log(error);
          });
      $('#dis_mod').show();
    },
    updateItem(id){
      let formData = new FormData(this.$refs.edit_item);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'procedure_item/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
                this.alertSuccess()
            this.$refs.edit_item.reset()
                this.show()
            this.dis_close()
              }
          )
          .catch(err => {
            this.edit_errors = err.response.data.errors
          });
    },
    dis_close(){
      $('#dis_mod').hide();
    },
    deleteItem(id){
      axios.delete(this.$store.state.url+'procedure_item/'+id)
          .then(response => response.data.data)
          .then(data=> {
            this.alertSuccess()
            this.show()

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    searchItem(){
      let formData = new FormData(this.$refs.search)
      axios.post(this.$store.state.url+'procedure-item-search',formData)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.items = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    checkUnit(id,name){
      router.push({path: '/procedureItemUnit/'+id,query: { id: id,name: name}})
    },
    show(){
      axios.get(this.$store.state.url+'procedure_item')
          .then(response => response.data.data)
          .then(data=>{

            this.items = data
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  mounted() {
    this.show()
    axios.get(this.$store.state.url+'brand')
        .then(response => response.data.data)
        .then(data=>{
          this.brands = data
        })
        .catch(function (error) {
          console.log(error);
        });


  }
}
</script>

<style scoped>

</style>