<template>
  <SideNav>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <h6 class="fw-normal text-secondary">Profile Details</h6>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card border-0 p-3">
          <div class="row">
            <div class="col-6 offset-3">
              <div>
                <h6 class="fw-normal text-secondary mb-3 text-center">User Information</h6>
                <form @submit.prevent="" ref="edit_profile">
                  <div class="mb-3 text-center">
                    <img src="../../assets/icon-doctor.png" style="width: 100px;height: 100px;" class="rounded-circle border-light shadow-sm" alt="">
                  </div>
                  <div class="mb-3 text-center">
                    <label class="form-label text-secondary small">Name</label>
                    <textarea name="" rows="1" class="form-control form-control-sm text-center" :value="auth.name"></textarea>
                  </div>
                  <div class="mb-3 text-center">
                    <label class="form-label text-secondary small">Email</label>
                    <input name="" type="email" class="form-control form-control-sm text-center" :value="auth.email">
                  </div>
                  <div class="mb-3 text-center">
                    <label class="form-label text-secondary small">Phone</label>
                    <input name="" type="number" class="form-control form-control-sm text-center" :value="auth.phone">
                  </div>
                  <div class="mb-3">
                    <button @click="updateProfile" class="btn btn-primary btn-sm w-100">Save Changes</button>
                  </div>
                </form>
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
import { mapGetters, mapState } from 'vuex';
export default {
  name: "Profile",
  components: {SideNav},
  data(){
  return {
    profiles : [],
  }
 },

  computed: {
    ...mapState([
      'auth'
    ]),
    ...mapGetters([
      'getUrl'
    ])
  },

  methods: {
    // updateProfile: function(){
    //   axios.post()
    //   .then (res=>{
    //     $store.state.auth.name
    //     $store.state.auth.email
    //   })
    // }
  }
}


</script>

<style scoped>

</style>