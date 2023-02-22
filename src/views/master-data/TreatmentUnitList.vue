<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center gap-3">
              <h4 class="fw-normal text-secondary">Treatment Unit List</h4>

            </div>
            <Tab>
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="card-tab"   data-bs-toggle="list" data-bs-target="#card" type="button" role="tab" aria-controls="card" aria-selected="false">
                  <i class="fa-solid fa-grip-vertical" ></i>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link " id="table-tab" data-bs-toggle="list" data-bs-target="#table" type="button" role="tab" aria-controls="table" aria-selected="true">
                  <i class="fa-solid fa-list"></i>
                </button>
              </li>
            </Tab>
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">


          <div class="tab-content" id="list-tabContent">
            <div class="tab-pane fade show active" id="card" role="tabpanel" aria-labelledby="profit-tab">

              <div class="row">
                <div class="col-12">
                  <div class="d-flex mb-3 justify-content-end">
                    <Search @search="searchTreatmentUnit"></Search>
                  </div>
                  <div class="d-flex mx-2 gap-5 align-items-start flex-wrap">
                    <div v-for="treatment_unit in treatment_units.data" style="width: 350px;" class=" card mb-3 rounded shadow-sm border-0">
                      <img v-if="treatment_unit.photo != null" style="height: 300px;object-fit: cover;" :src="treatment_unit.photo" class="card-img-top" alt="...">
                      <div class="card-body">
                        <div class="d-flex mb-2 justify-content-between align-items-center">
                          <h5 class="card-title mb-0 ">{{ treatment_unit.name }}</h5>
                          <span class="badge rounded-pill bg-primary small">{{ treatment_unit.body_part }}</span>
                        </div>
                        <h6 class="card-subtitle mb-2">{{treatment_unit.selling_price}} MMK </h6>
                        <div class="accordion mb-2" id="accordionExample">
                          <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="headingOne">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#medicine'+treatment_unit.id" aria-expanded="false" :aria-controls="'medicine'+treatment_unit.id">
                                Procedure Medicine Detail
                              </button>
                            </h2>
                            <div :id="'medicine'+treatment_unit.id" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              <div class="accordion-body">
                                <table class="table table-borderless">
                                  <tbody>
                                  <tr class="text-center" v-for="medicines in treatment_unit.medicines">
                                    <td>{{ medicines.medicine_name }}</td>
                                    <td>{{medicines.medicine_qty}} (Qty)</td>
<!--                                    <td>{{medicines.medicine_selling_price}}</td>-->
<!--                                    <td>{{medicines.medicine_total_price}}</td>-->
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="headingThree">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#machine'+treatment_unit.id" aria-expanded="false" :aria-controls="'machine'+treatment_unit.id">
                                Machine Item Detail
                              </button>
                            </h2>
                            <div :id="'machine'+treatment_unit.id" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                              <div class="accordion-body">
                                <table class="table table-borderless">
                                  <tbody>
                                  <tr class="text-center" v-for="machines in treatment_unit.machines">
                                    <td>{{machines.machine_name}}</td>
                                    <td>{{machines.machine_qty}} (Qty)</td>
<!--                                    <td>{{machines.machine_selling_price}}</td>-->
<!--                                    <td>{{machines.machine_total_price}}</td>-->
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p class="card-text">{{
                            treatment_unit.description
                          }}</p>
                        <div class="form-check form-switch">
                          <input class="form-check-input" :checked="treatment_unit.status?'available':'non-available'" type="checkbox" id="flexSwitchCheckDefault">
                          <label class="form-check-label" for="flexSwitchCheckDefault">Available</label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
            <div class="tab-pane fade active" id="table" role="tabpanel" aria-labelledby="profit-tab">
              <div class="card border-0 shadow-sm p-3 rounded mb-3">
                <div class="d-flex justify-content-end">
                  <Search @search="searchTreatmentUnit"></Search>
                </div>
                <table class="table table-sm table-striped table-borderless table-hover">
                  <thead>
                  <tr>
                    <th class="text-center text-secondary fw-normal">#</th>
                    <th class="text-center text-secondary fw-normal">Code</th>
                    <th class="text-center text-secondary fw-normal">Name</th>
                    <th class="text-center text-secondary fw-normal">Est. Cost</th>
                    <th class="text-center text-secondary fw-normal">Unit Type</th>
                    <th class="text-center text-secondary fw-normal">Selling Price</th>
                    <th class="text-center text-secondary fw-normal">Kit</th>
                    <th class="text-center text-secondary fw-normal">Body Part</th>
                    <th class="text-center text-secondary fw-normal">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(treatment_unit,index) in treatment_units.data" :key="'treatment_unit'+treatment_unit.id">
                    <td class="text-center">{{treatment_unit.id}}</td>
                    <td class="text-start">{{treatment_unit.code}}</td>
                    <td class="text-start">{{treatment_unit.name}}</td>
                    <td class="text-center">{{treatment_unit.est_cost}}</td>
                    <td class="text-center">{{treatment_unit.unit_type}}</td>
                    <td class="text-center">{{treatment_unit.selling_price}}</td>
                    <td class="text-center">{{treatment_unit.kit}}</td>
                    <td class="text-center">{{treatment_unit.body_part}}</td>
                    <td class="d-flex gap-3 justify-content-center">
                      <button @click="editTreatmentUnit(treatment_unit.id)" class="btn btn-warning btn-sm">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button @click="deleteTreatmentUnit(treatment_unit.id)" class="btn btn-danger btn-sm">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div class="d-flex justify-content-between">
                  <Pagination @getData="getTreatmentUnit" v-if="treatment_units.meta" :links="treatment_units.meta.links"></Pagination>
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
import Tab from "@/components/layout/Tab";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import {mapGetters} from "vuex";
export default {
  name: "TreatmentUnitList",
  components: {Search, Pagination, Tab, SideNav},
  computed: {
    ...mapGetters([
        'getUrl'
    ]),
  },
  data() {
    return {
      treatment_units: {},
    }
  },
  methods: {
    editTreatmentUnit:function(id){
      router.push({path: '/editTreatmentUnit/'+id,query: {id: id}})
    },
    getTreatmentUnit:function(url){
      axios.get(url)
          .then(response => response.data)
          .then(data=>{
            this.treatment_units = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    searchTreatmentUnit:function (v){
      this.getTreatmentUnit(this.getUrl('treatment_unit?keyword='+v))
    },
    dis_close(){
      $('#dis_mod').hide();
    },
    searchItem:function (){
      let formData = new FormData(this.$refs.search)
      axios.post(this.$store.state.url+'treatment-unit-search',formData)
          .then(res=>res.data.data)
          .then(data=>{
            this.treatment_units = data
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteTreatmentUnit(id){
      Swal.fire({
        text: 'Please Confirm to Delete this Treatment!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgba(22,197,57,0.75)',
        cancelButtonColor: '#da1a1a',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {

          axios.delete(this.$store.state.url+'treatment_unit/'+id)
              .then(response => response.data.data)
              .then(data=> {
                Swal.fire(
                    'Deleted!',
                    '',
                    'success',
                )
                this.getTreatmentUnit(this.getUrl('treatment_unit'))
              })
              .catch(function (error) {
                console.log(error);
              });

        }
      })
    }
  },
  mounted() {
    this.getTreatmentUnit(this.getUrl('treatment_unit'))

  }
}
</script>

<style scoped>

</style>