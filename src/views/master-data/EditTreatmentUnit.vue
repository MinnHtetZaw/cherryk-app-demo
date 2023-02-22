<template>
  <SideNav>
    <div class="mb-3">
      <div class="">
        <h4 class="fw-normal text-secondary">Edit Treatment Unit</h4>
<!--        <button @click="back" class="btn btn-primary">-->
<!--          <i  class="fa-solid fa-arrow-left-long"></i>-->
<!--        </button>-->
      </div>
    </div>

    <div v-if="isEdit == true" class="row">
      <div class="col-12">
        <div class="card mb-5 rounded shadow-sm border-0 p-3">
          <h5 class="fw-normal text-secondary">Edit Procedure Medicine</h5>
          <div class="row">
            <div class="col-6 m-auto">
              <form @submit.prevent="" ref="edit_medicine">
                <div class="row mb-3">
                  <div class="col-12">
                    <label class="form-label">Name</label>
                    <textarea readonly name="medicine_name" class="form-control" rows="1" :value="edit_medicine.medicine_name"></textarea>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <label class="form-label">Per Unit Qty</label>
                    <input type="number" class="form-control" name="qty" :value="edit_medicine.medicine_qty">
                  </div>
                  <div class="col-6">
                    <label class="form-label">Selling Price</label>
                    <input readonly type="number" class="form-control" name="" :value="edit_medicine.medicine_selling_price">
                  </div>
<!--                  <div class="col-5">-->
<!--                    <label class="form-label">Total Price</label>-->
<!--                    <input type="number" class="form-control" name="" :value="medicine_selling_price">-->
<!--                  </div>-->
                </div>
                <div class="mb-3 d-flex justify-content-center gap-3">
                  <button :disabled="isLoading == true" @click="isEdit = false" class="btn btn-danger">Cancel</button>
                  <button :disabled="isLoading == true" @click="updateMedicine(edit_medicine.id)" class="btn btn-primary">
                    <span v-if="isLoading == true">
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                      Updating...
                    </span>
                    <span v-else>
                      Update
                    </span>
                    </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="isMachineEdit == true" class="row">
      <div class="col-12">
        <div class="card mb-5 rounded shadow-sm border-0 p-3">
          <h5 class="fw-normal text-secondary">Edit Procedure Machine</h5>
          <div class="row">
            <div class="col-6 m-auto">
              <form @submit.prevent="" ref="edit_machine">
                <div class="row mb-3">
                  <div class="col-12">
                    <label class="form-label">Name</label>
                    <textarea readonly name="medicine_name" class="form-control" rows="1" :value="edit_machine.machine_name"></textarea>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <label class="form-label">Per Unit Qty</label>
                    <input type="number" class="form-control" name="qty" :value="edit_machine.machine_qty">
                  </div>
                  <div class="col-6">
                    <label class="form-label">Selling Price</label>
                    <input readonly type="number" class="form-control" name="" :value="edit_machine.machine_selling_price">
                  </div>
<!--                  <div class="col-5">-->
<!--                    <label class="form-label">Total Price</label>-->
<!--                    <input type="number" class="form-control" name="" :value="medicine_selling_price">-->
<!--                  </div>-->
                </div>
                <div class="mb-3 d-flex justify-content-center gap-3">
                  <button :disabled="isLoading == true" @click="isMachineEdit = false" class="btn btn-danger">Cancel</button>
                  <button :disabled="isLoading == true" @click="updateMachine(edit_machine.id)" class="btn btn-primary">
                    <span v-if="isLoading == true">
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                      Updating...
                    </span>
                    <span v-else>
                      Update
                    </span>
                    </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <div class="card rounded shadow-sm border-0 p-3">
          <div class="mb-3">
            <h6 class="text-secondary">{{ treatment_unit.treatment_name }}'s Unit</h6>
            <div class="row">
<!--              <div class="col-5">-->
<!--                <div class="my-5">-->
<!--                  <div class="mb-3 d-flex justify-content-center">-->
<!--                    <img class="rounded" :src="treatment_unit.photo" style="width: 400px;object-fit: cover;" alt="">-->
<!--                  </div>-->
<!--                </div>-->

<!--              </div>-->
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
                      <input type="text" name="code" class="form-control" :value="treatment_unit.code">
                    </div>
                    <div class="col-6">
                      <label class="form-label">Name</label>
                      <input type="text" name="name" class="form-control" :value="treatment_unit.name">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="form-label">Procedure Medicines</label>
                    <div>
                      <table class="table table-sm table-bordered border-1">
                        <thead>
                        <tr>
                          <th class="text-center">Medicine Name</th>
                          <th class="text-center">Per Unit Qty</th>
                          <th class="text-center">Selling Price</th>
                          <th class="text-center">Total Price</th>
                          <th class="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="medicine in treatment_unit.medicines">
                          <td class="text-start">{{medicine.medicine_name}}</td>
                          <td class="text-center">{{medicine.medicine_qty}}</td>
                          <td class="text-center">{{medicine.medicine_selling_price}}</td>
                          <td class="text-center">{{medicine.medicine_total_price}}</td>
                          <td class="d-flex gap-2 justify-content-center">
                            <button @click="editMedicine(medicine.id)" class="btn btn-warning btn-sm">
                              <i class="fa-solid small fa-pen-to-square"></i>
                            </button>
                            <button @click="deleteProcedureMedicine(medicine.id)" class="btn btn-danger btn-sm">
                              <i class="fa-solid small fa-trash-can"></i>
                            </button>
                          </td>
<!--                          <td>-->
<!--                            <input type="hidden" name="medicine_id[]" :value="medicine.medicine_id">-->
<!--                            <input name="medicine_name[]" type="text" class="form-control border-0" readonly :value="medicine.medicine_name">-->
<!--                          </td>-->
<!--                          <td style="width: 150px;">-->
<!--                            <input @keyup="changeMedicineQty(medicine.id)" :id="'medicine_unit'+medicine.id" name="medicine_qty[]" type="number" class="form-control border-0" :value="medicine.medicine_qty">-->
<!--                          </td>-->
<!--                          <td style="width: 150px;">-->
<!--                            <input :id="'medicine_selling_price'+medicine.id" name="medicine_selling_price[]" type="number" class="form-control border-0" :value="medicine.medicine_selling_price">-->
<!--                          </td>-->
<!--                          <td style="width: 150px;">-->
<!--                            <input :id="'medicine_total_price'+medicine.id" name="medicine_total_price[]" type="number" class="form-control border-0" :value="medicine.medicine_total_price">-->
<!--                          </td>-->
<!--                          <td class="text-center">-->
<!--                            &lt;!&ndash;                            <i @click="deleteMedicine(medicine.id)" class="text-danger fa-solid fa-circle-minus"></i>&ndash;&gt;-->
<!--                            <i @click="deleteMedicine(medicine.id)" class="text-danger fa-solid fa-circle-minus"></i>-->
<!--                          </td>-->
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Add New Procedure Medicine</label>
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
                        <th class="text-center">Medicine Name</th>
                        <th class="text-center">Per Unit Qty</th>
                        <th class="text-center">Selling Price</th>
                        <th class="text-center">Total Price</th>
                        <th class="text-center">Action</th>
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
                  <hr>
<!--                  -->
<!--                  Machine-->

                  <div class="row mb-3">
                    <label class="form-label">Machine</label>
                    <div>
                      <table class="table table-sm table-bordered border-1">
                        <thead>
                        <tr>
                          <th class="text-center">Machine Name</th>
                          <th class="text-center">Per Unit Qty</th>
                          <th class="text-center">Selling Price</th>
                          <th class="text-center">Total Price</th>
                          <th class="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="machine in treatment_unit.machines">
                          <td class="text-start">{{machine.machine_name}}</td>
                          <td class="text-center">{{machine.machine_qty}}</td>
                          <td class="text-center">{{machine.machine_selling_price}}</td>
                          <td class="text-center">{{machine.machine_total_price}}</td>
                          <td class="d-flex gap-2 justify-content-center">
                            <button @click="editMachine(machine.id)" class="btn btn-warning btn-sm">
                              <i class="fa-solid small fa-pen-to-square"></i>
                            </button>
                            <button @click="deleteProcedureMachine(machine.id)" class="btn btn-danger btn-sm">
                              <i class="fa-solid small fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Add New Machine</label>
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
<!--                  -->
<!--                  -->
                  <hr>


                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label">Estimate Cost</label>
                      <input id="estimate_cost" type="number" name="est_cost" class="form-control">
                    </div>
                    <div class="col-6">
                      <label class="form-label">Selling Price</label>
                      <input name="selling_price" type="number" class="form-control" :value="treatment_unit.selling_price">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Description (Optional)</label>
                    <textarea class="form-control" name="description" rows="2" :value="treatment_unit.description"></textarea>
                  </div>
                  <div class="mb-3">
                    <button @click="updateTreatmentUnit(treatment_unit.id)" class="btn btn-primary w-100">
                      <span v-if="isLoading == true">
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Updating...
                      </span>
                      <span v-else>
                        Update
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
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import {mapGetters} from "vuex";
export default {
  name: "EditTreatmentUnit",
  components: {SideNav},
  data() {
    return {
      treatment_unit: {},
      est_amount: '',
      treatment: [],
      items: [],
      item_id: '',
      machine_id: '',
      medicines: [],
      machinery: [],
      machines: null,
      edit_qty: false,
      isEdit: false,
      isMachineEdit: false,
      isLoading: false,
      edit_medicine : {},
      edit_machine: {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
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
    back(){
      history.back()
    },
    editMedicine:function (id){
      this.isEdit = true
      axios.get(this.getUrl('treatment_procedure_item/'+id))
          .then(response => response.data.data)
          .then(data=>{
            this.edit_medicine = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    editMachine:function (id){
      this.isMachineEdit = true
      axios.get(this.getUrl('treatment_machine/'+id))
          .then(response => response.data.data)
          .then(data=>{
            this.edit_machine = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    updateMedicine:function(id){
      this.isLoading = true
      let formData = new FormData(this.$refs.edit_medicine);
      formData.append('_method','PATCH')
      axios.post(this.getUrl('treatment_procedure_item/'+id),formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.$store.dispatch('alertSuccess')
          })
          .catch(err=> {
            console.log(error);
            this.$store.dispatch('alertError')
          })
          .finally(_=>{
            this.isLoading = false
            this.isEdit = false

            this.getTreatmentUnit()
          })
      ;
    },
    updateMachine:function(id){
      this.isLoading = true
      let formData = new FormData(this.$refs.edit_machine);
      formData.append('_method','PATCH')
      axios.post(this.getUrl('treatment_machine/'+id),formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.$store.dispatch('alertSuccess')
          })
          .catch(err=> {
            console.log(error);
            this.$store.dispatch('alertError')
          })
          .finally(_=>{
            this.isLoading = false
            this.isMachineEdit = false
            this.getTreatmentUnit()

          })
      ;
    },
    deleteProcedureMedicine:function (id){
      Swal.fire({
        title: 'Please Confirm to Delete Item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgba(54,166,52,0.75)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(this.getUrl('treatment_procedure_item/'+id))
              .then(response => {
                this.$store.dispatch('alertSuccess')
                this.getTreatmentUnit()
              })
              .catch(function (error) {
                console.log(error);
              });
        }
      })
    },
    deleteProcedureMachine:function (id){
      Swal.fire({
        title: 'Please Confirm to Delete Item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgba(54,166,52,0.75)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(this.getUrl('treatment_machine/'+id))
              .then(response => {
                this.$store.dispatch('alertSuccess')
                this.getTreatmentUnit()
              })
              .catch(function (error) {
                console.log(error);
              });
        }
      })
    },
    getTreatmentUnit(){
      axios.get(this.getUrl('treatment_unit/'+this.$route.query.id))
          .then(response => response.data.data)
          .then(data=>{
            this.treatment_unit = data
            this.est_amount = this.treatment_unit.est_cost
            $('#estimate_cost').val(this.est_amount)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    updateTreatmentUnit(id){
      this.isLoading = true
      let formData = new FormData(this.$refs.treatment_unit);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'treatment_unit/'+id,formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.alertSuccess()
            router.push({path: '/treatmentUnitList'})
          })
          .catch(err=>{
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
    deleteMedicine: function(id){
      this.medicines = this.medicines.filter(el=>el.id != id)
      this.calcEstAmount()

    },
    deleteMachine: function(id){
      this.machinery = this.machinery.filter(el=>el.id != id)
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
      let result = Number(this.est_amount);
      let medicine_total = this.medicines.reduce((pv, cv) => pv + cv.total_price, 0);
      let machine_total = this.machinery.reduce((pv, cv) => pv + cv.total_price, 0);
      let total  = result + Number(medicine_total) + Number(machine_total);
      $('#estimate_cost').val(total)
      console.log(medicine_total)
    },
    select2 :function (){
      $('.procedure-medicine').select2();
      $('.machine').select2();
    },

  },
  created() {
    this.select2()
  },
  mounted() {
    this.select2()
    this.getTreatmentUnit()

    axios.get(this.$store.state.url+'counting_unit_procedure_item')
        .then(response => response.data.data)
        .then(data=>{
          this.items = data
        })
        .catch(function (error) {
          console.log(error);
        });

    axios.get(this.$store.state.url+'machinery_item')
        .then(response => response.data.data)
        .then(data=>{
          this.machines = data
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<style scoped>

</style>