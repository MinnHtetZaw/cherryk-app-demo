<template>
<SideNav>
  <div class="mb-3">
    <h4 class="fw-normal text-secondary">Brand List</h4>
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
            <th class="text-center text-secondary fw-normal">Category</th>
            <th class="text-center text-secondary fw-normal">Subcategory</th>
            <th class="text-center text-secondary fw-normal">Description</th>
            <th class="text-center text-secondary fw-normal">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(brand,index) in brands" :key="'brand'+brand.id">
            <td class="text-center">{{index + 1}}</td>
            <td class="text-center">{{brand.code}}</td>
            <td class="text-center">{{brand.name}}</td>
            <td class="text-center">{{brand.category}}</td>
            <td class="text-center">{{brand.subcategory}}</td>
            <td class="text-center">{{brand.description}}</td>
            <td class="d-flex justify-content-center gap-2">
              <button class="btn btn-warning btn-sm" @click="editBrand(brand.id)">
                <i class="fa-solid fa-pen-to-square"></i>

              </button>
              <button class="btn btn-danger btn-sm" @click="deleteBrand(brand.id)">
                <i class="fa-solid fa-trash-can"></i>

              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-3">
<!--      Store-->
      <div v-show="status == 'store'" class="card rounded shadow-sm border-0 p-3">
        <form @submit.prevent="storeBrand" ref="brand">
          <h4 class="fw-normal text-secondary">Create Brand</h4>
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
            <label class="form-label">Choose Subcategory</label>
            <select name="sub_category_id" class="form-select">
              <option v-for="subcategory in subcategories" :key="'subcategory'+subcategory.id" :value="subcategory.id">{{subcategory.name}}</option>
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

<!--      Edit-->
      <div v-if="edit_brand" v-show="status == 'edit'" class="card rounded shadow-sm border-0 p-3">
        <form @submit.prevent="" ref="edit_brand">
          <h4 class="fw-normal text-secondary">Edit Brand</h4>
          <div class="mb-3">
            <label class="form-label">Code</label>
            <input type="text" name="code" class="form-control" :value="edit_brand.code">
          </div>
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" name="name" class="form-control" :value="edit_brand.name">
          </div>
          <div class="mb-3">
            <label class="form-label">Choose Category</label>
            <select name="category_id" class="form-select">
              <option :selected="edit_brand.category_id == category.id" v-for="category in categories" :key="'category'+category.id" :value="category.id">{{category.name}}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Choose Subcategory</label>
            <select name="sub_category_id" class="form-select">
              <option :selected="subcategory.id == edit_brand.sub_category_id" v-for="subcategory in subcategories" :key="'subcategory'+subcategory.id" :value="subcategory.id">{{subcategory.name}}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control" name="description" rows="2" :value="edit_brand.description"></textarea>
          </div>
          <div class="mb-3 d-flex justify-content-center gap-3">
            <button class="btn btn-danger" @click="status = 'store'">Cancel</button>
            <button @click="updateBrand(edit_brand.id)" class="btn btn-primary">Update</button>
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
import Button from "@/components/layout/Button";
export default {
  name: "Brand",
  components: {Button, SideNav},
  data() {
    return {
      brands: [],
      categories: null,
      subcategories: null,
      status: 'store',
      edit_brand : null,
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
    storeBrand() {
      let formData = new FormData(this.$refs.brand);
      axios.post(this.$store.state.url+'brand',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.$refs.brand.reset()
            this.show()
          })
          .catch(err=>{
            this.errors = err.response.data.errors
          });
    },
    editBrand(id){
      axios.get(this.$store.state.url+'brand/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_brand = data
          })
          .catch(function (error) {
            console.log(error);
          });
      this.status = 'edit'
    },
    updateBrand(id){
      let formData = new FormData(this.$refs.edit_brand);
      formData.append('_method','PATCH')

      axios.post(this.$store.state.url+'brand/'+id,formData
      )
          .then( res => res.data.data)
          .then(data =>{
                this.alertSuccess()
            this.show()
            this.$refs.edit_brand.reset()
            this.status = 'store'
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteBrand(id){
      axios.post(this.$store.state.url+'deleteBrand/'+id)
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
      axios.get(this.$store.state.url+'brand')
          .then(response => response.data.data)
          .then(data=>{
            this.brands = data
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
    axios.get(this.$store.state.url+'subcategory')
        .then(response => response.data.data)
        .then(data=>{
          this.subcategories = data
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<style scoped>

</style>