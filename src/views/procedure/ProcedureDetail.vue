<template>
  <SideNav>
    <div class="row">
      <div class="col-11 m-auto">
        <div class="card mb-3 p-3 border-0 shadow-sm rounded">
          <div id="printableArea">
            <div class="d-flex gap-3 justify-content-center align-items-center">
              <img src="../../assets/vlogo.png" style="width: 50px;" alt="">
              <h4 style="color: #8192ff;" class="text-center">Victorious Clinic Medical Record</h4>
            </div>
            <div>
              <p class="text-center">အမှတ် ၆၇၇၊ မြေညီထပ်၊ မေတ္တာလမ်း၊ ၉ ရပ်ကွက် (City Mart အနီး)၊ တောင်ဥက္ကလာပ မြို့နယ်၊ ရန်ကုန်မြို့</p>
              <p class="text-center">09784407840 , 09969121111 , 09750145883</p>
            </div>

            <div class="row">
              <div class="col-11 m-auto">
                <div class="d-flex justify-content-between align-items-end">
                  <div class="">
                    <p class="text-secondary mb-1">Name : {{procedure.customer_name }}</p>
                    <p class="text-secondary mb-1">Age : {{procedure.customer_age }}</p>
                    <p class="text-secondary mb-1">Date : {{procedure.date }}</p>

                  </div>
                  <div class="">
                    <p class="text-secondary mb-1">Gender : {{procedure.customer_gender }}</p>
                    <p class="text-secondary mb-1">Address : {{procedure.customer_address }}</p>
                    <p class="text-secondary mb-1">Time : {{procedure.time }}</p>
                  </div>
                  <div class="">
                    <div>
                      <img :src="procedure.customer_photo" style="width: 75px;height: 75px;object-fit: cover;" alt="">
                    </div>
                  </div>
                </div>
                <div class="badge mb-2 bg-primary">
                  <h6 v-if="procedure.follow_up_date != null" class="text-white mb-0 fw-normal">Follow Up Date : {{procedure.follow_up_date }}</h6>

                </div>
              </div>

            </div>

            <div class="row">
              <div class="col-11 m-auto">
                <table class="table table-bordered table-sm">
                  <thead>
                  <tr style="background-color: rgba(129,146,255,0.99);color: #fff;">
                    <th colspan="4" class="text-center">
                      History
                    </th>
                    <th colspan="2" class="text-center" >
                      Physical Examination
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr style="">
                    <td style="width: 50%;background-color: rgba(129,146,255,0.12);" colspan="4">
                      <div v-if="skinCares.length > 0">
                        <h6 style="color: #8192ff;">Skin Care & Cosmetic History</h6>
                        <ul>
                          <li v-for="skin_care in skinCares">{{skin_care.name}} <span class="small text-secondary">({{skin_care.description}})</span></li>
                        </ul>
                      </div>
                      <div v-if="procedure.drug_his">
                        <h6 style="color: #8192ff;">Drug History</h6>
                        <p>{{procedure.drug_his}}</p>
                      </div>
                      <div v-if="procedure.medical_his">
                        <h6 style="color: #8192ff;">Medical History</h6>
                        <p>{{procedure.medical_his}}</p>
                      </div>
                      <div v-if="procedure.allergy_his">
                        <h6 style="color: #8192ff;">Allergy History</h6>
                        <p>{{procedure.allergy_his}}</p>
                      </div>
                      <div v-if="procedure.treatment_his">
                        <h6 style="color: #8192ff;">Treatment History</h6>
                        <p>{{procedure.treatment_his}}</p>
                      </div>
                      <div v-if="procedure.complain">
                        <h6 style="color: #8192ff;">Complaint</h6>
                        <p>{{procedure.complain}}</p>
                      </div>
                      <div v-if="procedure.diagnosis">
                        <h6 style="color: #8192ff;">Diagnosis</h6>
                        <p>{{procedure.diagnosis}}</p>
                      </div>
                    </td>
                    <td style="width: 50%;background-color: rgba(129,146,255,0.12);" colspan="2">
                      <div v-if="skinTypes.length > 0">
                        <h6 style="color: #8192ff;">Skin Type</h6>
                        <ul v-for="skin_type in skinTypes">
                          <li>{{skin_type.name}} <span v-if="skin_type.description != null" class="small">( {{skin_type.description}} )</span></li>
                        </ul>
                      </div>
                      <div v-if="acnes.length > 0">
                        <h6 style="color: #8192ff;">Acne</h6>
                        <ul v-for="acne in acnes">
                          <li>{{acne.name}} <span v-if="acne.description != null" class="small">( {{acne.description}} )</span></li>
                        </ul>
                      </div>
                      <div v-if="blackSpots.length > 0">
                        <h6 style="color: #8192ff;">Melsma & Black Spots</h6>
                        <ul v-for="black_spot in blackSpots">
                          <li>{{black_spot.name}} <span v-if="black_spot.description != null" class="small">( {{black_spot.description}} )</span></li>
                        </ul>
                      </div>

                      <div v-if="mesoFats.length > 0">
                        <h6 style="color: #8192ff;">Meso Fat</h6>
                        <ul v-for="meso_fat in mesoFats">
                          <li>{{meso_fat.name}} <span v-if="meso_fat.description != null" class="small">( {{meso_fat.description}} )</span></li>
                        </ul>
                      </div>
                      <div v-if="facialDesigns.length > 0">
                        <h6 style="color: #8192ff;">Facial Design</h6>
                        <ul v-for="facial_design in facialDesigns">
                          <li>{{facial_design.name}} <span v-if="facial_design.description != null" class="small">( {{facial_design.description}} )</span></li>
                        </ul>
                      </div>


<!--                      <ul v-for="physical_exam in procedure.physical_exams">-->
<!--                        <li>{{physical_exam.physical_exam_unit}}</li>-->
<!--                      </ul>-->
                      <div v-if="procedure.other_physical_exam">
                        <h6 style="color: #8192ff;">Other Physical Examination</h6>
                        <p>{{procedure.other_physical_exam}}</p>
                      </div>

                    </td>
                  </tr>
                  <!-- <tr>
                    <td colspan="4"></td>
                  </tr> -->
                  <tr v-if="medicines.length > 0">
                    <th colspan="6" style="color: #8192ff;">
                      <h6 class="mb-0">Medicine</h6>
                    </th>
                  </tr>
                  <tr v-if="medicines.length > 0" style="background-color: #8192ff;">
                    <th class="text-center" style="color:white;">No</th>
                    <th class="text-center" style="color:white;">Name</th>
                    <th class="text-center" style="color:white;">Qty</th>
                    <th class="text-center" style="color:white;">Dose</th>
                    <th class="text-center" style="color:white;">Day</th>
                    <th class="text-center" style="color:white;">SIG</th>
                  </tr>

                  <tr v-if="medicines.length > 0" style="background-color: rgba(129,146,255,0.12);" class="text-center" v-for="(medicine,index) in medicines">
                    <td style="width: 50px;">{{index +1}}</td>
                    <td class="text-start" style="width: 250px;">{{medicine.name}}</td>
                    <td style="width: 50px;">{{medicine.qty}}</td>
                    <td class="text-center" style="width: 50px;">{{medicine.dose}}</td>

                    <td style="width: 10px;">{{medicine.day}}</td>
                    <td class="text-start">{{medicine.sig}}</td>
                  </tr>
                  <tr v-if="treatments.length > 0">
                    <th colspan="6" style="color: #8192ff;">
                       <h6 class="mb-0">Treatment</h6>
                    </th>
                  </tr>
                  <tr v-if="treatments.length > 0" style="background-color: #8192ff;">
                    <th class="text-center" style="color:white;">No</th>
                    <th class="text-center" style="color:white;">Name</th>
                    <th class="text-center" style="color:white;">Qty</th>
<!--                    <th class="text-center" style="color:white;">Day</th>-->
                    <th colspan="3" class="text-center" style="color:white;">Description</th>
                  </tr>
                  <tr v-if="treatments.length > 0" style="background-color: rgba(129,146,255,0.12);" class="text-center" v-for="(treatment,index) in treatments">
                    <td style="width: 50px;">{{index +1}}</td>
                    <td class="text-start" style="width: 250px;">{{treatment.name}}</td>
                    <td style="width: 50px;">{{treatment.qty}}</td>
<!--                    <td style="width: 50px;">{{treatment.day}}</td>-->
                    <td class="text-start" colspan="3">{{treatment.sig}}</td>

                  </tr>
                  </tbody>
                </table>
              </div>

            </div>



          </div>
        </div>
      </div>
    </div>
    <div  v-if="isEdit == false" class="row">
      <div class="col-11 m-auto">
<!--        <h6 class="text-secondary">Procedure Photo</h6>-->
        <div>
          <div class="d-flex flex-wrap mb-3 gap-3" >
            <div v-for="photo in procedure_photo">
              <img :src="photo.photo" style="width: 300px;border-radius: 5px;object-fit: cover;" alt="">
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-if="isEdit == false" class="row">
      <div class="col-12">
        <div class="mb-3 d-flex gap-5 justify-content-center">
<!--          <button @click="editProcedure()" class="btn btn-warning">-->
<!--            Edit-->
<!--            <i class="ms-2 fa-solid fa-edit"></i>-->
<!--          </button>-->
          <button @click="edit(procedure.id)" class="btn btn-sm btn-warning">
            Edit
            <i class="ms-2 fa-solid fa-pen"></i>
          </button>
          <button @click="print" class="btn btn-sm btn-primary">
            Print
            <i class="ms-2 fa-solid fa-print"></i>
          </button>
          <button @click="deleteProcedure(procedure.id)" class="btn btn-sm btn-danger">
            Delete
            <i class="ms-2 fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import {mapGetters} from "vuex";
import * as markerjs2 from "markerjs2";
import router from "@/router";
import Swal from "sweetalert2";
export default {
  name: "ProcedureDetail",
  components: {SideNav},
  data() {
    return {
      procedure : {},
      skinCares: {},
      drugHis: {},
      skinTypes : {},
      acnes : {},
      mesoFats : {},
      blackSpots: {},
      facialDesigns: {},
      medicines : {},
      treatments : {},
      procedure_photo: {},
      isEdit : false,
      is_skin_care_edit: false,
      is_medicine_edit: false,
      isLoading : false,
      add_photo: false,
      is_edit_treatments : false,
      edit_treatments : {},
      edit_medicine : {},
      edit_skin_care : {},

    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ]),
  },
  methods: {
    edit: function (id){
      router.push({path: '/procedureEdit',query: {id}})
    },
    getProcedure : function (){
      axios.get(this.$store.state.url+'procedure/'+ this.$route.query.id)
          .then(response => response.data.data)
          .then(data=>{
            this.procedure = data
            this.skinCares = this.procedure.skin_cares
            this.skinTypes = this.procedure.skin_types
            this.acnes = this.procedure.acnes
            this.mesoFats = this.procedure.meso_fats
            this.blackSpots = this.procedure.black_spots
            this.facialDesigns = this.procedure.facial_designs
            this.medicines = this.procedure.medicines
            this.treatments = this.procedure.treatments
            this.procedure_photo = this.procedure.procedure_photo
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getSkinCare: function (){
      axios.get(this.getUrl('skin_care'))
          .then( res => res.data.data)
          .then(data =>
              this.skin_cares = data
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    print: function (){
      let printContents = document.getElementById('printableArea').innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload()

    },
    deleteProcedure: function (id){

      if (confirm('Please Confirm to Delete!') == true){
        axios.delete(this.getUrl('procedure/'+id))
            .then(res=>{
              this.$store.dispatch('alertSuccess')
              router.push({path: '/patientDetail/'+this.$route.query.p_id,query: {id: this.$route.query.p_id}})
            })
            .catch(err=>{
              this.$store.dispatch('alertError')
            })
      }

    },

    //Medicine
    calcQty:function (id){
      let medicine = this.edit_medicine;
      let qty = Number($('#edit_medicine_qty'+id).val());
      let duration = Number($('#edit_medicine_duration'+id).val());
      let total_qty = qty * duration
      let sub_total = total_qty * medicine.selling_price
      medicine.qty = qty
      medicine.day = duration
      medicine.total_qty = total_qty
      medicine.total_price = sub_total
      // $('#total_qty'+id).val(total_qty)
      // $('#sub_total'+id).val(sub_total)
    },
    updateMedicine: function (id){
      let formData = new FormData(this.$refs.edit_medicine)
      formData.append('_method','PATCH')
      axios.post(this.getUrl('medicine_procedure/'+id),formData)
      .then(res=>{
        this.$store.dispatch('alertSuccess')
        this.is_medicine_edit = false
        this.getProcedure()
      })
      .catch(err=>{
        this.$store.dispatch('alertError')
        console.log(err)
      })
    },
    deleteMedicine: function (id){
      axios.delete(this.getUrl('medicine_procedure/'+id))
          .then(response => response.data.data)
          .then(data=> {
            this.$store.dispatch('alertSuccess')
            this.getProcedure()
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteTreatment: function (id){
      axios.delete(this.getUrl('procedure_treatment/'+id))
          .then(response => response.data.data)
          .then(data=> {
            this.$store.dispatch('alertSuccess')
            this.getProcedure()
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    editSkinCare: function (value){
      this.edit_skin_care = value
      this.is_skin_care_edit = true
    },

    // Edit Medicine
    editMedicine: function (medicine){
      this.edit_medicine = medicine
      this.is_medicine_edit = true
    },
    //Edit Treatment
    editTreatment: function (v){
      this.edit_treatments = v
      // this.is_medicine_edit = true
    },
    //Add Photo
    addPhoto: function (id){
      let formData = new FormData();
      formData.append('photo',this.$refs.imgRef.src);
      formData.append('procedure_id',id);
      axios.post(this.getUrl('procedure_photo'),formData)
          .then( res => {
            this.$store.dispatch('alertSuccess')
            this.getProcedure()
            this.add_photo= false
          })
          .catch(err=>{
            this.$store.dispatch('alertError')
            console.log(err)
          });
    },
    // ================
    updateSkinCare: function (id){
      let formData = new FormData(this.$refs.edit_skin_care);
      formData.append('_method','PATCH')
      axios.post(this.getUrl('procedure_skin_care/'+id),formData)
          .then(res=>res)
          .then(data=>{
            this.$store.dispatch('alertSuccess')
            this.is_skin_care_edit = false
          })
          .catch(err=> {
            this.$store.dispatch('alertError')
          })
          .finally(_=>{
            this.isLoading = false
            this.getProcedure()
          });
    },
    showPhoto: function (){
      let fileIn = document.getElementById('imgInp');
      let fileOut = document.getElementById('imgOut');
      let readUrl = event => {
        if(event.files && event.files[0]) {
          let reader = new FileReader();
          reader.onload = event => fileOut.src = event.target.result;

          reader.readAsDataURL(event.files[0])
          console.log(event.files[0])
          // fileOut.removeAttribute('hidden');
        }
      }
      fileIn.onchange = function() {
        readUrl(this);
      };
    },
    showMarkerArea() {
      let test = document.getElementById('imgOut');
      const markerArea = new markerjs2.MarkerArea(this.$refs.imgRef);
      // attach an event handler to assign annotated image back to our image element
      markerArea.addEventListener('render', event => {
        this.$refs.imgRef.src = event.dataUrl;
      });
      // launch marker.js
      markerArea.show();
    },
    deletePhoto: function (id){
      axios.delete(this.getUrl('procedure_photo/'+id))
          .then(response => response.data.data)
          .then(data=> {
            this.$store.dispatch('alertSuccess')
            this.getProcedure()
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  },
  mounted() {
    this.getProcedure()
    this.getSkinCare()
  }
}
</script>

<style scoped>

th{
  line-height: 20px;
}
td{
  line-height: 20px;
  font-size: 13px;
}
</style>