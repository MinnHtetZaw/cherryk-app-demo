<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="fw-normal text-secondary">Kit Item</h4>

            <div class="d-flex align-items-center gap-3">
              <div>
                <form class="d-flex" @submit.prevent="" ref="search">
                  <input style="background-color: transparent;" name="search" @keyup="searchItem" type="text" class="form-control form-control-sm rounded-pill" placeholder="Search">
                </form>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItem">Add Kit</button>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="addItem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-primary">
                    <h5 class="modal-title" id="exampleModalLabel">Create New Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="" ref="kit_item">
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
                      <div class="d-flex gap-3 justify-content-end">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button @click="storeKitItem" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
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
    <div class="row">
      <div class="col-12">
        <div class="card border-0 rounded shadow-sm p-3">
          <table class="table table-borderless table-striped table-hover">
            <thead>
            <tr>
              <th class="text-center text-secondary fw-normal">#</th>
              <th class="text-center text-secondary fw-normal">Code</th>
              <th class="text-center text-secondary fw-normal">Name</th>
              <th class="text-center text-secondary fw-normal">Related Brand</th>
              <th class="text-center text-secondary fw-normal">Description</th>
              <th class="text-center text-secondary fw-normal"> Unit</th>
              <th class="text-center text-secondary fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in kit_items">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center">{{item.code}}</td>
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.brand}}</td>
              <td class="text-center">{{item.description}}</td>
              <td class="text-center">
                <button @click="checkUnit(item.id,item.name)" class="btn btn-primary btn-sm">Unit</button>
                <!--                <Button  size="btn-sm" color="primary" name="Check Unit" type="button"></Button>-->
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
                  <h5 class="modal-title">Edit Medicine</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="" ref="edit_kit">
                    <div class="mb-3">
                      <label class="form-label">Code</label>
                      <input type="text" name="code" class="form-control" :value="edit_item.code">
                      <div v-if="errors">
                        <p class="text-danger my-3" >{{errors.code[0]}}</p>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Name</label>
                      <input type="text" name="name" class="form-control" :value="edit_item.name">
                      <div v-if="errors">
                        <p class="text-danger my-3" >{{errors.name[0]}}</p>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Choose Brand</label>
                      <select name="brand_id" class="form-select">
                        <option :selected="brand.id == edit_item.brand_id" :value="brand.id" v-for="brand in brands" :key="'brand'+brand.id">{{brand.name}}</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Description</label>
                      <textarea class="form-control" name="description" rows="2" :value="edit_item.description"></textarea>
                    </div>
                    <div class="d-flex justify-content-end gap-3">
                      <button @click="dis_close" class="btn btn-danger">Cancel</button>
                      <button @click="updateItem(edit_item.id)" class="btn btn-primary">Update</button>
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
import Swal from "sweetalert2";
import router from "@/router";
export default {
  name: "Kit",
  components: {SideNav},
  data() {
    return {
      kit_items : null,
      brands : null,
      edit_item: [],
    }
  },
  methods: {
    alertSuccess: function(){
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
    alertError: function (){
      Swal.fire(
          'Please Try Again!',
          '',
          'error'
      )
    },
    storeKitItem() {
      let formData = new FormData(this.$refs.kit_item);
      axios.post(this.$store.state.url+'kit_item',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.$refs.kit_item.reset()
            this.show()
          })
          .catch(err=>{
            this.errors = err.response.data.errors
            this.alertError()
          });
    },
    editItem: function(id){
      axios.get(this.$store.state.url+'kit_item/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_item = data
          })
          .catch(function (error) {
            console.log(error);
          });
      $('#dis_mod').show();
    },
    updateItem: function(id){
      let formData = new FormData(this.$refs.edit_kit);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'kit_item/'+id,formData
      )
          .then( res => {
            console.log(res)
          })
          .then(data =>{
                this.alertSuccess()
                this.show()
                this.$refs.edit_kit.reset()
                this.dis_close()
              }
          )
          .catch(function (error) {
            console.log(error);
            Swal.fire(
                'Please Try Again!',
                '',
                'error',
            )
          });
    },
    deleteItem: function(id){
      axios.delete(this.$store.state.url+'kit_item/'+id)
          .then(response => response.data.data)
          .then(data=> {
            this.alertSuccess()
            this.show()

          })
          .catch(function (error) {
            console.log(error);
          });
    },
    checkUnit: function (id,name){
      router.push({path: '/kitUnit/'+id,query: { item_id: id,item_name: name}})
    },
    show: function () {
      axios.get(this.$store.state.url+'kit_item')
          .then(response => response.data.data)
          .then(data=>{
            this.kit_items = data
          })
          .catch(function (error) {
            console.log(error)
          });
    },
    showBrand: function (){
      axios.get(this.$store.state.url+'brand')
          .then(response => response.data.data)
          .then(data=>{
            this.brands = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    dis_close: function (){
      $('#dis_mod').hide();
    },
  },
  mounted() {
    this.show()
    this.showBrand()
  }
}
</script>

<style scoped>

</style>