<template>
  <SideNav>
    <div class="mb-3">
      <h4 class="fw-normal text-secondary">Subcategory List</h4>
    </div>
    <div class="row">
      <div class="col-9">
        <div class="card rounded shadow-sm border-0 p-3">
          <table class="table table-borderless table-hover">
            <thead>
            <tr>
              <th class="text-center text-secondary fw-normal">#</th>
              <th class="text-center text-secondary fw-normal">Code</th>
              <th class="text-center text-secondary fw-normal">Name</th>
              <th class="text-center text-secondary fw-normal">Related Category</th>
              <th class="text-center text-secondary fw-normal">Description</th>
              <th class="text-center text-secondary fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(subcategory,index) in subcategories" :key="'subcategory'+subcategory.id">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center">{{subcategory.code}}</td>
              <td class="text-center">{{subcategory.name}}</td>
              <td class="text-center">{{subcategory.category}}</td>
              <td class="text-center">{{subcategory.description}}</td>
              <td class="d-flex justify-content-center gap-2">
                <button class="btn btn-sm btn-warning" @click="edit(subcategory.id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn btn-sm btn-danger" @click="deleteSubcategory(subcategory.id)">
                  <i class="fa-solid fa-trash-can"></i>

                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-3">
<!--        Store Subcategory-->
        <div v-show="status == 'store'" class="card rounded shadow-sm border-0 p-3">
          <form @submit.prevent="storeSubcategory" ref="subcategory">
            <h4 class="fw-normal text-secondary">Create Subcategory</h4>

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
              <label class="form-label">Choose Category</label>
              <select name="category_id" class="form-select">
                <option v-for="category in categories" :key="'category'+category.id" :value="category.id">{{category.name}}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="2"></textarea>
            </div>
            <div class="mb-3">
              <Button type="submit" color="primary" size="w-100" name="Save"></Button>
            </div>
          </form>
        </div>

<!--        Edit Subcategory-->
        <div v-if="edit_sub" v-show="status == 'edit'" class="card rounded shadow-sm border-0 p-3">
          <form @submit.prevent="" ref="edit_sub">
            <h4 class="fw-normal text-secondary">Edit Subcategory</h4>
            <input type="hidden" name="id" :value="edit_sub.id">
            <div class="mb-3">
              <label class="form-label">Code</label>
              <input type="text" name="code" class="form-control" :value="edit_sub.code">
            </div>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" name="name" class="form-control" :value="edit_sub.name">
            </div>
            <div class="mb-3">
              <label class="form-label">Choose Category</label>
              <select name="category_id" class="form-select">
                <option :selected="category.id == edit_sub.category_id" v-for="category in categories" :key="'category'+category.id" :value="category.id">{{category.name}}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="2" :value="edit_sub.description"></textarea>
            </div>
            <div class="mb-3 justify-content-center d-flex gap-3">
              <button class="btn btn-danger" @click="status = 'store'">Cancel</button>
              <button @click="update" class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </SideNav>

</template>

<script>
import SideNav from "@/components/layout/SideNav";
import Button from "@/components/layout/Button";
import axios from "axios";
export default {
  name: "Subcategory",
  components: {Button, SideNav},
  data() {
    return {
      subcategories: null,
      categories: null,
      status: 'store',
      edit_sub: null,
      errors: null,
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
    storeSubcategory() {
      let formData = new FormData(this.$refs.subcategory);
      axios.post(this.$store.state.url+'subcategory',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.show()
            this.$refs.subcategory.reset()
          })
          .catch(err=>{
            this.errors = err.response.data.errors
            console.log(this.errors)
          });
    },
    edit(id){
      this.status = 'edit'
      axios.get(this.$store.state.url+'show-subcategory/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_sub = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    update(){
      let formData = new FormData(this.$refs.edit_sub);
      // formData.append('_method','PATCH')

      axios.post(this.$store.state.url+'updateSubcategory',formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
            this.show()
            this.alertSuccess()
            this.$refs.edit_sub.reset()
            this.status = 'store'
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteSubcategory(id){
      axios.post(this.$store.state.url+'deleteSubcategory/'+id)
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
      axios.get(this.$store.state.url+'subcategory')
          .then(response => response.data.data)
          .then(data=>{
            this.subcategories = data
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  mounted() {

    this.show()
    axios.get(this.$store.state.url+'category')
        .then(response => response.data.data)
        .then(data=>{
          this.categories = data
        })
        .catch(function (error) {
          console.log(error);
        });
   }
}
</script>

<style scoped>

</style>