<template>
  <SideNav>
    <div class="my-3">
      <h4 class="fw-normal">Service List</h4>
    </div>
    <div class="row">
      <div class="col-8">
        <div class="card rounded shadow-sm border-0 p-3">
          <table class="table table-borderless table-hover">
            <thead>
            <tr>
              <th class="text-center text-secondary fw-normal">#</th>
              <th class="text-center text-secondary fw-normal">Service Type</th>
              <th class="text-center text-secondary fw-normal">Service Name</th>
              <th class="text-center text-secondary fw-normal">Service Charges</th>
              <th class="text-center text-secondary fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center" v-for="(service,index) in services" :key="'service'+service.id">
              <td>{{index + 1}}</td>
              <td>{{service.type}}</td>
              <td>{{service.name}}</td>
              <td>{{service.price}}</td>
              <td class="d-flex justify-content-center gap-2">
                <button class="btn btn-sm btn-warning" @click="edit(service.id)">Edit</button>
                <button class="btn btn-sm btn-danger" @click="deleteCat(service.id)">Delete</button>
              </td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-4">
        <!--        Create Category-->
        <div v-show="status == 'store'" class="card rounded shadow-sm border-0 p-3">
          <form @submit="storeService" ref="service">
            <h4>Create Service</h4>
            <div class="mb-3">
              <label class="form-label">Service Type</label>
              <select name="type" class="form-select">
                <option value="Doctor Service">Doctor Service</option>
                <option value="Clinical Service">Clinical Service</option>
                <option value="Consultation Service">Consultation Service</option>
                <option value="Dressing Service">Dressing Service</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Service Name</label>
              <input type="text" name="name" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Service Charges</label>
              <input type="number" name="price" class="form-control">
            </div>
            <div class="mb-3">
              <button type="submit" class="btn btn-primary w-100">Save</button>
            </div>
          </form>
        </div>

        <!--        Edit Category-->
        <div v-if="editCategory" v-show="status == 'edit'" class="card rounded shadow-sm border-0 p-3">
          <form @submit="update(editCategory.id)" ref="category">
            <h4>Edit Category</h4>
            <div class="mb-3">
              <label class="form-label">Code</label>
              <input type="text" name="code" class="form-control" :value="editCategory.code">
            </div>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" name="name" class="form-control" :value="editCategory.name">
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="2" :value="editCategory.description"></textarea>
            </div>
            <div class="mb-3 d-flex justify-content-center gap-3">
              <button class="btn btn-danger" @click="status = 'store'">Cancel</button>
              <button class="btn btn-primary" type="submit" >Update</button>
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
export default {
  name: "Service",
  components: {SideNav},
  data() {
    return {
      status: 'store',
      services: null,
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
    storeService() {
      let formData = new FormData(this.$refs.service);
      axios.post(this.$store.state.url+'service',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
          })
          .catch(function (error) {
            console.log(error);
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
      let formData = new FormData(this.$refs.service);
      formData.append('_method','PATCH')

      axios.post(this.$store.state.url+'category/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{

              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteCat(id){
      axios.delete(this.$store.state.url+'category/'+id)
          .then(response => response.data.data)
          .then(data=> {
            this.alertSuccess()
            this.categories = this.categories.filter(el=>el.id != id)
          })
          .catch(function (error) {
            console.log(error);
          });

    },
  },
  mounted() {
    axios.get(this.$store.state.url+'service')
        .then(response=>response.data.data)
        .then(data=>{
          this.services = data

        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<style scoped>

</style>