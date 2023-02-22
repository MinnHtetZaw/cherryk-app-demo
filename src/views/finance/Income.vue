<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="fw-normal mb-0 text-secondary">Income Lists</h6>
            <button v-if="addIncome == false && is_edit == false" @click="addIncome = true" class="btn btn-sm btn-primary">
              Add Income
              <i class="fa-solid fa-plus ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="addIncome == true" class="row">
      <div class="col-4 m-auto">
        <div class="card mb-3 p-3 border-0 rounded shadow-sm">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="text-secondary fw-normal">Create Income</h5>
            <button @click="addIncome = false" class="btn-close" ></button>
          </div>
          <form @submit.prevent="" ref="income">
            <div class="mb-3">
              <Label label_name="Income Type"></Label>
              <Select name="type" :error="errors.type">
                <option value="Procedure">Procedure</option>
                <option value="CF">CF</option>
                <option value="Service">Service</option>
                <option value="Oral">Oral</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Medicine">Medicine</option>
                <option value="Other Income">Other Income</option>
              </Select>
            </div>
            <div class="mb-3">
              <Label label_name="Date"></Label>
              <Input name="date" type="date" :error="errors.date"></Input>
            </div>
            <div class="mb-3">
              <Label label_name="Income Title"></Label>
              <text-area name="title" :error="errors.title"></text-area>
            </div>
            <div class="mb-3">
              <Label label_name="Amount"></Label>
              <Input name="amount" type="number" label="Amount" :error="errors.amount"></Input>
            </div>
            <div class="mb-3">
              <Label label_name="Description (Optional)"></Label>
              <text-area name="description" rows="2"></text-area>
            </div>
            <div class="d-flex justify-content-center gap-4">
              <button @click="addIncome = false" class="btn btn-sm btn-danger">Cancel</button>
              <button @click="storeIncome" class="btn btn-sm btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="is_edit == true" class="row">
      <div class="col-4 m-auto">
        <div class="card mb-3 p-3 border-0 rounded shadow-sm">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="text-secondary fw-normal">Edit Income</h5>
            <button @click="is_edit = false" class="btn-close" ></button>
          </div>
          <form @submit.prevent="" ref="editIncome">
            <div class="mb-3">
              <Label label_name="Income Type"></Label>
              <Select name="type" :error="edit_errors.type">
                <option :selected="edit_income.type == 'Procedure'" value="Procedure">Procedure</option>
                <option :selected="edit_income.type == 'CF'" value="CF">CF</option>
                <option :selected="edit_income.type == 'Service'" value="Service">Service</option>
                <option :selected="edit_income.type == 'Oral'" value="Oral">Oral</option>
                <option :selected="edit_income.type == 'Skin Care'" value="Skin Care">Skin Care</option>
                <option :selected="edit_income.type == 'Medicine'" value="Medicine">Medicine</option>
                <option :selected="edit_income.type == 'Other Income'" value="Other Income">Other Income</option>
              </Select>
            </div>
            <div class="mb-3">
              <Label label_name="Date"></Label>
              <Input name="date" type="date" :error="edit_errors.date" :value="edit_income.date"></Input>
            </div>
            <div class="mb-3">
              <Label label_name="Income Title"></Label>
              <text-area name="title" :error="edit_errors.title" :value="edit_income.title"></text-area>
            </div>
            <div class="mb-3">
              <Label label_name="Amount"></Label>
              <Input name="amount" type="number" :error="edit_errors.amount" :value="edit_income.amount"></Input>
            </div>
            <div class="mb-3">
              <Label label_name="Description (Optional)"></Label>
              <text-area name="description" rows="2" label="Description (Optional)" :value="edit_income.description"></text-area>
            </div>
            <div class="d-flex justify-content-center gap-4">
              <button @click="is_edit = false" class="btn btn-sm btn-danger">Cancel</button>
              <button @click="updateIncome(edit_income.id)" class="btn btn-sm btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="addIncome == false && is_edit == false" class="row">
      <div class="col-12">
        <div class="card border-0 p-0">
          <div>
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Date</th>
                <th class="text-center">Type</th>
                <th class="text-center">Title</th>
                <th class="text-center">Description</th>
                <th class="text-center">Amount ( MMK )</th>
                <th class="text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(income,index) in incomes">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{income.date}}</td>
                <td class="">{{income.type}}</td>
                <td class="">{{income.title}}</td>
                <td class="">{{income.description}}</td>
                <td class="text-end">{{income.amount}}</td>
                <td>
                  <div class="d-flex gap-4 mt-2 justify-content-center">
                    <i type="button" @click="editIncome(income.id,income)" class="fa-solid text-warning fa-pen"></i>
                    <i type="button" @click="deleteIncome(income.id)" class="fa-solid text-danger fa-trash"></i>
                  </div>

                </td>
              </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import TextArea from "@/components/form-elements/TextArea";
import Input from "@/components/form-elements/Input";
import Select from "@/components/form-elements/Select";
import {mapGetters} from "vuex";
import Label from "@/components/form-elements/Label";
export default {
  name: "Income",
  components: {Label, Select, Input, TextArea, SideNav},
  data() {
    return {
      addIncome : false,
      is_edit : false,
      incomes : {},
      edit_income : {},
      errors: {},
      edit_errors: {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    storeIncome: function() {
      let formData = new FormData(this.$refs.income);
      axios.post(this.getUrl('income'),formData)
          .then(res=>res.data.data)
          .then(data =>{
            this.$store.dispatch('alertSuccess')
            this.$refs.income.reset()
            this.errors = ''
            this.addIncome = false
            this.show()
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    editIncome: function(id,data){
      this.is_edit = true
      this.edit_income = data
    },
    updateIncome: function(id){
      let formData = new FormData(this.$refs.editIncome);
      formData.append('_method','PATCH')
      axios.post(this.getUrl('income/'+id),formData
      )
          .then( res => {
            this.$refs.editIncome.reset()
            this.$store.dispatch('alertSuccess')
            this.is_edit = false
            this.show()
          })
          .catch(err => {
            this.edit_errors = err.response.data.errors
          });
    },
    deleteIncome: function(id){
      axios.delete(this.getUrl('income/'+id))
          .then(res => {
            this.$store.dispatch('alertSuccess')
            this.show()
          })
          .catch(err=> {
            this.$store.dispatch('alertError')
          });
    },
    show: function (){
      axios.get(this.getUrl('income'))
          .then(res=>res.data.data)
          .then(data =>{
            this.incomes = data
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped>

</style>