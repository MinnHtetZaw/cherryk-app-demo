<template>
  <SideNav>
    <div class="mb-3">
      <h4 class="fw-normal text-secondary">Procedure Medicine Unit List</h4>
    </div>
    <div class="row">

      <!--          <Tab>-->
      <!--            <li class="nav-item" role="presentation">-->
      <!--              <button class="nav-link active" id="item-unit-tab" data-bs-toggle="pill" data-bs-target="#item-unit" type="button" role="tab" aria-controls="item-unit" aria-selected="true">Create Item Unit</button>-->
      <!--            </li>-->
      <!--            <li class="nav-item" role="presentation">-->
      <!--              <button class="nav-link" id="item-unit-list-tab" data-bs-toggle="pill" data-bs-target="#item-unit-list" type="button" role="tab" aria-controls="item-unit-list" aria-selected="false">Item Unit List</button>-->
      <!--            </li>-->
      <!--          </Tab>-->
      <!--          <div class="tab-content" id="pills-tabContent">-->
      <!--            <div class="tab-pane fade show active" id="item-unit" role="tabpanel" aria-labelledby="profit-tab">-->
      <!--              <div>-->
      <!--                <form @submit.prevent="" ref="item_unit">-->
      <!--                  <h4>Create Item</h4>-->
      <!--                  <div class="mb-3">-->
      <!--                    <label class="form-label">Code</label>-->
      <!--                    <input type="text" name="code" class="form-control">-->
      <!--                  </div>-->
      <!--                  <div class="mb-3">-->
      <!--                    <label class="form-label">Name</label>-->
      <!--                    <input type="text" name="name" class="form-control">-->
      <!--                  </div>-->
      <!--                  <div class="mb-3">-->
      <!--                    <label class="form-label">Description</label>-->
      <!--                    <textarea class="form-control" name="description" rows="2"></textarea>-->
      <!--                  </div>-->
      <!--                  <div class="mb-3">-->
      <!--                    <Button type="submit" color="primary" size="w-100" name="Save"></Button>-->
      <!--                  </div>-->
      <!--                </form>-->
      <!--              </div>-->
      <!--              <div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="tab-pane fade " id="item-unit-list" role="tabpanel" aria-labelledby="loss-tab">-->
      <!--              <h3>Loss</h3>-->
      <!--            </div>-->
      <!--          </div>-->
      <div class="row">
        <div class="col-9">
          <div class="card rounded shadow-sm border-0 p-3">
            <h5 class="fw-normal">{{items.name}}</h5>
            <div class="table-responsive">
              <table style="width: 1100px;" class="table table-borderless table-hover">
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
                  <th class="text-center text-secondary fw-normal">Per Unit Qty</th>
                  <th class="text-center text-secondary fw-normal">Description</th>
                  <th class="text-center text-secondary fw-normal">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-if="items != null" v-for="(item,index) in items.counting_unit_procedure_items" :key="'item'+item.id">
                  <td>{{index + 1}}</td>
                  <td>{{item.code}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.current_qty}}</td>
                  <td>{{item.reorder_qty}}</td>
                  <td>{{item.purchase_price}}</td>
                  <td>{{item.selling_price}}</td>
                  <td>{{item.to_unit}}</td>
                  <td>{{item.per_unit_qty}}</td>
                  <td>{{item.description}}</td>
                  <td class="d-flex gap-3">
                    <button class="btn btn-warning btn-sm" @click="editItem(item.id)">
                      <i class="fa-solid fa-pen-to-square"></i>

                    </button>
                    <button class="btn btn-danger btn-sm" @click="deleteItemUnit(item.id)">
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
          <div  v-show="status == 'store'" class="card rounded shadow-sm border-0 p-3">
            <form @submit.prevent="storeItem" ref="storeItem">
              <h4 class="fw-normal text-secondary">Create Item Unit</h4>
              <input type="hidden" name="procedure_item_id" :value="this.$route.query.id">
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
          <div v-if="edit_item"  v-show="status == 'edit'" class="card rounded shadow-sm border-0 p-3">
            <form @submit.prevent="update(edit_item.id)" ref="editItem">
              <h4 class="fw-normal text-secondary">Edit Item Unit</h4>
              <input type="hidden" name="procedure_item_id" :value="this.$route.query.id">
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
                <label class="form-label">Per Unit Quantity (Optional)</label>
                <input type="number" name="per_unit_qty" class="form-control form-control-sm" :value="edit_item.per_unit_qty">
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

              <div class="mb-3 d-flex gap-3 justify-content-center">
                <button @click="status = 'store'" class="btn btn-danger">Cancel</button>
                <button type="submit" class="btn btn-primary">Update</button>
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
import axios from "axios";
export default {
  name: "ProcedureItemUnit",
  components: {SideNav},
  data() {
    return {
      status: 'store',
      items: [],
      edit_item : [],
      errors: null,
    }
  },
  methods: {
    alertSuccess: function (){
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
      axios.post(this.$store.state.url+'counting_unit_procedure_item',formData)
          .then(res=>res.data.data)
          .then(data =>{
            this.alertSuccess()
            this.show()
            this.$refs.storeItem.reset()
          })
          .catch(err=>{
            this.errors = err.response.data.errors
          });
    },
    editItem(id){
      this.status = 'edit'
      axios.get(this.$store.state.url+'counting_unit_procedure_item/'+id)
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

      axios.post(this.$store.state.url+'counting_unit_procedure_item/'+id,formData
      )
          .then( res => res.data.data)
          .then(data =>{
              this.alertSuccess()
              this.$refs.editItem.reset()
              this.show()
              this.status = 'store'
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteItemUnit(id){
      axios.post(this.$store.state.url+'delete_procedure_item_unit/'+id)
          .then(response => response.data.data)
          .then(data=> {
            this.show()
            this.alertSuccess()
            // this.items = this.items.filter(el=>el.id != id)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    calcPercent(){
      let purchase_price = $('#purchase_price').val();
      let selling_price = $('#selling_price').val();
      let selling_percent = $('#selling_percent');
      let result = Math.floor(((selling_price - purchase_price) / purchase_price) * 100) ;
      selling_percent.val(result)
    },
    show(){
      axios.get(this.$store.state.url+'procedure_item/'+this.$route.query.id)
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