<template>
  <SideNav>
    <div class="mb-3">
      <h6 class="fw-normal text-secondary">Category Lists</h6>
    </div>
    <div class="row">
      <div class="col-9">
        <div class="card border-0 p-0">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="text-center">#</th>
              <th class="text-center">Code</th>
              <th class="text-center">Name</th>
              <th class="text-center">Description</th>
              <th class="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center" v-for="(category,index) in categories" :key="'category'+category.id">
              <td>{{index + 1}}</td>
              <td>{{category.code}}</td>
              <td>{{category.name}}</td>
              <td>{{category.description}}</td>
              <td>
                <div class="d-flex mt-2 justify-content-center gap-4">
                  <i type="button" @click="edit(category.id)" class="fa-solid fa-pen text-warning"></i>
                  <i type="button" @click="deleteCat(category.id)" class="fa-solid fa-trash text-danger"></i>
                </div>
              </td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-3">
<!--        Create Category-->
        <div v-show="status == 'store'" class="card border-0 p-3">
          <form @submit.prevent="" ref="category">
            <h5 class="fw-normal mb-3 text-secondary">Create Category</h5>
            <div class="mb-3">
              <Label label_name="Code"></Label>
              <Input name="code" :error_message="error_message.code"/>

            </div>
            <div class="mb-3">
              <Label label_name="Name"></Label>
              <Input name="name" :error_message="error_message.name"/>
            </div>
            <div class="mb-3">
              <Label label_name="Description"></Label>
              <TextArea name="description" :rows="3"></TextArea>
            </div>
            <div class="mb-3">
              <button @click="storeCategory" class="btn btn-sm btn-primary w-100">Save</button>
            </div>
          </form>
        </div>

<!--        Edit Category-->
        <div v-if="editCategory" v-show="status == 'edit'" class="card border-0 p-3">
          <form @submit.prevent="" ref="edit_category">
            <h5 class="fw-normal mb-3 text-secondary">Edit Category</h5>
            <div class="mb-3">
              <Label label_name="Code"></Label>
              <Input name="code" :value="editCategory.code" :error_message="error_message.code"/>
            </div>
            <div class="mb-3">
              <Label label_name="Name"></Label>
              <Input name="name" :value="editCategory.name" :error_message="error_message.name"/>
            </div>
            <div class="mb-3">
              <Label label_name="Description"></Label>
              <TextArea name="description" :value="editCategory.description" :rows="3"></TextArea>
            </div>
            <div class="mb-3 d-flex justify-content-center align-items-center gap-3">
              <button @click="status = 'store'" class="btn btn-sm btn-danger">Cancel</button>
              <button @click="update(editCategory.id)" class="btn btn-sm btn-success">Update</button>
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
import {ref} from "vue";
import Swal from "sweetalert2";
import Label from "@/components/form-elements/Label";
import Input from "@/components/form-elements/Input";
import TextArea from "@/components/form-elements/TextArea";
export default {
  name: "Category",
  components: {TextArea, Input, Label, Button, SideNav},
  data() {
    return {
      categories : {},
      status : 'store',
      editCategory : {},
      error_message : ''
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
    storeCategory() {
      let formData = new FormData(this.$refs.category);
      axios.post(this.$store.state.url+'category',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.show()
            this.$refs.category.reset()
          })
          .catch(err => {
            this.error_message = err.response.data.errors
          });
    },
    edit(id){
      axios.get(this.$store.state.url+'category/'+id)
          .then(response => response.data.data)
          .then(data=>{
            console.log(data)
            this.editCategory = data
          })
          .catch(function (error) {
            console.log(error);
          });
      this.status = 'edit'
    },
    update(id){
      let formData = new FormData(this.$refs.edit_category);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'category/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
              this.show()
            this.$refs.edit_category.reset()
            this.alertSuccess()
            this.status = 'store'
              }
          )
          .catch(function (error) {
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    deleteCat(id){
      axios.delete(this.$store.state.url+'category/'+id)
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
      axios.get(this.$store.state.url+'category')
          .then(response => response.data.data)
          .then(data=>{
            this.categories = data
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