<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h6 class="text-secondary fw-normal">Sale History</h6>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card rounded border-0 shadow-sm p-3">
          <div class="mb-3 d-flex justify-content-between align-items-center">
            <Search placeholder="Enter Voucher No" @search="searchSale"></Search>
            <div class="d-flex align-items-center gap-2">
              <input @change="searchSale(date)" v-model="date" v-if="isFilter == true" type="date" class="form-control form-control-sm" name="">
              <button @click="filterDate" class="btn btn-outline-primary btn-sm">
                <i class="fa-solid fa-filter"></i>
              </button>
              <a
                  type="button"
                  :href="getUrl('sale-export')"
                  download="file.xlsx"
              >
                <button class="btn btn-outline-success btn-sm" title="Export">
                  <i class="fa-solid fa-file-export"></i>
                </button>
              </a>
            </div>
          </div>
          <div>
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="text-secondary text-center">#</th>
                <th class="text-secondary text-center">Date</th>
                <th class="text-secondary text-center">Voucher No</th>
                <th class="text-secondary text-center">Customer Name</th>
                <th class="text-secondary text-center">Payment Type</th>
                <th class="text-secondary text-center">Total Price ( MMK )</th>
                <th class="text-secondary text-center">Discount ( MMK )</th>
                <th class="text-secondary text-center">Pay Amount ( MMK )</th>
                <th class="text-secondary text-center">Balance ( MMK )</th>
                <th class="text-secondary text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(sale_voucher,index) in sale_vouchers" :key="'sale_voucher'+sale_voucher.id">
                <td class="text-center">{{ Number(index)+1 }}</td>
                <td class="text-center">{{sale_voucher.voucher_date}}</td>
                <td class="text-center">{{sale_voucher.voucher_no}}</td>
                <td class="">{{sale_voucher.customer_name}}</td>
                <td class="text-center">{{sale_voucher.payment_type}}</td>
                <td class="text-end">{{sale_voucher.total_price}}</td>
                <td class="text-end">{{sale_voucher.discount_value}}</td>
                <td class="text-end">{{sale_voucher.pay}}</td>
                <td class="text-center">{{sale_voucher.balance}}</td>
                <td class="text-center">
                  <button @click="saleVoucher(sale_voucher.id)" class="btn btn-sm btn-primary">Detail</button>
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
import axios from "axios";
import router from "@/router";
import Search from "@/components/Search";
import {mapGetters} from "vuex";
export default {
  name: "SaleHistory",
  components: {Search, SideNav},
  data() {
    return {
      date: '',
      sale_vouchers: {},
      isFilter: false
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getSaleVouchers: function (url){
      axios.get(url)
          .then(res=>res.data.data)
          .then(data =>{
            this.sale_vouchers = data
            console.log(data)
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    searchSale : function (v=''){
      this.getSaleVouchers(this.getUrl('sale_voucher?keyword='+v))
    },
    saleVoucher:function (id) {
      router.push({path:'/saleVoucher/'+id,query:{id: id}})
    },
    filterDate: function (){
      this.isFilter = !this.isFilter
      this.searchSale()
    },
    saleExport: function (){
      axios.get(this.getUrl('sale-export'))
          .then(res => console.log(res))
          .catch(function (error) {
            console.log(error);
          });
    }

  },
  mounted() {
    this.getSaleVouchers(this.getUrl('sale_voucher'))
  }
}
</script>

<style scoped>

</style>