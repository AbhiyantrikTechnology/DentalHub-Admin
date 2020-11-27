<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Users</h1>
        <p>
          Add and edit users from here.
        </p>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-sm-12 col-md-12 col-lg-6">
        <b-form class="card shadow">
          <h3 class="pb-3">Add Users</h3>
            <b-form-input type="text" class="mb-3" v-model="first_name" placeholder="First Name"></b-form-input>
            <b-form-input type="text" class="mb-3" v-model="middle_name" placeholder="Middle Name"></b-form-input>
            <b-form-input type="text" class="mb-3" v-model="last_name" placeholder="Last Name"></b-form-input>
            <b-form-input type="text" class="mb-3" v-model="username" placeholder="Username"></b-form-input>
            <b-form-input type="password" class="mb-3" v-model="password" placeholder="Password (min. 8 characters)"></b-form-input>
            <b-form-input type="password" class="mb-3" v-model="confirm_password" placeholder="Confirm Password (min. 8 characters)"></b-form-input>
            <b-form-select v-model="role" placeholder="Select Role" class="mb-3">
              <option disabled value="">User Role</option>
              <option v-for="(role, index) in role_obj" :key="index" :value="role.id">
                <p v-if="role.name == 'appuser'">App User</p>
                <p v-if="role.name == 'warduser'">Ward User</p>
              </option>
            </b-form-select>
            <multiselect
            class="mb-3"
            v-model="location"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select Location"
            label="name"
            track-by="name"
            :preselect-first="true"
            >
            </multiselect>


            <b-button variant="custom" @click="createUser">Submit</b-button>
        </b-form>
      </div>

      <div class="col-sm-12 col-md-12 col-lg-6">
        <div class="card shadow data-list">
          <h3 class="pb-3">Users List</h3>
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <b-button disabled variant="success" class="search-button"><i class="fas fa-search"></i></b-button>
              </b-input-group-prepend>
              <b-form-input v-model="filter" placeholder="Search for Users"></b-form-input>
              <b-input-group-append>
                <b-button variant="danger" :disabled="!filter" @click="filter = ''" class="search-button">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-table
          id="user-table"
          show-empty
          :items="users"
          :fields="fields"
          bordered
          :filter="filter"
          @filtered="onFiltered"
          responsive
          hover
          :current-page="currentPage"
          >
            <template v-slot:cell(serial_number)="data">
              {{ data.index + 1 + '.' }}
            </template>

            <template v-slot:cell(full_name)="row">
              {{ row.item.full_name }}
            </template>
            <template v-slot:cell(username)="row">
              {{ row.item.username }}
            </template>
            <template v-slot:cell(active)="row">
              <div v-if="row.item.active == true || row.item.active == 'true'">
                Active
              </div>
              <div v-else-if="row.item.active == false || row.item.active == 'false'">
                Inactive
              </div>
            </template>
            <template v-slot:cell(actions)="row">
                <b-button variant="outline-warning" centered v-b-modal="'user-modal'" @click="getuserdetail(row.item.id)" class="mr-2">Edit</b-button>
                <b-button variant="outline-info" @click="getuserstatus(row.item.id,row.item.active)">Status</b-button>
            </template>
          </b-table>
        </div>
      </div>
    </div>

  <b-toast id="error-toast" variant="warning" solid append-toast toaster="b-toaster-bottom-full">
    <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
      <strong class="mr-auto">User Add Error</strong>
    </div>
    <div v-if="message">
      <p v-if="message.length>0">{{message}}</p>
    </div>
    <div v-if="errors.first_name">
      <p>{{ errors.first_name }}</p>
    </div>
    <div v-if="errors.last_name">
      <p>{{ errors.last_name }}</p>
    </div>
    <div v-if="errors.username">
      <p>{{ errors.username }}</p>
    </div>
    <div v-if="errors.province_selected">
      <p>{{ errors.province_selected }}</p>
    </div>
    <div v-if="errors.location">
      <p>{{ errors.location }}</p>
    </div>
    <div v-if="errors.password">
      <p>{{ errors.password }}</p>
    </div>
    <div v-if="errors.role">
      <p>{{ errors.role }}</p>
    </div>
    <div v-if="errors.confirm_password">
      <p>{{ errors.confirm_password }}</p>
    </div>
    <div v-if="errors.password_error">
      <p>{{ errors.password_error }}</p>
    </div>
    <div v-if="errors.password_length">
      <p>{{ errors.password_length }}</p>
    </div>
  </b-toast>

  <b-toast id="success-toast" variant="custom-success" solid append-toast toaster="b-toaster-bottom-full">
    <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
      <strong class="mr-auto">User Added</strong>
    </div>
      A new user is added.
  </b-toast>

  <b-toast id="success-update-toast" variant="custom-success" solid append-toast toaster="b-toaster-bottom-full">
    <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
      <strong class="mr-auto">User Updated</strong>
    </div>
      The data of the user is updated.
  </b-toast>

  <b-modal ref="modal1" id="user-modal" centered title="Edit a User" hide-footer>
    <b-form @submit.prevent>
      <b-form-input type="text" class="mb-3" v-model="user_obj.first_name" placeholder="First Name"></b-form-input>
      <b-form-input type="text" class="mb-3" v-model="user_obj.middle_name" placeholder="Middle Name"></b-form-input>
      <b-form-input type="text" class="mb-3" v-model="user_obj.last_name" placeholder="Last Name"></b-form-input>
      <b-form-input type="text" class="mb-3" v-model="user_obj.username" placeholder="Username"></b-form-input>

      <multiselect
      class="mb-3"
      v-model="location_edit"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Select Location"
      label="name"
      track-by="name"
      :preselect-first="true"
      >
      </multiselect>

      <div class="d-flex justify-content-center align-items-center" style="flex-direction: column;">
        <b-button variant="custom" @click="updateUserForm">Update</b-button>
        <a href="javascript:void(0);" @click="deleteUser" class="text-danger mt-3"><i class="fas fa-trash pr-2"></i>Delete the user</a>
      </div>
    </b-form>
  </b-modal>
  </div>
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue';
import province from "../js/districts.js"

export default {
  name: "Users",
  components:{
    'app-header': AppHeader
  },
  computed: {
    ...mapState(['users','message','successmessage','errormessage','geography','wards_obj','role_obj','userward_obj'])
  },

  created() {
    this.listUsers();
    this.listRole();
    this.listUserWards().then(() => {
      this.updateOptions();})

  },
  mounted: function() {
    if (this.$store.state.token == "") {
      this.$router.replace("/");
    }

  },

  data() {
    return {
      value: '',
      options: [],
      provinces: province,
      province_selected: '',
      province_selected_edit: '',
      filter: null,
      currentPage: 1,
      first_name: '',
      last_name: '',
      confirm_password:'',
      password_length: '',
      middle_name: '',
      location: [],
      location_edit: [],
      user_obj: {},
      username: '',
      password:'',
      password_error:'',
      user_location:[],
      user_location_edit:[],
      errors:[],
      role:'',
      fields: [
        {key: 'serial_number', label: 'S.N.'},
        { key: 'full_name', label: 'Full Name', sortable: true},
        { key: 'username', label: 'Username'},
        { key: 'active', label: 'Status' },
        { key: 'actions', label: 'Action' },
      ],
    }
  },

  methods:{
    ...mapActions(["listUsers","listUserWards","listRole"]),
    createUser(){
      this.errors=[]
      var geography_id =[]
      this.location.forEach(function(location_id){
          geography_id.push(location_id.language)
        })
      this.user_location = geography_id
      if(this.first_name==''){
        this.errors['first_name']="First Name required."
        this.$bvToast.show('error-toast');
      }else if(this.last_name == ''){
        this.errors['last_name']="Last Name required."
        this.$bvToast.show('error-toast');
      }else if(this.username == ''){
        this.errors['username'] = "Username required."
        this.$bvToast.show('error-toast');
      }else if(this.password == ''){
        this.errors['password'] = "Password required."
        this.$bvToast.show('error-toast');
      }else if(this.password.length<8){
        this.errors['password_length'] = "Minimum 8 characters are required in Password."
        this.$bvToast.show('error-toast');
      }else if(this.confirm_password==''){
        this.errors['confirm_password'] = "Confirm password required."
        this.$bvToast.show('error-toast');
      }else if(this.confirm_password!=this.password){
        this.errors['password_error'] = "Password do not match."
        this.$bvToast.show('error-toast');
      }else if(this.role == ''){
        this.errors['role'] = "Role required."
        this.$bvToast.show('error-toast');
      }else if(this.location == ''){
        this.errors['location'] = "Location required."
        this.$bvToast.show('error-toast');
      }else(
        this.$store.dispatch("createUser", {
          'first_name': this.first_name,
          'last_name':this.last_name ,
          'middle_name':this.middle_name,
          'username':this.username,
          'area':this.user_location,
          'password':this.password,
          'confirm_password':this.confirm_password,
          'role':this.role,
        }).then(() => {
          if(this.successmessage=='success'){
            this.first_name = '';
            this.last_name = '';
            this.middle_name = '';
            this.username = '';
            this.location = '';
            this.role = '';
            this.confirm_password = '';
            this.password = '';
            // this.users.push(this.user_obj)
            this.$bvToast.show('success-toast');
          }else if(this.errormessage=='errormessage'){
            this.$bvToast.show('error-toast');

          }
        })
      )
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    updateUserForm(){
      var geography_edit_id =[]
      this.location_edit.forEach(function(location_id){
          geography_edit_id.push(location_id.language)
        })
      this.user_location_edit = geography_edit_id
       this.$store.dispatch("updateUser", {
        'first_name': this.user_obj.first_name,
        'last_name':this.user_obj.last_name ,
        'middle_name':this.user_obj.middle_name,
        'username':this.user_obj.username,
        'area':this.user_location_edit,
        'id': this.user_obj.id,
      }).then(() => {
        if(this.successmessage=='success'){
          // location.reload()
          this.$refs['modal1'].hide()
          this.$bvToast.show('success-update-toast');
          this.$router.go()
          }else if(this.errormessage=='errormessage'){
            this.$bvToast.show('error-toast');

          }
        })
    },
    deleteUser(){
      this.$store.dispatch("deleteUser",this.user_obj.id)
      .then(() => {
        if(this.successmessage=='success'){
          location.reload()
          }
        })

    },
    getuserdetail(user_id){
      // console.log("hello")
      this.$refs['modal1'].show()
      this.user_obj = this.users.find(evt => evt.id == user_id)
      var selectedGeography = []
      this.user_obj.location.forEach(function(elem){
        selectedGeography.push({'name': elem.location,'language':elem.id})
      })
      this.location_edit = selectedGeography
      // console.log(this.location_edit)
    },

    getuserstatus(user_id,status_obj){
      // var geography_edit_id =[]
      this.$store.dispatch("updateUserStatus",{'userid':user_id,'status_obj':status_obj})
      .then(() => {
        if(this.successmessage=='success'){
          // location.reload()
          this.$refs['modal1'].hide()
          this.$bvToast.show('success-update-toast');
        }else if(this.errormessage=='errormessage'){
          this.$bvToast.show('error-toast');

        }
      })
    },
    updateOptions(){
      var geography_data=[]
      if (this.userward_obj.length>0){
        this.userward_obj.forEach(function(geography_obj){
          geography_data.push({'name':geography_obj.location,'language':geography_obj.id})
        })
        this.options = geography_data
        // console.log(this.options)
        // console.log("1223")
      }

    }
    // updateOptions(){
    //   var geography_data=[]
    //   if (this.userward_obj.length>0){
    //     this.userward_obj.forEach(function(geography_obj){
    //       if (geography_obj.state=true){
    //         geography_data.push({'name':geography_obj.location,'language':geography_obj.id})
    //       }
    //     })
    //     this.options = geography_data
    //   }
    //
    // }

  }
};
</script>

<style lang="scss" scoped>
  @import "../css/users.scss";

</style>
