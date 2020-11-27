<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Dashboard</h1>
        <p>
          Dashboard of Dental Hub.
        </p>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-4">1 Filter Data</h3>

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
                checked=true
                switches
                size="lg"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>

            <div class="col-lg-2 col-sm-12">
              <!-- <h6>Click Here:</h6> -->
              <b-button variant="custom" block class="mb-4" @click="OverviewTable">Submit</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3 text-center"> 1.1 Overview</h3>

          <div class="row mb-3 text-center" v-show="tablefilterdata">
            <div class="col-6">
              <p><strong>Start Date: </strong>{{this.table_start_date}}</p>
              <p><strong>End Date: </strong>{{this.table_end_date}}</p>
            </div>

            <div class="col-6">
              <p><strong>Location(s): </strong><span v-for ="(location,index) in table_location" :key="index">{{location}},</span></p>
              <p><strong>Activities: </strong><span v-for = "(activity,index) in table_activities" :key="index">{{activity}},</span></p>
            </div>
          </div>
          <b-table
            id="user-table"
            show-empty
            :items="basic"
            :fields="basicFields"
            responsive
            hover

            :busy="isBusy"
            class="text-center"
          >
            <template v-slot:cell(type)="row">
              <span v-html="row.item.type" >{{ row.item.type }}</span>
            </template>

            <template v-slot:table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" type="grow" style="width: 5rem; height: 5rem;"></b-spinner>
              </div>
            </template>

            <template v-slot:cell(basic)="row">
              {{ row.item.full_name }}
            </template>
          </b-table>
          <div class="row pr-4">
            <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
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

      <div v-if="errors.age_group">
        <p>{{ errors.age_group }}</p>
      </div>

      <div v-if="errors.age_group1">
        <p>{{ errors.age_group1 }}</p>
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
        Data is Successfully  filtered
    </b-toast>


    <div class="row mt-4">
      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3"> 1.2 Treatment Distribution </h3>
          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Start Date:</h6>
              <b-input v-model="returndate_obj.last_30_days" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select End Date:</h6>
              <b-input v-model="returndate_obj.today_date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Location:</h6>
              <multiselect
              v-model="bar_location"
              :options="options"
              :multiple="true"
              :preserve-search="true"
              placeholder="Select Location"
              label="name"
              open-direction="bottom"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Age Group/Activity:</h6>
              <multiselect
              v-model="age_group"
              :options="options1"
              :preserve-search="true"
              placeholder="Select Age Groups"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
            </div>
          </div>

          <div class="row">
            <div class="col-12 text-center justify-content-center">
              <!-- <h6>Click Here:</h6> -->
              <b-button variant="custom" class="mb-4" @click="Bargraphtreatment">Submit</b-button>
            </div>
          </div>

          <Visualization :tag="settingsgraph" v-show="showdataget1"></Visualization>
          <Visualization :tag="settingsgraphpost" v-show="showdatapost1"></Visualization>
        </div>
      </div>

      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3"> 1.3 Activity Distribution </h3>

          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Start Date:</h6>
              <b-input v-model="returndate_obj.last_30_days" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select End Date:</h6>
              <b-input v-model="returndate_obj.today_date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Location:</h6>
              <multiselect
              v-model="pie_location"
              :options="options"
              :multiple="true"
              :preserve-search="true"
              placeholder="Select Location"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Treatment Type:</h6>
              <multiselect
              v-model="age_group1"
              :options="options2"
              :preserve-search="true"
              placeholder="Select Activity"
              label="name"
              track-by="name"
              :preselect-first="true"

              >
              </multiselect>
            </div>
          </div>

          <div class="row">
            <div class="col-12 text-center">
              <!-- <h6>Click Here:</h6> -->
              <b-button variant="custom" class="mb-4" @click="PieChartForm">Submit</b-button>
            </div>
          </div>

          <Visualization :tag="piechart" v-show="showdataget"></Visualization>
          <Visualization :tag="piechartpost" v-show="showdatapost"></Visualization>
        </div>
      </div>
    </div>


    <div class="row mt-4 text-center table-area">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3"> 1.4 Treatment by Activity Table </h3>

          <div class="row mb-3 text-center" v-show="tablefilterdata">
            <div class="col-6">
              <p><strong>Start Date: </strong>{{this.table_start_date}}</p>
              <p><strong>End Date: </strong>{{this.table_end_date}}</p>
            </div>

            <div class="col-6">
              <p><strong>Location(s): </strong><span v-for ="(location,index) in table_location" :key="index">{{location}},</span></p>
              <p><strong>Activities: </strong><span v-for = "(activity,index) in table_activities" :key="index">{{activity}},</span></p>
            </div>
          </div>

            <b-table
              id="treatments-table"
              show-empty
              :items="treatmentTableItemsActivity"
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

    <div class="row mt-4 text-center table-area">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3"> 1.5 Treatment by Ward Table </h3>

          <div class="row mb-3 text-center" v-show="tablefilterdata">
            <div class="col-6">
              <p><strong>Start Date: </strong>{{this.table_start_date}}</p>
              <p><strong>End Date: </strong>{{this.table_end_date}}</p>
            </div>

            <div class="col-6">
              <p><strong>Location(s): </strong><span v-for ="(location,index) in table_location" :key="index">{{location}},</span></p>
              <p><strong>Activities: </strong><span v-for = "(activity,index) in table_activities" :key="index">{{activity}},</span></p>
            </div>
          </div>

            <b-table
              id="treatments-table"
              show-empty
              :items="treatmentTableItemsWard"
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

    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3"> 1.6 Line Graph of Contacts </h3>
          <Visualization :tag="lch6"></Visualization>
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
import years from '../js/year_array.js';

// const axios = require('axios');
export default {
  name: "IndexPage",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader,
    'Visualization': Visualization
  },
  computed: {
    ...mapState(['errormessage','successmessage','message','overviewbargraphpost_obj','dashboard_piechartpost','returndate_obj', 'overviewtable_obj', 'treatment_by_activity_obj', 'treatment_by_ward_obj', 'geography', 'activities_obj'
    ]),

    basic: function(){
      this.isBusy = true;
      if(this.$store.state.overviewtable_obj.length > 0){
        var formattedRecord = []
        this.$store.state.overviewtable_obj.forEach(function(rec){
          formattedRecord.push({
           type: rec[0], check: rec[1], ext: rec[2], art: rec[3], seal: rec[4], sdf: rec[5],fullmouthsdf:rec[6], fv: rec[7], referhp: rec[8], referhyg: rec[9], referdent: rec[10], referdr: rec[11], referother:rec[12],_rowVariant:rec[13]
         });
       });
        this.isBusy = false;
        return formattedRecord;
      }
    },

    treatmentTableItemsActivity:function(){
      this.isBusy = true;
      if(this.$store.state.treatment_by_activity_obj.length > 0){
        var formattedRecord1 = []
        this.$store.state.treatment_by_activity_obj.forEach(function(rec){
          formattedRecord1.push({
           type: rec[0], check: rec[1], ext: rec[2], art: rec[3], seal: rec[4], sdf: rec[5],fullmouthsdf:rec[6], fv: rec[7], referhp: rec[8], referhyg: rec[9], referdent: rec[10], referdr: rec[11], referother:rec[12]
          })
        })
        this.isBusy = false;
        return formattedRecord1;
      }
    },

    treatmentTableItemsWard: function(){
      this.isBusy = true;
      if(this.$store.state.treatment_by_ward_obj.length > 0){
        var formattedRecord2 = []
        this.$store.state.treatment_by_ward_obj.forEach(function(rec){
          formattedRecord2.push({
            type: rec[0], check: rec[1], ext: rec[2], art: rec[3], seal: rec[4], sdf: rec[5],fullmouthsdf:rec[6], fv: rec[7], referhp: rec[8], referhyg: rec[9], referdent: rec[10], referdr: rec[11], referother:rec[12]
          });
        });
        this.isBusy = false;
        return formattedRecord2;
      }
    },


  },

  created(){
    this.listReturnDate();
    this.listOverviewTable();
    this.listTreatmentbyActivity();
    this.listTreatmentbyWard();
    this.listGeography().then(() => {
      this.updateOptions();})
    this.listActivitie().then(() => {
      this.checkbox_optionsupdate();})
  },

  data() {
    return {
      Start_Date:"",
      age_group:"",
      age_group1:"",
      End_Date:"",
      userChart: userChart,
      locationChart: locationChart,
      uch:"uch",
      settingsgraph: "settingsgraph",
      lch:"lch",
      piechart: "piechart",
      lch6:"lch6",
      errors:[],
      isActive: true,
      location: [],
      pie_location:[],
      bar_location:[],
      options: [{'name':'All Location','language':null}],
      options1:[{"name":"Age Group"},{"name":"Activity"}],
      options2:[{"name":"All Treatment Type","value":"alltreatment"},{"name":"EXO","value":"exo"},{"name":"ART","value":"art"},{"name":"SEAL","value":"seal"},{"name":"SDF","value":"sdf"},{"name":"FV","value":"fv"}],
      years_array: years(100).reverse(),
      selected_year: "",
      isBusy: false,
      tablefilterdata: false,
      ward_selected: ['Test ward', 'Lakeside', 'Sarangkot', 'Kaskikot', 'Salyan', 'Thumki', 'Deurali', 'Rupakot', 'Hansapur', 'Tilahar', 'Katuwachaupari'],

      checkbox_selected: [],
      checkbox_options: [],
      date_error:'',
      showdataget:true,
      showdatapost:false,
      showdataget1:true,
      showdatapost1:false,
      piechartpost: "piechartpost",
      settingsgraphpost:"settingsgraphpost",
      user_location:[],
      table_start_date:'',
      table_end_date:'',
      table_location:[],
      table_activities:[],

      basicFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold text-left'},
        { key: 'check', label: 'Check'},
        { key: 'ext', label: 'EXT'},
        { key: 'art', label: 'ART'},
        { key: 'seal', label: 'SEAL'},
        { key: 'sdf', label: 'SDF'},
        { key: 'fullmouthsdf', label: 'Full Mouth SDF'},
        { key: 'fv', label: 'FV (ppl)'},
        { key: 'referhp', label: 'Refer HP'},
        { key: 'referhyg', label: 'Refer Hyg'},
        { key: 'referdent', label: 'Refer Dent'},
        { key: 'referdr', label: 'Refer Dr'},
        { key: 'referother', label: 'Refer Other'},
      ],
    }
  },

  methods:{
    ...mapActions(['listReturnDate','listOverviewTable','listTreatmentbyActivity','listTreatmentbyWard','listGeography','listActivitie']),

    OverviewTable(){
      var activities_details = this.activities_obj
      var table_activities1 = []
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
        this.errors['checkbox_selected']="Select one of the activities required."
        this.$bvToast.show('error-toast');
      }
      else(

        this.checkbox_selected.forEach(function(activities_id){
          table_activities1.push(activities_details.find(evt => evt.id == activities_id).name)
        }),
        this.table_start_date=this.returndate_obj.last_30_days,
        this.table_end_date = this.returndate_obj.today_date,
        this.table_activities = table_activities1,
        this.tablefilterdata = true,
        this.$store.dispatch("CreateOverViewVisualization",{'start_date':this.returndate_obj.last_30_days,'end_date':this.returndate_obj.today_date,"location":this.user_location,"activities":this.checkbox_selected}),
        this.$store.dispatch("CreateTreatmentbyActivity",{'start_date':this.returndate_obj.last_30_days,'end_date':this.returndate_obj.today_date,"location":this.user_location,"activities":this.checkbox_selected}),
        this.$store.dispatch("CreateTreatmentbyWard",{'start_date':this.returndate_obj.last_30_days,'end_date':this.returndate_obj.today_date,"location":this.user_location,"activities":this.checkbox_selected}).then(() => {
          if(this.errormessage.length>0){
            this.$bvToast.show('error-toast');
          }else if(this.successmessage=='success'){
            this.message = "",
            this.$bvToast.show('success-toast');
          }

        })
      )


    },

    Bargraphtreatment(){
      this.errors=[]
      if (this.bar_location.length>0){
        var geography_id = []
        this.bar_location.forEach(function(location_id){
          if (location_id.language!=null){
            geography_id.push(location_id.language)
          }
        })
      }
      if(this.age_group==null){
        this.errors['age_group']="Age Group required."
        this.$bvToast.show('error-toast');
      }else(
        this.showdatapost1 = true,
        this.showdataget1 = false,
        this.overviewbargraphpost_obj = [],
        this.$store.dispatch("CreateTreatmentBarGraph",{'start_date':this.returndate_obj.last_30_days,'end_date':this.returndate_obj.today_date,"location":geography_id,"age_group":this.age_group['name']})
      )


    },

    PieChartForm(){
      this.errors=[]
      if (this.pie_location.length>0){
        var geography_id = []
        this.pie_location.forEach(function(location_id){
          if (location_id.language!=null){
            geography_id.push(location_id.language)
          }
        })
        this.user_location = geography_id
      }if(this.age_group1==null){
        this.errors['age_group1']="Treatment Type/Age Group required."
        this.showdataget = true
        this.$bvToast.show('error-toast');
      }
      else(
        this.showdatapost = true,
        this.showdataget = false,
        this.dashboard_piechartpost=[],
        this.$store.dispatch("CreateDashboardPieChart",{'start_date':this.returndate_obj.last_30_days,'end_date':this.returndate_obj.today_date,"location":this.user_location,"age_group":this.age_group1['value']})

      )


    },

    WardLineVisualization(){
      this.errors=[]
      if(this.Start_Date==''){
        this.errors['Start_Date']="Start date required."
        this.$bvToast.show('error-toast');
      }
      else(
          this.$store.dispatch("CreateWardLineVisualization",{'start_date':this.Start_Date})
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
  .pk{
    color: red;
  }

</style>
