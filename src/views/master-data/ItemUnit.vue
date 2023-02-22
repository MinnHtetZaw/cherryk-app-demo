<template>
  <SideNav>
    <div class="mb-3">
      <h4 class="fw-normal text-secondary">Item Unit List</h4>
    </div>
    <div class="row">
          <div class="row">
            <div class="col-9">
              <div class="card border-0">
                <h6 class="fw-normal px-3 pt-2">{{this.items.name}}'s Unit</h6>
                <div class="table-responsive">
                  <table style="width: 1200px;" class="table table-hover">
                    <thead>
                    <tr>
                      <th class="text-center">#</th>
                      <th class="text-center">Code</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Current Qty</th>
                      <th class="text-center">Reorder Qty</th>
                      <th class="text-center">Purchase Price</th>
                      <th class="text-center">Selling Price</th>
                      <th class="text-center">Unit Convention</th>
                      <th class="text-center">Description</th>
                      <th class="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-if="items != null" v-for="(item,index) in items.item_units" :key="'item'+item.id">
                      <td>{{index + 1}}</td>
                      <td>{{item.code}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.current_qty}}</td>
                      <td>{{item.reorder_qty}}</td>
                      <td>{{item.purchase_price}}</td>
                      <td>{{item.selling_price}}</td>
                      <td>{{item.to_unit}}</td>
                      <td>{{item.description}}</td>
                      <td>
                        <div class="d-flex gap-4 justify-content-center mt-2">
                          <i type="button" @click="editItem(item.id)" class="fa-solid fa-pen text-warning"></i>
                          <i type="button" @click="deleteItemUnit(item.id)" class="fa-solid fa-trash text-danger"></i>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                </div>
                </div>
            </div>
            <div class="col-3">
              <div v-show="status == 'store'" class="card border-0 p-3">
                <form @submit.prevent="storeItem" ref="storeItem">
                <h4 class="fw-normal text-secondary">Create Item</h4>
                  <input type="hidden" name="item_id" :value="this.$route.query.item_id">
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
                    <input id="selling_percent" type="number" name="selling_percent" class="form-control form-control-sm w-50" placeholder="%">
                  </div>
                  <div v-if="errors">
                    <p class="text-danger my-3" >{{errors.selling_price[0]}}</p>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea name="description" rows="2" class="form-control-sm form-control"></textarea>
                </div>
                <div class="mb-3">
                  <button type="submit" class="btn btn-primary w-100">Save</button>
                </div>
              </form>
              </div>
              <div v-if="edit_item" v-show="status == 'edit'" class="card rounded shadow-sm border-0 p-3">
                <form @submit.prevent="" ref="editItem">
                <h4 class="fw-normal text-secondary">Edit Item</h4>
                  <input type="hidden" name="item_id" :value="this.$route.query.item_id">
                  <input type="hidden" name="id" :value="edit_item.id">
                <div class="mb-3">
                  <label class="form-label">Code</label>
                  <input type="text" name="code" class="form-control form-control-sm" :value="edit_item.code">
                </div>
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input type="text" name="name" class="form-control form-control-sm" :value="edit_item.name">
                </div>
                  <div class="mb-3">
                  <label class="form-label">Current Quantity</label>
                  <input type="number" name="current_qty" class="form-control form-control-sm" :value="edit_item.current_qty">
                </div>
                  <div class="mb-3">
                  <label class="form-label">Reorder Quantity (Optional)</label>
                  <input type="number" name="reorder_qty" class="form-control form-control-sm" :value="edit_item.reorder_qty">
                </div>
                  <div class="mb-3">
                    <label class="form-label">Unit Convention (Optional)</label>
                    <div class="d-flex gap-3">
                      <input type="number" name="from_unit" class="form-control form-control-sm w-50" placeholder="From Unit" :value="edit_item.from_unit">
                      <input type="number" name="to_unit" class="form-control form-control-sm w-50" placeholder="To Unit" :value="edit_item.to_unit">
                    </div>
                  </div>
                <div class="mb-3">
                  <label class="form-label">Purchase Price</label>
                  <input id="purchase_price" type="number" name="purchase_price" class="form-control form-control-sm" :value="edit_item.purchase_price">
                </div>
                <div class="mb-3">
                  <label class="form-label">Selling Price</label>
                 <div class="d-flex gap-3">
                    <input @keyup="calcPercent" id="selling_price" type="number" name="selling_price" class="form-control form-control-sm" :value="edit_item.selling_price">
                    <input id="selling_percent" type="number" name="selling_percent" class="form-control form-control-sm w-50" placeholder="%" :value="edit_item.selling_percent">
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea name="description" rows="2" class="form-control-sm form-control" :value="edit_item.description"></textarea>
                </div>
                <div class="mb-3 d-flex justify-content-center gap-3">
                  <button class="btn btn-sm btn-danger" @click="status = 'store'">Cancel</button>
                  <button @click="update(edit_item.id)" class="btn btn-sm btn-primary">Update</button>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
  </SideNav>
</template>
<script>
import SideNav from "@/components/layout/SideNav";
import Tab from "@/components/layout/Tab";
import axios from "axios";
export default {
  name: "ItemUnit",
  components: {SideNav},
  data() {
    return {
      items: [],
      edit_item: [],
      status: 'store',
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
    storeItem(){
      let formData = new FormData(this.$refs.storeItem);
      axios.post(this.$store.state.url+'item_unit',formData)
          .then(res=>console.log(res.data))
          .then(data =>{
            this.alertSuccess()
            // this.items.push(data)
            this.show()
            this.$refs.storeItem.reset()
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    editItem:function(id){
      this.status = 'edit'
      axios.get(this.$store.state.url+'show-item_unit/'+id)
          .then(response => response.data.data)
          .then(data=>{
            this.edit_item = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    update(id){
      let formData = new FormData(this.$refs.editItem);
      formData.append('_method','PATCH')

      axios.post(this.$store.state.url+'item_unit/'+id,formData
      )
          .then( res => {
            console.log(res)
          })
          .then(data =>{
            this.alertSuccess()
            this.show()
            this.$refs.editItem.reset()
            this.status = 'store'
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteItemUnit:function(id){
      if (confirm('Please Confirm to Delete!') === true)
      {
        axios.post(this.$store.state.url+'delete-item_unit/'+id)
            .then(res => {
              this.$store.dispatch('alertSuccess')
              this.show()
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    },
    calcPercent(){
      let purchase_price = $('#purchase_price').val();
      let selling_price = $('#selling_price').val();
      let selling_percent = $('#selling_percent');
      let result = Math.floor(((selling_price - purchase_price) / purchase_price) * 100) ;
      selling_percent.val(result)
    },
    show:function (){
      axios.get(this.$store.state.url+'item/'+this.$route.query.item_id)
          .then(res => res.data.data)
          .then(data => {
                this.items = data
              }
          )
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