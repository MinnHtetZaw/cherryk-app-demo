<template>
<SideNav>
  <div class="mb-3">
    <h6 class="fw-normal text-secondary">Stock Count & Price</h6>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card p-0 border-0">
        <ul class="nav nav-pills mb-3 mt-2 px-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-medicine-tab" data-bs-toggle="pill" data-bs-target="#pills-medicine" type="button" role="tab" aria-controls="pills-medicine" aria-selected="true">Medicine Items</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-procedure-tab" data-bs-toggle="pill" data-bs-target="#pills-procedure" type="button" role="tab" aria-controls="pills-procedure" aria-selected="false">Procedure Items</button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-medicine" role="tabpanel" aria-labelledby="pills-medicine-tab" tabindex="0">
            <div>
              <div class="d-flex px-3 pt-2 justify-content-between">
                <h6 class="mb-0 fw-normal">Medicine Item Lists</h6>
                <a
                    type="button"
                    :href="getUrl('medicine-item-export')"
                    download="file.xlsx"
                >
                  <button class="btn btn-outline-success btn-sm" title="Export">
                    <i class="fa-solid fa-file-export me-2"></i>
                    Excel Export
                  </button>
                </a>
                  <Search @search="searchCountingUnit"></Search>


              </div>
              <table class="table table-hover">
                <thead>
                <tr>
                  <th class="text-secondary text-center">#</th>
                  <th class="text-secondary text-center">Code</th>
                  <th class="text-secondary text-center">Name</th>
                  <th class="text-secondary text-center">Qty</th>
                  <th class="text-secondary text-center">Selling Price ( MMK )</th>
                  <th class="text-secondary text-center">Purchase Price ( MMK )</th>
                  <th class="text-secondary text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="(item,index) in items.data" >
                  <td>{{item.id}}</td>
                  <td class="">{{item.code}}</td>
                  <td class="">{{item.name}}</td>
                  <td style="width: 150px;">
                    <input v-if="item.current_qty <= 0" type="number" :id="'current_qty'+item.id" class="form-control is-invalid form-control-sm" @change="changeStock(item.id)" :value="item.current_qty">
                    <input v-else  type="number" :id="'current_qty'+item.id" class="form-control bg-transparent form-control-sm" @change="changeStock(item.id)" :value="item.current_qty">
                  </td>
                  <td style="width: 150px;">
                    <input type="number" :id="'selling_price'+item.id" class="form-control bg-transparent form-control-sm" @change="changeSellingPrice(item.id)" :value="item.selling_price">
                  </td>
                  <td style="width: 150px;">
                    <input type="number" :id="'purchase_price'+item.id" class="form-control bg-transparent form-control-sm" @change="changePurchasePrice(item.id)" :value="item.purchase_price">
                  </td>
                  <td class="text-center">
                    <button @click="itemUnitDetail(item.item_id)" class="btn btn-primary btn-sm small">
                      <i class="fa-solid small fa-angles-right"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

          </div>
          <div class="tab-pane fade" id="pills-procedure" role="tabpanel" aria-labelledby="pills-procedure-tab" tabindex="0">
            <div>
              <div class="d-flex px-3 pt-2 justify-content-between">
                <h6 class="mb-0 fw-normal">Procedure Item Lists</h6>
                <a
                    type="button"
                    :href="getUrl('procedure-item-export')"
                    download="file.xlsx"
                >
                  <button class="btn btn-outline-success btn-sm" title="Export">
                    <i class="fa-solid fa-file-export me-2"></i>
                    Excel Export
                  </button>
                </a>
                <Search @search="searchCountingUnitProcedureItem"></Search>
              </div>
              <table class="table table-hover">
                <thead>
                <tr>
                  <th class="text-secondary text-center">#</th>
                  <th class="text-secondary text-center">Code</th>
                  <th class="text-secondary text-center">Name</th>
                  <th class="text-secondary text-center">Qty</th>
                  <th class="text-secondary text-center">From Unit</th>
                  <th class="text-secondary text-center">To Unit</th>
                  <th class="text-secondary text-center">Total Unit</th>
                  <th class="text-secondary text-center">Selling Price ( MMK )</th>
                  <th class="text-secondary text-center">Purchase Price ( MMK )</th>
                  <th class="text-secondary text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(procedure,index) in procedure_items.data" :key="'procedure'+procedure.id">
                  <td class="text-center">{{procedure.id}}</td>
                  <td class="text-start">{{procedure.code}}</td>
                  <td class="text-start">{{procedure.name}}</td>
                  <td style="width: 100px;">
                    <input type="number" v-if="procedure.current_qty <= 0" :id="'procedure_current_qty'+procedure.id" class="form-control is-invalid form-control-sm" @change="changeProcedureQty(procedure.id)" :value="procedure.current_qty">
                    <input type="number" v-else :id="'procedure_current_qty'+procedure.id" class="form-control bg-transparent form-control-sm" @change="changeProcedureQty(procedure.id)" :value="procedure.current_qty">
                  </td>

                  <td style="width: 100px;">
                    <input type="number" :id="'procedure_from_unit'+procedure.id" class="form-control bg-transparent form-control-sm" @change="changeProcedureFromUnit(procedure.id)"  :value="procedure.from_unit">
                  </td>
                  <td style="width: 100px;">
                    <input type="number" :id="'procedure_to_unit'+procedure.id" class="form-control bg-transparent form-control-sm" @change="changeProcedureToUnit(procedure.id)"  :value="procedure.to_unit">
                  </td>
                  <td style="width: 100px;">
                    <input type="number" :id="'procedure_per_unit_qty'+procedure.id" class="form-control bg-transparent form-control-sm" :value="procedure.current_qty * procedure.to_unit">
                  </td>
                  <td style="width: 150px;">
                    <input type="number" :id="'procedure_selling_price'+procedure.id" class="form-control bg-transparent form-control-sm" @change="changeProcedureSellingPrice(procedure.id)" :value="procedure.selling_price">
                  </td>
                  <td style="width: 150px;">
                    <input type="number" :id="'procedure_purchase_price'+procedure.id" class="form-control bg-transparent form-control-sm" @change="changeProcedurePurchasePrice(procedure.id)" :value="procedure.purchase_price">
                  </td>
                  <td>
                    <button @click="procedureUnitDetail(procedure.procedure_item_id)" class="btn btn-primary btn-sm small">
                      <i class="fa-solid small fa-angles-right"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--  <div class="row">-->
<!--    <div class="col-12 ma-auto">-->
<!--      <div class="my-2">-->
<!--        <div class="card border-0 p-0 shadow-sm rounded-lg">-->
<!--          <Tab class="px-3 pt-2">-->
<!--            <li class="nav-item" role="presentation">-->
<!--              <button class="nav-link active" id="medicine-tab" data-bs-toggle="pill" data-bs-target="#medicine" type="button" role="tab" aria-controls="medicine" aria-selected="true">Medicines</button>-->
<!--            </li>-->
<!--            <li class="nav-item" role="presentation">-->
<!--              <button class="nav-link" id="procedure-tab" data-bs-toggle="pill" data-bs-target="#procedure" type="button" role="tab" aria-controls="procedure" aria-selected="false">Procedure Items</button>-->
<!--            </li>-->
<!--          </Tab>-->
<!--          <div class="tab-content" id="pills-tabContent">-->
<!--            <div class="tab-pane fade show active" id="medicine" role="tabpanel" aria-labelledby="medicine-tab">-->
<!--              <div class="d-flex px-3 justify-content-end">-->
<!--                <Search @search="searchCountingUnit"></Search>-->
<!--              </div>-->

<!--              <table class="table table-hover">-->
<!--                <thead>-->
<!--                <tr>-->
<!--                  <th class="text-secondary text-center">ID</th>-->
<!--                  <th class="text-secondary text-center">Code</th>-->
<!--                  <th class="text-secondary text-center">Name</th>-->
<!--                  <th class="text-secondary text-center">Qty</th>-->
<!--&lt;!&ndash;                  <th class="text-secondary text-center">From Unit</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="text-secondary text-center">To Unit</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="text-secondary text-center">Unit Convention</th>&ndash;&gt;-->
<!--                  <th class="text-secondary text-center">Selling Price</th>-->
<!--                  <th class="text-secondary text-center">Purchase Price</th>-->
<!--                  <th></th>-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">Action</th>&ndash;&gt;-->
<!--                </tr>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                <tr class="text-center" v-for="(item,index) in items.data" >-->
<!--                  <td>{{item.id}}</td>-->
<!--                  <td class="text-start">{{item.code}}</td>-->
<!--                  <td class="text-start">{{item.name}}</td>-->
<!--                  <td style="width: 100px;">-->
<!--                    <input v-if="item.current_qty <= 0" type="number" :id="'current_qty'+item.id" class="form-control is-invalid form-control-sm" @change="changeStock(item.id)" :value="item.current_qty">-->
<!--                    <input v-else  type="number" :id="'current_qty'+item.id" class="form-control border-0 bg-transparent form-control-sm" @change="changeStock(item.id)" :value="item.current_qty">-->
<!--                  </td>-->
<!--                  <td style="width: 150px;">-->
<!--                    <input type="number" :id="'selling_price'+item.id" class="form-control border-0 bg-transparent form-control-sm" @change="changeSellingPrice(item.id)" :value="item.selling_price">-->
<!--                  </td>-->
<!--                  <td style="width: 150px;">-->
<!--                    <input type="number" :id="'purchase_price'+item.id" class="form-control border-0 bg-transparent form-control-sm" @change="changePurchasePrice(item.id)" :value="item.purchase_price">-->
<!--                  </td>-->
<!--                  <td style="width: 30px;">-->
<!--                    <button @click="itemUnitDetail(item.item_id)" class="btn btn-primary btn-sm small">-->
<!--                      <i class="fa-solid small fa-angles-right"></i>-->

<!--                    </button>-->
<!--                  </td>-->

<!--                </tr>-->
<!--                </tbody>-->
<!--              </table>-->
<!--              <div class="d-flex justify-content-between">-->
<!--                <Pagination @getData="getItem" v-if="items.meta" :links="items.meta.links"></Pagination>-->

<!--              </div>-->
<!--            </div>-->

<!--&lt;!&ndash;            Procedure Item&ndash;&gt;-->
<!--            <div class="tab-pane fade" id="procedure" role="tabpanel" aria-labelledby="procedure-tab">-->
<!--&lt;!&ndash;              <div class="d-flex justify-content-end">&ndash;&gt;-->
<!--&lt;!&ndash;                <form class="d-flex" @submit.prevent="" ref="procedure_search">&ndash;&gt;-->
<!--&lt;!&ndash;                  <input style="background-color: transparent;" name="search"  @keyup="searchProcedureItemUnit" type="text" class="form-control form-control-sm rounded-pill" placeholder="Search">&ndash;&gt;-->
<!--&lt;!&ndash;                </form>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--              -->
<!--              <div class="d-flex justify-content-end">-->
<!--                <Search @search="searchCountingUnitProcedureItem"></Search>-->
<!--              </div>-->
<!--              <table class="table table-hover table-striped table-borderless">-->
<!--                <thead>-->
<!--                <tr>-->
<!--                  <th class="fw-normal text-secondary text-center">No.</th>-->
<!--                  <th class="fw-normal text-secondary text-center">Code</th>-->
<!--                  <th class="fw-normal text-secondary text-center">Name</th>-->
<!--                  <th class="fw-normal text-secondary text-center">Qty</th>-->
<!--                  <th class="fw-normal text-secondary text-center">From Unit</th>-->
<!--                  <th class="fw-normal text-secondary text-center">To Unit</th>-->
<!--                  <th class="fw-normal text-secondary text-center">Total Unit</th>-->
<!--                  <th class="fw-normal text-secondary text-center">Selling Price</th>-->
<!--                  <th class="fw-normal text-secondary text-center">Purchase Price</th>-->
<!--                  <th></th>-->
<!--                </tr>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                <tr class="text-center" v-for="(procedure,index) in procedure_items.data" :key="'procedure'+procedure.id">-->
<!--                  <td>{{procedure.id}}</td>-->
<!--                  <td class="text-start">{{procedure.code}}</td>-->
<!--                  <td class="text-start">{{procedure.name}}</td>-->
<!--                  <td style="width: 100px;">-->
<!--                    <input type="number" v-if="procedure.current_qty <= 0" :id="'procedure_current_qty'+procedure.id" class="form-control is-invalid form-control-sm" @change="changeProcedureQty(procedure.id)" :value="procedure.current_qty">-->
<!--                    <input type="number" v-else :id="'procedure_current_qty'+procedure.id" class="form-control border-0 bg-transparent form-control-sm" @change="changeProcedureQty(procedure.id)" :value="procedure.current_qty">-->
<!--                  </td>-->

<!--                  <td style="width: 100px;">-->
<!--                    <input type="number" :id="'procedure_from_unit'+procedure.id" class="form-control border-0 bg-transparent form-control-sm" @change="changeProcedureFromUnit(procedure.id)"  :value="procedure.from_unit">-->
<!--                  </td>-->
<!--                  <td style="width: 100px;">-->
<!--                    <input type="number" :id="'procedure_to_unit'+procedure.id" class="form-control border-0 bg-transparent form-control-sm" @change="changeProcedureToUnit(procedure.id)"  :value="procedure.to_unit">-->
<!--                  </td>-->
<!--                  <td style="width: 100px;">-->
<!--                    <input type="number" :id="'procedure_per_unit_qty'+procedure.id" class="form-control border-0 bg-transparent form-control-sm" :value="procedure.current_qty * procedure.to_unit">-->
<!--                  </td>-->
<!--                  <td style="width: 150px;">-->
<!--                    <input type="number" :id="'procedure_selling_price'+procedure.id" class="form-control border-0 bg-transparent form-control-sm" @change="changeProcedureSellingPrice(procedure.id)" :value="procedure.selling_price">-->
<!--                  </td>-->
<!--                  <td style="width: 150px;">-->
<!--                    <input type="number" :id="'procedure_purchase_price'+procedure.id" class="form-control border-0 bg-transparent form-control-sm" @change="changeProcedurePurchasePrice(procedure.id)" :value="procedure.purchase_price">-->
<!--                  </td>-->
<!--                  <td style="width: 30px;">-->
<!--                    <button @click="procedureUnitDetail(procedure.procedure_item_id)" class="btn btn-primary btn-sm small">-->
<!--                      <i class="fa-solid small fa-angles-right"></i>-->

<!--                    </button>-->
<!--                  </td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--              </table>-->
<!--              <div class="d-flex justify-content-between">-->
<!--                <Pagination @getData="getProcedureItem" v-if="procedure_items.meta" :links="procedure_items.meta.links"></Pagination>-->

<!--              </div>-->
<!--            </div>-->

<!--&lt;!&ndash;            Kit Item&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="tab-pane fade" id="kit" role="tabpanel" aria-labelledby="kit-tab">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="d-flex justify-content-end">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                <form class="d-flex" @submit.prevent="" ref="procedure_search">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  <input style="background-color: transparent;" name="search"  @keyup="searchProcedureItemUnit" type="text" class="form-control form-control-sm rounded-pill" placeholder="Search">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                </form>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              <table class="table table-hover table-striped table-borderless">&ndash;&gt;-->
<!--&lt;!&ndash;                <thead>&ndash;&gt;-->
<!--&lt;!&ndash;                <tr>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">No.</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">Code</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">Name</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">Qty</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">From Unit</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">To Unit</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">Total Unit</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">Sale Price</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th class="fw-normal text-secondary text-center">Purchase Price</th>&ndash;&gt;-->
<!--&lt;!&ndash;                  <th></th>&ndash;&gt;-->
<!--&lt;!&ndash;                </tr>&ndash;&gt;-->
<!--&lt;!&ndash;                </thead>&ndash;&gt;-->
<!--&lt;!&ndash;                <tbody>&ndash;&gt;-->
<!--&lt;!&ndash;                <tr class="text-center" v-for="(kit,index) in kit_items">&ndash;&gt;-->
<!--&lt;!&ndash;                  <td>{{index + 1}}</td>&ndash;&gt;-->
<!--&lt;!&ndash;                  <td>{{kit.code}}</td>&ndash;&gt;-->
<!--&lt;!&ndash;                  <td>{{kit.name}}</td>&ndash;&gt;-->
<!--&lt;!&ndash;                  <td style="width: 100px;">&ndash;&gt;-->
<!--&lt;!&ndash;                    <input type="number" :id="'kit_current_qty'+kit.id" class="form-control form-control-sm" @change="changeProcedureQty(kit.id)" :value="kit.current_qty">&ndash;&gt;-->
<!--&lt;!&ndash;                  </td>&ndash;&gt;-->

<!--&lt;!&ndash;                  <td style="width: 100px;">&ndash;&gt;-->
<!--&lt;!&ndash;                    <input type="number" :id="'kit_from_unit'+kit.id" class="form-control form-control-sm" @change="changeProcedureFromUnit(kit.id)"  :value="kit.from_unit">&ndash;&gt;-->
<!--&lt;!&ndash;                  </td>&ndash;&gt;-->

<!--&lt;!&ndash;                  <td style="width: 100px;">&ndash;&gt;-->
<!--&lt;!&ndash;                    <input type="number" :id="'kit_to_unit'+kit.id" class="form-control form-control-sm" @change="changeProcedureToUnit(kit.id)"  :value="kit.to_unit">&ndash;&gt;-->
<!--&lt;!&ndash;                  </td>&ndash;&gt;-->

<!--&lt;!&ndash;                  <td style="width: 100px;">&ndash;&gt;-->
<!--&lt;!&ndash;                    <input type="number" :id="'kit_per_unit_qty'+kit.id" class="form-control form-control-sm" @change="changeProcedurePerUnit(kit.id)" :value="kit.current_qty * kit.to_unit">&ndash;&gt;-->
<!--&lt;!&ndash;                  </td>&ndash;&gt;-->

<!--&lt;!&ndash;                  <td style="width: 150px;">&ndash;&gt;-->
<!--&lt;!&ndash;                    <input type="number" :id="'kit_selling_price'+kit.id" class="form-control form-control-sm" @change="changeProcedureSellingPrice(kit.id)" :value="kit.selling_price">&ndash;&gt;-->
<!--&lt;!&ndash;                  </td>&ndash;&gt;-->
<!--&lt;!&ndash;                  <td style="width: 150px;">&ndash;&gt;-->
<!--&lt;!&ndash;                    <input type="number" :id="'kit_purchase_price'+kit.id" class="form-control form-control-sm" @change="changeProcedurePurchasePrice(kit.id)" :value="kit.purchase_price">&ndash;&gt;-->
<!--&lt;!&ndash;                  </td>&ndash;&gt;-->
<!--&lt;!&ndash;                  <td style="width: 30px;">&ndash;&gt;-->
<!--&lt;!&ndash;                    <button @click="kitUnitDetail(kit.kit_item_id)" class="btn btn-primary btn-sm small">&ndash;&gt;-->
<!--&lt;!&ndash;                      <i class="fa-solid small fa-angles-right"></i>&ndash;&gt;-->

<!--&lt;!&ndash;                    </button>&ndash;&gt;-->
<!--&lt;!&ndash;                  </td>&ndash;&gt;-->
<!--&lt;!&ndash;                </tr>&ndash;&gt;-->
<!--&lt;!&ndash;                </tbody>&ndash;&gt;-->
<!--&lt;!&ndash;              </table>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--          </div>-->

<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import Tab from "@/components/layout/Tab";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import {mapGetters, mapState} from "vuex";
export default {
  name: "StockCountPrice",
  components: {Search, Pagination, Tab, SideNav},
  data() {
    return {
      items: {},
      procedure_items: {},
      kit_items: null,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    // Get Counting Unit Items
    getItem:function(url){
      axios.get(url)
          .then(response => response.data)
          .then(data=>{
            this.items = data
            console.log(data)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    // Get Counting Unit Procedure Items
    getProcedureItem:function(url){
      axios.get(url)
          .then(response => response.data)
          .then(data=>{
            this.procedure_items = data
          })
          .catch(function (error) {
            console.log(error)
          });
    },

    searchCountingUnit:function (v){
     this.getItem(this.$store.state.url+'item_unit?keyword='+v)
    },
    searchCountingUnitProcedureItem:function (v){
     this.getProcedureItem(this.$store.state.url+'counting_unit_procedure_item?keyword='+v)
    },
    errorshow(){
      Swal.fire(
          'Please Try Again!',
          '',
          'error'
      )
    },
    //Item
    itemUnitDetail(id){
      router.push({path: '/itemUnit/'+id,query: { item_id: id}})
    },
    searchItemUnit(){
      let formData = new FormData(this.$refs.item_search)
      axios.post(this.$store.state.url+'item-unit-search',formData)
          .then(res=>res.data.data)
          .then(data=>{
            console.log(data)
            this.items = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    changeFromUnit(id) {
      let from_unit = $('#from_unit'+id).val();
      let medicine = {
        'id': id,
        'from_unit' : from_unit,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'item_unit/'+id,medicine
      )
          .then( res => res.data)
          .then(data =>{
            this.$store.dispatch('alertSuccess')
            this.getItem()
              }
          )
          .catch(function (error) {
            this.$store.dispatch('alertError')
            console.log(error);
          });
    },
    changeToUnit(id) {
      let to_unit = $('#to_unit'+id).val();
      let medicine = {
        'id': id,
        'to_unit' : to_unit,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'item_unit/'+id,medicine
      )
          .then( res => res.data)
          .then(data =>{
                this.alertSuccess()
                this.getItem()
              }
          )
          .catch(function (error) {
            console.log(error);
          });
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
    changeStock(id){
      let current_qty = $('#current_qty'+id).val();
      let medicine = {
        'id': id,
        'current_qty' : current_qty,
        '_method' : 'PATCH',
      }
      if (confirm("Please Confirm!") == true) {
        axios.post( this.getUrl('item_unit/'+id),medicine)
            .then(res =>{
                  this.$store.dispatch('alertSuccess')
                  this.getItem(this.getUrl('item_unit'))
                }
            )
            .catch(function (error) {
              console.log(error);
            });
      } else {
        this.show()
      }
    },
    changeSellingPrice(id){
      let selling_price = $('#selling_price'+id).val();
      let medicine = {
        'id': id,
        'selling_price' : selling_price,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'item_unit/'+id,medicine
      )
          .then( res => res.data)
          .then(data =>{
                this.alertSuccess()
                this.getItem()
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    changePurchasePrice(id){
      let purchase_price = $('#purchase_price'+id).val();
      let medicine = {
        'id': id,
        'purchase_price' : purchase_price,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'item_unit/'+id,medicine
      )
          .then( res => res.data)
          .then(data =>{
                this.alertSuccess()
                this.getItem()
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    //===================================================================================//
    //===================================================================================//
    //===================================================================================//
    // Procedure Item
    procedureUnitDetail(id){
      router.push({path: '/procedureItemUnit/'+id,query: { id: id}})
    },
    changeProcedureQty(id){
      let current_qty = $('#procedure_current_qty'+id).val();
      let procedure = {
        'id': id,
        'current_qty' : current_qty,
        '_method' : 'PATCH',
      }
      axios.post(this.getUrl('counting_unit_procedure_item/'+id),procedure)
          .then(res =>
              {
                this.$store.dispatch('alertSuccess')
                this.getProcedureItem(this.getUrl('counting_unit_procedure_item'))
              }
          )
          .catch(err => {
            this.$store.dispatch('alertError')
            console.log(err)
          })
    },
    changeProcedureSellingPrice(id){
      let selling_price = $('#procedure_selling_price'+id).val();
      let procedure = {
        'id': id,
        'selling_price' : selling_price,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'counting_unit_procedure_item/'+id,procedure
      )
          .then( res => res.data)
          .then(data =>{
                console.log(data)
                this.alertSuccess()
                this.getProcedureItem()

              }
          )
          .catch(function (error) {
            this.errorshow()
          });
    },
    changeProcedurePurchasePrice(id){
      let purchase_price = $('#procedure_purchase_price'+id).val();
      let procedure = {
        'id': id,
        'purchase_price' : purchase_price,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'counting_unit_procedure_item/'+id,procedure
      )
          .then( res => res.data)
          .then(data =>{
                console.log(data)
                this.alertSuccess()
                this.getProcedureItem()

              }
          )
          .catch(function (error) {
            this.errorshow()
          });
    },
    changeProcedureFromUnit(id){
      let from_unit = $('#procedure_from_unit'+id).val();
      let procedure = {
        'id': id,
        'from_unit' : from_unit,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'counting_unit_procedure_item/'+id,procedure
      )
          .then( res => res.data)
          .then(data =>{
                console.log(data)
                this.alertSuccess()
                this.getProcedureItem()

              }
          )
          .catch(function (error) {
            this.errorshow()
          });

    },
    changeProcedureToUnit(id){
      let to_unit = $('#procedure_to_unit'+id).val();
      let procedure = {
        'id': id,
        'to_unit' : to_unit,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'counting_unit_procedure_item/'+id,procedure
      )
          .then( res => res.data)
          .then(data =>{
                console.log(data)
                this.alertSuccess()
                this.getProcedureItem()

              }
          )
          .catch(function (error) {
            this.errorshow()
          });

    },
    changeProcedurePerUnit(id){
      let per_unit_qty = $('#procedure_per_unit_qty'+id).val();
      let procedure = {
        'id': id,
        'per_unit_qty' : per_unit_qty,
        '_method' : 'PATCH',
      }
      axios.post(this.$store.state.url+'counting_unit_procedure_item/'+id,procedure
      )
          .then( res => res.data)
          .then(data =>{
                console.log(data)
                this.alertSuccess()
                this.getProcedureItem()

              }
          )
          .catch(function (error) {
            this.errorshow()
          });

    },
    searchProcedureItemUnit(){
      let formData = new FormData(this.$refs.procedure_search)
      axios.post(this.$store.state.url+'procedure-item-unit-search',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.procedure_items = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    // Kit Item
    showKitItem: function (){
      axios.get(this.$store.state.url+'kit_unit')
          .then(response => response.data.data)
          .then(data=>{
            this.kit_items = data
          })
          .catch(function (error) {
          });    }
    // ===========
  },
  mounted() {

    this.getItem(this.$store.state.url+'item_unit')
    this.getProcedureItem(this.$store.state.url+'counting_unit_procedure_item')
    this.showKitItem()

  }
}
</script>

<style scoped>

</style>