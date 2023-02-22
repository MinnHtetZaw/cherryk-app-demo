<template>
 <SideNav>
   <div class="row">
     <div class="col-12 mb-3">
       <h6 class="fw-normal text-secondary">Sale Page</h6>
     </div>
   </div>
   <div class="row">
     <form @submit.prevent="" ref="storeVoucher" class="d-flex gap-2">
       <div class="col-9">
         <div class="card border-0 rounded shadow-sm p-3">
           <div class="row">
             <div>
                 <div class="d-flex align-items-center gap-3">
                   <i title="Refresh" type="button" @click="reload" class="fa-solid fa-arrows-rotate"></i>
                   <select v-model="item_id" class="form-select w-50 js-example-basic-single">
                     <option  :value="item.id" v-for="item in items" :key="'item'+item.id">{{item.name}}</option>
                   </select>
                   <button @click="addSale" class="btn btn-sm btn-primary">Add <i class="fa-solid fa-plus ms-2"></i></button>
               </div>

               <div class="my-3">

                 <table class="table table-sm table-bordered">
                   <thead>
                   <tr>
                     <th class="fw-normal text-center">No.</th>
                     <th class="fw-normal text-center">Item Name</th>
                     <th class="fw-normal text-center">Qty</th>
                     <th class="fw-normal text-center">Price</th>
                     <th class="fw-normal text-center">%</th>
                     <th colspan="2" class="fw-normal text-center">Amount</th>
                   </tr>
                   </thead>
                   <tbody>
                   <tr v-for="(item,index) in sell_item" :key="'sell_item'+item.id">
                     <td>{{index + 1}}</td>
                     <td>
                       <input name="item_name[]" type="text" class="form-control border-0" readonly :value="item.name">
                       <input name="item_id[]" type="hidden" :value="item.id">
                     </td>
                     <td style="width: 70px;">
                       <input name="item_qty[]" :id="'qty'+item.id" @change="calcTotalPrice(item.id)" type="number" class="form-control border-0 form-control-sm" :value="item.quantity">
                     </td>
                     <td style="width: 150px;">
                       <input name="item_price[]" :id="'price'+item.id" type="number" readonly class="form-control border-0 form-control-sm" :value="item.price">
                     </td>
                     <td class="">
                       <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" :data-bs-target="'#item_discount'+item.id">
                         <i class="fa-solid fa-tag"></i>
                       </button>
                       <span v-if="item.discount_type == 'foc'" class="ms-2 badge rounded-pill bg-success">FOC</span>
                       <span :id="'dis_status'+item.id" class="ms-2 badge rounded-pill bg-success"></span>
                       <!-- Modal -->
                       <div class="modal fade" :id="'item_discount'+item.id" tabindex="-1" aria-labelledby="item_discountLabel" aria-hidden="true">
                         <div class="modal-dialog">
                           <div class="modal-content w-75">
                             <div class="modal-header bg-primary">
                               <h5 class="modal-title" id="item_discountLabel">Item Discount</h5>
                               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                             </div>
                             <div class="modal-body">
                               <div class="mb-3">
                                 <label class="form-label">Total Price</label>
                                 <input type="number" readonly class="form-control" :id="'total'+item.id" :value="item.sub_total">
                               </div>
                               <div class="mb-3">
                                 <div class="form-check form-check-inline">
                                   <input v-model="item_discount_option" @change="discount_type = 'amount'" class="form-check-input" type="radio"  id="item_amount" value="amount">
                                   <label class="form-check-label" for="item_amount">Amount</label>
                                 </div>
                                 <div class="form-check form-check-inline">
                                   <input v-model="item_discount_option" class="form-check-input" type="radio"  id="item_percent" value="percent">
                                   <label class="form-check-label" for="item_percent">Percent</label>
                                 </div>
                                 <div class="form-check form-check-inline">
                                   <input @change="itemFoc(item.id,item_discount_option)" v-model="item_discount_option" class="form-check-input" type="radio"  id="item_foc" value="foc">
                                   <label class="form-check-label" for="item_foc">Foc</label>
                                 </div>
                               </div>
                               <div v-if="item_discount_option == 'amount'" class="mb-3">
                                 <label class="form-label">Amount</label>
                                 <input @change="calcItemDiscount(item.id,item_discount_option)" :id="'item_dis_amount'+item.id" type="number" class="form-control">
                               </div>
                               <div v-if="item_discount_option == 'percent'" class="mb-3">
                                 <label class="form-label">Percent</label>
                                 <input @change="calcItemDiscount(item.id,item_discount_option)" :id="'item_dis_percent'+item.id" type="number" class="form-control">
                               </div>
                               <div class="mb-3">
                                 <label class="form-label">Item Total Discount</label>
                                 <input :id="'item_total_discount'+item.id" type="number" class="form-control">
                               </div>
                               <div class="d-flex justify-content-end gap-3">
                                 <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal">Cancel</button>
                                 <button @click="confirmItemDiscount(item.id,item_discount_option)" type="button" data-bs-dismiss="modal" class="btn btn-sm btn-primary">Confirm</button>
                               </div>
                             </div>


                           </div>
                         </div>
                       </div>
                     </td>
                     <td style="width: 150px;">
                       <input name="item_discount_type[]" type="hidden" :id="'item_discount_value'+item.id" :value="item.discount_type">
                       <input name="item_discount_value[]" type="hidden" :id="'item_discount_type'+item.id" :value="item.discount_value">

                       <input name="item_sub_total[]" :id="'sub_total'+item.id" type="number" class="form-control border-0 form-control-sm" readonly :value="item.sub_total" >

                     </td>
                     <td style="width: 50px;" class="text-center">
                       <i @click="removeItem(item.id)" class="fa-solid text-danger fa-circle-minus"></i>
                     </td>
                   </tr>
                   <tr >
                     <td class="text-center" colspan="5">Total Price</td>
                     <td class="text-center" colspan="2">
                       <input name="total_price" id="total_price" type="number" class="form-control form-control-sm border-0" readonly>
                     </td>
                   </tr>
                   </tbody>
                 </table>

               </div>
             </div>
           </div>


         </div>
       </div>
       <div class="col-3">
         <div class="card border-0 p-3 shadow-sm">
           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-8">
               <select @change="addCustomer" class="form-select customer form-select-sm">
                 <option selected value="">Select Customer</option>
                 <option v-for="customer in customers" :value="customer.id">{{customer.name}}</option>
               </select>
             </div>
           </div>

           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Name</label>
             </div>
             <div class="col-8">
               <input id="customer_name" name="customer_name" type="text" value="" class="form-control form-control-sm">
               <span style="font-size: 11px;" v-if="errors.customer_name" class="text-danger">{{errors.customer_name[0]}}</span>
             </div>
           </div>
           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Phone </label>
             </div>
             <div class="col-8">
               <input name="customer_phone" id="customer_phone" type="number" value="" class="form-control form-control-sm">
               <span style="font-size: 11px;" v-if="errors.customer_phone" class="text-danger">{{errors.customer_phone[0]}}</span>
             </div>
           </div>
           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Remark</label>
             </div>
             <div class="col-8">
               <textarea name="remark" class="form-control form-control-sm" rows="2"></textarea>
             </div>
           </div>
           <div class="row  d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Payment Type</label>
             </div>
             <div class="col-8">
               <select @change="payment_type" id="payment_type" name="payment_type" class="form-select form-select-sm">
                 <option></option>
                 <option value="0">Cash Down</option>
                 <option value="1">Partial Pay</option>
                 <option value="2">Bank Transition</option>
               </select>
               <span style="font-size: 11px;" v-if="errors.payment_type" class="text-danger">{{errors.payment_type[0]}}</span>
             </div>
           </div>
           <div v-if="isBank == true" class="row  d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Bank Account</label>
             </div>
             <div class="col-8">
               <select name="bank_account" class="form-select form-select-sm">
                 <option></option>
                 <option v-for="bank in banks" :value="bank.id">{{bank.account_number}}</option>
               </select>
             </div>
           </div>

           <hr>
           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Total Amount</label>
             </div>
             <div class="col-8">
               <input id="total_amount" type="text" value="" class="form-control form-control-sm">
               <span style="font-size: 11px;" v-if="errors.total_amount" class="text-danger">{{errors.total_amount[0]}}</span>

             </div>
           </div>
           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Discount</label>
             </div>
             <div class="col-8">
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
                             <label style="font-size: 13px;" class="form-label text-secondary">Total Amount</label>
                             <input id="total_amount_discount" readonly type="number" class="form-control border-0">
                           </div>
<!--                           Radio-->
                           <div class="mb-3">
                             <div class="form-check form-check-inline">
                               <input v-model="discount_option" @change="discount_type = 'amount'" class="form-check-input" type="radio"  id="amount" value="amount">
                               <label style="font-size: 13px;" class="form-check-label" for="amount">Amount</label>
                             </div>
                             <div  class="form-check form-check-inline">
                               <input @change="discount_type = 'percent'" v-model="discount_option" class="form-check-input" type="radio"  id="percent" value="percent">
                               <label style="font-size: 13px;" class="form-check-label" for="percent">Percent</label>
                             </div>
                             <div @change="foc" class="form-check form-check-inline">
                               <input v-model="discount_option" class="form-check-input" type="radio"  id="foc" value="foc">
                               <label style="font-size: 13px;" class="form-check-label" for="foc">Foc</label>
                             </div>
                           </div>
                           <div v-if="discount_type == 'amount'" class="mb-3">
                             <label style="font-size: 13px;" class="form-label text-secondary">Discount Amount</label>
                             <input name="discount_amount" @change="discount_total(discount_type)" id="discount_amount" type="number" class="form-control">
                           </div>
                           <div v-else-if="discount_type == 'percent'" class="mb-3">
                             <label style="font-size: 13px;" class="form-label text-secondary">Discount Percent</label>
                             <input name="discount_amount" @change="discount_total(discount_type)" id="discount_percent" type="number" class="form-control">
                           </div>
<!--                           <div v-else-if="discount_type == 'foc'" class="mb-3">-->
<!--                             <label style="font-size: 13px;" class="form-label text-secondary">Foc</label>-->
<!--                             <input name="discount_amount" @change="discount_total(discount_type)" id="discount_foc" type="number" class="form-control">-->
<!--                           </div>-->
                           <div class="mb-3">
                             <label style="font-size: 13px;" class="form-label text-secondary">Discount Total</label>
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
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Net Amount</label>
             </div>
             <div class="col-8">
               <input name="net_amount" id="net_amount" type="text" class="form-control form-control-sm">
               <span style="font-size: 11px;" v-if="errors.net_amount" class="text-danger">{{errors.net_amount[0]}}</span>

             </div>
           </div>
           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Pay Amount</label>
             </div>
             <div class="col-8">
               <input name="pay_amount" @keyup="calcBalance" id="pay_amount" type="text" value="" class="form-control form-control-sm">
               <span style="font-size: 11px;" v-if="errors.pay_amount" class="text-danger">{{errors.pay_amount[0]}}</span>

             </div>
           </div>
           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Balance</label>
             </div>
             <div class="col-8">
               <input name="balance" id="balance" type="text" value="" class="form-control form-control-sm">
               <span style="font-size: 11px;" v-if="errors.balance" class="text-danger">{{errors.balance[0]}}</span>

             </div>
           </div>
           <div class="row mb-3 d-flex justify-content-end">
             <div class="col-4">
               <label style="font-size: 13px;" class="form-label">Change</label>
             </div>
             <div class="col-8">
               <input name="refund" id="refund" type="text" value="" class="form-control form-control-sm">
             </div>
           </div>
           <div class="d-flex justify-content-end mb-3">
             <button @click="storeVoucher" type="submit" class="btn btn-primary">
               <i class="fa-solid fa-file-invoice-dollar me-2"></i>
               Store Voucher</button>
           </div>
         </div>

       </div>
     </form>


   </div>
 </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
import 'select2/dist/css/select2.min.css'
import 'select2/dist/js/select2.min'
import {mapGetters} from "vuex";
export default {
  name: "SalePage",
  components: {SideNav},
  data() {
    return {
      items : null,
      item_id : '',
      isBank: false,
      sell_item : [],
      customers: null,
      showModal: false,
      discount_option: '',
      discount_type: '',
      item_discount_option: '',
      banks: {},
      errors: {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ]),
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
    payment_type: function (e){
      let type = e.target.value
      let total_price = $('#total_price').val();
      console.log(e.target.value)
      if (type == 0){
        this.isBank = false
        $('#pay_amount').val(total_price);
        this.calcBalance();
      }else if (type == 1){
        this.isBank = false
        $('#pay_amount').val('');
        $('#balance').val('')
        $('#refund').val('')
      }else if (type == 2){
        this.isBank = true
      }
    },
    discountModal(e){
      $('#dis_mod').show();
    },
    dis_close(){
      $('#dis_mod').hide();
    },
    addItem: function(id) {
      let item = this.items.find(el=>el.id == id);
      let name = item.name;
      let price = item.selling_price;
      let quantity = 1;
      let sub_total = item.selling_price;

      let item_obj = {
        id: id,
        name: name,
        quantity: quantity,
        sub_total: sub_total,
        discount_value: 0,
        discount_type: '',
        price: price,
      };
      //Check id (id တူရင် data မထည့်)
      if (this.sell_item.length == 0){
        this.sell_item.push(item_obj)
      }else if (this.sell_item.length > 0){
        let has_id = [];
        this.sell_item.map(el=>{
          has_id.push(el.id)
        })

        // **********
        if (has_id.includes(id) == true){

          let item = this.sell_item.find(el=>el.id == id)
          let price = item.price
          item.quantity += 1;
          item.sub_total = item.quantity * price

        }else{
          this.sell_item.push(item_obj)
        }
      }
      this.totalQty()
      this.totalPrice()

    },
    addSale(){
      let id = $('.js-example-basic-single').val();
      let add_item = this.addItem(id);
      $('.js-example-basic-single').on('change', function (){
        add_item
      })

      },
    calcTotalPrice(id){
      let qty = Number($('#qty'+id).val());
      let price = Number($('#price'+id).val());
      let item = this.sell_item.find(el=>el.id == id)
      let total_price = qty * price;
      item.quantity = qty;
      item.sub_total = total_price;
      $('#sub_total'+id).val(total_price);
      this.totalQty()
      this.totalPrice()
      $('#total'+id).val(total_price)
      // console.log(total_price)
    },
    totalQty(){
      let total_qty = this.sell_item.reduce((pv, cv) => pv + cv.quantity, 0);
      $('#total_qty').val(total_qty);
    },
    totalPrice(){
      let total_price = this.sell_item.reduce((pv, cv) => pv + cv.sub_total, 0);
      $('#total_price').val(total_price);
      $('#total_amount').val(total_price)
      $('#net_amount').val(total_price)
      $('#total_amount_discount').val(total_price)
    },
    calcBalance(){


      let pay = $('#pay_amount').val();
      let net = $('#net_amount').val();

      if (pay > net){
        let result = Number(pay - net);
        $('#balance').val(0)
        $('#refund').val(result)
      }else if (pay <= net){
        let result = Number(net - pay);

        $('#balance').val(result)
        $('#refund').val(0)
      }
    },
    removeItem(id){

      Swal.fire({
        html: '<h5>Please Confirm!</h5>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#238636',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sell_item = this.sell_item.filter(el=>el.id != id)
          this.totalQty()
          this.totalPrice()
          Swal.fire(
              '',
              'Successfully Removed!',
              'success'
          )
        }
      })
      // console.log(this.sell_item)
    },
    addCustomer(e){
      let id = e.target.value;
      let customer = this.customers.find(el=>el.id == id);
      let name =customer.name
      let phone =customer.phone
      $('#customer_name').val(name)
      $('#customer_phone').val(phone)
    },
    //Store Sale Voucher
    storeVoucher(){
      let formData = new FormData(this.$refs.storeVoucher);
      axios.post(this.getUrl('sale_voucher'),formData)
          .then(res=>{
            console.log(res)
          })
          .then(data =>{
            this.alertSuccess()
            router.push({path: '/saleHistory'})
          })
          .catch(err => {
            this.errors = err.response.data.errors
            console.log(this.errors)

            // Swal.fire(
            //     'Please Try Again!',
            //     '',
            //     'error'
            // )
          });
    },
    //Discount
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

      // let discount_type = this.discount_option;

    },
    // FOC
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

    calcItemDiscount(id,v){
      let total = Number($('#total'+id).val());
      if (v == 'amount'){
        let amount = Number($('#item_dis_amount'+id).val());
        let result = total - amount;
        $('#item_total_discount'+id).val(result);
      }else if(v == 'percent'){
        let percent = Number($('#item_dis_percent'+id).val());
        let value = (total * percent)/100;
        let result = total - value;
        $('#item_total_discount'+id).val(result);
      }
    },
    itemFoc(id){
      $('#item_total_discount'+id).val(0);
    },
    confirmItemDiscount(id,v){
      let itemDiscount = Number($('#item_total_discount'+id).val());
      let item = this.sell_item.find(el=>el.id == id)
      item.sub_total = itemDiscount
      if (v == 'amount'){
        item.discount_type = v;
        item.discount_value =  Number($('#item_dis_amount'+id).val());
        $('#dis_status'+id).text(item.discount_value)
      }else if (v == 'percent'){
        item.discount_type = v;
        item.discount_value =  Number($('#item_dis_percent'+id).val());
        $('#dis_status'+id).text(item.discount_value)


      }else if(v == 'foc'){
        item.discount_type = v;
        item.discount_value = 0;
      }
      $('#sub_total'+id).val(itemDiscount);
      this.totalPrice()

    },
    hello: function (){
      alert('hello')
    },
    getBank:function (){
      axios.get(this.getUrl('bank_account'))
          .then(res=>res.data.data)
          .then(data =>{
            this.banks = data
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    reload: function (){
      window.location.reload()
    }

  },
  mounted() {
    $(document).ready(function() {
      $('.js-example-basic-single').select2();
    });
    this.getBank()
    // $('.js-example-basic-single').on('change', function (){
    //  this.addItem(3)
    //   // alert('hello')
    // })


      axios.get(this.$store.state.url+'item_unit')
        .then(res=>res.data.data)
        .then(data =>{
          this.items = data
        })
        .catch(err => {
          this.errors = err.response.data.errors
        });

    axios.get(this.$store.state.url+'customer')
        .then(response => response.data.data)
        .then(data=>{
          this.customers = data

        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<style scoped>

</style>