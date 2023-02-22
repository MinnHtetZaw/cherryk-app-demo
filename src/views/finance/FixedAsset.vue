<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="fw-normal text-secondary">Fixed Asset</h4>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#asset">Add Asset</button>
          <!-- Modal -->
          <div class="modal fade" id="asset" tabindex="-1" aria-labelledby="assetLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header bg-primary">
                  <h5 class="modal-title" id="assetLabel">Create Asset</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="" ref="asset">
                    <div class="mb-2">
                      <select name="type" class="form-select form-select-sm">
                        <option value="">Select Asset Type</option>
                        <option value="Home">Home</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Machinery">Machinery</option>
                      </select>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Name</label>
                      <input type="text" name="name" class="form-control form-control-sm">
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Description</label>
                      <textarea name="description" rows="2" class="form-control form-control-sm"></textarea>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="mb-2">
                        <label class="form-label">Purchase Initial Value</label>
                        <input id="purchase_initial" type="number" name="purchase_initial" class="form-control form-control-sm">
                      </div>
                      <div class="mb-2">
                        <label class="form-label">Salvage Value</label>
                        <input id="salvage" type="number" name="salvage" class="form-control form-control-sm">
                      </div>
                    </div>

                    <div class="mb-2">
                      <label class="form-label">Use Life</label>
                      <input id="use_life" @keyup="calcDepreciation" type="number" name="use_life" class="form-control form-control-sm">
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Monthly Depreciation</label>
                      <input id="month_depreciation" type="number" name="month_depreciation" class="form-control form-control-sm">
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Yearly Depreciation</label>
                      <input id="year_depreciation" type="number" name="yearly_depreciation" class="form-control form-control-sm">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Start Date</label>
                      <input type="date" name="start_date" class="form-control form-control-sm">
                    </div>
<!--                    <div class="mb-2">-->
<!--                      <label class="form-label">Current Price</label>-->
<!--                      <input type="number" name="current_price" class="form-control form-control-sm">-->
<!--                    </div>-->
                    <div class="">
                      <button @click="storeAsset" data-bs-dismiss="modal" class="btn btn-primary w-100">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card shadow-sm border-0 rounded p-3">
        <div>
          <table class="table table-hover table-borderless">
            <thead>
            <tr>
              <th class="text-center text-secondary fw-normal">No.</th>
              <th class="text-center text-secondary fw-normal">Start Date</th>
              <th class="text-center text-secondary fw-normal">Name</th>
              <th class="text-center text-secondary fw-normal">Purchase Initial Price</th>
              <th class="text-center text-secondary fw-normal">Salvage Value</th>
              <th class="text-center text-secondary fw-normal">Monthly Depreciate</th>
              <th class="text-center text-secondary fw-normal">Yearly Depreciate</th>
              <th class="text-center text-secondary fw-normal">Current Price</th>
              <th class="text-center text-secondary fw-normal">Used Life</th>
              <th class="text-center text-secondary fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="assets != null" v-for="(asset,index) in assets" :key="'asset'+asset.id">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center">{{asset.start_date}}</td>
              <td class="text-center">{{asset.name}}</td>
              <td class="text-center">{{asset.purchase_initial}}</td>
              <td class="text-center">{{asset.salvage}}</td>
              <td class="text-center">{{asset.month_depreciation}}</td>
              <td class="text-center">{{asset.yearly_depreciation}}</td>
              <td class="text-center">{{asset.current_price}}</td>
              <td class="text-center">{{asset.use_life}}</td>
              <td class="d-flex justify-content-center gap-3">
                <button @click="showSellEnd(asset.id)" class="btn btn-primary btn-sm"> Sell / End</button>
<!--                Modal-->
<!--                <div class="modal fade" :id="'sellEnd'+asset.id" tabindex="-1" aria-labelledby="sellEndLabel" aria-hidden="true">-->
<!--                  <div class="modal-dialog">-->
<!--                    <div class="modal-content">-->
<!--                      <div class="modal-header bg-primary">-->
<!--                        <h5 class="modal-title" id="sellEndLabel">{{asset.name}}'s Sell / End </h5>-->
<!--                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--                      </div>-->
<!--                      <div class="modal-body">-->
<!--                        -->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
              </td>
            </tr>
            <tr v-else>
              <td class="text-center" colspan="10">
                <img src="../../assets/search_not_found.svg" style="width: 400px;" alt="">
              </td>
            </tr>
            </tbody>
          </table>

          <div class="modal" tabindex="-1" id="dis_mod">
            <div class="modal-dialog">
              <div class="modal-content w-75">
                <div class="modal-header bg-primary">
                  <h5 class="modal-title ">Sell / End </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="updateSellEnd(edit_asset.id)" ref="sellEnd" >
                    <div class="d-flex justify-content-center">
                      <div class="form-check form-check-inline">
                        <input v-model="sellEnd" class="form-check-input" type="radio" name="sell_end_type" id="Sell" value="Sell">
                        <label class="form-check-label" for="Sell">Sell</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input v-model="sellEnd" class="form-check-input" type="radio" name="sell_end_type" id="End" value="End">
                        <label class="form-check-label" for="End">End</label>
                      </div>
                    </div>
                    <!--                          Sell-->
                    <div v-if="sellEnd == 'Sell'">
                      <div class="mb-3">
                        <label class="form-label">Current Price</label>
                        <input :id="'current_price'+ edit_asset.id" type="number" name="current_price" class="form-control" :value="edit_asset.current_price">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Sell Price</label>
                        <input @keyup="calcProfitLoss(edit_asset.id)" :id="'sell_price'+edit_asset.id" type="number" name="sell_price" class="form-control">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Sell Date</label>
                        <input type="date" name="sell_date" class="form-control">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Profit / Loss</label>
                        <input :id="'profitLoss'+edit_asset.id" type="number" name="profit_loss_value" class="form-control">
                      </div>
                    </div>


                    <!--                          End-->
                    <div v-if="sellEnd == 'End'">
                      <div class="mb-3">
                        <label class="form-label">Used Year</label>
                        <input type="number" name="used_year" class="form-control">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Remaining Year</label>
                        <input type="number" name="remaining_year" class="form-control ">
                      </div>

                      <div class="mb-3">
                        <label class="form-label">End Date</label>
                        <input type="date" name="end_date" class="form-control">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Remark</label>
                        <textarea class="form-control" name="end_remark" rows="3"></textarea>
                      </div>
                    </div>


                    <div class="d-flex gap-3 justify-content-end align-items-center">
                      <button class="btn btn-danger" @click="dis_close">Cancel</button>
                      <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                  </form>

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
import Swal from "sweetalert2";
export default {
  name: "FixedAsset",
  components: {SideNav},
  data() {
    return {
      assets : null,
      sellEnd: 'Sell',
      edit_asset: [],
    }
  },
  methods: {
    calcDepreciation() {
      let initial = Number($('#purchase_initial').val());
      let salvage = Number($('#salvage').val());
      let use_life = Number($('#use_life').val());
      let result_year = Math.floor((initial - salvage)/use_life);
      let result_month = Math.floor(result_year / 12);
      $('#month_depreciation').val(result_month);
      $('#year_depreciation').val(result_year);
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
    storeAsset(){
      let formData = new FormData(this.$refs.asset);
      axios.post(this.$store.state.url+'fix_asset',formData)
          .then(res=>res.data.data)
          .then(data =>{
            this.alertSuccess()
            this.show()
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
    calcProfitLoss(id){
      let cur_price = Number($('#current_price'+id).val());
      let sell_price = Number($('#sell_price'+id).val());
      let result = sell_price - cur_price;
      $('#profitLoss'+id).val(result);
    },
    showSellEnd(id){
      axios.get(this.$store.state.url+'fix_asset/'+id)
          .then(res=>res.data.data)
          .then(data =>{
            this.edit_asset = data
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
      $('#dis_mod').show()

    },
    updateSellEnd(id){
      let formData = new FormData(this.$refs.sellEnd);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'fix_asset/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
                this.alertSuccess()
                    this.show()
              }
          )
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    dis_close(){
      $('#dis_mod').hide();
    },
    show(){
      axios.get(this.$store.state.url+'fix_asset')
          .then(res=>res.data.data)
          .then(data =>{
            this.assets = data
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    }
  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped>

</style>