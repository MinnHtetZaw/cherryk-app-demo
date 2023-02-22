<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-secondary fw-normal">Supplier List</h4>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_Supplier">Add Supplier <i class="fa-solid fa-plus ms-2"></i></button>
          <!-- Modal -->
          <div class="modal fade" id="add_Supplier" tabindex="-1" aria-labelledby="add_SupplierLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header bg-primary">
                  <h5 class="modal-title" id="add_SupplierLabel">Create Supplier</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div>
                    <form @submit.prevent="" ref="supplier">
                      <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="name">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Phone</label>
                        <input type="number" class="form-control" name="phone">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Address</label>
                        <textarea class="form-control" name="address" rows="3"></textarea>
                      </div>
                    </form>
                  </div>
                  <div class="d-flex justify-content-center gap-3 align-items-center">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <button @click="storeSupplier" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
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
      <div class="card border-0">
        <div>
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="text-center">No.</th>
              <th class="text-center">Supplier Name</th>
              <th class="text-center">Phone</th>
              <th class="text-center">Address</th>
              <th class="text-center">Credit Amount ( MMK )</th>
              <th class="text-center">Credit Detail</th>
              <th class="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center" v-for="(supplier,index) in suppliers" :key="'supplier'+supplier.id">
              <td>{{index+1}}</td>
              <td class="">{{supplier.name}}</td>
              <td>{{supplier.phone}}</td>
              <td class="">{{supplier.address}}</td>
              <td>{{supplier.credit_amount}}</td>
              <td>
                <button @click="supplierCreditDetail(supplier.id)" class="btn btn-primary btn-sm">Credit Detail</button>
              </td>
              <td>
                <div class="d-flex mt-2 justify-content-center gap-4">
                  <i type="button" @click="editSupplier(supplier.id)" class="fa-solid fa-pen text-warning"></i>
                  <i type="button" @click="deleteSupplier(supplier.id)" class="fa-solid fa-trash text-danger"></i>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="modal" tabindex="-1" id="dis_mod">
            <div class="modal-dialog">
              <div class="modal-content w-75">
                <div class="modal-header bg-primary">
                  <h5 class="modal-title">Edit Supplier</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="" ref="edit_supplier">
                    <div class="mb-3">
                      <label class="form-label">Name</label>
                      <input type="hidden" :value="edit_supplier.id">
                      <input type="text" class="form-control" name="name" :value="edit_supplier.name">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Phone</label>
                      <input type="number" class="form-control" name="phone" :value="edit_supplier.phone">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Address</label>
                      <textarea class="form-control" name="address" rows="3" :value="edit_supplier.address"></textarea>
                    </div>
                    <button @click="updateSupplier(edit_supplier.id)" class="btn btn-primary">Update</button>
                  </form>
                </div>

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
  name: "SupplierList",
  components: {SideNav},
  data() {
    return {
      suppliers: [],
      edit_supplier: [],
    }
  },
  methods: {
    storeSupplier() {
      let formData = new FormData(this.$refs.supplier);
      axios.post(this.$store.state.url+'supplier',formData
      )
          .then( res => res.data)
          .then(data =>{
                this.$store.dispatch('alertSuccess')
                this.show()
                this.$refs.supplier.reset()
              }
          )
          .catch(err => {
            this.$store.dispatch('alertError')
          });
    },
    editSupplier(id){
      axios.get(this.$store.state.url+'supplier/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_supplier = data
          })
          .catch(function (error) {
            console.log(error);
          });
      $('#dis_mod').show();
    },
    updateSupplier(id){
      let formData = new FormData(this.$refs.edit_supplier);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'supplier/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
            this.$store.dispatch('alertSuccess')
            this.$refs.edit_supplier.reset()
            this.show()
            this.dis_close()

              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteSupplier(id){
      axios.delete(this.$store.state.url+'supplier/'+id)
          .then(response => response.data.data)
          .then(data=> {
            this.$store.dispatch('alertSuccess')
            this.show()
          })
          .catch(err=> {
            this.$store.dispatch('alertError')
          });

    },
    discountModal(e){
      $('#dis_mod').show();
    },
    dis_close(){
      $('#dis_mod').hide();
    },
    show:function (){
      axios.get(this.$store.state.url+'supplier')
          .then(response => response.data.data)
          .then(data=>{
            this.suppliers = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    supplierCreditDetail: function (id){
      router.push({path:'/supplierCreditDetail/'+id, query: {id: id}})
    },
  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped>

</style>