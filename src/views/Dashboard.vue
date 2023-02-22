<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
          <div class="d-flex gap-4 justify-content-between align-items-center mb-4">
<!--            Profit-->
            <div class=" border-0 card p-3" style="width: 270px;">
                <div class="d-flex gap-3 align-items-center justify-content-between">
                  <div>
                    <i style="color:#9381ff;" class="fa-solid fa-pie-chart fa-2x"></i>
                  </div>
                  <div class="">
                    <h6  class="text-title">{{total_profit}}</h6>
                    <p class="text-title mb-0">Profit</p>
                  </div>
                </div>

              <div>
              </div>
            </div>

            <div class="card border-0 p-3" style="width: 270px">
                <div class="d-flex gap-3 align-items-center justify-content-between">
                  <div class="">
                    <i style="color: #07beb8" class="fa-brands fa-cc-mastercard fa-2x"></i>
                  </div>
<!--                  <div class="payment shadow-sm">-->
<!--                    <i class="fa-brands fa-cc-mastercard"></i>-->
<!--                  </div>-->
                  <div>
                    <h6 class="text-title">0</h6>
                    <p class="text-title mb-0">Transaction</p>
                  </div>

                </div>
            </div>
<!--            Sale-->
            <div class=" card border-0 p-3" style="width: 270px">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="">
                    <i style="color: #ff4d6d" class="fa-solid fa-basket-shopping fa-2x"></i>
                  </div>
<!--                  <div class="sale shadow-sm">-->
<!--                    <i class="fa-solid fa-basket-shopping"></i>-->
<!--                  </div>-->
                  <div class="">
                    <h6 class="text-title">{{total_sale}}</h6>
                    <p class="text-title mb-0">Sale</p>
                  </div>

                </div>

            </div>
<!--            Patient-->
            <div class="border-0 card p-3" style="width: 270px">
                <div class="d-flex justify-content-between align-items-center">
<!--                  <div class="patient shadow-sm">-->
<!--                    <i class="fa-solid fa-users"></i>-->
<!--                  </div>-->
                  <div class="">
                    <i style="color: #3970f1;" class="fa-solid fa-users fa-2x"></i>
                  </div>
                  <div>
                    <h6 class="text-title">{{total_patient}}</h6>
                    <p class="text-title mb-0">Total Patient</p>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-3">
        <div style="height: 300px;" class="card border-0 p-2">
          <h6 class="p-1 mb-2 fw-normal text-secondary">Today Status</h6>
          <div class="card-body">
              <div class="row mb-1">
                <div class="col-7">
                  <p class="text-secondary fw-normal">Total Patients</p>

                </div>
                <div class="col-5">
                  <p class="mb-0">{{today_patient}}</p>
                </div>
              </div>
            <div class="row mb-1">
                <div class="col-7">
                  <p class="text-secondary fw-normal">Total Sales</p>

                </div>
                <div class="col-5">
                  <p class="mb-0">{{today_sale}}</p>
                </div>
              </div>
            <div class="row mb-1">
                <div class="col-7">
                  <p class="text-secondary fw-normal">Total Purchases</p>

                </div>
                <div class="col-5">
                  <p class="mb-0">{{today_purchase}}</p>
                </div>
              </div>
            <div class="row mb-1">
                <div class="col-7">
                  <p class="text-secondary fw-normal">Total Incomes</p>

                </div>
                <div class="col-5">
                  <p class="mb-0">{{today_income}}</p>
                </div>
              </div>
            <div class="row mb-1">
                <div class="col-7">
                  <p class="text-secondary fw-normal">Total Expenses</p>

                </div>
                <div class="col-5">
                  <p class="mb-0">{{today_expense}}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card border-0 p-3">
          <div class="d-flex mb-3 justify-content-between align-items-center">
            <h6 class="text-secondary mb-0 card-title fw-normal">Patient Visit</h6>
<!--            <select name="" class="form-select form-select-sm w-25">-->
<!--              <option value="">Monthly</option>-->
<!--              <option value="">Weekly</option>-->
<!--            </select>-->

          </div>
          <div id="chart">
            <apexchart type="bar" height="260" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div  class="card border-0 p-3">
          <h6 class="text-secondary mb-0 card-title fw-normal">New Patients</h6>


          <div class="card-body" style="overflow: scroll;">
            <table class="table mb-0 p-0 table-borderless table-sm">
              <tbody>
              <tr v-for="customer in customers">
                <td>
                  <img :src="customer.photo" style="height: 40px;width: 40px;object-fit: cover;" class="rounded-circle" alt="">
                </td>
                <td>
                  <div>
                    <p class="mb-0">{{customer.name}}</p>
                  </div>
                </td>
                <td>
                  <button @click="detail(customer.id)" class="btn btn-sm small btn-primary"><span class="small">View</span></button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
    <div class="row mb-3">

      <div class="col-6">
        <div class="card border-0 p-3">
          <div class="d-flex mb-3 justify-content-between align-items-center">
            <h6 class="text-secondary mb-0 card-title fw-normal">Profit & Loss</h6>
<!--            <input type="month" class="form-control form-control-sm w-25">-->

          </div>
          <div id="chart3" class="mb-3">
            <apexchart type="donut" height="260" :options="chartOptions3" :series="series3"></apexchart>
          </div>
          <div class="d-flex justify-content-center">
            <h1 class="badge fw-normal bg-primary mb-3">Net Profit : {{monthly_net_profit}} </h1>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card rounded border-0 shadow-sm p-3">
          <h6 class="text-secondary card-title fw-normal">Popular Treatment</h6>
          <div>
            <apexchart type="bar" :options="chartOptions4" :series="series4"></apexchart>
          </div>

        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-3">
        <div class="card border-0 p-3">
          <h6 class="text-secondary mb-3 card-title fw-normal">Today Appointments</h6>
          <div>
            <table class="table table-borderless table-sm">
              <thead>
              <tr>

                <th class="text-center">
                  <i class="text-muted fs-5 fa-solid fa-user-doctor"></i>
                </th>
                <th class="text-center">
                  <i class="text-muted fs-5 fa-solid fa-user"></i>
                </th>
                <th class="text-center">
                  <i class="text-muted fs-5 fa-solid fa-clock"></i>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="appointment in today_appointments">
                <td class="text-start">{{appointment.doctor_name}}</td>
                <td class="text-start">{{appointment.patient_name}}</td>
                <td class="text-center">{{appointment.time}}</td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card border-0 p-3">
          <h6 class="text-secondary card-title fw-normal">Recent Patient Activity</h6>
<!--          {{recent_activities}}-->
          <table class="table mb-0 p-0 table-borderless table-sm">
            <tbody>
            <tr v-for="procedure in recent_activities">
              <td>
                <div class="d-flex gap-2 align-items-center">
                  <img :src="procedure.customer_photo" style="height: 40px;width: 40px;object-fit: cover;" class="rounded-circle" alt="">
                  <div>
                    <p class="mb-0">{{procedure.customer_name}}</p>
                    <p class="mb-0">{{procedure.customer_age}}</p>
                  </div>
                </div>
              </td>
              <td>
                  <p class="mb-0">{{procedure.diagnosis}}</p>
              </td>
              <td>
                <button @click="procedureDetail(procedure.id)" class="btn btn-sm small btn-primary">
                  <i class="fa-solid fa-info-circle"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div class="col-5">
        <div class="card  border-0 p-3">
          <h6 class="text-secondary card-title fw-normal">Popular Patients</h6>
          <div class="card-body" style="overflow: scroll;">
            <table class="table mb-0 p-0 table-borderless table-sm">
              <tbody>
              <tr v-for="customer in popular_customers">
                <td>
                  <div class="d-flex gap-2 align-items-center">
                    <img :src="customer.photo" style="height: 40px;width: 40px;object-fit: cover;" class="rounded-circle" alt="">
                    <p class="mb-0">{{customer.name}}</p>
                  </div>
                </td>
                <td>
                    <p class="mb-0"><span class="text-success mb-0">{{customer.total_amount}}</span> MMK</p>
                </td>
                <td>
                  <button @click="detail(customer.id)" class="btn btn-sm small btn-primary">
                    <i class="fa-solid fa-circle-info"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
<!--      <div class="col-4">-->
<!--        <div class="card rounded border-0 shadow-sm p-3">-->
<!--          <h6 class="text-secondary card-title fw-normal">Patient Status</h6>-->

<!--        </div>-->
<!--      </div>-->
    </div>
  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import Tab from "@/components/layout/Tab";
import axios from "axios";
import router from "@/router";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {mapGetters} from "vuex";
import FullCalendar from "@fullcalendar/vue3";

export default {
  name: "Dashboard",
  components: {Tab, SideNav,FullCalendar},
  data() {
    return {
      admin: [],
      patient_visits: [],
      popular_treatments: [],
      popular_customers: {},
      recent_activities: {},
      today_appointments: {},
      monthly_net_profit: '',
      series4: [{
        name: 'Time',
        data: []
      }],
      chartOptions4: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
            horizontal: true,
          },

        },
        fill: {
          colors: ['#00e396'],
          opacity: 1,
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: []
          // categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          //   'United States', 'China', 'Germany'
          // ],
        }
      },


      total_patient : '',
      today_patient : '',

      // Sale
      today_sale: '',
      total_sale: '',
      // =========

      // Expense
      total_expense: '',
      today_expense: '',
      // ============
      // Profit
      total_profit: '',
      // ==============
      today_income: '',
      today_purchase: '',
      customers: null,
      series: [{
        name: 'Total Patients',
        data: [],
      }
      ],
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            columnWidth: '25%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          colors: ['#8192ff'],
          opacity: 1,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
      },
      //Chart 2
      series2: [{
        name: 'Face',
        data: [41, 40, 28, 51, 42, 89, 63,43,56,23,33,53]
      }, {
        name: 'Body',
        data: [11, 32, 45, 32, 34, 52, 41,0,0,32,65,65]
      },
        {
        name: 'Body Injection',
        data: [51, 0, 26, 32, 64, 26, 34,32,43,11,87,32]
      },],
      chartOptions2: {
        chart2: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
        },

      },

      //Chart 3
      series3: [],
      chartOptions3: {
        chart: {
          type: 'donut',
        },
        labels: ["Total Procedure","Total Sale", "Other Income", "Other Expense", "Total Purchase"],
        responsive: [{

          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'top'
            }
          }
        }]
      },
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    detail(id){
      router.push({path: '/patientDetail/'+id,query:{id: id}})
    },
    getData: function (){
      axios.get(this.getUrl('admin'))
          .then(response => response.data)
          .then(data=>{
            this.admin = data.data
            this.today_sale= data.today_sale
            this.total_sale= data.total_sale
            this.total_expense = data.total_expense
            this.today_expense= data.today_expense
            this.today_income= data.today_income
            this.today_purchase= data.today_purchase
            this.total_patient= data.total_patient
            this.today_patient= data.today_patient
            this.total_profit = data.total_profit
            let obj_array = Object.keys(data.popular_treatments)
            // let word_length = obj_array.length
            for (let i = 0; i <= obj_array.length-1;i++){
              let word = obj_array[i]
              this.chartOptions4.xaxis.categories.push(word)
            }
            this.chartOptions4.xaxis.categories.concat(Object.keys(data.popular_treatments))
            this.series[0].data = data.patient_visits
            this.series4[0].data =  Object.values(data.popular_treatments)
            this.series3=data.profit_loss
            this.customers = data.recent_customers
            this.popular_customers = data.popular_customers
            this.recent_activities = data.recent_activities
            this.today_appointments = data.today_appointments
            this.monthly_net_profit = data.monthly_net_profit
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    procedureDetail: function (id) {
      router.push({path: '/procedureDetail/'+id,query: {id:id}})
    },

  },
  mounted() {
    this.getData()
  }
}
</script>
<style scoped>
.bg-profit{
  border-radius: 7px;
  background: #ffffff;
  //background-image: linear-gradient(to right bottom, #9381ff, #9b8fff, #a49dff, #adabff, #b8b8ff) !important;
  box-shadow: 0 2px 3px 0 rgba(147, 129, 255, 0.3);
}
.bg-transit{
  border-radius: 7px;
  background-image: linear-gradient(to right bottom, #07beb8, #1dc1bc, #2ac5bf, #34c8c3, #3dccc7) !important;
  box-shadow: 0 2px 3px 0 rgba(7, 190, 184, 0.3);
}
.bg-sale{
  border-radius: 7px;
  background-image: linear-gradient(to right bottom, #ff4d6d, #ff607b, #ff7089, #ff8096, #ff8fa3) !important;
  box-shadow: 0 2px 3px 0 rgba(255, 77, 109, 0.3);

}
.bg-patient{
  border-radius: 7px;
  background-image: linear-gradient(to right bottom, #4361ee, #3970f1, #367df2, #3b89f1, #4895ef) !important;
  box-shadow: 0 2px 3px 0 rgba(67, 97, 238, 0.3);

}
.profit{
  width: 50px;
  text-align: center;
  border-radius: .5rem;
  padding: 10px;
  background: #e08efc;
  color: #9944de;
}
.payment{
  width: 50px;
  text-align: center;
  border-radius: .5rem;
  padding: 10px;
  background: #6DDF9AFF;
  color: #0aa63a;
}
.patient{
  width: 50px;
  text-align: center;
  border-radius: .5rem;
  padding: 10px;
  background: rgba(22, 177, 255, 0.16);
  color: #16b1ff;
}
.sale{
  width: 50px;
  text-align: center;
  border-radius: .5rem;
  padding: 10px;
  background: rgba(255, 76, 81, 0.16);
  color: #ff4c51;
}
</style>