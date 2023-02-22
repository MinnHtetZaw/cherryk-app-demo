import { createRouter, createWebHistory } from 'vue-router'
import Category from "@/views/master-data/Category";
import Subcategory from "@/views/master-data/Subcategory";
import Brand from "@/views/master-data/Brand";
import Item from "@/views/master-data/Item";
import ItemUnit from "@/views/master-data/ItemUnit";
import ProcedureItem from "@/views/master-data/ProcedureItem";
import ProcedureItemUnit from "@/views/master-data/ProcedureItemUnit";
import Machine from "@/views/master-data/Machine";
import Treatment from "@/views/master-data/Treatment";
import TreatmentUnit from "@/views/master-data/TreatmentUnit";
import Service from "@/views/master-data/Service";
import Symptom from "@/views/master-data/Symptom";
import CreatePatient from "@/views/patient-data/CreatePatient";
import PatientList from "@/views/patient-data/PatientList";
import PreviousEmr from "@/views/patient-data/PreviousEmr";
import PatientDetail from "@/views/patient-data/PatientDetail";
import ProcedureAdd from "@/views/procedure/ProcedureAdd";
import Login from "@/views/auth/Login";
import StockCountPrice from "@/views/stock/StockCountPrice";
import AppointmentCreate from "@/views/appointment/AppointmentCreate";
import ProcedureList from "@/views/procedure/ProcedureList";
import ProcedurePayment from "@/views/payment/ProcedurePayment";
import Dashboard from "@/views/Dashboard";
import SalePage from "@/views/sale/SalePage";
import SaleHistory from "@/views/sale/SaleHistory";
import SaleVoucher from "@/views/sale/SaleVoucher";
import PurchaseList from "@/views/admin/PurchaseList";
import NotFound from "@/views/NotFound";
import PurchaseCreateForm from "@/views/admin/PurchaseCreateForm";
import PurchaseDetail from "@/views/admin/PurchaseDetail";
import SupplierList from "@/views/admin/SupplierList";
import ProfitLoss from "@/views/finance/ProfitLoss";
import Expense from "@/views/finance/Expense";
import Income from "@/views/finance/Income";
import FixedAsset from "@/views/finance/FixedAsset";
import BankAccount from "@/views/finance/BankAccount";
import TreatmentUnitList from "@/views/master-data/TreatmentUnitList";
import Member from "@/views/patient-data/Member";
import EditTreatmentUnit from "@/views/master-data/EditTreatmentUnit";
import SymptomUnit from "@/views/master-data/SymptomUnit";
import ProcedureVoucher from "@/views/procedure/ProcedureVoucher";
import ProcedureVoucherDetail from "@/views/procedure/ProcedureVoucherDetail";
import ProcedureDetail from "@/views/procedure/ProcedureDetail";
import ProcedureCheck from "@/views/procedure/ProcedureCheck";
import ProcedureHistory from "@/views/procedure/ProcedureHistory";
import PatientCreditList from "@/views/patient-data/PatientCreditList";
import PatientCreditDetail from "@/views/patient-data/PatientCreditDetail";
import Kit from "@/views/master-data/Kit";
import KitUnit from "@/views/master-data/KitUnit";
import store from '@/store'
import SupplierCreditDetail from "@/views/admin/SupplierCreditDetail";
import Notification from "@/views/Notification";
import AppointmentList from "@/views/appointment/AppointmentList";
import DoctorSchedule from "@/views/DoctorSchedule";
import ProcedureEdit from "@/views/procedure/ProcedureEdit";
import axios from "axios";
import Profile from "@/views/admin/Profile";

function isAuth(to,from,next){

  if (store.state.auth == null){
    console.log('no auth')
    return next('/')
  }
  axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')
  axios.post(store.state.url+'check-token',store.state.auth.id)
      .then(res=>{
        if (res.data.data != true){
          return next('/')
        }
        return next()
      })
      .catch(err=>{
        console.log(err)
        return next('/')
      })
}
const routes = [
    //Login
  {
    path: '/',
    name: 'login',
    component: Login,
  },
    //Dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: [isAuth]
  },
  {
    path: '/doctorSchedule',
    name: 'doctorSchedule',
    component: DoctorSchedule,
    beforeEnter: [isAuth]
  },
// Category
  {
    path: '/category',
    name: 'category',
    component: Category,
    beforeEnter: [isAuth]

  },
  // SubCategory
  {
    path: '/subcategory',
    name: 'subcategory',
    component: Subcategory,
    beforeEnter: [isAuth]
  },
  // Brand
  {
    path: '/brand',
    name: 'brand',
    component: Brand,
    beforeEnter: [isAuth]
  },
  // Item
  {
    path: '/item',
    name: 'item',
    component: Item,
    beforeEnter: [isAuth]
  },
    // ProcedureItem
  {
    path: '/procedureItem',
    name: 'procedureItem',
    component: ProcedureItem,
    beforeEnter: [isAuth]
  },
  // Item
  {
    path: '/kit',
    name: 'kit',
    component: Kit,
    beforeEnter: [isAuth]
  },
  // KitUnit
  {
    path: '/kitUnit/:id',
    name: 'kitUnit',
    component: KitUnit,
    beforeEnter: [isAuth]
  },
    // ProcedureItemUnit
  {
    path: '/procedureItemUnit/:id',
    name: 'procedureItemUnit',
    component: ProcedureItemUnit,
    beforeEnter: [isAuth]
  },

    // Machine
  {
    path: '/machine',
    name: 'machine',
    component: Machine,
    beforeEnter: [isAuth]
  },
    // Treatment
  {
    path: '/treatment',
    name: 'treatment',
    component: Treatment,
    beforeEnter: [isAuth]
  },
    // Treatment Unit
  {
    path: '/treatmentUnit/:id',
    name: 'treatmentUnit',
    component: TreatmentUnit,
    beforeEnter: [isAuth]
  },
    //Edit Treatment Unit
  {
    path: '/editTreatmentUnit/:id',
    name: 'editTreatmentUnit',
    component: EditTreatmentUnit,
    beforeEnter: [isAuth]
  },

    // Treatment Unit List
  {
    path: '/treatmentUnitList',
    name: 'treatmentUnitList',
    component: TreatmentUnitList,
    beforeEnter: [isAuth]
  },
    // Service
  {
    path: '/service',
    name: 'service',
    component: Service,
    beforeEnter: [isAuth]
  },
    // Symptom
  {
    path: '/symptom',
    name: 'symptom',
    component: Symptom,
    beforeEnter: [isAuth]
  },
  {
    path: '/symptomUnit/:id',
    name: 'symptomUnit',
    component: SymptomUnit,
    beforeEnter: [isAuth]
  },
  {
    path: '/itemUnit/:id',
    name: 'itemUnit',
    component: ItemUnit,
    beforeEnter: [isAuth]
  },
    //Patient
    //Create Patient
  {
    path: '/createPatient',
    name: 'createPatient',
    component: CreatePatient,
    beforeEnter: [isAuth]
  },
    //Patient List
  {
    path: '/patientList',
    name: 'patientList',
    component: PatientList,
    beforeEnter: [isAuth]
  },
  // ProcedureItemUnit
  {
    path: '/patientCreditDetail/:id',
    name: 'patientCreditDetail',
    component: PatientCreditDetail,
    beforeEnter: [isAuth]
  },
    //PreviousEMR
  {
    path: '/previousEmr/:id',
    name: 'previousEmr',
    component: PreviousEmr,
    beforeEnter: [isAuth]
  },
    //PatientDetail
  {
    path: '/patientDetail/:id',
    name: 'patientDetail',
    component: PatientDetail,
    beforeEnter: [isAuth]
  },
 // Procedure Edit
  {
    path: '/procedureEdit',
    name: 'procedureEdit',
    component: ProcedureEdit,
    beforeEnter: [isAuth]
  },
  //PatientCreditList
  {
    path: '/patientCreditList',
    name: 'patientCreditList',
    component: PatientCreditList,
    beforeEnter: [isAuth]
  },

  //Member
  {
    path: '/member',
    name: 'member',
    component: Member,
    beforeEnter: [isAuth]
  },
    //ProcedureAdd
  {
    path: '/procedureAdd',
    name: 'procedureAdd',
    component: ProcedureAdd,
    beforeEnter: [isAuth]
  },
    // Procedure Detail
  {
    path: '/procedureDetail/:id',
    name: 'procedureDetail',
    component: ProcedureDetail,
    beforeEnter: [isAuth]
  },
//ProcedureTreatmentDetail

    //Procedure Check
  {
    path: '/procedureCheck/:id',
    name: 'procedureCheck',
    component: ProcedureCheck,
    beforeEnter: [isAuth]
  },
    // Procedure History
  {
    path: '/procedureHistory',
    name: 'procedureHistory',
    component: ProcedureHistory,
    beforeEnter: [isAuth]
  },
    //Stock
    //Stock Count && Price
  {
    path: '/stockCount',
    name: 'stockCount',
    component: StockCountPrice,
    beforeEnter: [isAuth]
  },

    //Appointment
    //Appointment Create
  {
    path: '/appointmentCreate',
    name: 'appointmentCreate',
    component: AppointmentCreate,
    beforeEnter: [isAuth]
  },
    // Appointment List
  {
    path: '/appointmentList',
    name: 'appointmentList',
    component: AppointmentList,
    beforeEnter: [isAuth]
  },
  //Procedure Treatment List
  {
    path: '/procedureList',
    name: 'procedureList',
    component: ProcedureList,
    beforeEnter: [isAuth]
  },
    //Procedure Payment
  {
    path: '/procedurePayment/:id',
    name: 'procedurePayment',
    component: ProcedurePayment,
    beforeEnter: [isAuth]
  },

    //Sale
  {
    path: '/salePage',
    name: 'salePage',
    component: SalePage,
    beforeEnter: [isAuth]
  },
    //SaleHistory
  {
    path: '/saleHistory',
    name: 'saleHistory',
    component: SaleHistory,
    beforeEnter: [isAuth]
  },

    //SaleVoucher
  {
    path: '/saleVoucher/:id',
    name: 'saleVoucher',
    component: SaleVoucher,
    beforeEnter: [isAuth]
  },

    //ADMIN
  {
    path: '/purchaseList',
    name: 'purchaseList',
    component: PurchaseList,
    beforeEnter: [isAuth]
  },
    //Purchase Create Form
  {
    path: '/purchaseCreate',
    name: 'purchaseCreate',
    component: PurchaseCreateForm,
    beforeEnter: [isAuth]
  },
    //PurchaseDetail
  {
    path: '/purchaseDetail/:id',
    name: 'purchaseDetail',
    component: PurchaseDetail,
    beforeEnter: [isAuth]
  },
    // procedure voucher
  {
    path: '/procedureVoucher/:id',
    name: 'procedureVoucher',
    component: ProcedureVoucher,
    beforeEnter: [isAuth]
  },

    //Supplier List
  {
    path: '/supplierList',
    name: 'supplierList',
    component: SupplierList,
    beforeEnter: [isAuth]
  },
    // Supper Credit Detail
  {
    path: '/supplierCreditDetail/:id',
    name: 'supplierCreditDetail',
    component: SupplierCreditDetail,
    beforeEnter: [isAuth]
  },
  //Profit & Loss
  {
    path: '/profitLoss',
    name: 'profitLoss',
    component: ProfitLoss,
    beforeEnter: [isAuth]
  },
    //Income
  {
    path: '/income',
    name: 'income',
    component: Income,
    beforeEnter: [isAuth]
  },
  //Expense List
  {
    path: '/expense',
    name: 'expense',
    component: Expense,
    beforeEnter: [isAuth]
  },
    //Fixed Asset
  {
    path: '/fixedAsset',
    name: 'fixedAsset',
    component: FixedAsset,
    beforeEnter: [isAuth]
  },
    //Bank Account
  {
    path: '/bankAccount',
    name: 'bankAccount',
    component: BankAccount,
    beforeEnter: [isAuth]
  },
  // Notification
  {
    path: '/notification',
    name: 'notification',
    component: Notification,
    beforeEnter: [isAuth]
  },
  //Profile Details
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: [isAuth]
  },
  //404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass : 'active'
})

// router.beforeEach((to, from,next) => {
//   if (isAuth != true) {
//     // redirect the user to the login page
//     next({path: '/'})
//   }else {
//     next()
//   }
// })

export default router
