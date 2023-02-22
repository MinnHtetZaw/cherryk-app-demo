<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h4 class="text-secondary fw-normal">Supplier Credit Detail</h4>
        </div>

      </div>
    </div>
    <div v-if="isEdit == true" class="row">
      <div class="col-8 m-auto">
        <div :class="card">
          <h5 class="fw-normal text-secondary">Pay Credit Amount</h5>
          <form @submit.prevent="" ref="pay_credit">
            <div class="mb-3">
              <label class="form-label text-secondary">Credit Amount</label>
              <input type="number" class="form-control form-control-sm" :value="edit_credit.credit_amount">
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary">Pay Amount</label>
              <input type="number" name="pay_amount" class="form-control form-control-sm" aria-label="Last name">
            </div>
            <!--            <div class="mb-3">-->
            <!--              <label class="form-label text-secondary">Pay Date</label>-->
            <!--              <input type="date" class="form-control form-control-sm" aria-label="Last name">-->
            <!--            </div>-->
            <input type="hidden" name="supplier_id" :value="edit_credit.supplier_id">

            <div class="d-flex justify-content-center gap-3">
              <button @click="isEdit = false" class="btn btn-danger">Cancel</button>
              <button @click="pay(edit_credit.id)" class="btn btn-primary px-5">Pay</button>
            </div>
          </form>

        </div>
      </div>
    </div>


    <div v-else class="row">
      <div class="col-12">
        <div :class="card">
          <table :class="table_normal">
            <thead>
            <tr>
              <th class="text-secondary text-center fw-normal">No.</th>
              <th class="text-secondary text-center fw-normal">Name</th>
              <th class="text-secondary text-center fw-normal">Phone</th>
              <th class="text-secondary text-center fw-normal">Purchase Amount</th>
              <th class="text-secondary text-center fw-normal">Credit Amount</th>
              <th class="text-secondary text-center fw-normal">Status</th>
              <th class="text-secondary text-center fw-normal">Pay Credit</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(credit,index) in suppliers.supplier_credit">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center">{{suppliers.name}}</td>
              <td class="text-center">{{suppliers.phone}}</td>
              <td class="text-center">{{credit.purchase_amount}}</td>
              <td class="text-center">{{credit.credit_amount}}</td>
              <td class="text-center">
                <p v-if="credit.status == 0" class="badge bg-danger bg-opacity-75 rounded-pill">Unpaid</p>
                <p v-else-if="credit.status == 1" class="badge bg-primary bg-opacity-75 rounded-pill">Partial</p>
                <p v-else-if="credit.status == 2" class="badge bg-success bg-opacity-75 rounded-pill">Paid</p>
              </td>
              <td class="text-center">
                <button @click="payCredit(credit.id)" class="btn btn-sm btn-outline-primary">Pay Credit</button>
              </td>
            </tr>
            </tbody>
          </table>

        </div>

      </div>

    </div>


  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import {mapGetters, mapState} from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "SupplierCreditDetail",
  components: {SideNav},
  data() {
    return {
      suppliers : [],
      supplier_credit: null,
      edit_credit: {},
      isEdit: false,
      isLoading: false,
    }
  },
  computed: {
    ...mapState([
      'card',
      'table_normal'
    ]),
    ...mapGetters([
      'getUrl'
    ])

  },
  methods: {
    show:function (){
      axios.get(this.getUrl('supplier/'+this.$route.query.id))
          .then(response => response.data.data)
          .then(data=>{
            this.suppliers = data
            this.supplier_credit = data.supplier_credit
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    payCredit: function (id){
      this.isEdit = true
      let supplier_credit = this.supplier_credit.find(el=>el.id == id)
      this.edit_credit = supplier_credit
    },
    pay: function (id){
      let formData = new FormData(this.$refs.pay_credit);
      formData.append('_method','PATCH')

      axios.post(this.getUrl('supplier-credit/'+id),formData
      )
          .then( res => {
            console.log(res)
            this.$store.dispatch('alertSuccess')
            this.isEdit = false
            this.show()
          })
          .catch(err => {
            this.$store.dispatch('alertError')
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