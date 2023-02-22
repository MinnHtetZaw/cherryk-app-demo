<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h6 class="text-secondary fw-normal">Procedure History</h6>
        </div>
      </div>
    </div>
<!--    -->
    <div v-if="is_preview == true">
      <div class="row">
        <div class="col-8 m-auto">
          <div class="card mb-3 border-0 p-3" >
            <div class="d-flex justify-content-end">
              <button @click="is_preview = false" class="btn btn-close btn-sm"></button>
            </div>
            <div id="printableArea">
              <div class="d-flex gap-3 justify-content-center align-items-center">
                <img src="../../assets/vlogo.png" style="width: 50px;" alt="">
                <h4 style="color: #8192ff;" class="text-center text-uppercase">Victorious Invoice</h4>
              </div>
              <div>
                <p class="text-center">အမှတ် ၆၇၇၊ မြေညီထပ်၊ မေတ္တာလမ်း၊ ၉ ရပ်ကွက် (City Mart အနီး)၊ တောင်ဥက္ကလာပ မြို့နယ်၊ ရန်ကုန်မြို့</p>
                <p class="text-center">09784407840 , 09969121111 , 09750145883</p>
              </div>
              <div class="d-flex justify-content-between">
                <table style="width: 300px;" class="table table-sm table-borderless">
                  <tbody>
                  <tr>
                    <td style="width: 150px;">Customer Name</td>
                    <td class="text-start text-secondary">{{procedure_voucher.customer_name }}</td>
                  </tr>
                  <tr>
                    <td style="width: 150px;">Invoice No</td>
                    <td class="text-start text-secondary">{{procedure_voucher.procedure_voucher_number }}</td>
                  </tr>
                  </tbody>
                </table>
                <table style="width: 300px;" class="table table-sm table-borderless">
                  <tbody>
                  <tr>
                    <td style="width: 150px;">Customer Phone</td>
                    <td class="text-start text-secondary">{{procedure_voucher.customer_phone }}</td>
                  </tr>
                  <tr>
                    <td style="width: 150px;">Invoice Date</td>
                    <td class="text-start text-secondary">{{procedure_voucher.voucher_date }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="mb-3">
                <table class="table table-borderless table-sm">
                  <thead style="background-color: #8192ff;">
                  <tr>
                    <th class="text-center text-white fw-normal">No</th>
                    <th class="text-center text-white fw-normal">Description</th>
                    <th class="text-center text-white fw-normal">Qty</th>
                    <th class="text-center text-white fw-normal">Price</th>
                    <th class="text-center text-white fw-normal">Discount</th>
                    <th class="text-center text-white fw-normal">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="" v-for="(item,index) in procedure_voucher.items">
                    <td class="border" style="width: 30px;">{{index+1}}</td>
                    <td class="border">{{item.name}}</td>
                    <td class="border text-end">{{item.qty}}</td>
                    <td class="border text-end">{{item.selling_price}}</td>
                    <td class="border text-end" style="width: 100px;">
                      <p class="mb-0" v-if="item.discount_type == 'foc'">FOC</p>
                      <p class="mb-0" v-else-if="item.discount_type == 'percent'"> {{item.discount_value}} %</p>
                      <p class="mb-0" v-else-if="item.discount_type == 'amount'"> {{item.discount_value}}</p>
                      <p class="mb-0" v-else>{{item.discount_value}}</p>
                    </td>
                    <td class="border text-end">{{item.total_price}}</td>
                  </tr>
                  <tr class="text-center border" v-for="n in 3">
                    <td class="border" style="width: 30px;height: 30px;"></td>
                    <td class="border"></td>
                    <td class="border"></td>
                    <td class="border"></td>
                    <td class="border" style="width: 100px;"></td>
                    <td class="border"></td>
                  </tr>
                  <tr>
                    <td class="" colspan="3"></td>
                    <td class="text-center border" colspan="2">Total Amount</td>
                    <td class="text-center border" colspan="">{{procedure_voucher.total_amount}}</td>
                  </tr>
                  <tr>
                    <td class="" colspan="3"></td>
                    <td class="text-center border" colspan="2">Paid Amount</td>
                    <td class="text-center border" colspan="">{{procedure_voucher.pay_amount}}</td>
                  </tr>
                  <tr>
                    <td class="" colspan="3"></td>
                    <td class="text-center border" colspan="2">Balance</td>
                    <td class="text-center border" colspan="">{{procedure_voucher.balance}}</td>
                  </tr>

                  </tbody>
                </table>

              </div>
              <div class="text-center">
                <span style="font-size: 12px;" class="text-secondary">Thank You So Much!</span>
              </div>
            </div>

          </div>
          <div class="d-flex justify-content-center">
            <button @click="printVoucher" class="btn btn-primary btn-sm">Print <i class="fa-solid fa-print ms-2"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!--    -->
    <div v-else class="row">
      <div class="col-12">
        <div class="card border-0 p-0">
          <div>
            <div class="p-3 d-flex justify-content-between align-items-center">
              <Search @search="searchVoucher"></Search>
              <div class="d-flex align-items-center gap-2">
                <input type="date" class="form-control form-control-sm" v-model="filter_date">
                <button @click="filterDate(filter_date)" class="btn btn-outline-primary btn-sm" title="Filter">
                  <i class="fa-solid fa-filter"></i>
                </button>
                <a
                    type="button"
                    :href="getUrl('procedure-voucher-export')"
                    download="file.xlsx"
                >
                  <button class="btn btn-outline-success btn-sm" title="Export">
                    <i class="fa-solid fa-file-export"></i>
                  </button>
                </a>
              </div>
            </div>
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="text-secondary text-center">#</th>
                <th class="text-secondary text-center">Voucher Date</th>
                <th class="text-secondary text-center">Voucher No</th>
                <th class="text-secondary text-center">Customer Name</th>
                <th class="text-secondary text-center">Phone</th>
                <th class="text-secondary text-center">Total Amount ( MMK )</th>
                <th class="text-secondary text-center">Pay Amount ( MMK )</th>
                <th class="text-secondary text-center">Balance Amount ( MMK )</th>
                <th class="text-secondary text-center"> Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="voucher in vouchers">
                <td class="text-center">{{voucher.id}}</td>
                <td class="text-center">{{voucher.voucher_date}}</td>
                <td class="text-center">{{voucher.procedure_voucher_number}}</td>
                <td class="text-start">{{voucher.customer_name}}</td>
                <td class="text-center">{{voucher.customer_phone}}</td>
                <td class="text-end">{{voucher.total_amount}}</td>
                <td class="text-end">{{voucher.pay_amount}}</td>
                <td class="text-end">{{voucher.balance}}</td>
                <td class="d-flex justify-content-center">
                  <div class="btn-group btn-group-sm" role="group">
                    <button @click="previewVoucher(voucher)" class="btn btn-outline-primary" title="Print Voucher">
                      <i class="fa-solid fa-print"></i>
                    </button>
<!--                    <button @click="procedureVoucher(voucher.id)" class="btn btn-outline-primary" title="Voucher Detail">-->
<!--                      <i class="fa-solid fa-circle-info"></i>-->
<!--                    </button>-->
                  </div>
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
  name: "ProcedureHistory",
  components: {Search, SideNav},
  data() {
    return {
      is_preview : false,
      //
      vouchers : {},
      procedure_voucher : {},
      filter_date: '',
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getProcedureVoucher: function(url) {
      axios.get(url)
          .then(res=> {
            this.vouchers = res.data.data
          })
          .catch(err => {
            console.log(err)
          });
    },
    procedureVoucher : (id) =>{
      router.push({path: '/procedureVoucher/'+id,query: {id: id}})
    },
    searchVoucher: function (data){
      this.getProcedureVoucher(this.getUrl('procedure_voucher?key_words='+data))
    },
    filterDate: function (data){
      this.getProcedureVoucher(this.getUrl('procedure_voucher?filter_date='+data))
    },
    previewVoucher: function (data){
      this.is_preview = true
      this.procedure_voucher = data
    },
    printVoucher : function (){
        let printContents = document.getElementById('printableArea').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload()
    }
  },
  mounted() {
    this.getProcedureVoucher(this.getUrl('procedure_voucher'))
  }
}
</script>

<style scoped>
p{
  font-size: 11px;
}
</style>