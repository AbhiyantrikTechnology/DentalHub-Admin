<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Activity</h1>
        <p>
          Add and edit activities from here.
        </p>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-sm-12 col-md-12 col-lg-6">
        <b-form class="card shadow">
          <h3 class="pb-3">Add New Activity</h3>
            <b-form-input type="text" v-model="activity_name" class="mb-3" placeholder="Activity Name"></b-form-input>

            <b-button variant="custom" @click="createActivity">Submit</b-button>
        </b-form>
      </div>

      <div class="col-sm-12 col-md-12 col-lg-6">
        <div class="card shadow data-list">
          <h3 class="pb-3">Activities List</h3>
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <b-button disabled variant="success" class="search-button"><i class="fas fa-search"></i></b-button>
              </b-input-group-prepend>
              <b-form-input v-model="filter" placeholder="Search for Activities"></b-form-input>
              <b-input-group-append>
                <b-button variant="danger" :disabled="!filter" @click="filter = ''" class="search-button">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-table
          id="user-table"
          show-empty
          :items="activities"
          :fields="fields"
          bordered
          :filter="filter"
          @filtered="onFiltered"
          responsive
          hover
          :current-page="currentPage"
          >
            <template slot="S.N." slot-scope="data">
              {{ data.index + 1 + '.' }}
            </template>

            <template slot="name" slot-scope="row">
              {{ row.item.name }}
            </template>

            <template slot="actions" slot-scope="row">
              <b-button variant="outline-warning" v-b-modal="'activity-modal'" @click="getActivitydetail(row.item.id)">Edit</b-button>
            </template>
          </b-table>
        </div>
      </div>
    </div>

    <b-toast id="error-toast" variant="warning" solid append-toast toaster="b-toaster-top-center">
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Error!!!</strong>
      </div>
      <div v-if="message">
        <p v-if="message.length>0">{{message}}</p>
      </div>
      <div v-if="errors.activity_name">
        <p>{{ errors.activity_name }}</p>
      </div>
    </b-toast>

    <b-toast id="success-toast" variant="custom-success" solid append-toast toaster="b-toaster-bottom-full">
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Activity Added</strong>
      </div>
        A new activity is added.
    </b-toast>

    <b-modal ref="modal1" id="activity-modal" centered title="Edit a Location" hide-footer>
      <b-form @submit.prevent>
        <b-form-input type="text" v-model="activity_obj.name" class="mb-3" placeholder="Activity Name"></b-form-input>

        <div class="d-flex justify-content-center align-items-center" style="flex-direction: column;">
          <b-button variant="custom" @click="updateActivityForm">Update</b-button>
          <a href="javascript:void(0);" @click="deleteActivity" class="text-danger mt-3"><i class="fas fa-trash pr-2"></i>Delete the activity</a>
        </div>
      </b-form>
    </b-modal>
  </div>
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue'


// const axios = require('axios');
export default {
  name: "Activity",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader
  },
  computed: {...mapState(['token','activities','message','successmessage','errormessage'])
  },

  created(){
    this.listActivity();
  },

  data() {
    return {
      filter: null,
      currentPage: 1,
      activity_name:'',
      errors:[],
      activity_obj:'',
      fields: [
        'S.N.',
        { key: 'name', label: 'Activity', sortable: true},
        { key: 'actions', label: 'Action' },
      ],
      // activities:[
      //   {activity: 'School Dental Checkup'},
      //   {activity: 'Ward Dental Checkup'},
      //   {activity: 'Metropolitan Dental Checkup'},
      //   {activity: 'Community Dental Checkup'},
      // ]
      // username: '',
      // password: '',
      // text: "Login Form",
      // available: false,
      // show: false,
      // errors: {'auth':''},
      // disabledLogin: true
    }
  },

  methods:{
    ...mapActions(['listActivity']),
    createActivity(){
      this.errors=[]
      if(this.activity_name==''){
        this.errors['activity_name']="Name required."
        this.$bvToast.show('error-toast');
      }else(
        this.$store.dispatch("createActivity", {
          'name': this.activity_name,
        }).then(() => {
          if(this.successmessage=='success'){
            this.$bvToast.show('success-toast');
          }else if(this.errormessage=='errormessage'){
            this.$bvToast.show('error-toast');
          }
        })
      )
      this.activity_name = '';
    },
    updateActivityForm(){
      this.errors=[]
      if(this.activity_obj.name==''){
        this.errors['activity_name']="Name required."
        this.$bvToast.show('error-toast');
      }else(
        this.$store.dispatch("UpdateActivity", {
          'name': this.activity_obj.name,
          'id': this.activity_obj.id,
        }).then(() => {
          if(this.successmessage=='success'){
            this.$bvToast.show('success-toast');
          }else if(this.errormessage=='errormessage'){
            this.$bvToast.show('error-toast');
          }
        })
        )
      this.activity_name = '';
    },
    deleteActivity(){
      this.$store.dispatch("deleteActivity",this.activity_obj.id)
      .then(() => {
        if(this.successmessage=='success'){
          location.reload()
        }
      })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getActivitydetail(acticvity_id){
      this.activity_obj = this.activities.find(evt => evt.id == acticvity_id)
    },
  }
};
</script>

<style lang="scss" scoped>
  @import "../css/index.scss";

</style>
