<template>
  <SideNav>
    <div class="mb-3">
      <h4 class="fw-normal text-secondary">Create Treatment Unit</h4>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card rounded shadow-sm border-0 p-3">
          <div class="mb-3">
            <h6 class="text-secondary">{{ treatment.name }}'s Unit</h6>
            <div class="row">
              <div class="col-8 m-auto">
                <form @submit.prevent="" ref="treatment_unit" enctype="multipart/form-data">
                  <div class="mb-3">
                    <label class="form-label">Treatment Photo</label>
                    <input type="file" class="form-control" name="photo">
                  </div>
                  <input type="hidden" name="treatment_id" :value="this.$route.query.id">
                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label">Code</label>
                      <input type="text" name="code" class="form-control">
                    </div>
                    <div class="col-6">
                      <label class="form-label">Name</label>
                      <input type="text" name="name" class="form-control">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Add Procedure Medicine</label>
                    <div class="d-flex gap-3 align-items-center">
                      <select id="procedure_medicine" v-model="item_id" @change="showUnitQty" name="" class="form-select procedure-medicine w-75">
                        <option v-for="item in items" :key="'item'+item.id" :value="item.id"> {{item.name}}</option>
                      </select>
                      <button @click="addMedicine()" class="btn btn-primary btn-sm">Add</button>
                    </div>
                  </div>
                  <div v-if="medicines.length > 0" class="mb-3">
                    <table class="table table-sm table-bordered border-1">
                      <thead>
                      <tr>
                        <th>Medicine Name</th>
                        <th>Per Unit Qty</th>
                        <th>Selling Price</th>
                        <th>Total Price</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="medicine in medicines">
                        <td>
                          <input type="hidden" name="medicine_id[]" :value="medicine.medicine_id">
                          <input name="medicine_name[]" type="text" class="form-control border-0" readonly :value="medicine.name">
                        </td>
                        <td style="width: 150px;">
                          <input @change="changeMedicineQty(medicine.id)" :id="'medicine_unit'+medicine.id" name="medicine_qty[]" type="number" class="form-control border-0" :value="medicine.per_unit_qty">
                        </td>
                        <td style="width: 150px;">
                          <input :id="'medicine_selling_price'+medicine.id" name="medicine_selling_price[]" type="number" class="form-control border-0" :value="medicine.selling_price">
                        </td>
                        <td style="width: 150px;">
                          <input :id="'medicine_total_price'+medicine.id" name="medicine_total_price[]" type="number" class="form-control border-0" :value="medicine.total_price">
                        </td>
                        <td class="text-center">
                          <i @click="deleteMedicine(medicine.id)" class="text-danger fa-solid fa-circle-minus"></i>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Add Machine</label>
                    <div class="d-flex gap-3 align-items-center">
                      <select v-model="machine_id"  name="" class="form-select machine w-75">
                        <option  v-for="machine in machines" :key="'machine'+machine.id" :value="machine.id">{{machine.name}}</option>
                      </select>
                      <button @click="addMachine()" class="btn btn-primary btn-sm">Add</button>
                    </div>
                  </div>

                  <div v-if="machinery.length > 0" class="mb-3">
                    <table class="table table-bordered border-1">
                      <thead>
                      <tr>
                        <th>Machine Name</th>
                        <th>Per Unit Qty</th>
                        <th>Selling Price</th>
                        <th>Total Price</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="machine in machinery">
                        <td>
                          <input type="hidden" name="machine_id[]" :value="machine.machine_id">
                          <input name="machine_name[]" type="text" class="form-control border-0" readonly :value="machine.name">
                        </td>
                        <td style="width: 150px;">
                          <input @change="changeMachineryQty(machine.id)" name="machine_qty[]" :id="'machine_qty'+machine.id" type="number" class="form-control border-0" :value="machine.per_unit_qty">
                        </td>
                        <td style="width: 150px;">
                          <input name="machine_selling_price[]" :id="'machine_selling_price'+machine.id" type="number" class="form-control border-0" :value="machine.selling_price">
                        </td>
                        <td style="width: 150px;">
                          <input name="machine_total_price[]" :id="'machine_total_price'+machine.id" type="number" class="form-control border-0" :value="machine.total_price">
                        </td>
                        <td class="text-center">
                          <i @click="deleteMachine(machine.id)" class="text-danger fa-solid fa-circle-minus"></i>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label">Estimate Cost</label>
                      <input id="estimate_cost" type="number" name="est_cost" value="0" class="form-control">
                    </div>
                    <div class="col-6">
                      <label class="form-label">Selling Price</label>
                      <input name="selling_price" type="number" class="form-control">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Description (Optional)</label>
                    <textarea class="form-control" name="description" rows="2"></textarea>
                  </div>
                  <div class="mb-3">
                    <button @click="storeTreatmentUnit" class="btn btn-primary w-100">
                      <span v-if="isLoading== true">
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Saving...
                      </span>
                      <span v-else>
                        Save
                      </span>
                    </button>
                  </div>
                </form>
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
import Tab from "@/components/layout/Tab";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import {mapGetters} from "vuex";
export default {
  name: "TreatmentUnit",
  components: {Tab, SideNav},
  data() {
    return {
      items: null,
      treatment: [],
      item: [],
      item_id: '',
      machine_id: '',
      medicines: [],
      machinery: [],
      machines: null,
      isLoading: false,
      isEdit: false,
    }
  },
  computed: {
    ...mapGetters([
       'getUrl'
    ]),
  },
  methods: {
    select2:function (){
      $('.procedure-medicine').select2();
      $('.machine').select2();
    },
    storeTreatmentUnit(){
      this.isLoading = true
      let formData = new FormData(this.$refs.treatment_unit);
      axios.post(this.getUrl('treatment_unit'),formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.$store.dispatch('alertSuccess')
            this.$refs.treatment_unit.reset()
            router.push({path: '/treatmentUnitList'})
          })
          .catch(err=>{
            console.log(err)
            this.$store.dispatch('alertError')
          })
      .finally(_=>{
        this.isLoading = false
      })
      ;
    },
    deleteTreatmentUnit(id){
      axios.delete(this.$store.state.url+'treatment_unit/'+id)
          .then(response => response.data.data)
          .then(data=> {
            this.alertSuccess()
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    addMedicine:function (){
      let id = $('.procedure-medicine').val();
      let i = 1;
      let item = this.items.find((el)=>el.id == id);
      if (this.medicines.length > 0){
        i = this.medicines.length +1;
      }
      let medicineObj = {
        id: i,
        medicine_id: item.id,
        qty: 1,
        name: item.name,
        per_unit_qty: 1,
        selling_price: item.per_unit_price,
        total_price: item.per_unit_price,
      }
      this.medicines.push(medicineObj);
      this.calcEstAmount();
    },
    addMachine:function(){
      let id = $('.machine').val();
      let i = 1;
      let machine = this.machines.filter((el)=>el.id == id);
      if (this.machinery.length > 0){
        i = this.machinery.length +1;
      }
      let machineObj = {
        id: i,
        machine_id: machine[0].id,
        qty: 1,
        name: machine[0].name,
        per_unit_qty: machine[0].per_unit_qty,
        selling_price: machine[0].selling_price,
        total_price: machine[0].selling_price,
      }
      this.machinery.push(machineObj);
      this.calcEstAmount();
      let total_price = this.machinery.reduce((pv, cv) => pv + cv.total_price, 0);
    },
    deleteMedicine(id){
      this.medicines = this.medicines.filter(el=>el.id != id)
      this.calcEstAmount()
    },
    deleteMachine(id){
      this.machinery = this.machinery.filter(el=>el.id != id)
      this.calcEstAmount()
    },
    addKitFee(){
      this.calcEstAmount()
    },
    showUnitQty(){
      axios.get(this.$store.state.url+'counting_unit_procedure_item/'+this.item_id)
          .then(response => response.data.data)
          .then(data=>{
            this.item = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    changeMedicineQty(id){
      let medicine = this.medicines.filter(el=>el.id == id)
      let qty = $('#medicine_unit'+id).val();
      let selling_price = medicine[0].selling_price
      let result = Number(qty) * Number(selling_price);
      medicine[0].per_unit_qty = qty;
      medicine[0].total_price = result;
      this.calcEstAmount()
    },
    changeMachineryQty(id){
      let machine =  this.machinery.filter(el=>el.id == id)
      let qty = $('#machine_qty'+id).val();
      let selling_price = machine[0].selling_price
      let result = Number(qty) * Number(selling_price);
      machine[0].per_unit_qty = qty;
      machine[0].total_price = result;
      this.calcEstAmount()
    },

    calcEstAmount(){
      let result = 0;
     let medicine_total = this.medicines.reduce((pv, cv) => pv + cv.total_price, 0);
     let machine_total = this.machinery.reduce((pv, cv) => pv + cv.total_price, 0);
     result = Number(medicine_total) + Number(machine_total);
      $('#estimate_cost').val(result)
    },
    getItems: function (){
      axios.get(this.getUrl('counting_unit_procedure_item'))
          .then(response => response.data.data)
          .then(data=>{
            this.items = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getMachines: function (){
      axios.get(this.getUrl('machinery_item'))
          .then(response => response.data.data)
          .then(data=>{
            this.machines = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    getTreatment: function (){
      axios.get(this.getUrl('treatment/'+this.$route.query.id))
          .then(response => response.data.data)
          .then(data=>{
            this.treatment = data
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  created() {
    this.select2()
  },
  mounted() {
    this.select2()
    this.getItems()
    this.getMachines()
    this.getTreatment()
  }
}
</script>

<style scoped>

</style>