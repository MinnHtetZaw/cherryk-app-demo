<template>
  <SideNav>
    <div class="row">
      <div class="col-6 m-auto">
        <div class="card mb-3 rounded shadow-sm border-0 p-3" >
          <div style="background: #ffffff;" id="printableArea">
            <div class="d-flex gap-3 justify-content-center align-items-center">
              <img src="../../assets/vlogo.png" style="width: 50px;" alt="">
              <h5 class="text-uppercase" style="text-align: center;color: #8192ff;">victorious clinic invoice</h5>
            </div>
            <div>
              <p style="font-size: 11px;" class="text-center text-secondary mb-1">အမှတ် ၆၇၇၊ မြေညီထပ်၊ မေတ္တာလမ်း၊ ၉ ရပ်ကွက် (City Mart အနီး)၊ တောင်ဥက္ကလာပ မြို့နယ်၊ ရန်ကုန်မြို့</p>
              <p style="font-size: 11px;" class="text-center text-secondary mb-1">09784407840 , 09969121111 , 09750145883</p>
            </div>

                <div class="row">
                  <div class="col-3">
                    <p class="mb-1">Name</p>
                  </div>
                  <div class="col-6">
                    <p class="mb-1">{{sale_voucher.customer_name}}</p>
                  </div>
                </div>
            <div class="row">
              <div class="col-3">
                <p class="mb-1">Phone</p>
              </div>
              <div class="col-6">
                <p class="mb-1">{{sale_voucher.customer_phone}}</p>
              </div>
            </div>
                <div class="row">
                  <div class="col-3">
                    <p class="mb-1">Invoice No</p>
                  </div>
                  <div class="col-6">
                    <p class="mb-1">{{sale_voucher.voucher_no}}</p>
                  </div>
                </div>

              <div class="row">
                <div class="col-3">
                  <p class="mb-1">Invoice Date</p>
                </div>
                <div class="col-6">
                  <p class="mb-1">{{sale_voucher.voucher_date}}</p>
                </div>
              </div>




            <div class="mb-3">
              <table class="table table-borderless table-sm">
                <thead style="background-color: #8192ff;">
                <tr>
                  <th class="text-center text-white fw-normal">#</th>
                  <th class="text-center text-white fw-normal">Description</th>
                  <th class="text-center text-white fw-normal">Qty</th>
                  <th class="text-center text-white fw-normal">Price</th>
                  <th class="text-center text-white fw-normal">Discount</th>
                  <th class="text-center text-white fw-normal">Amount</th>
                </tr>
                </thead>
                <tbody>
                <tr class="" v-for="(sale_item,index) in sale_voucher.items" :key="'sale_item'+sale_item">
                  <td class="border text-center" style="width: 30px;">{{index+1}}</td>
                  <td class="border text-start">{{sale_item.item_name}}</td>
                  <td style="width: 75px;" class="border text-end">{{sale_item.item_qty}}</td>
                  <td class="border text-end">{{sale_item.item_price}}</td>
                  <td class="border text-end" style="width: 100px;">{{sale_item.item_discount_value}}</td>
                  <td class="border text-end">{{sale_item.item_sub_total}}</td>
                </tr>
                <tr class=" border" v-for="n in 3">
                  <td class="border text-start" style="width: 30px;height: 20px;"></td>
                  <td class="border"></td>
                  <td class="border"></td>
                  <td class="border"></td>
                  <td class="border" style="width: 100px;"></td>
                  <td class="border"></td>
                </tr>

                <tr>
                  <td class="" colspan="3"></td>
                  <td class="text-start border" colspan="2">Total Amount</td>
                  <td class="text-center border" colspan="">{{sale_voucher.total_price}}</td>
                </tr>
                <tr>
                  <td class="" colspan="3"></td>
                  <td class="text-start border" colspan="2">Discount Amount</td>
                  <td style="width: 100px;" class="text-center border" colspan="">{{sale_voucher.discount_value}}</td>
                </tr>
                <tr>
                  <td class="" colspan="3"></td>
                  <td class="text-start border" colspan="2">Net Amount</td>
                  <td class="text-center border" colspan="">{{sale_voucher.net_amount}}</td>
                </tr>
                <tr>
                  <td class="" colspan="3"></td>
                  <td class="text-start border" colspan="2">Paid Amount</td>
                  <td class="text-center border" colspan="">{{sale_voucher.pay}}</td>
                </tr>

                </tbody>
              </table>

            </div>
            <div class="text-center">
              <span style="font-size: 11px;" class="text-secondary">Thank You So Much!</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-sm btn-primary " @click="print()">
        Print <i class="fa-solid fa-print ms-2"></i>
      </button>
    </div>

  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";

export default {
  name: "SaleVoucher",
  components: {SideNav},
  data() {
    return {
      sale_voucher: []
    }
  },
  methods: {
    name() {

    },
    print(){
      let printContents = document.getElementById('printableArea').innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload()
    },
  },
  mounted() {
    axios.get(this.$store.state.url+'sale_voucher/'+this.$route.query.id)
        .then(res=>res.data.data)
        .then(data =>{
          this.sale_voucher= data
          console.log(data)
        })
        .catch(err => {
          this.errors = err.response.data.errors
        });
  }
}
</script>

<style scoped>
td{
  font-size: 10px;
  line-height: 20px;
}
th{
  line-height: 20px;
}
p{
  font-size: 10px;
}

</style>