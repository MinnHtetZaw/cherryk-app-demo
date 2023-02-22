<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h4 class="fw-normal text-secondary">Procedure Voucher Detail</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card mb-3 border-0 shadow-sm rounded p-3" id="printableArea">
          <div class="row" id="mydiv">
            <div class="col-10 m-auto" id="printVoucher">
              <div class="row">
                <div class="col-7">
                  <div class="d-flex gap-3 justify-content-center align-items-center">
                    <img src="../../assets/vlogo.png" style="width: 50px;" alt="">
                    <h4 style="color: #8192ff;" class="text-center">Victorious Clinic Medical Record</h4>
                  </div>
                  <div>
                    <p class="text-center">အမှတ် ၆၇၇၊ မြေညီထပ်၊ မေတ္တာလမ်း၊ ၉ ရပ်ကွက် (City Mart အနီး)၊ တောင်ဥက္ကလာပ မြို့နယ်၊ ရန်ကုန်မြို့</p>
                    <p class="text-center">09784407840 , 09969121111 , 09750145883</p>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <table style="width: 250px;" class="table table-sm table-borderless">
                  <tbody>
                  <tr>
                    <td>Customer Name</td>
                    <td>{{procedure_treatment.customer_name }}</td>
                  </tr>
                  <tr>
                    <td>Service Charges</td>
                    <td>{{procedure_treatment.service_charges }}</td>
                  </tr>
                  </tbody>

                </table>
                <table style="width: 250px;" class="table table-sm table-borderless">
                  <tbody>
                  <tr>
                    <td>Phone</td>
                    <td>{{procedure_treatment.customer_phone}}</td>
                  </tr>
                  <tr>
                    <td>Consultation Charges</td>
                    <td>{{procedure_treatment.consultation_charges}}</td>
                  </tr>
                  </tbody>

                </table>
              </div>

              <div class="mb-1" style="background-color: rgba(128,128,128,0.27);padding: 5px; border-radius: 10px 10px 10px 10px;">
                <div class="row">
                  <div class="col-8">
                    <h6 class="mx-2 fw-normal text-secondary">Procedure</h6>
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                      <tr>
                        <td>Treatment Name</td>
                        <td>{{procedure_treatment.treatment_unit_name}}</td>
                      </tr>
                      <tr>
                        <td>Procedure Price</td>
                        <td>{{procedure_treatment.procedure_total_amount}} </td>
                      </tr>
                      </tbody>
                    </table>

                  </div>

                </div>


              </div>


              <div>
                <table class="table table-sm table-bordered">
                  <thead>
                  <tr>
                    <th class="text-secondary text-center fw-normal">No</th>
                    <th class="text-secondary text-center fw-normal">Description</th>
                    <th class="text-secondary text-center fw-normal">Qty</th>
                    <th class="text-secondary text-center fw-normal">Price</th>
                    <th class="text-secondary text-center fw-normal">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="text-center" v-for="(medicine,index) in procedure_treatment.medicines">
                    <td style="font-size: 12px; ">{{index + 1}}</td>
                    <td style="font-size: 12px; width: 150px;">{{medicine.name}}</td>
                    <td style="font-size: 12px; ">{{medicine.total_qty}}</td>
                    <td style="font-size: 12px; ">{{medicine.price}}</td>
                    <td style="font-size: 12px; ">{{medicine.total_price}}</td>
                  </tr>
                  <tr class="text-center" v-for="n in 4">
                    <td style="height: 30px"></td>
                    <td style="height: 30px"></td>
                    <td style="height: 30px"></td>
                    <td style="height: 30px"></td>
                    <td style="height: 30px"></td>
                  </tr>
                  <tr class="text-center">
                    <td style="font-size: 13px;" class="text-end" colspan="4">TOTAL</td>
                    <td style="font-size: 13px;">{{procedure_treatment.procedure_total_amount + procedure_treatment.total_amount}}</td>
                  </tr>
                  <tr class="text-center">
                    <td style="font-size: 13px;" class="text-end" colspan="4">ADVANCE</td>
                    <td style="font-size: 13px;">{{procedure_treatment.advance}}</td>
                  </tr>
                  <tr class="text-center">
                    <td style="font-size: 13px;" class="text-end" colspan="4">BALANCE</td>
                    <td style="font-size: 13px;">{{procedure_treatment.balance}}</td>
                  </tr>
                  </tbody>
                </table>
                <p class="fw-normal text-secondary text-center text-uppercase">Thank You!</p>
              </div>
            </div>
          </div>

        </div>
        <div class="d-flex mb-3 justify-content-center">
          <button @click="print" class="btn btn-primary">
            <i class="fa-solid fa-print me-2"></i>
            Print</button>
        </div>
      </div>

    </div>
  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
export default {
  name: "ProcedureVoucherDetail",
  components: {SideNav},
  data() {
    return {
      procedure_treatment: {},
      procedure_id: '',
    }
  },
  methods: {
    show(){
      axios.get(this.$store.state.url+'procedure_treatment/'+this.$route.query.id)
          .then( res => res.data.data)
          .then(data => {
                this.procedure_treatment = data
                this.procedure_id = data.procedure_id
                $('#total_amount').val(this.procedure_treatment.total_amount)
                $('#total_amount_discount').val(this.procedure_treatment.total_amount)
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    print(){
      let printContents = document.getElementById('printableArea').innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;

    },
  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped>

</style>