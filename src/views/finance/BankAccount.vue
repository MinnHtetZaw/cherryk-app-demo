<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="fw-normal text-secondary">Bank Account Lists</h6>
            <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#bankAccount">Bank Registration
            </button>
            <!-- Modal -->
            <div class="modal fade" id="bankAccount" tabindex="-1" aria-labelledby="bankAccountLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content ">
                  <div class="modal-header bg-primary">
                    <h5 class="modal-title" id="bankAccountLabel">Bank Registration Form
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="" ref="bank">
                      <div class="mb-3">
                        <label class="form-label">Bank Name</label>
                        <input type="text" class="form-control" name="bank_name">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Bank Account Number</label>
                        <input type="text" class="form-control" name="account_number">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Account Holder Name</label>
                        <input type="text" class="form-control" name="holder_name">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Bank Contact</label>
                        <input type="number" class="form-control" name="bank_contact">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Opening Date</label>
                        <input type="date" class="form-control" name="open_date">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Balance</label>
                        <input type="number" class="form-control" name="balance">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Bank Address</label>
                        <textarea name="bank_address" rows="3" class="form-control"></textarea>
                      </div>
  
                      <div class="d-flex justify-content-end gap-3">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button @click="storeBank" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
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
        <div class="card p-0 border-0">
          <div>
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Bank Name</th>
                <th class="text-center">Account Number</th>
                <th class="text-center">Holder Name</th>
                <th class="text-center">Opening Date</th>
                <th class="text-center">Balance ( MMK )</th>
                <th class="text-center">Address</th>
                <th class="text-center">Contact</th>
                <th class="text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="banks" v-for="(bank,index) in banks" >
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{bank.bank_name}}</td>
                <td class="text-center">{{bank.account_number}}</td>
                <td class="">{{bank.holder_name}}</td>
                <td class="text-center">{{bank.open_date}}</td>
                <td class="text-end">{{bank.balance}}</td>
                <td class="">{{bank.bank_address}}</td>
                <td class="">{{bank.bank_contact}}</td>
                <td>
                  <div class="d-flex mt-2 justify-content-center gap-4 align-items-center">
                    <i type="button" @click="editBank(bank.id)" class="fa-solid text-warning fa-pen"></i>
                    <i type="button" @click="" class="fa-solid text-danger fa-trash"></i>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>

            <div class="modal" tabindex="-1" id="dis_mod">
              <div class="modal-dialog">
                <div class="modal-content w-75">
                  <div class="modal-header bg-primary">
                    <h5 class="modal-title ">Edit Bank Account</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dis_close"></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="" ref="edit_bank">
                      <div class="mb-3">
                        <label class="form-label">Bank Name</label>
                        <input type="text" class="form-control" name="bank_name" :value="edit_bank.bank_name">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Bank Account Number</label>
                        <input type="text" class="form-control" name="account_number" :value="edit_bank.account_number">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Account Holder Name</label>
                        <input type="text" class="form-control" name="holder_name" :value="edit_bank.holder_name">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Bank Contact</label>
                        <input type="number" class="form-control" name="bank_contact" :value="edit_bank.bank_contact">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Opening Date</label>
                        <input type="date" class="form-control" name="open_date" :value="edit_bank.open_date">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Balance</label>
                        <input type="number" class="form-control" name="balance" :value="edit_bank.balance">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Bank Address</label>
                        <textarea name="bank_address" rows="3" class="form-control" :value="edit_bank.bank_address"></textarea>
                      </div>

                      <div class="d-flex justify-content-end gap-3">
                        <button  class="btn btn-danger" @click="dis_close">Close</button>
                        <button @click="updateIncome(edit_bank.id)" class="btn btn-primary">Save</button>
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
export default {
  name: "BankAccount",
  components: {SideNav},
  data() {
    return {
      banks: null,
      edit_bank : [],
    }
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
    storeBank() {
      let formData = new FormData(this.$refs.bank);
      axios.post(this.$store.state.url+'bank_account',formData)
          .then(res=>res.data.data)
          .then(data =>{
            this.alertSuccess()
            this.$refs.bank.reset()
            this.show()
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    editBank(id){
      axios.get(this.$store.state.url+'bank_account/'+id)
          .then(res=>res.data.data)
          .then(data =>{
            this.edit_bank = data
          })
          .catch(err => {
          });
      $('#dis_mod').show()
    },
    dis_close(){
      $('#dis_mod').hide();
    },
    updateIncome(id){
      let formData = new FormData(this.$refs.edit_bank);
      formData.append('_method','PATCH')
      axios.post(this.$store.state.url+'bank_account/'+id,formData
      )
          .then( res => {
            res.data.data
          })
          .then(data =>{
                this.alertSuccess()
            this.dis_close()
                this.show()
              }
          )
          .catch(err => {
            this.errors = err.response.data.errors
          });
    },
    getBank: function (){
      axios.get(this.$store.state.url+'bank_account')
          .then(res=>res.data.data)
          .then(data =>{
            this.banks = data
          })
          .catch(err => {
            this.errors = err.response.data.errors
          });
    }
  },
  mounted() {
    this.getBank()
  }
}
</script>

<style scoped>

</style>