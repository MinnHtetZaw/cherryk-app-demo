<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h6 class="text-secondary fw-normal">Credit Detail</h6>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card border-0 shadow-sm rounded p-3">
          <table class="table table-borderless table-hover">
            <thead>
            <tr>
              <th class="text-center fw-normal">No.</th>
              <th class="text-center fw-normal">Patient Name</th>
              <th class="text-center fw-normal">Patient Phone</th>
              <th class="text-center fw-normal">Patient Address</th>
              <th class="text-center fw-normal">Credit Amount</th>
              <th class="text-center fw-normal">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(credit,index) in customer.credits">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center">{{credit.customer_name}}</td>
              <td class="text-center">{{credit.customer_phone}}</td>
              <td class="text-center">{{credit.customer_address}}</td>
              <td class="text-center">{{credit.credit_amount}}</td>
              <td class="d-flex justify-content-center">
                <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" :data-bs-target="'#exampleModal'+credit.id">
                  Pay Credit
                </button>
                <!-- Modal -->
                <div class="modal fade" :id="'exampleModal'+credit.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header bg-primary">
                        <h5 class="modal-title" id="exampleModalLabel">Pay Credit</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form @submit.prevent="" :id="'store_credit'+credit.id">
                          <input type="hidden" name="procedure_id" :value="credit.procedure_id">
                          <input type="hidden" name="customer_id" :value="customer.id">
                          <input type="hidden" name="customer_credit_id" :value="credit.id">
                          <div class="mb-3">
                            <label class="form-label">Pay Date</label>
                            <input type="date" class="form-control" name="pay_date">
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Total Credit Amount</label>
                            <input :id="'total_amount'+credit.id" type="number" class="form-control" readonly :value="credit.credit_amount">
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Pay Amount</label>
                            <input @keyup="calcLeftAmount(credit.id)" :id="'pay_amount'+credit.id" type="number" class="form-control" name="pay_amount">
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Left Amount</label>
                            <input  :id="'left_amount'+credit.id" type="number" class="form-control" readonly name="left_amount">
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Remark</label>
                            <textarea name="remark" rows="2" class="form-control"></textarea>
                          </div>
                          <div class="d-flex justify-content-end gap-3">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button @click="storeCredit(credit.id)" class="btn btn-primary">Save changes</button>
                          </div>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              </td>

            </tr>
<!--            <tr v-for="customer in customers">-->
<!--              <td class="text-center">{{customer.name}}</td>-->
<!--              <td class="text-center">{{customer.phone}}</td>-->
<!--              <td class="text-center">{{customer.address}}</td>-->
<!--              <td class="text-center">{{customer.credit_amount}}</td>-->
<!--              <td class="d-flex justify-content-center">-->
<!--                <button @click="creditDetail(customer.id)" class="btn btn-primary btn-sm">Credit Detail</button>-->
<!--              </td>-->
<!--            </tr>-->
            </tbody>
          </table>
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
export default {
  name: "PatientCreditDetail",
  components: {SideNav},
  data() {
    return {
      customer : [],
    }
  },
  methods: {
    show :function () {
      axios.get(this.$store.state.url+'customer/'+this.$route.query.id)
          .then(response => response.data.data)
          .then(data=>{
            this.customer = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    calcLeftAmount : function (id){
      let total_amount = Number($('#total_amount'+id).val());
      let pay_amount = Number($('#pay_amount'+id).val());
      let result = total_amount - pay_amount;
      $('#left_amount'+id).val(result)
    },
    alertSuccess : function(){
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
    storeCredit : function (id){
      let formData = new FormData(document.getElementById("store_credit"+id));
      axios.post(this.$store.state.url+'customer_pay_credit',formData)
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
  },
  mounted() {
    this.show()
  }
}
</script>

<style scoped>

</style>