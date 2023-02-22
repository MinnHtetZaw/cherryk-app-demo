<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="card mb-3 border-0 p-3">
          <label class="form-label">Doctor Remark</label>
          <p>{{procedure.prescription}}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card p-4 mb-5">
          {{test}}
        </div>
      </div>
    </div>
    <div class="row">
                <div class="col-12">
                  <div style="background-color: #F9F9FA;" class="mb-3 rounded p-3">
                    <h6 class="text-secondary">Treatment</h6>
                    
                    <!-- ______________________________ -->

                    <div class="mb-2">
                      <div class="row">
                        <div class="col-3">                
                          <div class="d-flex gap-2 align-items-center">

                            <!-- <select class="form-select w-50 procedure">

                              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                          
                            </select> -->
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="d-flex gap-2 align-items-center">
                            <select class="form-select w-50 medicine">
                              <option v-for="medicine in medicines" :key="medicine.id" :value="medicine.id">{{medicine.name}}</option>
                            </select>
                            <button @click="addMedicineUnit" class="btn btn-primary btn-sm">
                              <i class="fa-solid fa-circle-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
    <div class="row">
      <form @submit.prevent="" ref="storeVoucher" class="d-flex gap-2">
        <div class="col-9">
          <div class="card border-0">
            <table class="table table-sm table-bordered">
              <thead>
              <tr>
                <th class="fw-normal text-secondary text-center">No.</th>
                <th class="fw-normal text-secondary text-center">Item Name</th>
                <th class="fw-normal text-secondary text-center">Qty</th>
                <th class="fw-normal text-secondary text-center">Price</th>
                <th class="fw-normal text-secondary text-center">Sub Total</th>
                <th class="fw-normal text-secondary text-center">%</th>
                <th class="fw-normal text-secondary text-center"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in items" >
                <td style="width: 50px;" class="text-center">{{index + 1}}</td>
                <td class="text-center">
                  <input name="item_name[]" readonly type="text" class="form-control form-control-sm border-0" :value="item.name">
                </td>
                <td style="width: 70px;" class="text-center">
                  <input name="item_qty[]" readonly type="text" class="form-control form-control-sm border-0" :value="item.qty"></td>
                <td style="width: 150px;" class="text-center">
                  <input readonly name="item_selling_price[]" type="number" class="form-control form-control-sm border-0" :value="item.selling_price">
                </td>
                <td style="width: 170px;" class="text-center">
                  <input readonly name="item_total_price[]" :id="'total_price'+item.id" type="number" class="form-control form-control-sm border-0" :value="item.total_price">
                </td>
                <td style="width: 50px;" class="">
                  <button type="button" class="btn btn-sm small btn-primary" data-bs-toggle="modal" :data-bs-target="'#item_discount'+item.id">
                    <i class="small fa-solid fa-tag"></i>
                  </button>
                  <input readonly name="discount_type[]"  type="hidden" class="form-control form-control-sm border-0" :value="item.dis_type">
                  <input readonly name="discount_value[]"  type="hidden" class="form-control form-control-sm border-0" :value="item.dis_val">
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
                            <input type="number" readonly class="form-control" :id="'total'+item.id" :value="item.total_price">
                          </div>
                          <div class="mb-3">
                            <div class="form-check form-check-inline">
                              <input name="discount_type" v-model="item_discount_option" @change="changeDiscountType(item.id,'amount')" class="form-check-input" type="radio"  id="item_amount" value="amount">
                              <label class="form-check-label" for="item_amount">Amount</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input name="discount_type" v-model="item_discount_option" @change="changeDiscountType(item.id,'percent')" class="form-check-input" type="radio"  id="item_percent" value="percent">
                              <label class="form-check-label" for="item_percent">Percent</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input name="discount_type" @change="itemFoc(item.id,item_discount_option)" v-model="item_discount_option" class="form-check-input" type="radio"  id="item_foc" value="foc">
                              <label class="form-check-label" for="item_foc">Foc</label>
                            </div>
                          </div>
                          <div v-if="item_discount_option == 'amount'" class="mb-3">
                            <label class="form-label">Discount Amount</label>
                            <input @keyup="calcItemDiscount(item.id,item_discount_option)" :id="'item_dis_amount'+item.id" type="number" class="form-control">
                          </div>
                          <div v-if="item_discount_option == 'percent'" class="mb-3">
                            <label class="form-label">Percent</label>
                            <input @keyup="calcItemDiscount(item.id,item_discount_option)" :id="'item_dis_percent'+item.id" type="number" class="form-control">
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Item Amount</label>
                            <input name="discount_value" :id="'item_total_discount'+item.id" type="number" class="form-control">
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
                <td class="text-center text-danger">
                  <i @click="deleteItem(item.id)" class="fa-solid fa-trash"></i>
                </td>
              </tr>

              <tr class="">
                <td colspan="3"></td>
                <td colspan="" class="text-center">Total Price</td>
                <td class="text-center" colspan="3">{{total_price}}</td>
              </tr>
              <tr class="">
                <td colspan="3"></td>
                <td colspan="" class="text-center">Consultation Charges</td>
                <td class="text-center" colspan="3">{{procedure.consultation_charges}}</td>
              </tr>
              <tr class="">
                <td colspan="3"></td>
                <td colspan="" class="text-center">Service Charges</td>
                <td class="text-center" colspan="3">{{procedure.service_charges}}</td>
              </tr>
              <tr class="">
                <td colspan="3"></td>
                <td colspan="" class="text-center">Grand Total</td>
                <td class="text-center" id="grand_amount" colspan="3"></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-3">
          <div class="card border-0 p-3">
            <div class="row mb-2 d-flex justify-content-end">
              <div class="col-4">
                <label class="form-label">Name</label>
              </div>
              <div class="col-8">
                <input id="customer_name" name="customer_name" type="text" :value="procedure.customer_name" class="form-control form-control-sm">
                <input readonly name="procedure_id" type="hidden" :value="procedure.id">
              </div>
            </div>
            <div class="row mb-2 d-flex justify-content-end">
              <div class="col-4">
                <label class="form-label">Phone</label>
              </div>
              <div class="col-8">
                <input readonly name="customer_phone" id="customer_phone" type="number" :value="procedure.customer_phone" class="form-control form-control-sm">
              </div>
            </div>
<!--            <div class="row  d-flex justify-content-end">-->
<!--              <div class="col-4">-->
<!--                <label class="form-label">Remark</label>-->
<!--              </div>-->
<!--              <div class="col-8">-->
<!--                <textarea name="remark" class="form-control form-control-sm" rows="2"></textarea>-->
<!--              </div>-->
<!--            </div>-->
            <hr>
            <div class="row mb-2 d-flex justify-content-end">
              <div class="col-4">
                <label class="form-label">Total Amount</label>
              </div>
              <div class="col-8">
                <input id="total_amount" name="total_amount" type="text" class="form-control form-control-sm">
              </div>
            </div>
            <div class="row mb-2 d-flex justify-content-end">
              <div class="col-4">
                <label class="form-label">Pay Amount</label>
              </div>
              <div class="col-8">
                <input name="pay_amount" @keyup="calcBalance" id="pay_amount" type="text" value="" class="form-control form-control-sm">
              </div>
            </div>
            <div class="row mb-2 d-flex justify-content-end">
              <div class="col-4">
                <label class="form-label">Balance</label>
              </div>
              <div class="col-8">
                <input name="balance" id="balance" type="text" value="" class="form-control form-control-sm">
              </div>
            </div>

              <button :disabled="procedure.status == 'check'" @click="storeVoucher" class="btn btn-sm w-100 btn-primary">
                Store Voucher
                <i class="fa-solid fa-file-invoice-dollar ms-2"></i>
              </button>
          </div>
        </div>
      </form>

    </div>
  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import AddMedicine from "@/components/AddMedicine.vue";
export default {
  name: "ProcedureCheck",
  components: {SideNav},
  data() {
    return {
      
      categories:{},
      oral_medicine : {},
      topical_medicine : {},
      skin_care_medicine : {},
      treatments: null,
      medicines: null,
      treatment_array: [],
      // items: [],
      procedure : {},
      items : [],
      total_price : '',
      test: '',
      item_discount_option : '',
    }
  },
  methods: {
    show : function (){
      localStorage.removeItem('myCart')
      axios.get(this.$store.state.url+'procedure/'+this.$route.query.id)
          .then( res => res.data.data)
          .then(data =>
          {
            this.procedure = data
            let myCart = localStorage.getItem('myCart');
            let medicine_obj = this.procedure.medicines
            let treatment_obj = this.procedure.treatments
            if (myCart == null) {
              myCart = '[]';
              let myCartObj = JSON.parse(myCart)
              medicine_obj.forEach(
                  el=>{
                    let id = myCartObj.length;
                    let qty = el.qty * el.day
                    let item = {
                      id : id + 1,
                      item_id : el.item_id,
                      name : el.name,
                      qty : qty,
                      selling_price : el.selling_price,
                      total_price : qty * el.selling_price,
                      original_total_price : qty * el.selling_price,
                      is_dis : false,
                      dis_val : 0,
                      dis_type: '',
                    }
                    myCartObj.push(item)
                  }
              )
              // Treatment
              treatment_obj.forEach(
                  el=>{
                    let id = myCartObj.length;
                    let treatment = {
                      id : id + 1,
                      name : el.name,
                      qty : el.qty,
                      selling_price : el.selling_price,
                      total_price : el.qty * el.selling_price,
                      original_total_price : el.qty * el.selling_price,
                      is_dis : false,
                      dis_val : 0,
                      dis_type: '',
                    }
                    myCartObj.push(treatment)
                  }
              )
              localStorage.setItem('myCart', JSON.stringify(myCartObj));
            }
            this.addItem()
          }
          )
          .catch(function (error) {
            console.log(error);
          });

    },
    addItem : function (){
      let myCart = localStorage.getItem('myCart')
      let myCartObj = JSON.parse(myCart)
      this.items = myCartObj
      this.totalPrice()
      this.totalAmount()

    },
    totalPrice: function (){
      let myCart = localStorage.getItem('myCart')
      let myCartObj = JSON.parse(myCart)
      this.total_price = myCartObj.reduce((pv, cv) => pv + cv.total_price, 0);
    },

    totalAmount: function (){
      let total_amount = 0;
      total_amount = this.total_price + this.procedure.consultation_charges + this.procedure.service_charges;
      $('#total_amount').val(total_amount)
      $('#net_amount').val(total_amount)
      $('#grand_amount').html(total_amount)

    },
    calcBalance : function (){
      let pay = $('#pay_amount').val();
      let total_amount = $('#total_amount').val();
      let result = Number(total_amount - pay);
      $('#balance').val(result)

    },
    storeVoucher : function (){
      let myCart = localStorage.getItem('myCart')
      let formData = new FormData(this.$refs.storeVoucher);
      formData.append('procedure_items',myCart)
      axios.post(this.$store.state.url+'procedure_voucher',formData)
          .then(res=> {
            router.push({path: '/procedureHistory/'})
            this.alertSuccess()
          })
          .catch(err => {
            this.errors = err.response.data.errors
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    changeDiscountType: function (id, v){
      this.item_discount_option  = v
      let myCart = localStorage.getItem('myCart')
      let myCartObj = JSON.parse(myCart)
      let item = myCartObj.find(el=>el.id == id)
      item.total_price = item.original_total_price
      item.is_dis = false
      item.dis_type = '';
      item.dis_val = 0;
      localStorage.setItem('myCart',JSON.stringify(myCartObj))
      this.addItem()
    },
    calcItemDiscount: function (id,v){
      let total = Number($('#total_price'+id).val());
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
    itemFoc: function (id){
      $('#item_total_discount'+id).val(0);
    },
    confirmItemDiscount: function (id,v){
      let myCart = localStorage.getItem('myCart')
      let myCartObj = JSON.parse(myCart)
      let item_amount = Number($('#item_total_discount'+id).val());
      let item = myCartObj.find(el=>el.id == id)
      if (v == 'amount') {
        // ===========
        item.total_price = item_amount
        item.is_dis = true
        item.dis_type = v;
        item.dis_val = Number($('#item_dis_amount' + id).val());
        localStorage.setItem('myCart',JSON.stringify(myCartObj))
      }else if (v == 'percent'){
        // =============
        item.total_price = item_amount
        item.is_dis = true
        item.dis_type = v;
        item.dis_val =  Number($('#item_dis_percent'+id).val());
        localStorage.setItem('myCart',JSON.stringify(myCartObj))
      }else if(v == 'foc'){
        // ================
        item.total_price = item_amount
        item.is_dis = true
        item.dis_type = v;
        item.dis_val = 0;
        localStorage.setItem('myCart',JSON.stringify(myCartObj))
      }
    this.addItem()
    },
    deleteItem: function (id){
      let myCart = localStorage.getItem('myCart')
      let myCartObj = JSON.parse(myCart)
      Swal.fire({
        html: '<h5>Please Confirm!</h5>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0aa162',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          let item_cart = myCartObj.filter(el => el.id !== id);
          localStorage.setItem('myCart', JSON.stringify(item_cart));
          this.addItem()
          Swal.fire(
              '',
              'Successfully Removed!',
              'success'
          )
        }
      })
    },
    addMedicineUnit(){

      let myCart = localStorage.getItem('myCart');
      let myCartObj = JSON.parse(myCart);
      let item_id = $('.medicine').val();
      let medicine = this.medicines.find(el=> el.id == item_id)
      let name = medicine.name
      let quantity = 1
      let selling_price = medicine.selling_price

      let medicine_obj = {
        type: '',
        id: 1,
        item_id: item_id,
        name: name,
        qty: quantity,
        selling_price : selling_price,
        total_price: quantity * selling_price,
        };

      myCartObj.push(medicine_obj);

      this.test = myCartObj;
      // *** item တူရင် Qty ပေါင်း ***
      let has_id = [];
      myCartObj.map(el => {
        has_id.push(el.item_id)
      })


      // ***

      localStorage.setItem("myCart",JSON.stringify(myCartObj));
      this.addItem();

      // let id = 0;
      // let length = this.items.length
      // if (length <= 0){
      //    id = 1;
      // }else if (length > 0){
      //   id = length + 1
      // }
      // let item_id = $('.medicine').val()
      // let medicine = this.medicines.find(el=>el.id == item_id)
      // let name = medicine.name
      // let quantity = 1
      // let selling_price = medicine.selling_price
      // let day = 1
      // let medicine_obj = {
      //   type: '',
      //   id: id,
      //   item_id: item_id,
      //   name: name,
      //   qty: quantity,
      //   selling_price : selling_price,
      //   total_price: quantity * selling_price,
      //
      //   };
      // if (this.items.length == 0){
      //   this.items.push(medicine_obj)
      // }else if (this.items.length > 0){
      //   let has_id = [];
      //   this.items.map(el=>{
      //     has_id.push(el.item_id)
      //   })
      //   // **********
      //   if (has_id.includes(item_id) == true){
      //     let item = this.items.find(el=>el.item_id == item_id)
      //     item.qty += 1;
      //     item.total_qty = item.qty * 1
      //     item.total_price = item.total_qty * item.selling_price
      //   }else{
      //     this.items.push(medicine_obj)
      //   }
      // }
    },
  },
  mounted() {
    this.show()
    this.totalAmount()
 

    $('.oral').select2();
    $('.topical').select2();
    $('.skin_care_medicine').select2();
    $('.procedure').select2();
    $('.sig').select2();
    axios.get(this.$store.state.url+'item_unit')
        .then( res => res.data.data)
        .then(data =>{
          this.medicines = data
          this.oral_medicine = data.filter(el=>el.category_id == 4)
          this.topical_medicine = data.filter(el=>el.category_id == 6)
          this.skin_care_medicine = data.filter(el=>el.category_id == 9)
            }
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'treatment_unit')
        .then( res => res.data.data)
        .then(data =>{
              this.treatments = data
            }
        )
        .catch(function (error) {
          console.log(error);
        });

        axios.get(this.$store.state.url+'category')
             .then(res => res.data.data)
             .then(data=>{
                   this.categories = data
                  }
            )
              .catch(function (error) {
               console.log(error);
               });

    axios.get(this.$store.state.url+'skin_care')
        .then( res => res.data.data)
        .then(data =>
            this.skin_cares = data
        )
        .catch(function (error) {
          console.log(error);
        });
   
  }
}
</script>

<style scoped>
.form-label{
  font-size: 12px;
}
</style>