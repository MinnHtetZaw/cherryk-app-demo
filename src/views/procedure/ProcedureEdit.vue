<template>
<SideNav>
  <div class="row">
    <div class="col-12">
      <div class="card p-3 shadow-sm border-0 rounded">
<!--        History-->
        <form @submit.prevent="" ref="updateProcedure">
          <div class="bg-light mb-2 p-3">
            <h5 class="text-secondary">History</h5>
            <div class="row mb-2">
              <div class="col-6">
                <label class="">Skin Care & Cosmetic</label>
                <div class="d-flex align-items-center gap-3">
                  <select name="" id="skin_care" class="form-select form-select-sm js-example-basic-single">
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
              <div class="col-6">
                <div v-for="skin_care in skin_care_array" class="d-flex align-items-center gap-3 mb-1">
                  <table class="table table-sm table-borderless">
                    <tbody>
                    <tr>
                      <td>
                        <input readonly type="text" class="border-0 form-control form-control-sm" :value="skin_care.name">
                      </td>
                      <td>
                        <textarea @keyup="addSkinCareDes(skin_care.skin_care_id,skin_care)" name="skin_care_description" :id="'skin_care_description'+skin_care.skin_care_id" class="form-control form-control-sm" rows="1" :value="skin_care.description"></textarea>
                      </td>
                      <td>
                        <i type="button" @click="removeSkinCare(skin_care.skin_care_id)" class="fa-solid fa-minus"></i>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row">
              <!--        Drug History-->
              <div class="col-6">
                <div class="mb-2 history-box">
                  <div class="d-flex mb-1 gap-3 align-items-center">
                    <label class="form-label">Drug History</label>
                  </div>
                  <div class="">
                    <textarea name="drug_his" class="form-control form-control-sm" rows="2" :value="procedure.drug_his"></textarea>
                  </div>
                </div>
              </div>
              <!--        Medical History-->
              <div class="col-6">
                <div class="mb-2 history-box">
                  <div class="d-flex mb-1 gap-3 align-items-center">
                    <label class="form-label">Medical History</label>
                  </div>
                  <div class="">
                    <textarea name="medical_his" class="form-control form-control-sm" rows="2" :value="procedure.medical_his"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <!--        Allergy History-->
              <div class="col-6">
                <div class="mb-2 history-box">
                  <div class="d-flex mb-1 gap-3 align-items-center">
                    <label class="form-label">History of Allergy</label>
                  </div>
                  <div class="">
                    <!--                <input id="drug" type="file" class="d-none">-->
                    <textarea name="allergy_his" class="form-control form-control-sm" rows="2" :value="procedure.allergy_his"></textarea>
                  </div>
                </div>
              </div>
              <!--        Treatment History-->
              <div class="col-6">
                <div class="mb-2 history-box">
                  <div class="d-flex mb-1 gap-3 align-items-center">
                    <label class="form-label">History of Treatment</label>
                  </div>
                  <div class="">
                    <!--                <input id="drug" type="file" class="d-none">-->
                    <textarea name="treatment_his" class="form-control form-control-sm" rows="2" :value="procedure.treatment_his"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="mb-3">
                <label class="form-label ">Complaint Box</label>
                <textarea name="complain" class="form-control form-control-sm" rows="2" :value="procedure.complain"></textarea>
              </div>
            </div>
          </div>

          <!--        Physical Exam-->
          <div class="bg-light p-3 mb-2">
            <h5 class="text-secondary">Physical Examination</h5>
            <div class="row">
              <div class="col-6">
                <div class="row mb-2">
                  <div class="col-6">
                    <label class="form-label">Skin Type</label>
                    <div class="d-flex gap-3">
                      <select name="" id="skin_type" class="form-select form-select-sm js-example-basic-single">
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
                              <input readonly  type="text" class="border-0 form-control form-control-sm" :value="skin_type.name">
                            </td>
                            <td>
                              <textarea :id="'skin_type_description'+skin_type.skin_type_id" @keyup="addSkinTypeDes(skin_type.skin_type_id,skin_type)" :value="skin_type.description" name="skin_type_description[]" class="form-control form-control-sm" rows="1"></textarea>
                            </td>
                            <td>
                              <i type="button" @click="removeSkinType(skin_type.skin_type_id)" class="fa-solid fa-minus"></i>
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
                    <label class="form-label">Acne</label>
                    <div class="d-flex gap-3">
                      <select name="" id="acne" class="form-select form-select-sm js-example-basic-single">
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
                              <input readonly type="text" class="border-0 form-control form-control-sm" :value="acne.name">
                            </td>
                            <td>
                              <textarea :id="'acne_description'+acne.acne_id" @keyup="addAcneDes(acne.acne_id,acne)" class="form-control form-control-sm" :value="acne.description" rows="1"></textarea>
                            </td>
                            <td>
                              <i type="button" @click="removeAcne(acne.acne_id)" class="fa-solid fa-minus"></i>
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
                    <label class="form-label">Melsma & Black Spot</label>
                    <div class="d-flex gap-3">
                      <select name="" id="black_spot" class="form-select form-select-sm js-example-basic-single">
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
                            <input readonly type="text" class="border-0 form-control form-control-sm" :value="black_spot.name">
                          </td>
                          <td>
                            <textarea :id="'black_spot_description'+black_spot.black_spot_id" @keyup="addBlackSpotDes(black_spot.black_spot_id,black_spot)" class="form-control form-control-sm" rows="1" :value="black_spot.description"></textarea>
                          </td>
                          <td>
                            <i type="button" @click="removeBlackSpot(black_spot.black_spot_id)" class="fa-solid fa-minus"></i>
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
                    <label class="form-label">Meso Fat
                    </label>
                    <div class="d-flex gap-3">
                      <select name="" id="meso_fat" class="form-select form-select-sm js-example-basic-single">
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
                            <input readonly type="text" class="border-0 form-control form-control-sm" :value="meso_fat.name">
                          </td>
                          <td>
                            <textarea :id="'meso_fat_description'+meso_fat.meso_fat_id" @keyup="addMesoFatDes(meso_fat.meso_fat_id,meso_fat)" class="form-control form-control-sm" :value="meso_fat.description" rows="1"></textarea>
                          </td>
                          <td>
                            <i type="button" @click="removeMesoFat(meso_fat.meso_fat_id)" class="fa-solid fa-minus"></i>
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
                    <label class="form-label">Facial Design</label>
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
                            <input readonly type="text" class="border-0 form-control form-control-sm" :value="facial_design.name">
                          </td>
                          <td>
                            <textarea :id="'facial_design_description'+facial_design.facial_design_id" @keyup="addFacialDesignDes(facial_design.facial_design_id,facial_design)" class="form-control form-control-sm" rows="1" :value="facial_design.description"></textarea>
                          </td>
                          <td>
                            <i type="button" @click="removeFacialDesign(facial_design.facial_design_id)" class="fa-solid fa-minus"></i>
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
                    <label class="form-label">Other Physical Examination</label>
                    <div class="d-flex gap-3">
                      <textarea name="other_physical_exam" class="form-control form-control-sm" id="" rows="3" :value="procedure.other_physical_exam"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class=" bg-light p-3 rounded mb-2">
                <div class="row mb-2">
                  <div class="col-4">
                    <label class="form-label text-secondary">Consultation Charges</label>
                    <input type="number" placeholder="0" class="form-control form-control-sm" name="consultation" :value="procedure.consultation_charges">
                  </div>
                  <div class="col-4">
                    <label class="form-label text-secondary">Service Charges</label>
                    <input type="number" placeholder="0" class="form-control form-control-sm" name="service" :value="procedure.service_charges">
                  </div>
                  <div class="col-4">
                    <label class="form-label text-secondary">Next Appointment Date</label>
                    <input name="follow_up_date" type="date" class="form-control form-control-sm" :value="procedure.follow_up_date">
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-6">
                    <label class="form-label text-secondary">Diagnosis</label>
                    <textarea placeholder="Enter Treatment Diagnosis" name="diagnosis" rows="2" class="form-control form-control-sm" :value="procedure.diagnosis"></textarea>
                  </div>
                  <div class="col-6">
                    <label class="form-label text-secondary">Remark (For FrontDesk)</label>
                    <textarea name="prescription" rows="2" class="form-control form-control-sm" :value="procedure.prescription"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Treatment-->
          <div class="row ">
            <div class="col-12 mb-2 bg-light p-3">
              <h5 class="text-secondary">Treatment</h5>
              <div class="mb-2">
                <div class="row">
                  <div class="col-2">
                    <button @click="" class="btn btn-sm mb-2 btn-primary">Oral</button>
                  </div>
                  <div class="col-6">
                    <div class="d-flex gap-2 align-items-center">
                      <select class="form-select form-select-sm w-50 oral">
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
                      <select class="form-select form-select-sm w-50 topical">
                        <option v-for="topi in topical_medicine" :value="topi.id">{{topi.name}}</option>
                      </select>
                      <button @click="addTopicalMedicine" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-circle-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <div class="row">
                  <div class="col-2">
                    <button @click="" class="btn btn-sm mb-2 btn-primary">Skin Care</button>
                  </div>
                  <div class="col-6">
                    <div class="d-flex gap-2 align-items-center">
                      <select class="form-select form-select-sm w-50 skin_care_medicine">
                        <option v-for="skin_care in skin_care_medicine" :value="skin_care.id">{{skin_care.name}}</option>
                      </select>
                      <button @click="addSkinCareMedicine" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-circle-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

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
                        <option :selected="item.dose == 'OD'" value="OD">OD</option>
                        <option :selected="item.dose == 'BD'" value="BD">BD</option>
                        <option :selected="item.dose == 'TDS'" value="TDS">TDS</option>
                        <option :selected="item.dose == 'QID'" value="QID">QID</option>
                        <option :selected="item.dose == 'CM'" value="CM">CM</option>
                        <option :selected="item.dose == 'H.S'" value="H.S">H.S</option>
                        <option :selected="item.dose == 'Prn'" value="Prn">Prn</option>
                        <option :selected="item.dose == 'FT'" value="FT">FT</option>
                      </select>
                      <!--                      <input name="total_price[]" type="number" :id="'total_price'+item.id" class="form-control form-control-sm border-0" :value="item.total_price">-->
                    </td>
                    <td style="width: 70px;" class="text-center">
                      <input readonly :id="'total_qty'+item.id" type="number" class="form-control form-control-sm border-0" :value="item.total_qty">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input type="hidden" readonly :value="item.selling_price">
                      <input readonly :id="'total_price'+item.id" type="number" class="form-control form-control-sm border-0" :value="item.total_price">
                    </td>
                    <td class="text-center">
                      <div v-if="item.type == 'oral'">
                        <select :id="'sig'+item.id" @change="addSig(item.id)" class="form-select form-select-sm sig border-0">
                          <option>Choose SIG</option>
                          <option :selected="item.sig == 'With Meal'" value="With Meal">With Meal</option>
                          <option :selected="item.sig == 'Without Meal'" value="Without Meal">Without Meal</option>
                          <option :selected="item.sig == 'After Lunch'" value="After Lunch">After Lunch</option>
                          <option :selected="item.sig == 'After Dinner'" value="After Dinner">After Dinner</option>
                          <option :selected="item.sig == '30 mins After Meal'" value="30 mins After Meal">30 mins After Meal</option>
                        </select>
                        <input type="hidden" name="sig_time[]">
                      </div>

                      <div v-if="item.type == 'topical' || item.type == 'skin-care'" class="d-flex gap-2">
                        <select :id="'sig'+item.id" @change="addSig(item.id)" class="form-select form-select-sm sig border-0">
                          <option>Choose SIG</option>
                          <option :selected="item.sig == 'Apply on affected area.'" value="Apply on affected area.">Apply on affected area.</option>
                          <option :selected="item.sig == 'Apply on the lesions.'" value="Apply on the lesions.">Apply on the lesions.</option>
                          <option :selected="item.sig == 'Apply on the whole face.'" value="Apply on the whole face.">Apply on the whole face.</option>
                          <option :selected="item.sig == 'Apply on the dark spots.'" value="Apply on the dark spots.">Apply on the dark spots.</option>
                        </select>
                        <select :id="'extra-sig'+item.id" @change="addExtraSig(item.id)" class="form-select form-select-sm border-0">
                          <option>Choose Time</option>
                          <option :selected="item.sig == 'Morning'" value="Morning">Morning</option>
                          <option :selected="item.sig == 'Afternoon'" value="Afternoon">Afternoon</option>
                          <option :selected="item.sig == 'Night'" value="Night">Night</option>
                          <option :selected="item.sig == 'Morning & Night'" value="Morning & Night">Morning & Night</option>
                          <option :selected="item.sig == 'Morning & Afternoon'" value="Morning & Afternoon">Morning & Afternoon</option>
                          <option :selected="item.sig == 'AfterNoon & Night'" value="AfterNoon & Night">AfterNoon & Night</option>
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
                    <th class="fw-normal text-center text-secondary">SIG</th>
                    <th class="fw-normal text-center text-secondary"></th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr v-for="treatment in treatment_array">
                    <td style="width: 300px;" class="text-center">
                      <input readonly type="text" class="form-control form-control-sm border-0" :value="treatment.name">
                      <input type="hidden" :value="treatment.treatment_unit_id">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input @change="calcTreatmentTotalPrice(treatment.id)" type="number" :id="'treatment_qty'+treatment.id" class="form-control form-control-sm border-0" :value="treatment.qty">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input  type="number" :id="'treatment_selling_price'+treatment.id" class="form-control form-control-sm border-0" :value="treatment.selling_price">
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <input type="number" :id="'treatment_total_price'+treatment.id" class="form-control form-control-sm border-0" :value="treatment.total_price">
                    </td>
                    <td class="text-center">
                      <textarea :id="'treatment_sig'+treatment.id" @keyup="addTreatmentSig(treatment.id)" class="form-control border-0 form-control-sm" rows="1" :value="treatment.sig"></textarea>
                    </td>
                    <td style="width: 40px;" class="text-center">
                      <i @click="removeTreatment(treatment.id)" class="fa-solid fa-circle-minus text-danger"></i>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <!--                =================================-->
              </div>

            </div>
          </div>
          <div class="d-flex gap-3 justify-content-center">
            <button @click="procedureDetail(procedure.id)" class="btn btn-sm btn-danger">Cancel</button>
            <button @click="updateProcedure(procedure.id)" class="btn btn-sm btn-success">Update</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</SideNav>
</template>

<script>
import SideNav from "@/components/layout/SideNav";
import {mapGetters} from "vuex";
import axios from "axios";
import router from "@/router";
export default {
  name: "ProcedureEdit",
  components: {SideNav},
  data() {
    return {
      procedure : {},
      skinCares : {},
      skin_types: {},
      acnes: {},
      black_spots: {},
      meso_fats: {},
      facial_designs: {},
      skin_care_array: [],
      skin_type_array: [],
      acne_array: [],
      black_spot_array: [],
      meso_fat_array: [],
      facial_design_array: [],
      item_array: [],
      treatment_array: [],
      oral_medicine : {},
      topical_medicine : {},
      skin_care_medicine : {},
      medicines: {},
      treatments: {},
    }
  },
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    procedureDetail: function (id) { //Cancel နိုပ်ရင်
      router.push({path: '/procedureDetail/'+id,query: {id:id}})
    },
    

    //Skin Care Start
    skinCareAdd : function(){
      let id = $('#skin_care').val();
      let skin_care = this.skin_cares.find(el=>el.id == id)
      let obj = {
        skin_care_id : skin_care.id,
        name: skin_care.name,
        description: ''
      }
      this.skin_care_array.push(obj)
    },

    addSkinCareDes : function (id,data){
      let des = $('#skin_care_description'+id).val()
      data.description = des
    },
    removeSkinCare:function (id){
      this.skin_care_array = this.skin_care_array.filter(el=>el.skin_care_id != id)
    },
    //

    //Skin Type Start
    skinTypeAdd:function(){
      let id = $('#skin_type').val();
      let skin_type = this.skin_types.find(el=>el.id == id)
      let obj = {
        skin_type_id : skin_type.id,
        name: skin_type.name,
        description: ''
      }
      this.skin_type_array.push(obj)
    },
    addSkinTypeDes : function (id,data){
      let des = $('#skin_type_description'+id).val()
      data.description = des
    },
    removeSkinType:function (id){
      this.skin_type_array = this.skin_type_array.filter(el=>el.skin_type_id != id)
    },
    //
    // Acne Start
    acneAdd:function(){
      let id = $('#acne').val();
      let acne = this.acnes.find(el=>el.id == id)
      let obj = {
        acne_id : acne.id,
        name: acne.name,
        description: ''
      }
      this.acne_array.push(obj)
    },
    addAcneDes : function (id,data){
      let des = $('#acne_description'+id).val()
      data.description = des
    },
    removeAcne:function (id){
      this.acne_array = this.acne_array.filter(el=>el.acne_id != id)
    },
    //
    // Black Spot Start
    blackSpotAdd:function(){
      let id = $('#black_spot').val();
      let black_spot = this.black_spots.find(el=>el.id == id)
      let obj = {
        black_spot_id : black_spot.id,
        name: black_spot.name,
        description: ''
      }
      this.black_spot_array.push(obj)
    },
    addBlackSpotDes : function (id,data){
      let des = $('#black_spot_description'+id).val()
      data.description = des
    },
    removeBlackSpot:function (id){
      this.black_spot_array = this.black_spot_array.filter(el=>el.black_spot_id != id)
    },
    //
    // Meso Fat Start
    mesoFatAdd:function(){
      let id = $('#meso_fat').val();
      let meso_fat = this.meso_fats.find(el=>el.id == id)
      let obj = {
        meso_fat_id : meso_fat.id,
        name: meso_fat.name,
        description: ''
      }
      this.meso_fat_array.push(obj)
    },
    addMesoFatDes : function (id,data){
      let des = $('#meso_fat_description'+id).val()
      data.description = des
    },
    removeMesoFat:function (id){
      this.meso_fat_array = this.meso_fat_array.filter(el=>el.meso_fat_id != id)
    },
    //
    // Facial Design Start
    facialDesignAdd:function(){
      let id = $('#facial_design').val();
      let facial_design = this.facial_designs.find(el=>el.id == id)
      let obj = {
        facial_design_id : facial_design.id,
        name: facial_design.name,
        description: ''
      }
      this.facial_design_array.push(obj)
    },
    addFacialDesignDes : function (id,data){
      let des = $('#facial_design_description'+id).val()
      data.description = des
    },
    removeFacialDesign:function (id){
      this.facial_design_array = this.facial_design_array.filter(el=>el.facial_design_id != id)
    },
    //

    getSkinCare: function (){
      axios.get(this.getUrl('skin_care'))
          .then(res => res.data.data)
          .then(data =>
              this.skin_cares = data
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    getSkinType: function (){
      axios.get(this.getUrl('skin_type'))
          .then( res => res.data.data)
          .then(data =>
              this.skin_types = data
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    getAcne: function (){
      axios.get(this.getUrl('acne'))
          .then( res => res.data.data)
          .then(data =>
              this.acnes = data
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    getBlackSpot: function (){
      axios.get(this.getUrl('black_spot'))
          .then( res => res.data.data)
          .then(data =>
              this.black_spots = data
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    getMesoFat: function (){
      axios.get(this.getUrl('meso_fat'))
          .then( res => res.data.data)
          .then(data =>
              this.meso_fats = data
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    getFacialDesign: function (){
      axios.get(this.getUrl('facial_design'))
          .then( res => res.data.data)
          .then(data =>
              this.facial_designs = data
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    //Medicine
    getMedicine: function (){
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
    },
    calcQty:function (id){
      let item = this.item_array.find(el=>el.id == id);
      let qty = Number($('#qty'+id).val());
      let duration = Number($('#duration'+id).val());
      let total_qty = qty * duration
      let total_price = total_qty * item.selling_price
      item.qty = qty
      item.day = duration
      item.total_qty = total_qty
      item.total_price = total_price
      $('#total_qty'+id).val(total_qty)
      $('#total_price'+id).val(total_price)
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
    deleteItem: function (id){
      this.item_array = this.item_array.filter(el=>el.id != id)
    },
    addTreatmentSig: function (id){ //For Treatment
      let treatment = this.treatment_array.find(el=>el.id == id);
      treatment.sig = $('#treatment_sig' + id).val()
      // console.log(this.item_array)
    },
    addExtraSig: function (id){
      let item = this.item_array.find(el=>el.id == id);
      item.extra_sig = $('#extra-sig' + id).val()
      // console.log(this.item_array)
    },
    //
    // Treatment
    getTreatments: function (){
      axios.get(this.getUrl('treatment_unit'))
          .then( res => res.data.data)
          .then(data =>{
                this.treatments = data
              }
          )
          .catch(function (error) {
            console.log(error);
          });
    },
    calcTreatmentTotalPrice: function (id){
      let qty = Number($('#treatment_qty'+id).val());
      let selling_price = Number($('#treatment_selling_price'+id).val());
      let treatment = this.treatment_array.find(el=>el.id == id)
      let total_price = qty * selling_price;
      treatment.qty = qty;
      treatment.total_price = total_price;
      $('#treatment_total_price'+id).val(total_price);
    },
    //
    getProcedure : function (){
      axios.get(this.$store.state.url+'procedure/'+ this.$route.query.id)
          .then(response => response.data.data)
          .then(data=>{
            this.procedure = data
            this.skinCares = this.procedure.skin_cares
            this.skin_care_array = this.skinCares
            this.skin_type_array = this.procedure.skin_types
            this.acne_array = this.procedure.acnes
            this.black_spot_array = this.procedure.black_spots
            this.meso_fat_array = this.procedure.meso_fats
            this.facial_design_array = this.procedure.facial_designs
            this.item_array = this.procedure.medicines
            this.treatment_array = this.procedure.treatments
            this.procedure_photo = this.procedure.procedure_photo
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    addOralMedicine: function(){
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
        total_price: quantity * selling_price,
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
          item.total_price = item.total_qty * item.selling_price
        }else{
          this.item_array.push(medicine_obj)
        }
      }
    },
    addTopicalMedicine: function(){
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
        total_price: quantity * selling_price,
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
          item.total_price = item.total_qty * item.selling_price
        }else{
          this.item_array.push(medicine_obj)
        }
        // console.log(this.item_array)
      }
    },
    addSkinCareMedicine : function(){
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
        total_price: quantity * selling_price,
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
          item.total_price = item.total_qty * item.selling_price
        }else{
          this.item_array.push(medicine_obj)
        }
      }
      // console.log(this.item_array)

    },
    addTreatment : function(){
      let id = 0;
      let length = this.treatment_array.length
      if (length <= 0){
        id = 1;
      }else if (length > 0){
        id = length + 1
      }
      let treatment_unit_id = $('.procedure').val()
      let procedure = this.treatments.find(el=>el.id == treatment_unit_id)
      let name = procedure.name
      let quantity = 1
      let day = 1
      let selling_price = procedure.selling_price

      let procedure_obj = {
        id: id,
        treatment_unit_id: treatment_unit_id,
        name: name,
        qty: quantity,
        selling_price : selling_price,
        total_price: quantity * selling_price,
        sig: ''
      };

      //Check id (id တူရင် data မထည့်)
      if (this.treatment_array.length == 0){
        this.treatment_array.push(procedure_obj)
      }else if (this.treatment_array.length > 0){
        let has_id = [];
        this.treatment_array.map(el=>{
          has_id.push(el.treatment_unit_id)
        })
        // **********
        if (has_id.includes(treatment_unit_id) == true){
          let item = this.treatment_array.find(el=>el.treatment_unit_id == treatment_unit_id)
          item.qty += 1;
          item.total_price = item.qty * item.selling_price
        }else{
          this.treatment_array.push(procedure_obj)
        }
      }

      // console.log(this.treatment_array)
    },
    removeTreatment: function (id){
      this.treatment_array = this.treatment_array.filter(el=>el.id != id)
    },
    updateProcedure: function (id){ //Update
      let formData = new FormData(this.$refs.updateProcedure);
      let skin_care_json = JSON.stringify(this.skin_care_array)
      let skin_type_json = JSON.stringify(this.skin_type_array)
      let acne_json = JSON.stringify(this.acne_array)
      let black_spot_json = JSON.stringify(this.black_spot_array)
      let meso_fat_json = JSON.stringify(this.meso_fat_array)
      let facial_design_json = JSON.stringify(this.facial_design_array)
      let medicine_json = JSON.stringify(this.item_array)
      let treatment_json = JSON.stringify(this.treatment_array)
      formData.append('skin_care',skin_care_json);
      formData.append('skin_type',skin_type_json);
      formData.append('acne',acne_json);
      formData.append('black_spot',black_spot_json);
      formData.append('meso_fat',meso_fat_json);
      formData.append('facial_design',facial_design_json);
      formData.append('medicines',medicine_json);
      formData.append('treatments',treatment_json)
      formData.append('_method','PATCH')
      axios.post(this.getUrl('procedure/'+id),formData)
          .then(res=>res)
          .then(data=>{
            this.$store.dispatch('alertSuccess')
            this.getProcedure()
            this.procedureDetail(id)
          })
          .catch(err=> {
            this.$store.dispatch('alertError')
          })
    },
  },
  mounted() {
    $('.oral').select2();
    $('.topical').select2();
    $('.skin_care_medicine').select2();
    $('.procedure').select2();
    $('.sig').select2();
    this.getMedicine()
    this.getTreatments()
    this.getSkinCare()
    this.getSkinType()
    this.getAcne()
    this.getBlackSpot()
    this.getMesoFat()
    this.getFacialDesign()
    this.getProcedure()
  }
}
</script>

<style scoped>

</style>