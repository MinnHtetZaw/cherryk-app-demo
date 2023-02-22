<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <h4 class="text-secondary fw-normal">Purchase Create Form</h4>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-9">
          <div class="card border-0 shadow-sm py-3 px-5 rounded">
            <form ref="purchase" @submit.prevent="">
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">Purchase Date</label>
                  <input type="date" class="form-control" name="purchase_date">
                </div>
                <div class="col-6">
                  <label class="form-label">Supplier Name</label>
                  <select name="supplier_id" class="form-select">
                    <option v-for="supplier in suppliers" :key="'supplier'+supplier.id" :value="supplier.id">{{supplier.name}}</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Remark</label>
                <textarea name="remark" class="form-control" rows="3"></textarea>
              </div>
              <hr>
              <div class="mb-3">
                <table class="table table-borderless">
                  <thead>
                  <tr>
                    <th class="text-center text-secondary fw-normal">No.</th>
                    <th class="text-center text-secondary fw-normal">Name</th>
                    <th class="text-center text-secondary fw-normal">Qty</th>
                    <th class="text-center text-secondary fw-normal">Price</th>
                    <th class="text-center text-secondary fw-normal">Sub Total</th>
                    <th class="text-center text-secondary fw-normal"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="text-center" v-for="(item,index) in select_item" :key="'select_item'+item.id">
                    <td style="width: 70px;">
                      <input readonly type="number" class="form-control form-control-sm border-0" :value="index + 1" >
                    </td>
                    <td style="width: 250px;">
                      <input type="hidden" name="item_id[]" :value="item.id">
                      <textarea readonly name="item_name[]" class="form-control form-control-sm border-0" rows="1" :value="item.item_name"></textarea>
                      <input name="item_type[]"  type="hidden" :value="item.item_type">

                    </td>
                    <td style="width: 70px;">
                      <input type="number" readonly class="form-control form-control-sm border-0" name="qty[]" :value="item.qty">
                    </td>
                    <td>
                      <input type="number" class="form-control form-control-sm border-0" name="purchase_price[]" :value="item.purchase_price">
                    </td>
                    <td>
                      <input type="number" class="form-control form-control-sm border-0" name="sub_total[]" :value="item.sub_total">
                    </td>
                    <td>
                      <i @click="deleteItem(item.id)" class="text-danger fa-solid fa-circle-minus"></i>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Total Quantity</label>
                      <input type="number" class="form-control" id="total_qty" name="total_qty" :value="select_item.reduce((pv, cv) => pv + cv.qty, 0)">
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Total Price</label>
                      <input type="number" class="form-control" id="total_price" name="total_price" :value="select_item.reduce((pv, cv) => pv + cv.sub_total, 0)">
                    </div>
                  </div>
                </div>


                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">Save</button>
                  <!-- Modal -->
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content w-75">
                        <div class="modal-header bg-primary">
                          <h5 class="modal-title" id="exampleModalLabel">Purchase Payment</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body ">
                          <div class="mb-3">
                            <div class="d-flex justify-content-center gap-3">
                              <div class="form-check form-check-inline">
                                <input @change="payment_type = 'credit'" class="form-check-input" type="radio" name="payment_type" id="inlineRadio1" value="credit">
                                <label class="form-check-label" for="inlineRadio1">Credit</label>
                              </div>
                              <div @change="payment_type = 'cash'" class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="payment_type" id="inlineRadio2" value="cash_down">
                                <label class="form-check-label" for="inlineRadio2">Cash Down</label>
                              </div>
                            </div>
                          </div>
                          <div v-if="payment_type == 'credit'">
                            <div class="mb-3">
                              <label class="form-label">Credit Amount</label>
                              <input  name="credit_amount" readonly type="number" class="form-control" id="credit_amount">
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Pay Amount</label>
                              <input placeholder="Please Enter Pay Amount" @keyup="calcCredit" name="pay_amount" type="number" class="form-control" id="pay_amount">
                            </div>
                          </div>
                          <div v-if="payment_type == 'cash'">
                            <div class="mb-3">
                              <label class="form-label">Pay Amount</label>
                              <input readonly id="cash_pay" name="pay_amount" type="number" class="form-control" :value="total">
                            </div>
                          </div>

                          <div class="d-flex justify-content-end gap-3">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button @click="storePurchase" type="button" data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

          </div>

        </div>

        <div class="col-3">
          <div class="card border-0 shadow-sm p-3 rounded">
            <div class="mb-3">
              <label class="form-label">Select Category</label>
              <select @change="getItem(category)" v-model="category" name="" class="form-select">
                <option value="1">Medicine</option>
                <option value="2">Procedure Medicine</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Select Item</label>
              <select @change="select" id="item" name="" class="form-select">
                <option value=""></option>
                <option v-if="items" v-for="item_unit in items" :key="'item_unit'+item_unit.id" :value="item_unit.id">{{item_unit.name}} </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Quantity</label>
              <input id="qty" type="number" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Enter Last Purchase Price</label>
              <input id="purchase" type="number" class="form-control">
              <input id="item_name" type="hidden">
              <input id="item_id" type="hidden">
              <input id="item_origin_price"  type="hidden">
            </div>
            <div class="mb-3">
              <button @click="saveItem" class="btn btn-primary w-100">Add</button>
              <div class="modal" tabindex="-1" id="dis_mod">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-primary">
                      <h5 class="modal-title">Item Price Changes</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-6">
                          <h5 class="fw-normal text-secondary">Former Price</h5>
                          <div class="mb-3">
                            <label class="form-label">Purchase Price</label>
                            <input id="former_purchase_price" type="number" class="form-control" >
                            <input id="former_item_id" type="hidden" class="form-control" >
                          </div>
                        </div>
                        <div class="col-6">
                          <h5 class="fw-normal text-secondary">Current Price</h5>
                          <div class="mb-3">
                            <label class="form-label">Purchase Price</label>
                            <input id="current_purchase_price" type="number" class="form-control" >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex gap-3 justify-content-end mb-3 mx-3">
                      <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal" @click="dis_close">Cancel</button>
                      <button @click="confirm" type="button" class="btn btn-sm btn-primary">Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
import router from "@/router";
import Swal from "sweetalert2";
import {mapGetters} from "vuex";
export default {
  name: "PurchaseCreateForm",
  components: {SideNav},
  data() {
    return {
      payment_type : '',
      brands: null,
      item: [],
      select_item : [],
      suppliers: null,
      items: {},
      choose_item: '',
      category: '',
    }
  },
  computed: {
    ...mapGetters([
       'getUrl'
    ]),
    total() {
      return this.select_item.reduce((pv, cv) => pv + cv.sub_total, 0)
    }
  },
  methods: {
    getMedicine: function (){
      axios.get(this.getUrl('item_unit?all='))
          .then(response => response.data.data)
          .then(data=>{
            this.items = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getProcedureMedicine: function (){
      axios.get(this.getUrl('counting_unit_procedure_item'))
          .then(response => response.data.data)
          .then(data=>{
            this.items = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getItem: function (v){
      if (v == 1){
        this.getMedicine()
      }else if(v == 2){
        this.getProcedureMedicine()
      }
    },
    selectItemUnit(e) {
      let brand_id = e.target.value;
      axios.get(this.$store.state.url+'item')
          .then(response => response.data.data)
          .then(data=>{
            this.item = data.find(el=>el.brand_id == brand_id)

            console.log(this.item)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    chooseItem: function (v){
      alert(v)
      if (v == 'medicine'){
        axios.get(this.$store.state.url+'item_unit')
            .then(response => response.data.data)
            .then(data=>{
              this.items = data
            })
            .catch(function (error) {
              console.log(error);
            });
      }else if( v == 'procdure'){
        axios.get(this.$store.state.url+'counting_unit_procedure_item')
            .then(response => response.data.data)
            .then(data=>{
              this.items = data
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    },
    select(){
      let id = $('#item').find(":selected").val();
      let type = this.category
      if (type == 1){
        axios.get(this.getUrl('show-item_unit/'+id))
            .then(res => res.data.data)
            .then(data=>{
              console.log(data)
              $('#purchase').val(data.purchase_price)
              $('#item_origin_price').val(data.purchase_price)

              $('#item_name').val(data.name)
              $('#item_id').val(data.id)
            })
            .catch(function (error) {
              console.log(error);
            });
      }else if (type == 2){
        axios.get(this.getUrl('counting_unit_procedure_item/'+id))
            .then(res => res.data.data)
            .then(data =>{
              console.log(data)
              $('#purchase').val(data.purchase_price)
              $('#item_origin_price').val(data.purchase_price)

              $('#item_name').val(data.name)
              $('#item_id').val(data.id)
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    },
    saveItem(){
      let item_name = $('#item_name').val();
      let type = this.category
      let purchase_price = $('#purchase').val();
      let origin_price = $('#item_origin_price').val();
      let qty = $('#qty').val();
      let item_id = $('#item_id').val();
      let select_item = {
        id : item_id,
        item_name : item_name,
        item_type : type,
        purchase_price : Number(purchase_price),
        qty : Number(qty),
        sub_total : Number(purchase_price * qty)
      }
      if (select_item.qty <= 0){
        Swal.fire(
            '',
            'Purchase Quantity Must Be Greater Than 0!',
            'warning',
        )
      }else {
          this.select_item.push(select_item)
        // if (purchase_price == origin_price ){
        //   this.select_item.push(select_item)
        // }else {
        //   this.discountModal()
        //   $('#former_purchase_price').val(origin_price)
        //   $('#former_item_id').val(item_id)
        //   $('#current_purchase_price').val(purchase_price)
        // }
      }

      $('#purchase').val('')
      $('#item_origin_price').val('')
      $('#item').val('')
      $('#qty').val('')

      $('#item_name').val('')
      $('#item_id').val('')

    },
    deleteItem(id){
      this.select_item = this.select_item.filter(el=>el.id != id)
    },
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
    storePurchase(){
      let formData = new FormData(this.$refs.purchase);
      axios.post(this.$store.state.url+'purchase',formData)
          .then(res=>{
            console.log(res.data.data)
            console.log()
            this.alertSuccess()
            router.push({path: '/purchaseList'})
          })
          .then(data =>{

          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    confirm(){
      let item_name = $('#item_name').val();
      let purchase_price = $('#purchase').val();
      let qty = $('#qty').val();
      let item_id = $('#item_id').val();
      let select_item = {
        id : item_id,
        item_name : item_name,
        purchase_price : Number(purchase_price),
        qty : Number(qty),
        sub_total : Number(purchase_price * qty)
      }
      this.select_item.push(select_item)
      this.dis_close()
    },
    calcCredit(){
      let total_amount = $('#total_price').val();
      let pay_amount = $('#pay_amount').val();
      let result = Number(total_amount - pay_amount);
      $('#credit_amount').val(result)
    },
    discountModal(e){
      $('#dis_mod').show();
    },
    dis_close(){
      $('#dis_mod').hide();
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
    }
  },
  mounted() {
    $(document).ready(function() {
      $('.js-example-basic-single').select2();
    });
    this.getSuppliers()

  }
}
</script>

<style scoped>

</style>