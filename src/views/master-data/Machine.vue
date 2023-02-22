<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="fw-normal text-secondary">Machine List</h4>
<!--            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItem">Add Machine</button>-->
            <!-- Modal -->
<!--            <div class="modal fade" id="addItem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
<!--              <div class="modal-dialog">-->
<!--                <div class="modal-content">-->
<!--                  <div class="modal-header">-->
<!--                    <h5 class="modal-title text-secondary" id="exampleModalLabel">Create New Machine</h5>-->
<!--                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--                  </div>-->
<!--                  <div class="modal-body">-->
<!--                    <form @submit.prevent="storeItem" ref="machine">-->
<!--                      <div class="mb-3">-->
<!--                        <label class="form-label">Code</label>-->
<!--                        <input type="text" name="code" class="form-control">-->
<!--                      </div>-->
<!--                      <div v-if="errors">-->
<!--                        <p class="text-danger my-3" >{{errors.code[0]}}</p>-->
<!--                      </div>-->
<!--                      <div class="mb-3">-->
<!--                        <label class="form-label">Name</label>-->
<!--                        <input type="text" name="name" class="form-control">-->
<!--                      </div>-->
<!--                      <div v-if="errors">-->
<!--                        <p class="text-danger my-3" >{{errors.name[0]}}</p>-->
<!--                      </div>-->
<!--                      <div class="mb-3">-->
<!--                        <label class="form-label">Choose Brand</label>-->
<!--                        <select name="brand_id" class="form-select">-->
<!--                          <option :value="brand.id" v-for="brand in brands" :key="'brand'+brand.id">{{brand.name}}</option>-->
<!--                        </select>-->
<!--                      </div>-->
<!--                      &lt;!&ndash;                    <div class="mb-3">&ndash;&gt;-->
<!--                      &lt;!&ndash;                      <label class="form-label">Purchase Price</label>&ndash;&gt;-->
<!--                      &lt;!&ndash;                      <input type="number" name="purchase_price" class="form-control">&ndash;&gt;-->
<!--                      &lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                      <div v-if="errors">-->
<!--                        <p class="text-danger my-3" >{{errors.purchase_price[0]}}</p>-->
<!--                      </div>-->
<!--                      <div class="mb-3">-->
<!--                        <label class="form-label">Per Unit Selling Price</label>-->
<!--                        <div class="d-flex gap-3">-->
<!--                          <input type="number" name="per_unit_qty" class="form-control" placeholder="Per Unit Qty">-->
<!--                          <input type="number" name="selling_price" class="form-control" placeholder="Selling Price">-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      <div class="mb-3">-->
<!--                        <label class="form-label">Description</label>-->
<!--                        <textarea class="form-control" name="description" rows="2"></textarea>-->
<!--                      </div>-->
<!--                      <div class="modal-footer">-->
<!--                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>-->
<!--                        <button class="btn btn-primary" type="submit">Save</button>-->
<!--                      </div>-->
<!--                    </form>-->
<!--                  </div>-->

<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
          </div>

        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-end mb-3">

        </div>
        <div class="card rounded shadow-sm border-0 p-3">
          <table class="table table-striped table-borderless table-hover">
            <thead>
            <tr>
              <th class="text-center text-secondary fw-normal">#</th>
              <th class="text-center text-secondary fw-normal">Code</th>
              <th class="text-center text-secondary fw-normal">Name</th>
              <th class="text-center text-secondary fw-normal">Selling Price</th>
              <th class="text-center text-secondary fw-normal">Description</th>
              <th class="text-center text-secondary fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in items" :key="'item'+item.id">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center">{{item.code}}</td>
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.selling_price}}</td>
              <td class="text-center">{{item.description}}</td>
              <td class="d-flex justify-content-center gap-2">
                <button class="btn btn-warning btn-sm" @click="editMachine(item.id)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button @click="deleteMachine(item.id)" class="btn btn-danger btn-sm">
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
                  <h5 class="modal-title">Edit Machine</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="" ref="edit_machine">
                    <div class="mb-3">
                      <label class="form-label">Code</label>
                      <input type="text" name="code" class="form-control" :value="edit_machine.code">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Name</label>
                      <input type="text" name="name" class="form-control" :value="edit_machine.name">
                    </div>

<!--                    <div class="mb-3">-->
<!--                      <label class="form-label">Purchase Price</label>-->
<!--                      <input type="number" name="purchase_price" class="form-control" :value="edit_machine.purchase_price">-->
<!--                    </div>-->
                    <div class="mb-3">
                      <label class="form-label">Per Unit Selling Price</label>
                      <div class="d-flex gap-3">
                        <input type="number" name="per_unit_qty" class="form-control" placeholder="Per Unit Qty" :value="edit_machine.per_unit_qty">
                        <input type="number" name="selling_price" class="form-control" placeholder="Selling Price" :value="edit_machine.selling_price">
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Description</label>
                      <textarea class="form-control" name="description" rows="3" :value="edit_machine.description"> </textarea>
                    </div>
                    <div class="mb-3 d-flex justify-content-end">
                      <button @click="updateMachine(edit_machine.id)" class="btn btn-primary w-100">Update</button>
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
export default {
  name: "Machine",
  components: {SideNav},
  data() {
    return {
      items : null,
      edit_item: [],
      brands : null,
      edit_machine: [],
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
    storeItem() {
      let formData = new FormData(this.$refs.machine);
      axios.post(this.$store.state.url+'machinery_item',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            this.show()
          })
          .catch(err=>{
            this.errors = err.response.data.errors
          });
    },
    editMachine(id){
      axios.get(this.$store.state.url+'machinery_item/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_machine = data
          })
          .catch(function (error) {
            console.log(error);
          });
      $('#dis_mod').show();

    },
    dis_close(){
      $('#dis_mod').hide();
    },
    updateMachine(id){
      let formData = new FormData(this.$refs.edit_machine);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'machinery_item/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
                this.alertSuccess()
                this.show()
            this.dis_close()
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteMachine(id){
      axios.delete(this.$store.state.url+'machinery_item/'+id)
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
      axios.get(this.$store.state.url+'machinery_item')
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
  }
}
</script>

<style scoped>

</style>