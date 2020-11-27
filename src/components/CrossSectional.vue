<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Cross-Sectional Measures of Disease</h1>
        <p>
          Graphical representation of Cross-Sectional Measures.
        </p>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Filter Data</h3>
          <div class="row mb-3">
            <div class="col-md-6">
              <h6>Select Start Date:</h6>
              <b-input v-model="returndate_obj.last_30_days" type="date"/>
            </div>

            <div class="col-6">
              <h6>Select End Date:</h6>
              <b-input v-model="returndate_obj.today_date" type="date"/>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-4 col-sm-12">
              <h6>Select the Reason for Visit:</h6>
              <multiselect
              v-model="seminar_obj"
              :options="seminar"
              :preserve-search="true"
              placeholder="Reason For Visit"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>

            </div>

            <div class="col-md-4 col-sm-12">
              <h6>Select Referral Type:</h6>
              <multiselect
              v-model="outreach_obj"
              :options="outreach"
              :preserve-search="true"
              placeholder="Referral Type"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <!-- <div class="col-md-4 col-sm-12">
              <h6>Select Indicator Age:</h6>
              <multiselect
              :options="clinic"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Indicator Age"
              label="clinic"
              track-by="clinic"
              :preselect-first="true"
              >
              </multiselect>
            </div> -->
          </div>

          <div class="row">
            <div class="col-md-10 col-sm-12">
              <h6>Select Activities:</h6>
              <b-form-group>
                <b-form-checkbox-group
                v-model="checkbox_selected"
                :options="checkbox_options"
                switches
                size="lg"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>

            <div class="col-lg-2 col-sm-12">
              <!-- <h6>Click Here:</h6> -->
              <b-button variant="custom" block class="mb-4" @click="CrossSectionalForm">Submit</b-button>
            </div>
          </div>
        </div>
      </div>


      <b-toast id="error-toast" variant="warning" solid append-toast toaster="b-toaster-bottom-full">
        <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">Overview filter required error</strong>
        </div>
        <div v-if="errors.Start_Date">
          <p>{{ errors.Start_Date }}</p>
        </div>
        <div v-if="errors.End_Date">
          <p>{{ errors.End_Date }}</p>
        </div>
        <div v-if="errors.seminar_obj">
          <p>{{ errors.seminar_obj }}</p>
        </div>

        <div v-if="errors.outreach_obj">
          <p>{{ errors.outreach_obj }}</p>
        </div>
        <div v-if="errors.checkbox_selected">
          <p>{{ errors.checkbox_selected }}</p>
        </div>

        <div v-if="message.length>0">
          <p>{{this.message }}</p>
        </div>


      </b-toast>

      <b-toast id="success-toast" variant="custom-success" solid append-toast toaster="b-toaster-bottom-full">
        <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">Filtered success</strong>
        </div>
          Data is Successfully  Filtered
      </b-toast>

    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3  text-center">Cross-Sectional Measures</h3>

          <b-table-simple hover responsive>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <b-thead head-variant="dark">
              <b-th class="text-center" v-for="fields in basicFields">{{ fields.label }}</b-th>
            </b-thead>

            <b-tbody>
              <b-tr v-for="items in basic">
                <th v-html="items.type"> {{ items.type }} </th>
                <td class="text-center"> {{ items.sixyo }} </td>
                <td class="text-center"> {{ items.twelveyo }} </td>
                <td class="text-center"> {{ items.fifteenyo }} </td>
                <td class="text-center"> {{ items.child }} </td>
                <td class="text-center"> {{ items.adult }} </td>
                <td class="text-center"> {{ items.older }} </td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue';
import Visualization from './Visualization';
import userChart from '../js/userchart.js';
import locationChart from '../js/locationchart.js';

// const axios = require('axios');
export default {
  name: "CrossSectional",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader,
    'Visualization': Visualization
  },
  computed: {
    ...mapState(['message','errormessage','successmessage','returndate_obj','sectionaltable_obj', 'activities_obj'
  ]),

  basic: function(){
    if(this.$store.state.sectionaltable_obj.length > 0){
      var formattedRecord = []
      this.$store.state.sectionaltable_obj.forEach(function(rec){
        formattedRecord.push({
         type: rec[0],sixyo: rec[1],twelveyo: rec[2],fifteenyo: rec[3],child: rec[4],adult: rec[5], older: rec[6], _rowVariant:rec[7]
       })
      })
      return formattedRecord;

    }else{
      return []
    }

  }

  },

  created(){
    this.listReturnDate();
    this.listSectionalTable();
    this.listActivitie().then(() => {
      this.checkbox_optionsupdate();
    });
  },

  data() {
    return {
      errors:[],
      Start_Date:"",
      End_Date:"",
      userChart: userChart,
      locationChart: locationChart,
      uch:"uch",
      lch:"lch",
      type1: "bar",
      type2: "pie",
      isActive: true,
      clinic: [],
      outreach: [{"name":"Refer Hp","value":true},{"name":"Refer Hyg","value":true},{"name":"Refer Dent","value":true},{"name":"Refer Dr","value":true},{"name":"Refer Other","value":true}],
      outreach_obj:"",
      seminar: [{"name":"Checkup / Screening"},{"name":"Relief of pain"},{"name":"Continuation of treatment plan"},{"name":"Other Problem"}],
      seminar_obj:"",
      training: [],
      checkbox_options:[],
      checkbox_selected:[],

      basicFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'sixyo', label: '6 yo'},
        { key: 'twelveyo', label: '12 yo'},
        { key: 'fifteenyo', label: '15 yo'},
        { key: 'child', label: 'Child'},
        // { key: 'adolescent', label: 'Adolescent'},
        { key: 'adult', label: 'Adult'},
        { key: 'older', label: 'Older Adults'},
      ],
      treatmentFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'exo', label: 'EXO'},
        { key: 'art', label: 'ART'},
        { key: 'seal', label: 'SEAL'},
        { key: 'sdf', label: 'SDF'},
        { key: 'fv', label: 'FV'},
        { key: 'contact', label: 'Contacts'},
      ],
      treatment:[
        {type: 'By Ward', exo: '30', art: '10', seal: '15', sdf: '15', fv: '40', contact: '31'},
        {type: 'Clinic', exo: '20', art: '30', seal: '15', sdf: '25', fv: '70', contact: '22'},
        {type: 'Seminar', exo: '30', art: '10', seal: '15', sdf: '15', fv: '40', contact: '34'},
        {type: 'Outreach', exo: '30', art: '10', seal: '15', sdf: '15', fv: '40', contact: '11'},
        {type: 'Training', exo: '110', art: '60', seal: '60', sdf: '70', fv: '190', contact: '98'},

      ],
    }
  },

  methods:{
    ...mapActions(['listReturnDate','listSectionalTable', 'listActivitie']),

    // checkbox_optionsupdate(){
    //   var activities_data=[]
    //   if (this.activities_obj.length>0){
    //     this.activities_obj.forEach(function(activity){
    //         activities_data.push({'text':activity.name,'value':activity.id})
    //     })
    //     this.checkbox_options = activities_data
    //   }
    //
    // },


    checkbox_optionsupdate(){
      var activities_data=[]
      var activities_data1=[]
      if (this.activities_obj.length>0){
        this.activities_obj.forEach(function(activity){
            activities_data.push({'text':activity.name,'value':activity.id})
            activities_data1.push(activity.id)

        })
        this.checkbox_options = activities_data
        this.checkbox_selected = activities_data1
      }

    },

    CrossSectionalForm(){
      var l=[0,0,0,0]
      var a=0
      this.checkbox_selected.forEach(function(e){
          l[a]=e;
          a++;
      })
      this.errors=[]
      if(this.seminar_obj==null){
        this.errors['seminar_obj']="Reason For Visit required."
        this.$bvToast.show('error-toast');
      }else if(this.outreach_obj==null){
        this.errors['outreach_obj']="Referral Type required."
        this.$bvToast.show('error-toast');
      }
      else if(this.checkbox_selected==""){
        this.errors['checkbox_selected']="Select on of the activities required."
        this.$bvToast.show('error-toast');
      }
      else(
      this.$store.dispatch("CreateSectionalTable",{'start_date':this.returndate_obj.last_30_days,'end_date':this.returndate_obj.today_date,"reason_for_visit":this.seminar_obj['name'],"referral_type":this.outreach_obj['name'],"health_post":l[0],"seminar":l[1],"outreach":l[2],"training":l[3]}).then(() => {
        if(this.errormessage.length>0){
          this.$bvToast.show('error-toast');
        }else if(this.successmessage=='success'){
          this.message = "",
          this.$bvToast.show('success-toast');
        }

      })
    )

    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../css/index.scss";

</style>
