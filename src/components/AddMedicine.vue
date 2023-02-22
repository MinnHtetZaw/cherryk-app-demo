<template>
  <div>
    <div class="d-flex justify-content-between gap-3 my-3">
      <select v-model="select_medicine" class="form-select">
        <option selected>Choose Medicine</option>
        <option v-for="medicine in medicines" :key="medicine.id" :value="medicine.id">{{medicine.name}} ( {{medicine.selling_price}} MMK )</option>
      </select>
      <select v-model="select_dose_unit" class="form-select">
        <option selected>Choose Dose Unit</option>
        <option value="Tablet">Tablet</option>
        <option value="Bottle">Bottle</option>
        <option value="Tube">Tube</option>
      </select>
      <input v-model="select_dose_qty" type="number" class="form-control w-50" placeholder="Dose Quantity">
      <input v-model="select_duration" type="number" class="form-control w-50" placeholder="Duration">
      <!--    <input v-model="" type="number" class="form-control w-50" placeholder="Quantity">-->
      <button class="btn btn-sm btn-primary" @click="storeMedicine">Add</button>
<!--      <v-btn  color="success dark">Add</v-btn>-->
    </div>

    <table v-if="add_medicines.length > 0" class="table">
      <thead>
      <tr>
        <th class="text-center fw-normal">#</th>
        <th class="text-center fw-normal">Code</th>
        <th class="text-center fw-normal">Name</th>
        <th class="text-center fw-normal">Price</th>
        <th class="text-center fw-normal">Dose Unit</th>
        <th class="text-center fw-normal">Dose Qty</th>
        <th class="text-center fw-normal">Duration(Days)</th>
        <th class="text-center fw-normal">Quantity</th>
        <th class="text-center fw-normal">Total Price</th>
        <th class="text-center fw-normal"></th>
      </tr>
      </thead>
      <tbody>
      <tr class="text-center" v-for="(medicine,index) in add_medicines" :key="medicine.id">
        <td>{{index + 1}}</td>
        <td>
          <input type="number" name="item_id[]" :value="medicine.item_id" hidden>
          <input type="text" class="form-control border-0" readonly name="code[]" :value="medicine.code">
        </td>
        <td>
          <input type="text" class="form-control border-0" readonly name="name[]" :value="medicine.name" :title="medicine.name">
        </td>
        <td>
          <input type="number" class="form-control border-0" readonly name="price[]" :value="medicine.price">
        </td>
        <td>
          <input class="form-control border-0" type="text" readonly name="dose_unit[]" :value="medicine.dose_unit"></td>
        <td><input :id="'dose_qty'+medicine.id" class="form-control border-0" type="number" name="dose_qty[]" :value="medicine.dose_qty"></td>
        <td><input :id="'duration'+medicine.id" class="form-control border-0" type="number" name="duration[]" :value="medicine.duration"></td>
        <td><input :id="'quantity'+medicine.id" class="form-control border-0" type="number" name="quantity[]" :value="medicine.quantity"></td>
        <td><input class="form-control border-0" type="number" name="total_price[]" :value="medicine.total_price"></td>
        <td>
          <button @click="deleteMedicine(medicine.id)" class="btn btn-danger btn-sm">Del</button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddMedicine",
  props: {
    select_medicines: Object
  },
  data() {
    return {
      medicines: null,
      select_medicine: '',
      select_dose_unit: '',
      select_dose_qty: '',
      select_duration: '',
      add_medicines: [],
    }
  },
  computed: {
    name() {
      return this.data
    }
  },
  methods: {
    storeMedicine() {
      let medicine = this.medicines.filter((el)=>el.id == this.select_medicine)
      let i = this.add_medicines.length;
      let quantity = this.select_dose_qty * this.select_duration ?? 0;
      let price = medicine[0].selling_price * quantity;
      let add_medicine = {
        id: i + 1,
        item_id: medicine[0].id,
        code: medicine[0].code,
        name: medicine[0].name,
        price: medicine[0].selling_price,
        dose_unit: this.select_dose_unit,
        dose_qty: this.select_dose_qty ?? 0,
        duration: this.select_duration ?? 0,
        quantity: quantity,
        total_price: price,
      }
      this.add_medicines.push(add_medicine)
      this.select_medicine = this.select_dose_qty = this.select_dose_unit = this.select_duration = ''
      this.$emit('storeMedicine',this.add_medicines)
    },
    deleteMedicine(id){
      this.add_medicines = this.add_medicines.filter(el=>el.id !== id)
    },
    calcQuantity(id){
      let doseQty = $('#dose_qty'+id).val();
      let duration = $('#duration'+id).val();
      let result = Number(doseQty * duration);
      $('#quantity'+id).val(result);
    },
  },
  mounted() {
    axios.get(this.$store.state.url+'counting_unit_procedure_item')
        .then(response => response.data.data
        )
        .then(data => {
          console.log(data)
          this.medicines = data
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<style scoped>

</style>