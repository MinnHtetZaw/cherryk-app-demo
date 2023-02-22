<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="card mb-3 border-0 rounded shadow-sm p-3" id="printableArea">
          <div>
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
                <tr class="text-center" v-for="(item,index) in procedure_voucher.items">
                  <td class="border" style="width: 30px;">{{index+1}}</td>
                  <td class="border">{{item.name}}</td>
                  <td class="border">{{item.qty}}</td>
                  <td class="border">{{item.selling_price}}</td>
                  <td class="border" style="width: 100px;">
                    <p class="mb-0" v-if="item.discount_type == 'foc'">FOC</p>
                    <p class="mb-0" v-else-if="item.discount_type == 'percent'"> {{item.discount_value}} %</p>
                    <p class="mb-0" v-else-if="item.discount_type == 'amount'"> {{item.discount_value}}</p>
                    <p class="mb-0" v-else>{{item.discount_value}}</p>
                  </td>
                  <td class="border">{{item.total_price}}</td>
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
          <button class="btn btn-sm btn-primary " @click="print()">
            Print <i class="fa-solid fa-print ms-2"></i>
          </button>
        </div>
        </div>

    </div>
  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import router from "@/router";
import {mapGetters} from "vuex";
export default {
  name: "ProcedureVoucher",
  components: {SideNav},
  data() {
    return {
      procedure_voucher : {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    getProcedureVoucher : function (){
      axios.get(this.getUrl('procedure_voucher/'+this.$route.query.id))
          .then(res=> {
            this.procedure_voucher = res.data.data
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    print: function (){
      let printContents = document.getElementById('printableArea').innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload()

    }
  },
  mounted() {
    this.getProcedureVoucher()
  }
}
</script>

<style scoped>

</style>