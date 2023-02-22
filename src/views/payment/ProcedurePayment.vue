<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <h4 class="fw-normal text-secondary mb-3">Procedure Payment</h4>
      </div>
    </div>
   

    <div class="row">
      <div class="col-8">
<!--        <Tab>-->
<!--          <li class="nav-item" role="presentation">-->
<!--            <button class="nav-link active" id="invoice-tab" data-bs-toggle="pill" data-bs-target="#invoice" type="button" role="tab" aria-controls="invoice" aria-selected="true">Invoice</button>-->
<!--          </li>-->
<!--          <li class="nav-item" role="presentation">-->
<!--            <button class="nav-link" id="transaction-tab" data-bs-toggle="pill" data-bs-target="#transaction" type="button" role="tab" aria-controls="transaction" aria-selected="false">Transaction</button>-->
<!--          </li>-->
<!--          <li class="nav-item" role="presentation">-->
<!--          </li>-->
<!--        </Tab>-->


            <div class="card mb-3 rounded shadow-sm border-0 p-3" id="printableArea">
              <div class="row" id="mydiv">
                <div class="col-10 m-auto" id="printVoucher">

<!--                    <div>-->
<!--                      <h4 style="color: #8192ff" class="text-uppercase">Victorious</h4>-->
<!--                      <p class="mb-0">Dermatology &-->
<!--                        Aesthetic Clinic</p>-->
<!--                    </div>-->
<!--                  <div>-->
<!--                    <p>အမှတ် ၆၇၇၊ မြေညီထပ်၊ မေတ္တာလမ်း၊ ၉ ရပ်ကွက် (City Mart အနီး)၊ တောင်ဥက္ကလာပ မြို့နယ်၊ ရန်ကုန်မြို့</p>-->
<!--                    <p class="text-center">09784407840 , 09969121111 , 09750145883</p>-->
<!--                  </div>-->
                  <div class="row">
                    <div class="col-7">
                      <div class="d-flex justify-content-between align-items-start">
                        <div class="d-flex justify-content-start">
                          <img src="../../assets/vlogo.png" style="width: 50px;" alt="">
                        </div>
                        <h5 class="text-center text-secondary mb-1">INVOICE</h5>
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
<!--            <div class="d-flex mb-3 justify-content-center">-->
<!--              <button @click="print" class="btn btn-primary">-->
<!--                <i class="fa-solid fa-print me-2"></i>-->
<!--                Print</button>-->
<!--            </div>-->

<!--          <div class="tab-pane fade " id="transaction" role="tabpanel" aria-labelledby="transaction-tab">-->
<!--            <div class="card mb-3 p-3 rounded border-0 shadow-sm">-->
<!--              <table class="table table-borderless">-->
<!--                <tbody>-->
<!--                <tr>-->
<!--                  <td>Customer Name</td>-->
<!--                  <td>{{procedure_treatment.customer_name }}</td>-->
<!--                </tr>-->

<!--                <tr>-->
<!--                  <td>Phone</td>-->
<!--                  <td>{{procedure_treatment.customer_phone}}</td>-->

<!--                </tr>-->

<!--                </tbody>-->

<!--              </table>-->
<!--              <div class="badge bg-primary rounded d-flex justify-content-between p-3 mb-3">-->
<!--                <h6>Advance Payment : {{procedure_treatment.advance}}</h6>-->
<!--                <h6>Payment Status: {{procedure_treatment.procedure_status}}</h6>-->
<!--                <h6>Collect Amount : {{procedure_treatment.total_amount}}</h6>-->
<!--              </div>-->

<!--              <div class="d-flex justify-content-end">-->
<!--                <button v-if="procedure_treatment.procedure_status == 'paid'" class="btn btn-primary" disabled>Pay</button>-->
<!--                <button v-else class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Pay</button>-->
<!--                &lt;!&ndash; Modal &ndash;&gt;-->
<!--                <div class="modal rounded-lg shadow-lg fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
<!--                  <div class="modal-dialog">-->
<!--                    <div class="modal-content">-->
<!--                      <div class="modal-header">-->
<!--                        <h5 class="modal-title" id="exampleModalLabel">Payment Form</h5>-->
<!--                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--                      </div>-->
<!--                      <div class="modal-body">-->
<!--                        <div>-->
<!--                          <form @submit.prevent="storePayment" ref="payment" >-->
<!--                            <input type="number" name="procedure_id" hidden  :value="procedure_treatment.procedure_id">-->
<!--                            <input type="number" name="procedure_treatment_id" hidden  :value="procedure_treatment.id">-->
<!--                            <input type="number" name="customer_id" hidden  :value="procedure_treatment.customer_id">-->
<!--                            <div class="mb-3">-->
<!--                              <label class="form-label">Payment Date</label>-->
<!--                              <input type="date" name="payment_date" class="form-control">-->
<!--                            </div>-->
<!--                            <div class="mb-3">-->
<!--                              <label class="form-label">Payment Type</label>-->
<!--                              <select name="payment_type" class="form-select">-->
<!--                                <option value="Prepaid Partial" class="form-control">Prepaid Partial</option>-->
<!--                                <option value="Prepaid Full" class="form-control">Prepaid Full</option>-->
<!--                                <option value="COD" class="form-control">COD (Cash Down)</option>-->
<!--                              </select>-->
<!--                            </div>-->
<!--                            <div class="mb-3">-->
<!--                              <label class="form-label">Bank Account (Optional)</label>-->
<!--                              <input type="text" name="bank_account" class="form-control">-->
<!--                            </div>-->

<!--                            <div class="mb-3">-->
<!--                              <label class="form-label">Pay Amount</label>-->
<!--                              <input type="number" id="pay_amount" v-model="pay_amount" @keyup="calcCollectAmount(pay_amount)" name="pay_amount" class="form-control">-->
<!--                            </div>-->

<!--                            <div class="mb-3">-->
<!--                              <label class="form-label">Collect Amount</label>-->
<!--                              <input type="hidden" id="total_charges" :value="procedure_treatment.total_amount">-->
<!--                              <input type="hidden" name="total_amount" :value="procedure_treatment.total_amount">-->
<!--                              <input type="number" id="collect_amount" name="collect_amount" readonly class="form-control">-->
<!--                            </div>-->
<!--                            <div class="mb-3">-->
<!--                              <label class="form-label">Remark (Optional)</label>-->
<!--                              <textarea name="remark" class="form-control" rows="3"></textarea>-->
<!--                            </div>-->
<!--                            <div class="modal-footer">-->
<!--                              <button class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>-->
<!--                              <button type="submit" class="btn btn-primary">Confirm</button>-->
<!--                            </div>-->
<!--                          </form>-->
<!--                        </div>-->
<!--                      </div>-->

<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->


<!--            </div>-->

<!--            <div class="card mb-3 border-0 rounded p-3 shadow-sm">-->
<!--              <h4 class="fw-normal">Transaction List</h4>-->
<!--              <div>-->
<!--                <table class="table table-borderless">-->
<!--                  <thead>-->
<!--                  <tr class="fw-normal">-->
<!--                    <th class="text-center fw-normal">#</th>-->
<!--                    <th class="text-center fw-normal">Transition Date</th>-->
<!--                    <th class="text-center fw-normal">Bank Account</th>-->
<!--                    <th class="text-center fw-normal">Payment Type</th>-->
<!--                    <th class="text-center fw-normal">Pay Amount</th>-->
<!--                    <th class="text-center fw-normal">Remark</th>-->
<!--                    <th class="text-center fw-normal">Action</th>-->
<!--                  </tr>-->
<!--                  </thead>-->
<!--                  <tbody>-->
<!--                  <tr class="text-center" v-for="(payment,index) in procedure_treatment.transactions" :key="'payment'+payment.id">-->
<!--                    <td>{{index + 1}}</td>-->
<!--                    <td>{{payment.payment_date}}</td>-->
<!--                    <td>{{payment.bank_account}}</td>-->
<!--                    <td>{{payment.payment_type}}</td>-->
<!--                    <td>{{payment.pay_amount}}</td>-->
<!--                    <td>{{payment.remark}}</td>-->
<!--                    <td>-->
<!--                      <button class="btn btn-danger btn-sm">Delete</button>-->
<!--                    </td>-->
<!--                  </tr>-->
<!--                  </tbody>-->
<!--                </table>-->
<!--              </div>-->
<!--            </div>-->

<!--          </div>-->

      </div>
      <div class="col-4">
        <div class="card border-0 p-3 shadow-sm">
          <form @submit.prevent="" ref="procedureVoucher">
            <div class="row mb-3 d-flex justify-content-end">

              <div class="col-6">
                <label class="form-label">Customer Name</label>
              </div>
              <div class="col-6">
                <input name="customer_id" readonly type="hidden" :value="procedure_treatment.customer_id " class="form-control form-control-sm">
                <input name="procedure_treatment_id" readonly type="hidden" :value="procedure_treatment.id " class="form-control form-control-sm">
                <input id="customer_name" name="customer_name" readonly type="text" :value="procedure_treatment.customer_name " class="form-control form-control-sm">
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-end">
              <div class="col-6">
                <label class="form-label">Phone</label>
              </div>
              <div class="col-6">
                <input name="customer_phone" id="customer_phone" readonly type="number" :value="procedure_treatment.customer_phone" class="form-control form-control-sm">
              </div>
            </div>
            <div class="row  d-flex justify-content-end">
              <div class="col-6">
                <label class="form-label">Remark</label>
              </div>
              <div class="col-6">
                <textarea readonly name="remark" class="form-control form-control-sm" rows="3" :value="procedure_treatment.remark"></textarea>
              </div>
            </div>
            <hr>
            <div class="form-check mb-3">
              <input v-model="procedureAmount" @change="calcProcedureAmount" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Include Procedure Amount
              </label>
            </div>
            <div class="row mb-3 d-flex justify-content-end">
              <div class="col-6">
                <label class="form-label">Total Amount</label>
              </div>
              <div class="col-6">
                <input id="total_amount" type="text" name="total_amount" class="form-control form-control-sm">
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-end">
              <div class="col-6">
                <label class="form-label">Discount</label>
              </div>
              <div class="col-6">
                <div class="d-flex gap-1">
                  <input name="discount_value" id="discount" type="number" class="form-control form-control-sm">
                  <input type="hidden" name="discount_type" :value="discount_option">
                  <!--                 <button class="btn btn-primary btn-sm">-->
                  <!--                   <i class="fa-solid fa-percent"></i>-->
                  <!--                 </button>-->
                  <!-- Button trigger modal -->

                  <button type="button" class="btn btn-primary btn-sm" @click="discountModal">
                    <i class="fa-solid fa-percent"></i>
                  </button>

                  <div class="modal" tabindex="-1" id="dis_mod">
                    <div class="modal-dialog">
                      <div class="modal-content w-75">
                        <div class="modal-header bg-primary">
                          <h5 class="modal-title">Discount</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="mb-3">
                              <label class="form-label text-secondary">Total Amount</label>
                              <input  id="total_amount_discount" readonly type="number" class="form-control border-0">
                            </div>
                            <!--                           Radio-->
                            <div class="mb-3">
                              <div class="form-check form-check-inline">
                                <input v-model="discount_option" @change="discount_type = 'amount'" class="form-check-input" type="radio" name="discount_type"  id="amount" value="amount">
                                <label class="form-check-label" for="amount">Amount</label>
                              </div>
                              <div  class="form-check form-check-inline">
                                <input @change="discount_type = 'percent'" v-model="discount_option" class="form-check-input" type="radio" name="discount_type"  id="percent" value="percent">
                                <label class="form-check-label" for="percent">Percent</label>
                              </div>
                              <div  class="form-check form-check-inline">
                                <input @change="foc" v-model="discount_option" class="form-check-input" type="radio" name="discount_type"  id="foc" value="foc">
                                <label class="form-check-label" for="foc">Foc</label>
                              </div>
                            </div>
                            <div v-if="discount_type == 'amount'" class="mb-3">
                              <label class="form-label text-secondary">Discount Amount</label>
                              <input name="discount_value" @keyup="discount_total(discount_type)" id="discount_amount" type="number" class="form-control">
                            </div>
                            <div v-else-if="discount_type == 'percent'" class="mb-3">
                              <label class="form-label text-secondary">Discount Percent</label>
                              <input name="discount_amount" @keyup="discount_total(discount_type)" id="discount_percent" type="number" class="form-control">
                            </div>
                            <!--                           <div v-else-if="discount_type == 'foc'" class="mb-3">-->
                            <!--                             <label class="form-label text-secondary">Foc</label>-->
                            <!--                             <input name="discount_amount" @keyup="discount_total(discount_type)" id="discount_foc" type="number" class="form-control">-->
                            <!--                           </div>-->
                            <div class="mb-3">
                              <label class="form-label text-secondary">Discount Total</label>
                              <input id="discount_total" type="number" class="form-control">
                            </div>
                          </form>
                        </div>
                        <div class="d-flex gap-3 justify-content-end mb-3 mx-3">
                          <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal" @click="dis_close">Cancel</button>
                          <button @click="save_discount(discount_type)" type="button" class="btn btn-sm btn-primary">Confirm</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-end">
              <div class="col-6">
                <label class="form-label">Net Amount</label>
              </div>
              <div class="col-6">
                <input name="net_amount" id="net_amount" type="text" class="form-control form-control-sm">
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-end">
              <div class="col-6">
                <label class="form-label">Pay Amount</label>
              </div>
              <div class="col-6">
                <input name="pay_amount" @keyup="calcBalance" id="pay_amount" type="text" value="" class="form-control form-control-sm">
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-end">
              <div class="col-6">
                <label class="form-label">Balance</label>
              </div>
              <div class="col-6">
                <input name="balance" id="balance" type="text" value="" class="form-control form-control-sm">
              </div>
            </div>
            <div class="d-flex justify-content-end mb-3">
              <button @click="storeVoucher" type="submit" class="btn btn-primary">
                <i class="fa-solid fa-file-invoice-dollar me-2"></i>
                Store Voucher</button>
            </div>
          </form>

          <!--         <div class="row mb-3 d-flex justify-content-end">-->
          <!--           <div class="col-6">-->
          <!--             <label class="form-label">Payment Type</label>-->
          <!--           </div>-->
          <!--           <div class="col-6">-->
          <!--             <select class="form-select form-select-sm">-->
          <!--               <option value="">Payment Type</option>-->
          <!--               <option value="">Prepaid Partial</option>-->
          <!--               <option value="">Prepaid Full</option>-->
          <!--               <option value="">Cash on Delivery</option>-->
          <!--             </select>-->
          <!--           </div>-->
          <!--         </div>-->


<!--          <div class="row mb-3 d-flex justify-content-end">-->
<!--            <div class="col-6">-->
<!--              <label class="form-label">Change</label>-->
<!--            </div>-->
<!--            <div class="col-6">-->
<!--              <input name="refund" id="refund" type="text" value="" class="form-control form-control-sm">-->
<!--            </div>-->
<!--          </div>-->

        </div>

      </div>

    </div>

    <div class="row">
      <div class="col-10 m-auto">
      </div>
    </div>

    <div class="row">
      <div class="col-10 m-auto">

      </div>
    </div>
  </SideNav>

</template>

<script>

import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import Tab from "@/components/layout/Tab";
import Swal from "sweetalert2";


export default {
  name: "ProcedurePayment",
  components: {Tab, SideNav},
  data() {
    return {
      procedure_treatment: [],
      customers: null,
      procedureList: [],
      treatments: [],
      treatment_units: null,
      payments: null,
      pay_amount: 0,
      output: null,
      procedure_id: '',
      discount_option: '',
      discount_type: '',
      procedureAmount: false,
    }
  },
  computed: {
    total() {
      return this.procedure_treatment.procedure_total_amount + this.procedure_treatment.total_amount
    },
    totalProcedure(){
      return this.this.procedure_treatment.total_amount
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
    print(){
      let printContents = document.getElementById('printableArea').innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;

    },
    calcCollectAmount(val){
      let value = parseInt(val);
      let total = parseInt($('#total_charges').val());
      total -= value;
      let result = total
      $('#collect_amount').val(result);
    },
    storeVoucher() {
      let formData = new FormData(this.$refs.procedureVoucher);
      axios.post(this.$store.state.url+'procedure_voucher',formData)
          .then( res => res.data)
          .then(data =>{
            console.log(data)
            this.alertSuccess()
              }
          )
          .catch(function (error) {
            console.log(error)
            Swal.fire(
                'Please Try Again!',
                'Something is Wrong!',
                'error'
            )
          });

    },
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
    discountModal(e){
      $('#dis_mod').show();
    },
    dis_close(){
      $('#dis_mod').hide();
    },
    discount_total(v){
      let total = $('#total_amount_discount').val();
      if (v == 'amount'){
        let discount_amount = $('#discount_amount').val();
        let result = Number(total - discount_amount);
        $('#discount_total').val(result);
      }else if(v == 'percent'){
        let discount_percent = $('#discount_percent').val();
        let percent_amount = Number((total * discount_percent)/100);
        let result = Number(total - percent_amount)
        $('#discount_total').val(result);
      }
    },
    foc(){
      this.discount_type = 'foc'
      $('#discount_total').val(0);
    },
    save_discount(v){
      let discount_amount = $('#discount_amount').val();
      let discount_percent = $('#discount_percent').val();
      let result = $('#discount_total').val();
      if (v == 'amount'){
        $('#discount').val(discount_amount);
      }else if(v == 'percent'){
        $('#discount').val(discount_percent);
      } else if(v == 'foc'){
        $('#discount').val(0);
      }
      $('#net_amount').val(result);
      this.dis_close();
    },
    calcBalance(){
      let pay = Number($('#pay_amount').val());
      let net = Number($('#net_amount').val());
      let result = net - pay;
      $('#balance').val(result)
    },
    calcProcedureAmount(){
      let result = Number(this.procedure_treatment.total_amount);
      let procedurePrice = Number( this.procedure_treatment.procedure_total_amount)
      if (this.procedureAmount == true){
        result =result + procedurePrice
        console.log(result)
        $('#total_amount').val(result)
        $('#total_amount_discount').val(result)
        $('#discount_total').val(result)
      }else {
        $('#total_amount').val(result)
        $('#total_amount_discount').val(result)
        $('#discount_total').val(result)
      }


    }
  },
  mounted() {
    this.show()

    axios.get(this.$store.state.url+'procedure')
        .then( res => res.data.data)
        .then(data =>{
              this.procedureList = data
        }
        )
        .catch(function (error) {
          console.log(error);
        });

    axios.get(this.$store.state.url+'treatment')
        .then( res => res.data.data)
        .then(data =>
            this.treatments = data
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'treatment_unit')
        .then( res => res.data.data)
        .then(data =>
            this.treatment_units = data
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'customer')
        .then( res => res.data.data)
        .then(data =>
            this.customers = data
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'transaction')
        .then( res => res.data.data)
        .then(data =>
            this.payments = data
        )
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<style type="text/css">

</style>
