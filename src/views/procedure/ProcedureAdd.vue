<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <h6 class="fw-normal text-secondary mb-3">Add Procedure</h6>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card rounded shadow-sm border-0 p-3">
        <form class="d-inline" @submit.prevent="" ref="procedure" enctype="multipart/form-data">
<!--          id-->
          <input type="hidden" name="customer_id" :value="$route.query.id">

          <div class="bg-light p-3 mb-3 rounded">

            <div class="row mb-2">
              <div class="col-12">
                <h6 class="text-secondary">History</h6>
                <div class="col-6">
                  <div class="row mb-2">
                    <div class="col-6">
                      <label class="">Skin Care & Cosmetic</label>
                      <div class="d-flex gap-3">
                        <select name="" id="skin_care" class="form-select js-example-basic-single">
                          <option :value="skin_care.id" v-for="skin_care in skin_cares">
                            {{skin_care.name}}
                          </option>
                        </select>
                        <button @click="skinCareAdd" class="btn btn-primary btn-sm">
                          <i class="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-12">
                      <div v-for="skin_care in skin_care_array" class="d-flex align-items-center gap-3 mb-1">
                        <table class="table table-sm table-borderless">
                          <tbody>
                          <tr>
                            <td>
                              <input name="skin_care_id[]" type="hidden" :value="skin_care.id">
                              <input readonly type="text" class="border-0 form-control form-control-sm" :value="skin_care.name">
                            </td>
                            <td>
                              <textarea name="skin_care_description[]" class="form-control form-control-sm" rows="1"></textarea>
                            </td>
                            <td>
                              <i @click="removeSkinCare(skin_care.id)" class="fa-solid fa-minus"></i>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>


            <div class="row">
              <div class="col-6">
                <div class="mb-2 history-box">
                  <div class="d-flex mb-1 gap-3 align-items-center">
                    <label class="">Drug History
                    </label>

                  </div>

                  <div class="">
                    <input id="drug" type="file" class="d-none">
                    <textarea name="drug_his" class="form-control form-control-sm" rows="2"></textarea>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-2 history-box">
                  <div class="d-flex mb-1 gap-3 align-items-center">
                    <label class="">Medical History
                    </label>

                  </div>

                  <div class="">
                    <input id="drug" type="file" class="d-none">
                    <textarea name="medical_his" class="form-control form-control-sm" rows="2"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="mb-2 history-box">
                  <div class="d-flex mb-1 gap-3 align-items-center">
                    <label class=" ">History of Allergy
                    </label>

                  </div>

                  <div class="">
                    <input id="drug" type="file" class="d-none">
                    <textarea name="allergy_his" class="form-control form-control-sm" rows="2"></textarea>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-2 history-box">
                  <div class="d-flex mb-1 gap-3 align-items-center">
                    <label class="">History of Treatment
                    </label>

                  </div>

                  <div class="">
                    <input id="drug" type="file" class="d-none">
                    <textarea name="treatment_his" class="form-control form-control-sm" rows="2"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="mb-3">
                <label class="form-label ">Complaint Box</label>
                <textarea name="complain" class="form-control form-control-sm" rows="2"></textarea>
              </div>
            </div>
          </div>
          <div class="bg-light rounded p-3 mb-3">


            <h6 class="text-secondary">Physical Examination</h6>
            <div class="row">
              <div class="col-6">
                <div class="row mb-2">
                  <div class="col-6">
                    <label class="">Skin Type</label>
                    <div class="d-flex gap-3">
                      <select name="" id="skin_type" class="form-select js-example-basic-single">
                        <option :value="skin_type.id" v-for="skin_type in skin_types">
                          {{skin_type.name}}
                        </option>
                      </select>
                      <button @click="skinTypeAdd" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-12">
                      <div v-for="skin_type in skin_type_array" class="d-flex align-items-center gap-3 mb-1">
                        <table class="table table-sm table-borderless">
                          <tbody>
                          <tr>
                            <td>
                              <input name="skin_type_id[]" type="hidden" :value="skin_type.id">
                              <input readonly  type="text" class="border-0 form-control form-control-sm" :value="skin_type.name">
                            </td>
                            <td>
                              <textarea name="skin_type_description[]" class="form-control form-control-sm" rows="1"></textarea>
                            </td>
                            <td>
                              <i @click="removeSkinType(skin_type.id)" class="fa-solid fa-minus"></i>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="col-6">
                <div class="row mb-2">
                  <div class="col-6">
                    <label class="">Acne</label>
                    <div class="d-flex gap-3">
                      <select name="" id="acne" class="form-select js-example-basic-single">
                        <option :value="acne.id" v-for="acne in acnes">
                          {{acne.name}}
                        </option>
                      </select>
                      <button @click="acneAdd" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-12">
                      <div v-for="acne in acne_array" class="d-flex align-items-center gap-3 mb-1">
                        <table class="table table-sm table-borderless">
                          <tbody>
                          <tr>
                            <td>
                              <input name="acne_id[]" type="hidden" :value="acne.id">
                              <input readonly type="text" class="border-0 form-control form-control-sm" :value="acne.name">
                            </td>
                            <td>
                              <textarea name="acne_description[]" class="form-control form-control-sm" rows="1"></textarea>
                            </td>
                            <td>
                              <i @click="removeAcne(acne.id)" class="fa-solid fa-minus"></i>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="row mb-2">
                  <div class="col-6">
                    <label class="">Melsma & Black Spot</label>
                    <div class="d-flex gap-3">
                      <select name="" id="black_spot" class="form-select js-example-basic-single">
                        <option :value="black_spot.id" v-for="black_spot in black_spots">
                          {{black_spot.name}}
                        </option>
                      </select>
                      <button @click="blackSpotAdd" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                </div>
                <div class="row mb-2">
                  <div class="col-12">
                    <div v-for="black_spot in black_spot_array" class="d-flex align-items-center gap-3 mb-1">
                      <table class="table table-sm table-borderless">
                        <tbody>
                        <tr>
                          <td>
                            <input  name="black_spot_id[]" type="hidden" :value="black_spot.id">
                            <input readonly type="text" class="border-0 form-control form-control-sm" :value="black_spot.name">
                          </td>
                          <td>
                            <textarea name="black_spot_description[]" class="form-control form-control-sm" rows="1"></textarea>
                          </td>
                          <td>
                            <i @click="removeBlackSpot(black_spot.id)" class="fa-solid fa-minus"></i>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
              <div class="col-6">
                <div class="row mb-2">
                  <div class="col-6">
                    <label class="">Meso Fat
                    </label>
                    <div class="d-flex gap-3">
                      <select name="" id="meso_fat" class="form-select js-example-basic-single">
                        <option :value="meso_fat.id" v-for="meso_fat in meso_fats">
                          {{meso_fat.name}}
                        </option>
                      </select>
                      <button @click="mesoFatAdd" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                </div>
                <div class="row mb-2">
                  <div class="col-12">
                    <div v-for="meso_fat in meso_fat_array" class="d-flex align-items-center gap-3 mb-1">
                      <table class="table table-sm table-borderless">
                        <tbody>
                        <tr>
                          <td>
                            <input name="mesofat_id[]" type="hidden" :value="meso_fat.id">
                            <input readonly type="text" class="border-0 form-control form-control-sm" :value="meso_fat.name">
                          </td>
                          <td>
                            <textarea name="meso_fat_description[]" class="form-control form-control-sm" rows="1"></textarea>
                          </td>
                          <td>
                            <i @click="removeMesoFat(meso_fat.id)" class="fa-solid fa-minus"></i>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="row mb-2">
                  <div class="col-6">
                    <label class="">Facial Design</label>
                    <div class="d-flex gap-3">
                      <select name="" id="facial_design" class="form-select js-example-basic-single">
                        <option :value="facial_design.id" v-for="facial_design in facial_designs">
                          {{facial_design.name}}
                        </option>
                      </select>
                      <button @click="facialDesignAdd" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                </div>
                <div class="row mb-2">
                  <div class="col-12">
                    <div v-for="facial_design in facial_design_array" class="d-flex align-items-center gap-3 mb-1">
                      <table class="table table-sm table-borderless">
                        <tbody>
                        <tr>
                          <td>
                            <input name="facial_design_id[]" type="hidden" :value="facial_design.id">
                            <input readonly type="text" class="border-0 form-control form-control-sm" :value="facial_design.name">
                          </td>
                          <td>
                            <textarea name="facial_design_description[]" class="form-control form-control-sm" rows="1"></textarea>
                          </td>
                          <td>
                            <i @click="removeFacialDesign(facial_design.id)" class="fa-solid fa-minus"></i>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row mb-2">
                  <div class="col-8">
                    <label class="">Other Physical Examination</label>
                    <div class="d-flex gap-3">
                      <textarea name="other_physical_exam" class="form-control form-control-sm" id="" rows="2"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class=" bg-light p-3 rounded mb-3">
                <div class="row mb-2">
                  <div class="col-4">
                    <label class="form-label text-secondary">Consultation Charges</label>
                    <input type="number" placeholder="0" class="form-control form-control-sm" name="consultation">
                  </div>
                  <div class="col-4">
                    <label class="form-label text-secondary">Service Charges</label>
                    <input type="number" placeholder="0" class="form-control form-control-sm" name="service">
                  </div>
                  <div class="col-4">
                    <label class="form-label text-secondary">Next Appointment Date</label>
                    <input name="follow_up_date" type="date" class="form-control form-control-sm">
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-6">
                    <label class="form-label text-secondary">Diagnosis</label>
                    <textarea placeholder="Enter Treatment Diagnosis" name="diagnosis" rows="2" class="form-control form-control-sm"></textarea>
                  </div>
                  <div class="col-6">
                    <label class="form-label text-secondary">Remark (For FrontDesk)</label>
                    <textarea name="prescription" rows="2" class="form-control form-control-sm"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div style="background-color: #F9F9FA;" class="mb-3 rounded p-3">
                <h6 class="text-secondary">Treatment</h6>
                <div class="mb-2">
                  <div class="row">
                    <div class="col-2">
                      <button @click="" class="btn btn-sm mb-2 btn-primary">Oral</button>
                    </div>
                    <div class="col-6">
                      <div class="d-flex gap-2 align-items-center">
                        <select class="form-select w-50 oral">
                          <option v-for="item in oral_medicine" :value="item.id">{{item.name}}</option>
                        </select>
                        <button @click="addOralMedicine" class="btn btn-primary btn-sm">
                          <i class="fa-solid fa-circle-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <div class="row">
                    <div class="col-2">
                      <button @click="" class="btn btn-sm mb-2 btn-primary">Topical</button>
                    </div>
                    <div class="col-6">
                      <div class="d-flex gap-2 align-items-center">
                        <select class="form-select w-50 topical">
                          <option v-for="topi in topical_medicine" :value="topi.id">{{topi.name}}</option>
                        </select>
                        <button @click="addTopicalMedicine" class="btn btn-primary btn-sm">
                          <i class="fa-solid fa-circle-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

<!--                This is skincare!-->
                <div class="mb-2">
                  <div class="row">
                    <div class="col-2">
                      <button @click="" class="btn btn-sm mb-2 btn-primary">Skin Care</button>
                    </div>
                    <div class="col-6">
                      <div class="d-flex gap-2 align-items-center">
                        <select class="form-select w-50 skin_care_medicine">
                          <option v-for="skin_care in skin_care_medicine" :value="skin_care.id">{{skin_care.name}}</option>
                        </select>
                        <button @click="addSkinCareMedicine" class="btn btn-primary btn-sm">
                          <i class="fa-solid fa-circle-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
<!--                ====================-->


                <div class="mb-2">
                  <div class="row">
                    <div class="col-2">
                      <button @click="" class="btn btn-sm mb-2 btn-primary">Procedure</button>
                    </div>
                    <div class="col-6">
                      <div class="d-flex gap-2 align-items-center">
                        <select class="form-select w-50 procedure">
                          <option v-for="treatment in treatments" :value="treatment.id">{{treatment.name}}</option>
                        </select>
                        <button @click="addTreatment" class="btn btn-primary btn-sm">
                          <i class="fa-solid fa-circle-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div v-if="item_array.length > 0 || treatment_array.length > 0" class=" bg-light rounded p-3">
                <table v-if="item_array.length > 0" class="table table-sm table-bordered">
                  <thead>
                  <tr>
                    <th class="fw-normal text-center text-secondary">Name</th>
                    <th class="fw-normal text-center text-secondary">Qty/Dose</th>
                    <th class="fw-normal text-center text-secondary">Duration/Days</th>
                    <th class="fw-normal text-center text-secondary">Dose</th>
                    <th class="fw-normal text-center text-secondary">Total Qty</th>
                    <th class="fw-normal text-center text-secondary">Sub Total</th>
                    <th class="fw-normal text-center text-secondary">SIG</th>
                    <th class="fw-normal text-center text-secondary"></th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr  v-for="item in item_array">
                    <td style="width: 300px;" class="text-center">
                      <textarea readonly class="form-control form-control-sm border-0" :value="item.name" rows="1"></textarea>
                      <input type="hidden" :value="item.item_id">
                    </td>
                    <td style="width: 70px;" class="text-center">
                      <input min="1" @change="calcQty(item.id)" type="number" :id="'qty'+item.id" class="form-control form-control-sm border-0" :value="item.qty">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input min="1" @change="calcQty(item.id)" type="number" :id="'duration'+item.id" class="form-control form-control-sm border-0" :value="item.day">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <select :id="'dose'+item.id" @change="addDose(item.id)" class="form-select form-select-sm dose border-0">
                        <option value="">Dose</option>
                        <option value="OD">OD</option>
                        <option value="BD">BD</option>
                        <option value="TDS">TDS</option>
                        <option value="QID">QID</option>
                        <option value="CM">CM</option>
                        <option value="H.S">H.S</option>
                        <option value="PRN">Prn</option>
                        <option value="FT">FT</option>
                      </select>
<!--                      <input name="total_price[]" type="number" :id="'sub_total'+item.id" class="form-control form-control-sm border-0" :value="item.sub_total">-->
                    </td>
                    <td style="width: 70px;" class="text-center">
                      <input readonly :id="'total_qty'+item.id" type="number" class="form-control form-control-sm border-0" :value="item.total_qty">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input type="hidden" readonly :value="item.selling_price">
                      <input readonly :id="'sub_total'+item.id" type="number" class="form-control form-control-sm border-0" :value="item.sub_total">
                    </td>
                    <td class="text-center">
                      <div v-if="item.type == 'oral'">
                        <select :id="'sig'+item.id" @change="addSig(item.id)" class="form-select form-select-sm sig border-0">
                          <option>Choose SIG</option>
                          <option value="With Meal">With Meal</option>
                          <option value="Without Meal">Without Meal</option>
                          <option value="After Lunch">After Lunch</option>
                          <option value="After Dinner">After Dinner</option>
                          <option value="30 mins After Meal">30 mins After Meal</option>
                        </select>
                        <input type="hidden" name="sig_time[]">
                      </div>

                      <div v-if="item.type == 'topical' || item.type == 'skin-care'" class="d-flex gap-2">
                        <select :id="'sig'+item.id" @change="addSig(item.id)" class="form-select form-select-sm sig border-0">
                          <option>Choose SIG</option>
                          <option value="Apply on affected area.">Apply on affected area.</option>
                          <option value="Apply on the lesions.">Apply on the lesions.</option>
                          <option value="Apply on the whole face.">Apply on the whole face.</option>
                          <option value="Apply on the dark spots.">Apply on the dark spots.</option>
                        </select>
                        <select :id="'extra-sig'+item.id" @change="addExtraSig(item.id)" class="form-select form-select-sm border-0">
                          <option>Choose Time</option>
                          <option value="Morning">Morning</option>
                          <option value="Afternoon">Afternoon</option>
                          <option value="Night">Night</option>
                          <option value="Morning & Night">Morning & Night</option>
                          <option value="Morning & Afternoon">Morning & Afternoon</option>
                          <option value="AfterNoon & Night">AfterNoon & Night</option>
                        </select>
                      </div>

                    </td>
                    <td style="width: 40px;" class="text-center">
                      <i @click="deleteItem(item.id)" class="fa-solid fa-circle-minus text-danger"></i>
                    </td>
                  </tr>

                  </tbody>
                </table>

<!--                ================================-->
                <table v-if="treatment_array.length > 0" class="table table-sm table-bordered">
                  <thead>
                  <tr>
                    <th class="fw-normal text-center text-secondary">Name</th>
                    <th class="fw-normal text-center text-secondary">Qty</th>
                    <th class="fw-normal text-center text-secondary">Price</th>
                    <th class="fw-normal text-center text-secondary">Total Price</th>
                    <th class="fw-normal text-center text-secondary">Days</th>
                    <th class="fw-normal text-center text-secondary">SIG</th>
                    <th class="fw-normal text-center text-secondary"></th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr v-for="treatment in treatment_array">
                    <td style="width: 300px;" class="text-center">
                      <input type="text" class="form-control form-control-sm border-0" :value="treatment.name">
                      <input type="hidden" :value="treatment.treatment_id">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input @change="calcTreatmentTotalPrice(treatment.id)" type="number" :id="'treatment_qty'+treatment.id" class="form-control form-control-sm border-0" :value="treatment.qty">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input  type="number" :id="'treatment_selling_price'+treatment.id" class="form-control form-control-sm border-0" :value="treatment.selling_price">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input type="number" :id="'treatment_sub_total'+treatment.id" class="form-control form-control-sm border-0" :value="treatment.sub_total">
                    </td>

                    <td class="text-center">
                      <textarea :id="'treatment_sig'+treatment.id" @keyup="addTreatmentSig(treatment.id)" class="form-control border-0 form-control-sm" rows="1"></textarea>
                    </td>
                    <td style="width: 40px;" class="text-center">
                      <i @click="removeTreatment(treatment.id)" class="fa-solid fa-circle-minus text-danger"></i>
                    </td>
                  </tr>
                  </tbody>
                </table>
<!--                =================================-->
              </div>

              <div class="row">
                <div class="col-4">
                  <div class="photo">
                    <input  type="file" accept="image/*" id="imgInp">
                    <img id="imgOut" ref="imgRef" src=""  @click="showMarkerArea()" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="d-flex justify-content-center">
                <button @click="storeProcedure" class="btn btn-primary">Save Procedure</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import axios from "axios";
import Swal from "sweetalert2";
import 'select2/dist/css/select2.min.css'
import 'select2/dist/js/select2.min'
import * as markerjs2 from "markerjs2";
import router from "@/router";

export default {
  name: "ProcedureAdd",
  components: {SideNav},
  data() {
    return {
      oral_medicine : {},
      topical_medicine : {},
      skin_care_medicine : {},
      isoral : false,
      istopical: false,
      isprocedure: false,
      skin_cares : null,
      skin_care_box : false,
      acne_box : false,
      spot_box : false,
      facial_box : false,
      physical_exams : null,
      medicines: null,
      medicine_id: '',
      medicine_array : [],
      treatments: null,
      treatment_array: [],
      item_array: [],
      drug_history : false,
      skin_types : null,
      acnes : null,
      black_spots : null,
      meso_fats : null,
      facial_designs: null,
      skin_care_array : [],
      select_skin : [],
      skin_type_array: [],
      acne_array : [],
      black_spot_array: [],
      meso_fat_array: [],
      facial_design_array: [],
      image: null,
    }
  },
  methods: {
    skinTypeAdd:function(){
      let id = $('#skin_type').val();
      let skin_type = this.skin_types.find(el=>el.id == id)
      this.skin_type_array.push(skin_type)
    },
    removeSkinType:function (id){
      this.skin_type_array = this.skin_type_array.filter(el=>el.id != id)
    },
    acneAdd:function(){
      let id = $('#acne').val();
      let acne = this.acnes.find(el=>el.id == id)
      this.acne_array.push(acne)
      // console.log(this.acne_array)
    },
    removeAcne:function (id){
      this.acne_array = this.acne_array.filter(el=>el.id != id)
    },
    blackSpotAdd:function(){
      let id = $('#black_spot').val();
      let black_spot = this.black_spots.find(el=>el.id == id)
      this.black_spot_array.push(black_spot)
      // console.log(this.acne_array)
    },
    removeBlackSpot:function (id){
      this.black_spot_array = this.black_spot_array.filter(el=>el.id != id)
    },
    mesoFatAdd:function(){
      let id = $('#meso_fat').val();
      let meso_fat = this.meso_fats.find(el=>el.id == id)
      this.meso_fat_array.push(meso_fat)
      // console.log(this.acne_array)
    },
    removeMesoFat:function (id){
      this.meso_fat_array = this.meso_fat_array.filter(el=>el.id != id)
    },
    facialDesignAdd:function(){
      let id = $('#facial_design').val();
      let facial_design = this.facial_designs.find(el=>el.id == id)
      this.facial_design_array.push(facial_design)
      // console.log(this.acne_array)
    },
    removeFacialDesign:function (id){
      this.facial_design_array = this.facial_design_array.filter(el=>el.id != id)
    },
    skinCareAdd:function(){
      let id = $('#skin_care').val();
      let skin_care = this.skin_cares.find(el=>el.id == id)
      this.skin_care_array.push(skin_care)
      // console.log(this.acne_array)
    },
    removeSkinCare:function (id){
      this.skin_care_array = this.skin_care_array.filter(el=>el.id != id)
    },
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
    // Store Procedure
    storeProcedure : function (){
      // document.getElementById('imgOut').src = this.$refs.imgRef.src;

      let formData = new FormData(this.$refs.procedure);
      let medicine_json = JSON.stringify(this.item_array)
      let treatment_json = JSON.stringify(this.treatment_array)
      formData.append('photo',this.$refs.imgRef.src);
      formData.append('medicines',medicine_json);
      formData.append('treatments',treatment_json);
      axios.post(this.$store.state.url+'procedure',formData)
          .then( res => res.data.data)
          .then(data =>{
                this.alertSuccess()
                router.push({path: '/patientDetail/'+this.$route.query.id,query: {id: this.$route.query.id}})
              }
          )
          .catch(function (error) {
            console.log(error)
            Swal.fire(
                'Please Try Again!',
                '',
                'error'
            )
          });
    },
    //
    showBox(id){
    if($('.chk').is(':checked')){
      alert('Check')
      let skin_care = this.skin_cares.find(el=>el.id == id);
      let skin_care_obj= {
        id: skin_care.id,
        name: skin_care.name,
      }
      this.skin_care_array.push(skin_care_obj)
      // console.log(this.skin_care_array)
    }else{
      alert('Not Check')
      alert(id)
      this.skin_care_array = this.skin_care_array.filter(el=>el.id != id)
    }
    },
    calcSellingPrice(){
      let unit_qty = $('#unit_qty').val();
      let origin_price = $('#origin_price').val();
      let selling_price = $('#selling_price');
      let result = unit_qty * origin_price;
      selling_price.val(result);
    },
    addOralMedicine(){
      let id = 0;
      let length = this.item_array.length
      if (length <= 0){
         id = 1;
      }else if (length > 0){
        id = length + 1
      }
      let item_id = $('.oral').val()
      let medicine = this.medicines.find(el=>el.id == item_id)
      let name = medicine.name
      let quantity = 1
      let selling_price = medicine.selling_price
      let day = 1
      let medicine_obj = {
        type: 'oral',
        id: id,
        item_id: item_id,
        name: name,
        qty: quantity,
        selling_price : selling_price,
        sub_total: quantity * selling_price,
        total_qty: quantity * day,
        day: day,
        dose: '',
        sig: '',
        extra_sig: '',
      };
      //Check id (id တူရင် data မထည့်)
      if (this.item_array.length == 0){
        this.item_array.push(medicine_obj)
      }else if (this.item_array.length > 0){
        let has_id = [];
        this.item_array.map(el=>{
          has_id.push(el.item_id)
        })
        // **********
        if (has_id.includes(item_id) == true){
          let item = this.item_array.find(el=>el.item_id == item_id)
          item.qty += 1;
          item.total_qty = item.qty * item.day
          item.sub_total = item.total_qty * item.selling_price
        }else{
          this.item_array.push(medicine_obj)
        }
      }

    },
    addTopicalMedicine(){
      let id = 0;
      let length = this.item_array.length
      if (length <= 0){
         id = 1;
      }else if (length > 0){
        id = length + 1
      }
      let item_id = $('.topical').val()
      let medicine = this.medicines.find(el=>el.id == item_id)
      let name = medicine.name
      let quantity = 1
      let selling_price = medicine.selling_price
      let day = 1
      let medicine_obj = {
        type: 'topical',
        id: id,
        item_id: item_id,
        name: name,
        qty: quantity,
        selling_price : selling_price,
        sub_total: quantity * selling_price,
        total_qty: quantity * day,
        day: day,
        dose: '',
        sig: '',
        extra_sig: '',
      };
      //Check id (id တူရင် data မထည့်)
      if (this.item_array.length == 0){
        this.item_array.push(medicine_obj)
      }else if (this.item_array.length > 0){
        let has_id = [];
        this.item_array.map(el=>{
          has_id.push(el.item_id)
        })
        // **********
        if (has_id.includes(item_id) == true){
          let item = this.item_array.find(el=>el.item_id == item_id)
          item.qty += 1;
          item.total_qty = item.qty * item.day
          item.sub_total = item.total_qty * item.selling_price
        }else{
          this.item_array.push(medicine_obj)
        }
        // console.log(this.item_array)
      }
    },
    addSkinCareMedicine(){
      let id = 0;
      let length = this.item_array.length
      if (length <= 0){
         id = 1;
      }else if (length > 0){
        id = length + 1
      }
      let item_id = $('.skin_care_medicine').val()
      let medicine = this.medicines.find(el=>el.id == item_id)
      let name = medicine.name
      let quantity = 1
      let selling_price = medicine.selling_price
      let day = 1
      let medicine_obj = {
        type: 'skin-care',
        id: id,
        item_id: item_id,
        name: name,
        qty: quantity,
        selling_price : selling_price,
        sub_total: quantity * selling_price,
        total_qty: quantity * day,
        day: day,
        dose: '',
        sig: '',
        extra_sig: '',
      };
      //Check id (id တူရင် data မထည့်)
      if (this.item_array.length == 0){
        this.item_array.push(medicine_obj)
      }else if (this.item_array.length > 0){
        let has_id = [];
        this.item_array.map(el=>{
          has_id.push(el.item_id)
        })
        // **********
        if (has_id.includes(item_id) == true){
          let item = this.item_array.find(el=>el.item_id == item_id)
          item.qty += 1;
          item.total_qty = item.qty * item.day
          item.sub_total = item.total_qty * item.selling_price
        }else{
          this.item_array.push(medicine_obj)
        }
      }
      // console.log(this.item_array)

    },
    addTreatment(){
      let id = 0;
      let length = this.treatment_array.length
      if (length <= 0){
        id = 1;
      }else if (length > 0){
        id = length + 1
      }
      let treatment_id = $('.procedure').val()
      let procedure = this.treatments.find(el=>el.id == treatment_id)
      let name = procedure.name
      let quantity = 1
      let day = 1
      let selling_price = procedure.selling_price

      let procedure_obj = {
        id: id,
        treatment_id: treatment_id,
        name: name,
        qty: quantity,
        selling_price : selling_price,
        sub_total: quantity * selling_price,
        sig: ''
      };

      //Check id (id တူရင် data မထည့်)
      if (this.treatment_array.length == 0){
        this.treatment_array.push(procedure_obj)
      }else if (this.treatment_array.length > 0){
        let has_id = [];
        this.treatment_array.map(el=>{
          has_id.push(el.treatment_id)
        })
        // **********
        if (has_id.includes(treatment_id) == true){
          let item = this.treatment_array.find(el=>el.treatment_id == treatment_id)
          item.qty += 1;
          item.sub_total = item.qty * item.selling_price
        }else{
          this.treatment_array.push(procedure_obj)
        }
      }

      // console.log(this.treatment_array)
    },
    calcTotalPrice: function (id){
      let qty = Number($('#qty'+id).val());
      let selling_price = Number($('#selling_price'+id).val());
      let item = this.item_array.find(el=>el.id == id)
      let total_price = qty * selling_price;
      item.quantity = qty;
      item.sub_total = total_price;
      // console.log(item.quantity)
      $('#sub_total'+id).val(total_price);
    },
    calcTreatmentTotalPrice: function (id){
      let qty = Number($('#treatment_qty'+id).val());
      let selling_price = Number($('#treatment_selling_price'+id).val());
      let treatment = this.treatment_array.find(el=>el.id == id)
      let total_price = qty * selling_price;
      treatment.quantity = qty;
      treatment.sub_total = total_price;
      $('#treatment_sub_total'+id).val(total_price);
    },
    calcDay: function (id){
      let day = Number($('#day'+id).val());
      let item = this.item_array.find(el=>el.id == id)
      item.day = day;
    },
    // calcTreatmentDay: function (id){
    //   let day = Number($('#treatment_day'+id).val());
    //   let treatment = this.treatment_array.find(el=>el.id == id)
    //   treatment.day = day;
    // },
    addTreatmentSig: function (id){
      let sig = $('#treatment_sig'+id).val();
      let treatment = this.treatment_array.find(el=>el.id == id)
      treatment.sig = sig
      // console.log(this.treatment_array)

    },
    removeTreatment: function (id){
      this.treatment_array = this.treatment_array.filter(el=>el.id != id)
    },
    drug_doc : function (){
      $('#drug').click();
    },
    deleteItem: function (id){
      this.item_array = this.item_array.filter(el=>el.id != id)
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
    calcQty:function (id){
      let item = this.item_array.find(el=>el.id == id);
      let qty = Number($('#qty'+id).val());
      let duration = Number($('#duration'+id).val());
      let total_qty = qty * duration
      let sub_total = total_qty * item.selling_price
      item.qty = qty
      item.day = duration
      item.total_qty = total_qty
      item.sub_total = sub_total
      $('#total_qty'+id).val(total_qty)
      $('#sub_total'+id).val(sub_total)
    },
    addDose: function (id){
      let item = this.item_array.find(el=>el.id == id);
      item.dose = $('#dose' + id).val()
      // console.log(this.item_array)
    },
    addSig: function (id){
      let item = this.item_array.find(el=>el.id == id);
      item.sig = $('#sig' + id).val()
      // console.log(this.item_array)
    },
    addExtraSig: function (id){
      let item = this.item_array.find(el=>el.id == id);
      item.extra_sig = $('#extra-sig' + id).val()
      // console.log(this.item_array)
    },

  },
  created() {
    $(document).ready(function() {
      $('.js-example-basic-single').select2();

    });
  },
  mounted() {
    // Canvas Function
    const fileIn = document.getElementById('imgInp'),
        fileOut = document.getElementById('imgOut');

    const readUrl = event => {
      if(event.files && event.files[0]) {
        let reader = new FileReader();
        reader.onload = event => fileOut.src = event.target.result;
        reader.readAsDataURL(event.files[0])
        // fileOut.removeAttribute('hidden');
      }
    }

    fileIn.onchange = function() {
      readUrl(this);
    };
    // ==================
    $('.oral').select2();
    $('.topical').select2();
    $('.skin_care_medicine').select2();
    $('.procedure').select2();
    $('.sig').select2();
    axios.get(this.$store.state.url+'item_unit')
        .then( res => res.data.data)
        .then(data =>{
          this.medicines = data
          this.oral_medicine = data.filter(el=>el.category_id == 4)
          this.topical_medicine = data.filter(el=>el.category_id == 6)
          this.skin_care_medicine = data.filter(el=>el.category_id == 9)
            }
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'treatment_unit')
        .then( res => res.data.data)
        .then(data =>{
              this.treatments = data
            }
        )
        .catch(function (error) {
          console.log(error);
        });

    axios.get(this.$store.state.url+'skin_care')
        .then( res => res.data.data)
        .then(data =>
            this.skin_cares = data
        )
        .catch(function (error) {
          console.log(error);
        });

    axios.get(this.$store.state.url+'skin_type')
        .then( res => res.data.data)
        .then(data =>
            this.skin_types = data
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'acne')
        .then( res => res.data.data)
        .then(data =>
            this.acnes = data
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'black_spot')
        .then( res => res.data.data)
        .then(data =>
            this.black_spots = data
        )
        .catch(function (error) {
          console.log(error);
        });
    axios.get(this.$store.state.url+'meso_fat')
            .then( res => res.data.data)
            .then(data =>
                this.meso_fats = data
            )
            .catch(function (error) {
              console.log(error);
            });
    axios.get(this.$store.state.url+'facial_design')
            .then( res => res.data.data)
            .then(data =>
                this.facial_designs = data
            )
            .catch(function (error) {
              console.log(error);
            });




  }
}
</script>

<style lang="scss" scoped>
.photo{
  margin: 10% auto;
  width: 450px;
  padding: 20px;
  border: solid 1px #333;
  position : relative;
  text-align: center;
  overflow: scroll;

}
img
{display: block;  margin: 40px auto; max-width:100%; max-height: 400px; top: 256px;
  left: 450px;
  width: 322px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>