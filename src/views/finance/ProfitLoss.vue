<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="fw-normal text-secondary">Profit & Loss</h6>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-6">
      <div class="card shadow-sm border-0 mb-3 rounded p-3">
        <div id="chart">
          <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card shadow-sm border-0 mb-3 rounded p-3">
        <div id="chart">
          <apexchart type="line" height="350" :options="chartOptions" :series="series2"></apexchart>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card border-0 shadow-sm p-3">
        <Tab>
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="medicine-tab" data-bs-toggle="pill" data-bs-target="#medicine" type="button" role="tab" aria-controls="medicine" aria-selected="true">Sale Revenue</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="procedure-tab" data-bs-toggle="pill" data-bs-target="#procedure" type="button" role="tab" aria-controls="procedure" aria-selected="false">Other Income</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="kit-tab" data-bs-toggle="pill" data-bs-target="#kit" type="button" role="tab" aria-controls="kit" aria-selected="false">Purchase Account</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="expense-tab" data-bs-toggle="pill" data-bs-target="#expense" type="button" role="tab" aria-controls="expense" aria-selected="false">Other Expense</button>
          </li>
        </Tab>

        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="medicine" role="tabpanel" aria-labelledby="medicine-tab">
            <table class="table table-sm table-striped table-hover table-borderless">
              <thead>
              <tr>
                <th class="fw-normal text-secondary text-center">No</th>
                <th class="fw-normal text-secondary text-center">Voucher Date</th>
                <th class="fw-normal text-secondary text-center">Customer Name</th>
                <th class="fw-normal text-secondary text-center">Phone</th>
                <th class="fw-normal text-secondary text-center">Total Amount</th>
                <th class="fw-normal text-secondary text-center">Pay Amount</th>
                <th class="fw-normal text-secondary text-center">Detail</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(sale,index) in sales">
                <td class="text-center">{{index + 1}}</td>
                <td class="text-center">{{sale.voucher_date}}</td>
                <td class="text-center">{{sale.customer_name}}</td>
                <td class="text-center">{{sale.customer_phone}}</td>
                <td class="text-center">{{sale.total_price}}</td>
                <td class="text-center">{{sale.pay}}</td>
                <td class="text-center">
                  <button @click="saleVoucher(sale.id)" class="btn btn-primary btn-sm">
                    <i class="fa-solid fa-circle-info"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <!--            Expense -->
          <div class="tab-pane fade" id="procedure" role="tabpanel" aria-labelledby="procedure-tab">
            <table class="table table-sm table-striped table-borderless table-hover">
              <thead>
              <tr>
                <th class="text-center text-secondary fw-normal">No.</th>
                <th class="text-center text-secondary fw-normal">Date</th>
                <th class="text-center text-secondary fw-normal">Type</th>
                <th class="text-center text-secondary fw-normal">Title</th>
                <th class="text-center text-secondary fw-normal">Period</th>
                <th class="text-center text-secondary fw-normal">Description</th>
                <th class="text-center text-secondary fw-normal">Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(income,index) in incomes" :key="'income'+income.id">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{income.date}}</td>
                <td class="text-center">{{income.type}}</td>
                <td class="text-center">{{income.title}}</td>
                <td class="text-center">{{income.period}}</td>
                <td class="text-center">{{income.description}}</td>
                <td class="text-center">{{income.amount}}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <!--            Kit Item-->
          <div class="tab-pane fade" id="kit" role="tabpanel" aria-labelledby="kit-tab">
            <table class="table table-sm table-striped table-hover table-borderless">
              <thead>
              <tr>
                <th class="text-center text-secondary fw-normal">No.</th>
                <th class="text-center text-secondary fw-normal">Purchase Date</th>
                <th class="text-center text-secondary fw-normal">Supplier Name</th>
                <th class="text-center text-secondary fw-normal">Total Qty</th>
                <th class="text-center text-secondary fw-normal">Total Price</th>
                <th class="text-center text-secondary fw-normal">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(purchase,index) in purchases" :key="'purchase'+purchase.id">
                <td class="text-center">{{index + 1}}</td>
                <td class="text-center">{{purchase.purchase_date}}</td>
                <td class="text-center">{{purchase.supplier_name}}</td>
                <td class="text-center">{{purchase.total_qty}}</td>
                <td class="text-center">{{purchase.total_price}}</td>
                <td class="text-center">
                  <button @click="purchaseDetail(purchase.id)" class="btn btn-primary btn-sm">
                    Detail
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
<!--          Other Expense-->
          <div class="tab-pane fade" id="expense" role="tabpanel" aria-labelledby="expense-tab">
            <table class="table table-sm table-striped table-hover table-borderless">
              <thead>
              <tr>
                <th class="text-secondary text-center fw-normal">No.</th>
                <th class="text-secondary text-center fw-normal">Date</th>
                <th class="text-secondary text-center fw-normal">Title</th>
                <th class="text-secondary text-center fw-normal">Type</th>
                <th class="text-secondary text-center fw-normal">Period</th>
                <th class="text-secondary text-center fw-normal">Description</th>
                <th class="text-secondary text-center fw-normal">Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(expense,index) in expenses" :key="'expense'+expense.id">
                <td class="text-center">{{index + 1}}</td>
                <td class="text-center">{{expense.date}}</td>
                <td class="text-center">{{expense.title}}</td>
                <td class="text-center">{{expense.type}}</td>
                <td class="text-center">{{expense.period}}</td>
                <td class="text-center">{{expense.description}}</td>
                <td class="text-center">{{expense.amount}}</td>
              </tr>
              </tbody>
            </table>
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
import Tab from "@/components/layout/Tab";
import router from "@/router";
export default {
  name: "ProfitLoss",
  components: {Tab, SideNav},
  data() {
    return {
      sales : null,
      monthly_total_sale : {},
      total : 0,
      total_value : 0,
      income_total: 0,
      sale_percent: 0,
      income_percent: 0,
      incomes: null,
      expenses: null,
      purchases: null,
      series: [{
        name: 'Sale Revenue',
        data: []
      },
      {
        name: 'Procedure Revenue',
        data: []
      },
      {
        name: 'Other Income',
        data: []
      },
      {
        name: 'Other Expense',
        data: []
      },
      {
        name: 'Purchase',
        data: []
      }],
      series2: [{
        name: 'Profit',
        data: [],
        color: 'rgba(20,232,120,0.99)'
      },
      {
        name: 'Loss',
        data: [],
        color: '#EF0970FF'
      },
      {
        name: 'Net Profit',
        data: [],
        color: 'rgba(105,108,255,0.85)'
      },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },

        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
        },

    },

  }
  },
  methods: {
    searchByDate:function () {
      let formData = new FormData(this.$refs.sale)
      axios.post(this.$store.state.url+'sale_search_date',formData)
          .then(res=>res.data)
          .then(data=>{
            this.sale_vouchers = data.data
            this.total = data.total
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    saleVoucher:function (id) {
      router.push({path:'/saleVoucher/'+id,query:{id: id}})
    }
  },
  mounted() {
    axios.get(this.$store.state.url+'profitLoss')
        .then(res=>res.data)
        .then(data =>{
          console.log(data)
          this.sales = data.sales
          this.series[0].data = data.monthly_total_sale
          this.series[1].data = data.monthly_procedure_value
          this.series[2].data = data.monthly_income
          this.series[3].data = data.monthly_expense
          this.series[4].data = data.monthly_purchase

          this.series2[0].data = data.monthly_profit//profit
          this.series2[1].data = data.monthly_loss//loss
          this.series2[2].data = data.monthly_net//Net Profit
          this.incomes = data.income
          this.total = data.sale_total
          this.total_value = data.total_value
          this.income_total =data.income_total
          this.sale_percent =data.sale_percent
          this.income_percent =data.income_percent
          this.expenses =data.expenses
          this.purchases = data.purchases
        })
        .catch(err => {
          this.errors = err.response.data.errors
        });
  }
}
</script>

<style scoped>

</style>