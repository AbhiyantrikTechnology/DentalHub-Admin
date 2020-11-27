<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Treatment Data</h1>
        <p>
          Graphical representation of treatment data.
        </p>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-4">Filter Table Data</h3>

          <div class="row">
            <div class="col-lg-4 col-sm-12 mb-4">
              <h6>Select Start Date:</h6>
              <b-input v-model="returndate_obj.last_30_days" type="date"/>
            </div>

            <div class="col-lg-4 col-sm-12 mb-4">
              <h6>Select End Date:</h6>
              <b-input v-model="returndate_obj.today_date" type="date"/>
            </div>

            <div class="col-lg-4 col-sm-12 mb-4">
              <h6>Location:</h6>
              <multiselect
              v-model="location"
              :options="options"
              :multiple="true"
              :preserve-search="true"
              placeholder="Select Location"
              label="name"
              track-by="name"
              open-direction="bottom"
              :preselect-first="true"
              >
              </multiselect>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-10 col-sm-12">
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
              <b-button variant="custom" block class="mb-4" @click="BasicStrategicForm">Submit</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Basic Data</h3>

          <div class="row mb-3 text-center" v-show="tablefilterdata">
            <div class="col-6">
              <p><strong>Start Date: </strong>{{this.table_start_date}}</p>
              <p><strong>End Date: </strong>{{this.table_end_date}}</p>
            </div>

            <div class="col-6">
              <p><strong>Location(s): </strong><span v-for ="location in table_location">{{location}},</span></p>
              <p><strong>Activities: </strong><span v-for = "activity in table_activities">{{activity}},</span></p>
            </div>
          </div>

          <b-table
          id="user-table"
          show-empty
          :items="basic"
          :fields="basicFields"
          responsive
          hover
          :busy = "isBusy"
          >
            <template v-slot:table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" type="grow" style="width: 5rem; height: 5rem;"></b-spinner>
              </div>
            </template>
          </b-table>
        </div>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Strategic Data</h3>

          <div class="row mb-3 text-center" v-show="tablefilterdata">
            <div class="col-6">
              <p><strong>Start Date: </strong>{{this.table_start_date}}</p>
              <p><strong>End Date: </strong>{{this.table_end_date}}</p>
            </div>

            <div class="col-6">
              <p><strong>Location(s): </strong><span v-for ="location in table_location">{{location}},</span></p>
              <p><strong>Activities: </strong><span v-for = "activity in table_activities">{{activity}},</span></p>
            </div>
          </div>

          <b-table
          id="user-table"
          show-empty
          :items="strategic"
          :fields="strategicFields"
          responsive
          hover
          :busy = "isBusy"
          >
            <template v-slot:table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" type="grow" style="width: 5rem; height: 5rem;"></b-spinner>
              </div>
            </template>
          </b-table>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Line Chart of Preventive Ratio</h3>
          <div class="row">
            <div class="col-12">
              <Visualization :tag="preventiveRatio" :type="type1" :clean-data="userChart"></Visualization>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3">Line Chart of Early Intervention Ratio</h3>
          <div class="row">
            <div class="col-12">
              <Visualization :tag="interventionRatio" :type="type1" :clean-data="userChart"></Visualization>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3">Line Chart of Recall Percentage</h3>
          <div class="row">
            <div class="col-12">
              <Visualization :tag="perRecall" :type="type1" :clean-data="userChart"></Visualization>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Download Reports</h3>
          <div class="row text-center">
            <div class="col-md-6 col-12">
              <b-dropdown text="Quaterly Report" variant="outline-info" class="m-2" dropup>
                <b-dropdown-item href="#">December, 2018</b-dropdown-item>
                <b-dropdown-item href="#">April, 2019</b-dropdown-item>
                <b-dropdown-item href="#">August, 2019</b-dropdown-item>
              </b-dropdown>
            </div>

            <div class="col-md-6 col-12">
              <b-dropdown text="Yearly Report" variant="outline-info" class="m-2" dropup>
                <b-dropdown-item href="#">2019</b-dropdown-item>
                <b-dropdown-item href="#">2018</b-dropdown-item>
                <b-dropdown-item href="#">2017</b-dropdown-item>
              </b-dropdown>
            </div>
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
      <div v-if="errors.location">
        <p>{{ errors.location }}</p>
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
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue';
import Visualization from './Visualization';
import userChart from '../js/userchart.js';
import locationChart from '../js/locationchart.js';
import years from '../js/year_array.js';

// const axios = require('axios');
export default {
  name: "Treatment",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader,
    'Visualization': Visualization
  },
  computed: {
    ...mapState(['errormessage', 'successmessage', 'message','returndate_obj','treatment_tablebasicdata_obj','treatmentstrategicdata_obj','geography', 'activities_obj'
    ]),

    basic: function(){
      this.isBusy = true;
      if(this.$store.state.treatment_tablebasicdata_obj.length > 0){
        var formattedRecord3 = []
        this.$store.state.treatment_tablebasicdata_obj.forEach(function(rec){
          formattedRecord3.push({
           type: rec[0], male: rec[1], female: rec[2], child: rec[3], adult: rec[4], senior: rec[5], total: rec[6]
         })
        })
        this.isBusy = false;
        return formattedRecord3;

      }

    },

    strategic: function(){
      this.isBusy = true;
      if(this.$store.state.treatmentstrategicdata_obj.length > 0){
        var formattedRecord5 = []
        this.$store.state.treatmentstrategicdata_obj.forEach(function(rec){
          formattedRecord5.push({
           type: rec[0], male: rec[1], female: rec[2], child: rec[3], adult: rec[4], senior: rec[5], total: rec[6]
         })
        })
        this.isBusy = false;
        return formattedRecord5;
      }
    }

  },

  created(){
    this.listReturnDate();
    this.listTreatmentTableBasicData();
    this.listTreatmentStrategicData();
    this.listGeography().then(() => {
      this.updateOptions();
    });
    this.listActivitie().then(() => {
      this.checkbox_optionsupdate();
    });
  },

  data() {
    return {
      userChart: userChart,
      locationChart: locationChart,
      uch:"uch",
      lch:"lch",
      uch1:"uch1",
      preventiveRatio:"preventiveRatio",
      interventionRatio: "interventionRatio",
      perRecall: "perRecall",
      type1: "bar",
      type2: "pie",
      isActive: true,
      errors:[],
      years_array: years(100).reverse(),
      selected_year: "",
      Start_Date: "",
      End_Date: "",
      location: [],
      options: [{'name':'All Location','language':null}],
      checkbox_options:[],
      checkbox_selected:[],
      isBusy: false,
      user_location:[],
      tablefilterdata:false,
      table_start_date:"",
      table_end_date:"",
      table_activities:[],
      table_location:[],

      basicFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'male', label: 'Male'},
        { key: 'female', label: 'Female'},
        { key: 'child', label: 'Child (< 18Y)'},
        { key: 'adult', label: 'Adult (19Y - 60Y)'},
        { key: 'senior', label: 'Other Adult (>60Y)'},
        { key: 'total', label: 'Total'},
      ],

      strategicFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'male', label: 'Male'},
        { key: 'female', label: 'Female'},
        { key: 'child', label: 'Child (< 18Y)'},
        { key: 'adult', label: 'Adult (19Y - 60Y)'},
        { key: 'senior', label: 'Other Adult (>60Y)'},
        { key: 'total', label: 'Total'},
      ],
    }
  },

  methods:{
    ...mapActions(['listReturnDate','listTreatmentStrategicData','listTreatmentTableBasicData','listGeography', 'listActivitie']),

    BasicStrategicForm(){
      var activities_details = this.activities_obj
      var table_activities = []
      var l=[0,0,0,0]
      var p = []
      var a=0
      this.checkbox_selected.forEach(function(e){
        p.push(e)
          l[a]=e;
          a++;
      })
      this.errors=[]
      if (this.location.length>0){
        var geography_id =[]
        var geography_name = []
        this.location.forEach(function(location_id){
          if (location_id.language!=null){
            geography_id.push(location_id.language)
            geography_name.push(location_id.name)
          }

          })
        this.user_location = geography_id
        this.table_location = geography_name
      }
      if(this.checkbox_selected==""){
        this.errors['checkbox_selected']="Select on of the activities required."
        this.$bvToast.show('error-toast');
      }
      else(
        p.forEach(function(activities_id){
          table_activities.push(activities_details.find(evt => evt.id == activities_id).name)
        }),
        this.table_start_date=this.returndate_obj.last_30_days,
        this.table_end_date = this.returndate_obj.today_date,
        this.table_activities = table_activities,
        this.tablefilterdata = true,
        this.$store.dispatch("CreateTableBasicDataVisualization",{'start_date':this.returndate_obj.last_30_days,'end_date':this.returndate_obj.today_date,"location":this.user_location,"health_post":l[0],"seminar":l[1],"outreach":l[2],"training":l[3]}),
        this.$store.dispatch("CreateStrategicDataVisualization",{'start_date':this.returndate_obj.last_30_days,'end_date':this.returndate_obj.today_date,"location":this.user_location,"health_post":l[0],"seminar":l[1],"outreach":l[2],"training":l[3]}).then(() => {
          if(this.errormessage.length>0){
            this.$bvToast.show('error-toast');
          }else if(this.successmessage=='success'){
            this.message = "",
            this.$bvToast.show('success-toast');
          }

        })
      )
    },


    updateOptions(){
      var geography_data=[{'name':'All Location','language':null}]
      if (this.geography.length>0){
        this.geography.forEach(function(geography_obj){
            geography_data.push({'name':geography_obj.name,'language':geography_obj.id})
        })
        this.options = geography_data
      }

    },

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


  }
};
</script>

<style lang="scss" scoped>
  @import "../css/index.scss";

</style>
