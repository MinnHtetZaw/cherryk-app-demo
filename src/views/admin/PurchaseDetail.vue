<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <h4 class="text-secondary fw-normal">Purchase Detail</h4>
      </div>
    </div>
    <div v-if="isEdit == true" class="row">
      <div class="col-12">
        <div class="card mb-3 p-3 rounded shadow-sm border-0">
          <h5 class="fw-normal mb-3 text-secondary">Edit Purchase List</h5>
          <form @submit.prevent="" ref="edit_purchase">
            <div class="row mb-3">
              <div class="col-4">
                <label class="form-label">Purchase Date</label>
                <input type="date" class="form-control" name="purchase_date" :value="purchase_detail.purchase_date">
              </div>
              <div class="col-4">
                <label class="form-label">Supplier Name</label>
                <select name="supplier_id" class="form-select">
                  <option :selected="supplier.id == purchase_detail.supplier_id" v-for="supplier in suppliers" :key="'supplier'+supplier.id" :value="supplier.id">{{supplier.name}}</option>
                </select>
              </div>

            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label class="form-label">Remark</label>
                <textarea name="remark" class="form-control" rows="3" :value="purchase_detail.remark"></textarea>
              </div>
            </div>
            <div class="d-flex mb-3 justify-content-center gap-3">
              <button class="btn btn-danger" @click="isEdit = false">Cancel</button>
              <button @click="updatePurchase(purchase_detail.id)" class="btn btn-primary">Update</button>
            </div>
          </form>

        </div>
        </div>
    </div>
    <div v-else class="row">
      <div class="col-4">
        <div class="card mb-3 p-3 rounded shadow-sm border-0">
          <table>
            <tbody>
            <tr>
              <td>Purchase Date</td>
              <td>{{purchase_detail.purchase_date}}</td>
            </tr>
            <tr>
              <td>Supplier Name</td>
              <td>{{purchase_detail.supplier_name}}</td>
            </tr>
            <tr>
              <td>Total Quantity</td>
              <td>{{purchase_detail.total_qty}}</td>
            </tr>
            <tr>
              <td>Total Price</td>
              <td>{{purchase_detail.total_price}} MMK</td>
            </tr>
            </tbody>
          </table>
          <h6 class="fw-normal text-secondary">Remark</h6>
          <p>{{purchase_detail.remark}}</p>
          <div class="d-flex justify-content-center gap-3">
            <button :disabled="isEdit == true" @click="editPurchase" class="btn btn-warning">
              Edit
            </button>
            <button @click="deletePurchase(purchase_detail.id)" :disabled="isEdit == true" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>

      </div>
      <div class="col-8">
        <div class="card p-3 rounded shadow-sm border-0">
          <h6 class="text-secondary fw-normal">Purchase Unit List </h6>
          <div>
            <table class="table table-borderless table-striped table-hover">
              <thead>
              <tr>
                <th class="fw-normal text-secondary text-center">No.</th>
                <th class="fw-normal text-secondary text-center">Item Name</th>
                <th class="fw-normal text-secondary text-center">Quantity</th>
                <th class="fw-normal text-secondary text-center">Price</th>
                <th class="fw-normal text-secondary text-center">Sub Total</th>
              </tr>
              </thead>
              <tbody>
              <tr class="text-center" v-for="(item,index) in purchase_detail.purchase_items" :key="'item'+item.id">
                <td>{{index + 1}}</td>
                <td>{{item.item_name}}</td>
                <td>{{item.qty}}</td>
                <td>{{item.purchase_price}}</td>
                <td>{{item.sub_total}}</td>
              </tr>
              </tbody>
            </table>
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
import ButtonTo from "@/components/layout/ButtonTo";
import {mapGetters} from "vuex";
import Swal from "sweetalert2";
export default {
  name: "PurchaseDetail",
  components: {ButtonTo, SideNav},
  data() {
    return {
      purchase_detail : {},
      suppliers: {},
      isEdit : false,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    editPurchase :function (id) {
      this.isEdit = true
    },
    updatePurchase: function (id){
      let formData = new FormData(this.$refs.edit_purchase);
      formData.append('_method','PATCH')
      axios.post(this.getUrl('purchase/'+id),formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
                this.getPurchase()
                this.$store.dispatch('alertSuccess')
                this.isEdit = false
              }
          )
          .catch(err => {
            this.$store.dispatch('alertError')
          });
    },
    deletePurchase(id){
      axios.delete(this.getUrl('purchase/'+id))
          .then(res => {
            this.$store.dispatch('alertSuccess')
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    getPurchase: function (){
      axios.get(this.getUrl('purchase/'+this.$route.query.id))
          .then(res=>res.data.data)
          .then(data =>{
            this.purchase_detail = data
            console.log(data)
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    getSuppliers: function (){
      axios.get(this.getUrl('supplier'))
          .then(response => response.data.data)
          .then(data=>{
            this.suppliers = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  },
  mounted() {
    this.getPurchase()
    this.getSuppliers()

  }
}
</script>

<style scoped>

</style>