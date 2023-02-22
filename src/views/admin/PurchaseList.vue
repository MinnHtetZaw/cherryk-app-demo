<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="text-secondary fw-normal">Purchase List</h4>
          <button @click="addPurchase" class="btn btn-primary">Add Purchase List</button>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="card border-0 rounded">
        <div>
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="text-center">No.</th>
              <th class="text-center">Purchase Date</th>
              <th class="text-center">Supplier Name</th>
              <th class="text-center">Total Qty</th>
              <th class="text-center">Total Price</th>
              <th class="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center" v-for="(purchase,index) in purchase_lists" :key="'purchase'+purchase.id">
              <td>{{index + 1}}</td>
              <td>{{purchase.purchase_date}}</td>
              <td>{{purchase.supplier_name}}</td>
              <td>{{purchase.total_qty}}</td>
              <td>{{purchase.total_price}}</td>
              <td>
                <button @click="purchaseDetail(purchase.id)" class="btn btn-primary btn-sm">
                  Detail
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import router from "@/router";
import axios from "axios";
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
export default {
  name: "PurchaseList",
  components: {SideNav},
  data() {
    return {
      purchase_lists: null,
    }
  },
  methods: {
    addPurchase() {
      router.push({path: '/purchaseCreate'})
    },
    purchaseDetail(id){
      router.push({path: '/purchaseDetail/'+id,query: {id: id}})
    }
  },
  mounted() {
    axios.get(this.$store.state.url+'purchase')
        .then(response => response.data.data)
        .then(data=>{
          this.purchase_lists = data
        })
        .catch(function (error) {
          console.log(error);
        });
  }

}
</script>

<style scoped>

</style>