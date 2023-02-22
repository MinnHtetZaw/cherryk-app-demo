<template>
  <SideNav>
    <div class="mb-3">
      <h4 class="fw-normal text-secondary">Kit Unit List</h4>
    </div>
    <div class="row">

      <div class="row">
        <div class="col-9">
          <div class="card rounded shadow-sm border-0 p-3">
            <h6 class="fw-normal">{{kits.name}}'s Unit</h6>

            <div class="table-responsive">
              <table style="width: 1200px;" class="table table-striped table-borderless table-hover">
                <thead>
                <tr>
                  <th class="text-center text-secondary fw-normal">#</th>
                  <th class="text-center text-secondary fw-normal">Code</th>
                  <th class="text-center text-secondary fw-normal">Name</th>
                  <th class="text-center text-secondary fw-normal">Current Qty</th>
                  <th class="text-center text-secondary fw-normal">Reorder Qty</th>
                  <th class="text-center text-secondary fw-normal">Purchase Price</th>
                  <th class="text-center text-secondary fw-normal">Selling Price</th>
                  <th class="text-center text-secondary fw-normal">Unit Convention</th>
                  <th class="text-center text-secondary fw-normal">Description</th>
                  <th class="text-center text-secondary fw-normal">Action</th>

                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="(item,index) in kits.units" >
                  <td>{{index + 1}}</td>
                  <td>{{item.code}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.current_qty}}</td>
                  <td>{{item.reorder_qty}}</td>
                  <td>{{item.purchase_price}}</td>
                  <td>{{item.selling_price}}</td>
                  <td>{{item.to_unit}}</td>
                  <td>{{item.description}}</td>
                  <td class="d-flex justify-content-center gap-3">
                    <button class="btn btn-warning btn-sm" @click="editItem(item.id)">
                      <i class="fa-solid fa-pen-to-square"></i>

                    </button>
                    <button class="btn btn-danger btn-sm" @click="deleteKit(item.id)">
                      <i class="fa-solid fa-trash-can"></i>

                    </button>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
        <div class="col-3">
          <div v-show="status == 'store'" class="card rounded shadow-sm border-0 p-3">
            <form @submit.prevent="" ref="storeKitUnit">
              <h6 class="fw-normal text-secondary">Create Kit Item</h6>
              <input type="hidden" name="kit_item_id" :value="this.$route.query.item_id">
              <div class="mb-3">
                <label class="form-label">Code</label>
                <input type="text" name="code" class="form-control form-control-sm">
                <div v-if="errors">
                  <p class="text-danger my-3" >{{errors.code[0]}}</p>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" name="name" class="form-control form-control-sm">
                <div v-if="errors">
                  <p class="text-danger my-3" >{{errors.name[0]}}</p>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Current Quantity</label>
                <input type="number" name="current_qty" class="form-control form-control-sm">
                <div v-if="errors">
                  <p class="text-danger my-3" >{{errors.current_qty[0]}}</p>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Reorder Quantity (Optional)</label>
                <input type="number" name="reorder_qty" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label class="form-label">Unit Convention (Optional)</label>
                <div class="d-flex gap-3">
                  <input type="number" name="from_unit" class="form-control form-control-sm w-50" placeholder="From Unit">
                  <input type="number" name="to_unit" class="form-control form-control-sm w-50" placeholder="To Unit">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Per Unit Quantity (Optional)</label>
                <input type="number" name="per_unit_qty" class="form-control form-control-sm" >
              </div>

              <div class="mb-3">
                <label class="form-label">Purchase Price</label>
                <input id="purchase_price" type="number" name="purchase_price" class="form-control form-control-sm">
                <div v-if="errors">
                  <p class="text-danger my-3" >{{errors.purchase_price[0]}}</p>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Selling Price</label>
                <div class="d-flex gap-3">
                  <input @keyup="calcPercent" id="selling_price" type="number" name="selling_price" class="form-control form-control-sm" >

                </div>
                <div v-if="errors">
                  <p class="text-danger my-3" >{{errors.selling_price[0]}}</p>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" rows="2" class="form-control-sm form-control"></textarea>
              </div>

              <div class="">
                <button @click="storeKitUnit" type="button" class="btn btn-primary w-100">Save</button>
              </div>
            </form>
          </div>
          <div v-show="status == 'edit'" class="card rounded shadow-sm border-0 p-3">
            <form @submit.prevent="" ref="editKit">
              <h6 class="fw-normal text-secondary">Edit Kit Item</h6>
              <input type="hidden" name="item_id" :value="this.$route.query.item_id">
              <input type="hidden" name="id" :value="edit_kit.id">
              <div class="mb-3">
                <label class="form-label">Code</label>
                <input type="text" name="code" class="form-control form-control-sm" :value="edit_kit.code">
              </div>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" name="name" class="form-control form-control-sm" :value="edit_kit.name">
              </div>
              <div class="mb-3">
                <label class="form-label">Current Quantity</label>
                <input type="number" name="current_qty" class="form-control form-control-sm" :value="edit_kit.current_qty">
              </div>
              <div class="mb-3">
                <label class="form-label">Reorder Quantity (Optional)</label>
                <input type="number" name="reorder_qty" class="form-control form-control-sm" :value="edit_kit.reorder_qty">
              </div>
              <div class="mb-3">
                <label class="form-label">Unit Convention (Optional)</label>
                <div class="d-flex gap-3">
                  <input type="number" name="from_unit" class="form-control form-control-sm w-50" placeholder="From Unit" :value="edit_kit.from_unit">
                  <input type="number" name="to_unit" class="form-control form-control-sm w-50" placeholder="To Unit" :value="edit_kit.to_unit">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Purchase Price</label>
                <input id="purchase_price" type="number" name="purchase_price" class="form-control form-control-sm" :value="edit_kit.purchase_price">
              </div>
              <div class="mb-3">
                <label class="form-label">Selling Price</label>
                <div class="d-flex gap-3">
                  <input @keyup="calcPercent" id="selling_price" type="number" name="selling_price" class="form-control form-control-sm" :value="edit_kit.selling_price">
                  <input id="selling_percent" type="number" name="selling_percent" class="form-control form-control-sm w-50" placeholder="%" :value="edit_kit.selling_percent">
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea name="description" rows="2" class="form-control-sm form-control" :value="edit_kit.description"></textarea>
              </div>

              <div class="mb-3 d-flex justify-content-center gap-3">
                <button class="btn btn-danger" @click="status = 'store'">Cancel</button>
                <button @click="updateKit(edit_kit.id)" class="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


  </SideNav>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";
import SideNav from "@/components/layout/SideNav";
import Swal from "sweetalert2";

export default {
  name: "KitUnit",
  components: {SideNav},
  data() {
    return {
      kits: [],
      status: 'store',
      edit_kit: [],
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
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
    storeKitUnit: function (){
      let formData = new FormData(this.$refs.storeKitUnit);
      axios.post(this.getUrl('kit_unit'),formData)
          .then(res=>res.data.data)
          .then(data =>{
            this.alertSuccess()
            this.show()
            this.$refs.storeKitUnit.reset()
          })
          .catch(err=>{
            this.errors = err.response.data.errors
            this.alertError()
          });
    },
    editItem:function(id){
      this.status = 'edit'
      axios.get(this.getUrl('kit_unit/')+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_kit = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    updateKit: function (id){
      let formData = new FormData(this.$refs.editKit);
      formData.append('_method','PATCH')

      axios.post(this.getUrl('kit_unit/')+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
                this.show()
                this.$refs.editKit.reset()
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
    deleteKit:function(id){
      axios.delete(this.getUrl('kit_unit/')+id)
          .then(response => response.data.data)
          .then(data=> {
            this.alertSuccess()
            this.show()
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    show:function (){
      axios.get(this.getUrl('kit_item/')+this.$route.query.item_id)
          .then(res=>res.data.data)
          .then(data => {
                this.kits = data
            console.log(data)
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  mounted() {
    this.show()
    console.log(this.$route.query.item_id)
  }

}
</script>

<style scoped>

</style>