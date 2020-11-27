<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Flag</h1>
        <p>
          Flags for encounters modify and deletion
        </p>
      </div>
    </div>

    <div class="row mt-4">
       <div class="card shadow data-list">
           <div class="link-header">
               <div class="heading">
                    <h3 class="pb-3">Flag</h3>
               </div>
               <div class="links">
                   <ul>
                     <div>
                        <b-tabs
                          active-nav-item-class="font-weight-bold text-uppercase text-danger"
                          active-tab-class="font-weight-bold text-success"
                          content-class="mt-3"
                        >
                          <b-tab title="new" @click="filterNewFlag('pending')"></b-tab>
                          <b-tab title="modify" @click="filterModifyFlag('modify')"></b-tab>
                          <b-tab title="deleted" @click="filterDeleteFlag('deleted')"></b-tab>
                          <b-tab title="accepted"  @click="filterNewFlag('approved')"></b-tab>
                          <b-tab title="rejected"  @click="filterNewFlag('rejected')"></b-tab>
                          <b-tab title="all" active @click="allFlagData"></b-tab>
                        </b-tabs>
                      </div>
                       <!-- <li><button  @click="filterNewFlag('pending')">new</button></li>
                       <li><button  @click="filterModifyFlag('modify')">modify</button></li>
                       <li><button  @click="filterDeleteFlag('deleted')">deleted</button></li>
                       <li><button  @click="filterAcceptFlag('approved')">accepted</button></li>
                       <li><button  @click="filterRejectedFlag('rejected')">rejected</button></li>
                       <li><button  @click="allFlagData">all</button></li> -->
                   </ul>
               </div>
           </div>
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <b-button disabled variant="success" class="search-button"><i class="fas fa-search"></i></b-button>
              </b-input-group-prepend>
              <b-form-input v-model="filter" placeholder="Search for Address"></b-form-input>
              <b-input-group-append>
                <b-button variant="danger" :disabled="!filter" @click="filter = ''" class="search-button">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-table
          id="user-table"
          show-empty
          :items="data_obj"
          :fields="fields"
          bordered
          :filter="filter"
          @filtered="onFiltered"
          responsive
          hover
          :current-page="currentPage"
          >
            <template v-slot:cell(S.N.)="data">
              {{ data.index + 1 + '.' }}
            </template>

            <template v-slot:cell(reason_for_modification)="row">
              <div v-if="row.item.flag == 'modify'">
              {{row.item.reason_for_modification}}
              </div>
              <div v-else>
                {{row.item.reason_for_deletion}}
              </div>
            </template>

            <template v-slot:cell(modify_status)="row">
              <div v-if="row.item.flag == 'modify'">
              {{row.item.modify_status}}
              </div>
              <div v-else>
                {{row.item.delete_status}}
              </div>
            </template>
            <template v-slot:cell(actions)="row">
                <b-button variant="outline-info" v-if="row.item.flag == 'modify'" @click="editFlag(row.item.id)" :disabled="row.item.modify_status != 'pending'">Modify</b-button>
                <b-button variant="outline-info" v-if="row.item.flag == 'modify'" @click="rejectModifyFlag(row.item.id)" :disabled="row.item.modify_status != 'pending'">Reject</b-button>
                <b-button variant="outline-info" v-if="row.item.flag == 'delete'" @click="deleteFlag(row.item.id)" :disabled="row.item.delete_status != 'pending'">Delete</b-button>
                <b-button variant="outline-info" v-if="row.item.flag == 'delete'" @click="rejectDeleteFlag(row.item.id)" :disabled="row.item.delete_status != 'pending'">Reject</b-button>
            </template>
          </b-table>
        </div>

    </div>

  </div>
</div>
</template>


<script>

import { mapState, mapActions, mapMutations} from 'vuex';
import AppHeader from './Header.vue'

// const axios = require('axios');
export default {
  name: "encountermodify",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader
  },
  computed: {
    ...mapState(['flag_obj','token','message','successmessage','errormessage']),
  },

  watch: {
    flag_obj: function(){
      if(this.flag_obj.length>0){
        this.data_obj =this.flag_obj;
      }
    },
  },

  created(){
    this.listFlags();
  },

  data() {
    return {
      filter: null,
      currentPage: 1,
      errors:[],
      data_obj:[],

      fields: [
        'S.N.',
        { key: 'author.username', label: 'Username',sortable: true},
        { key: 'encounter.patient.full_name', label: 'Name of Patient', sortable: true},
        { key: 'reason_for_deletion', label: 'Reason' },
        { key: 'encounter.encounter_type', label: 'Encounter'},
        { key: 'reason_for_modification', label: 'Modification/Deletion'},
        // { key: 'other_reason_for_deletion', label: 'Deletion Reason'},
        { key: 'flag', label: 'Flag'},
        { key: 'modify_status', label: 'Status'},
        { key: 'actions', label: 'Action' },
      ],
    }
  },

  methods:{
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    ...mapActions(['listFlags']),
    ...mapMutations(['setFlags']),

    editFlag(flag_id){
      this.$store.dispatch("deleteFlag",{'id':flag_id,'modify_status':'approved','delete_status':'pending'} ).then(() => {
        if(this.successmessage=='success'){
          alert("Flag Data is Approved successfully for edit");
          location.reload()
        }else if(this.errormessage=='errormessage'){
          alert(this.message);
          location.reload();

        }
      })
    },




    rejectModifyFlag(flag_id){
      this.$store.dispatch("deleteFlag",{'id':flag_id,'modify_status':'rejected','delete_status':'pending'} ).then(() => {
        if(this.successmessage=='success'){
          alert("Flag Data is Rejected for deletion");
          location.reload()
        }else if(this.errormessage=='errormessage'){
          alert(this.message);
          location.reload();

        }
      })
    },


    deleteFlag(flag_id){
      this.$store.dispatch("deleteFlag",{'id':flag_id,'modify_status':'pending','delete_status':'deleted'} ).then(() => {
        if(this.successmessage=='success'){
          alert("Flag Data is Deleted successfully");
          location.reload()
        }else if(this.errormessage=='errormessage'){
          alert(this.message);
          location.reload();

        }
      })
    },


    rejectDeleteFlag(flag_id){
      this.$store.dispatch("deleteFlag",{'id':flag_id,'modify_status':'pending','delete_status':'rejected'} ).then(() => {
        if(this.successmessage=='success'){
          alert("Flag Data is Rejected for deletion");
          location.reload()
        }else if(this.errormessage=='errormessage'){
          alert(this.message);
          location.reload();

        }
      })
    },


    filterModifyFlag(modify_status){
      var formattedRecord1 = []
      this.$store.state.flag_obj.forEach(function(rec){
        if(rec.flag == modify_status){
          formattedRecord1.push({
           id: rec.id,encounter:{id:rec.encounter.id,encounter_type:rec.encounter.encounter_type,
              patient: {id: rec.encounter.patient.id,full_name: rec.encounter.patient.full_name}},
              reason_for_modification: rec.reason_for_modification,modify_status: rec.modify_status,
              reason_for_deletion: rec.reason_for_deletion,
              other_reason_for_deletion: rec.other_reason_for_deletion,
              delete_status: rec.delete_status, flag: rec.flag,
              author: {id: rec.author.id,
                username: rec.author.username,
                full_name: rec.author.full_name
              }
         })
        }
      })
      this.data_obj = formattedRecord1;
      // var flag = this.flag_obj.find(evt => evt.modify_status == modify_status);
      // this.dat(formattedRecord1)
    },


    filterNewFlag(modify_status){
      var formattedRecord1 = []
      this.$store.state.flag_obj.forEach(function(rec){
        if(rec.modify_status == modify_status){
          formattedRecord1.push({
           id: rec.id,encounter:{id:rec.encounter.id,encounter_type:rec.encounter.encounter_type,
              patient: {id: rec.encounter.patient.id,full_name: rec.encounter.patient.full_name}},
              reason_for_modification: rec.reason_for_modification,modify_status: rec.modify_status,
              reason_for_deletion: rec.reason_for_deletion,
              other_reason_for_deletion: rec.other_reason_for_deletion,
              delete_status: rec.delete_status, flag: rec.flag,
              author: {id: rec.author.id,
                username: rec.author.username,
                full_name: rec.author.full_name
              }
         })
        }
      })
      this.data_obj = formattedRecord1;
      // var flag = this.flag_obj.find(evt => evt.modify_status == modify_status);
      // this.dat(formattedRecord1)
    },


    filterAcceptFlag(modify_status){
      var formattedRecord1 = []
      this.$store.state.flag_obj.forEach(function(rec){
        if(rec.modify_status == modify_status){
          formattedRecord1.push({
           id: rec.id,encounter:{id:rec.encounter.id,encounter_type:rec.encounter.encounter_type,
              patient: {id: rec.encounter.patient.id,full_name: rec.encounter.patient.full_name}},
              reason_for_modification: rec.reason_for_modification,modify_status: rec.modify_status,
              reason_for_deletion: rec.reason_for_deletion,
              other_reason_for_deletion: rec.other_reason_for_deletion,
              delete_status: rec.delete_status, flag: rec.flag,
              author: {id: rec.author.id,
                username: rec.author.username,
                full_name: rec.author.full_name
              }
         })
        }
      })
      this.data_obj = formattedRecord1;
      // var flag = this.flag_obj.find(evt => evt.modify_status == modify_status);
      // this.dat(formattedRecord1)
    },


    filterDeleteFlag(modify_status){
      var formattedRecord1 = []
      this.$store.state.flag_obj.forEach(function(rec){
        if(rec.delete_status == modify_status){
          formattedRecord1.push({
           id: rec.id,encounter:{id:rec.encounter.id,encounter_type:rec.encounter.encounter_type,
              patient: {id: rec.encounter.patient.id,full_name: rec.encounter.patient.full_name}},
              reason_for_modification: rec.reason_for_modification,modify_status: rec.modify_status,
              reason_for_deletion: rec.reason_for_deletion,
              other_reason_for_deletion: rec.other_reason_for_deletion,
              delete_status: rec.delete_status, flag: rec.flag,
              author: {id: rec.author.id,
                username: rec.author.username,
                full_name: rec.author.full_name
              }
         })
        }
      })
      this.data_obj = formattedRecord1;
      // var flag = this.flag_obj.find(evt => evt.modify_status == modify_status);
      // this.setFlags(formattedRecord1)
    },

    filterRejectedFlag(modify_status){
      var formattedRecord1 = []
      this.$store.state.flag_obj.forEach(function(rec){
        if(rec.delete_status == modify_status || rec.modify_status == modify_status){
          formattedRecord1.push({
           id: rec.id,encounter:{id:rec.encounter.id,encounter_type:rec.encounter.encounter_type,
              patient: {id: rec.encounter.patient.id,full_name: rec.encounter.patient.full_name}},
              reason_for_modification: rec.reason_for_modification,modify_status: rec.modify_status,
              reason_for_deletion: rec.reason_for_deletion,
              other_reason_for_deletion: rec.other_reason_for_deletion,
              delete_status: rec.delete_status, flag: rec.flag,
              author: {id: rec.author.id,
                username: rec.author.username,
                full_name: rec.author.full_name
              }
         })
        }
      })
      this.data_obj = formattedRecord1;
    },


    allFlagData(){
      this.data_obj = this.flag_obj;
    }





  }
};
</script>

<style lang="scss" scoped>
  @import "../css/encounter.scss";

</style>
