<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="fw-normal mb-0 text-secondary">Expense Lists</h6>
            <button v-if="addExpense == false && is_edit == false" @click="addExpense = true" class="btn btn-sm btn-primary">
              Add Expense
              <i class="fa-solid fa-plus ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="addExpense == true" class="row">
      <div class="col-4 m-auto">
        <div class="card mb-3 p-3 border-0">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="text-secondary fw-normal">Create Expense</h5>
            <button @click="addExpense = false" class="btn-close" ></button>
          </div>
          <form @submit.prevent="" ref="expense">
            <div class="mb-3">
              <Label label_name="Expense Type"></Label>
              <Select name="type" label="Expense Type" :error="errors.type">
                <option value="Procedure Expense">Procedure Expense</option>
                <option value="General Expense">General Expense</option>
                <option value="Sale Expense">Sale Expense</option>
                <option value="Marketing Expense">Marketing Expense</option>
                <option value="Rent Expense">Rent Expense</option>
                <option value="Staff Salary">Staff Salary</option>
                <option value="Other Expense">Other Expense</option>
              </Select>
            </div>
            <div class="mb-3">
              <Label label_name="Date"></Label>
              <Input name="date" type="date" :error="errors.date"></Input>
            </div>
            <div class="mb-3">
              <Label label_name="Expense Title"></Label>
              <text-area name="title" :error="errors.title"></text-area>
            </div>
            <div class="mb-3">
              <Label label_name="Amount"></Label>
              <Input name="amount" type="number" :error="errors.amount"></Input>
            </div>
            <div class="mb-3">
              <Label label_name="Description (Optional)"></Label>
              <text-area name="description" rows="2"></text-area>
            </div>
            <div class="d-flex justify-content-center gap-4">
              <button @click="addExpense = false" class="btn btn-sm btn-danger">Cancel</button>
              <button @click="storeExpense" class="btn btn-sm btn-primary" >Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="is_edit == true" class="row">
      <div class="col-4 m-auto">
        <div class="card mb-3 p-3 border-0">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="text-secondary fw-normal">Edit Expense</h5>
            <button @click="is_edit = false" class="btn-close" ></button>
          </div>
          <form @submit.prevent="" ref="edit_expense">
            <div class="mb-3">
              <Label label_name="Expense Type"></Label>
              <Select name="type" label="Expense Type" :error="edit_errors.type">
                <option :selected="edit_expense.type == 'Procedure Expense'" value="Procedure Expense">Procedure Expense</option>
                <option :selected="edit_expense.type == 'General Expense'" value="General Expense">General Expense</option>
                <option :selected="edit_expense.type == 'Sale Expense'" value="Sale Expense">Sale Expense</option>
                <option :selected="edit_expense.type == 'Marketing Expense'" value="Marketing Expense">Marketing Expense</option>
                <option :selected="edit_expense.type == 'Rent Expense'" value="Rent Expense">Rent Expense</option>
                <option :selected="edit_expense.type == 'Staff Salary'" value="Staff Salary">Staff Salary</option>
                <option :selected="edit_expense.type == 'Other Expense'" value="Other Expense">Other Expense</option>
              </Select>
            </div>
            <div class="mb-3">
              <Label label_name="Date"></Label>
              <Input name="date" type="date" :error="edit_errors.date" :value="edit_expense.date"></Input>
            </div>
            <div class="mb-3">
              <Label label_name="Expense Title"></Label>
              <text-area name="title" :error="edit_errors.title" :value="edit_expense.title"></text-area>
            </div>
            <div class="mb-3">
              <Label label_name="Amount"></Label>
              <Input name="amount" type="number" :error="edit_errors.amount" :value="edit_expense.amount"></Input>
            </div>
            <div class="mb-3">
              <Label label_name="Description (Optional)"></Label>
              <text-area name="description" rows="2" :value="edit_expense.description"></text-area>
            </div>


            <div class="d-flex justify-content-center gap-4">
              <button @click="is_edit = false" class="btn btn-sm btn-danger">Cancel</button>
              <button @click="updateExpense(edit_expense.id)" class="btn btn-sm btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="addExpense == false && is_edit == false" class="row">
      <div class="col-12">
        <div class="card p-0 border-0">
          <div>
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Date</th>
                <th class="text-center">Title</th>
                <th class="text-center">Type</th>
                <th class="text-center">Description</th>
                <th class="text-center">Amount ( MMK )</th>
                <th class="text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(expense,index) in expenses">
                <td class="text-center">{{index + 1}}</td>
                <td class="text-center">{{expense.date}}</td>
                <td class="">{{expense.title}}</td>
                <td class="">{{expense.type}}</td>
                <td class="">{{expense.description}}</td>
                <td class="text-end">{{expense.amount}}</td>
                <td>
                  <div  class="d-flex mt-2 justify-content-center gap-4">
                    <i type="button" @click="editExpense(expense.id,expense)" class="fa-solid text-warning fa-pen"></i>
                    <i type="button" @click="deleteExpense(expense.id)" class="fa-solid text-danger fa-trash"></i>
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
import Input from "@/components/form-elements/Input";
import TextArea from "@/components/form-elements/TextArea";
import Select from "@/components/form-elements/Select";
import {mapGetters} from "vuex";
import Label from "@/components/form-elements/Label";
export default {
  name: "Expense",
  components: {Label, Select, TextArea, Input, SideNav},
  data() {
    return {
      expenses: {},
      errors: {},
      edit_errors: {},
      edit_expense: [],
      type_val: '',
      addExpense: false,
      is_edit: false,
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    storeExpense:function() {
      let formData = new FormData(this.$refs.expense);
      axios.post(this.getUrl('expense'),formData)
          .then(res=>{
            this.$refs.expense.reset()
            this.$store.dispatch('alertSuccess')
            this.addExpense = false
            this.errors = ''
            this.show()
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    editExpense:function(id,data){
      this.is_edit = true
      this.edit_errors = ''
      this.edit_expense = data
    },
    updateExpense:function(id){
      let formData = new FormData(this.$refs.edit_expense);
      formData.append('_method','PATCH')
      axios.post(this.getUrl('expense/'+id),formData)
        .then( res => {
          this.$store.dispatch('alertSuccess')
          this.is_edit = false
          this.show()
        })
        .catch(err => {
          this.edit_errors = err.response.data.errors
        });
    },
    deleteExpense:function(id){
      axios.delete(this.getUrl('expense/'+id))
          .then(response => {
            this.$store.dispatch('alertSuccess')
            this.show()
          })
          .catch(function (error) {
            this.$store.dispatch('alertError')
          });
    },
    show:function (){
      axios.get(this.getUrl('expense'))
          .then(res=>res.data.data)
          .then(data =>{
            this.expenses = data
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