<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Longitudinal Measures of Disease</h1>
        <p>
          Graphical representation of Longitudinal Measures.
        </p>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Filter Data</h3>
          <div class="row mb-3">
            <div class="col-md-6 col-sm-12">
              <h5>Time Frame 1</h5>

              <div class="row">
                <div class="col-6">
                  <h6>Select Start Date:</h6>
                  <b-input v-model="frame1_start_date" type="date"/>
                </div>

                <div class="col-6">
                  <h6>Select End Date:</h6>
                  <b-input v-model="frame1_end_date"  type="date"/>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-sm-12">
              <h5>Time Frame 2</h5>

              <div class="row">
                <div class="col-6">
                  <h6>Select Start Date:</h6>
                  <b-input v-model="frame2_start_date"  type="date"/>
                </div>

                <div class="col-6">
                  <h6>Select End Date:</h6>
                  <b-input v-model="frame2_end_date"  type="date"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-4 col-sm-12">
              <h6>Select the Reason for Visit:</h6>

              <multiselect
              v-model="seminar_obj"
              :options="seminar"
              :preserve-search="true"
              placeholder="Reason for Visit"
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
                checked=true
                switches
                size="lg"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>

            <div class="col-lg-2 col-sm-12">
              <!-- <h6>Click Here:</h6> -->
              <b-button variant="custom" block class="mb-4" @click="LongitudinalForm">Submit</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <b-toast id="error-toast" variant="warning" solid append-toast toaster="b-toaster-bottom-full">
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Overview filter required error</strong>
      </div>
      <div v-if="errors.frame1_start_date">
        <p>{{ errors.frame1_start_date }}</p>
      </div>
      <div v-if="errors.frame1_end_date">
        <p>{{ errors.frame1_end_date }}</p>
      </div>

      <div v-if="errors.frame2_start_date">
        <p>{{ errors.frame2_start_date }}</p>
      </div>
      <div v-if="errors.frame2_end_date">
        <p>{{ errors.frame2_end_date }}</p>
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

      <div v-if="message">
        <p>{{this.message }}</p>
      </div>

    </b-toast>

    <b-toast id="success-toast" variant="custom-success" solid append-toast toaster="b-toaster-bottom-full">
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Filtered success</strong>
      </div>
        Data is Successfully  Filtered
    </b-toast>


    <b-tabs class="mt-4" pills>
      <b-tab :title="sample_frame[0]" active>
        <!-- <b-card-text> -->
          <div class="row mt-4">
            <div class="col-12">
              <div class="card shadow">
                <h3 class="mb-3 text-center">Longitudinal Measures for {{ this.sample_frame [0] }}</h3>
                <b-table-simple hover responsive>
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col/>
                    <col />
                    <col />
                  </colgroup>
                  <b-thead head-variant="dark">
                    <b-th class="text-center" v-for="fields in longitudinalFields">{{ fields.label }}</b-th>
                  </b-thead>

                  <b-tbody>
                    <b-tr v-for="items in longitudinalItems">
                      <th v-html="items.type"> {{ items.type }} </th>
                      <td class="text-center"> {{ items.tw1 }} </td>
                      <td class="text-center"> {{ items.tw2 }} </td>
                      <td class="text-center"> {{ items.realDifference }} </td>
                      <!-- <td class="text-center align-middle" rowspan="4" v-if="items.realDifference"> {{ items.realDifference }} </td> -->
                      <!-- <td class="text-center align-middle" v-else></td> -->
                      <td class="text-center"> {{ items.propDifference }} </td>
                      <td class="text-center"> {{ items.pValue }} </td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
                <div class="row pr-4">
                  <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
                </div>
              </div>
            </div>
          </div>
        <!-- </b-card-text> -->
      </b-tab>


      <b-tab :title="sample_frame[1]">
        <!-- <b-card-text> -->
          <div class="row mt-4">
            <div class="col-12">
              <div class="card shadow">
                <h3 class="mb-3 text-center">Longitudinal Measures for {{ this.sample_frame [1] }}</h3>

                <b-table-simple hover responsive>
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col/>
                    <col />
                    <col />
                  </colgroup>
                  <b-thead head-variant="dark">
                    <b-th class="text-center" v-for="fields in longitudinalFields">{{ fields.label }}</b-th>
                  </b-thead>

                  <b-tbody>
                    <b-tr v-for="items in longitudinalItems1">
                      <th v-html="items.type"> {{ items.type }} </th>
                      <td class="text-center"> {{ items.tw1 }} </td>
                      <td class="text-center"> {{ items.tw2 }} </td>
                      <td class="text-center"> {{ items.realDifference }} </td>
                      <!-- <td class="text-center align-middle" rowspan="4" v-if="items.realDifference"> {{ items.realDifference }} </td> -->
                      <!-- <td class="text-center align-middle" v-else></td> -->
                      <td class="text-center"> {{ items.propDifference }} </td>
                      <td class="text-center"> {{ items.pValue }} </td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
                <div class="row pr-4">
                  <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
                </div>
              </div>
            </div>
          </div>
        <!-- </b-card-text> -->
      </b-tab>
    </b-tabs>

  </div>
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue';
// import Visualization from './Visualization';
import userChart from '../js/userchart.js';
import locationChart from '../js/locationchart.js';

// const axios = require('axios');
export default {
  name: "Longitudinal",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader,
    // 'Visualization': Visualization
  },
  computed: {
    ...mapState(['successmessage','sectionaltable_obj','longitudinalmeasures_obj','longitudinalmeasures_obj1', 'activities_obj','errormessage', 'message'
  ]),

  longitudinalItems: function(){
    if(this.$store.state.longitudinalmeasures_obj.length > 0){
      var formattedRecord1 = []
      this.$store.state.longitudinalmeasures_obj.forEach(function(rec){
        formattedRecord1.push({
         type: rec[0],tw1: rec[1],tw2: rec[2],realDifference: rec[3],propDifference: rec[4],pValue: rec[5], older: rec[6]
       })
      })
      return formattedRecord1;

    }else{
      return []
    }

  },

  longitudinalItems1: function(){
    if(this.$store.state.longitudinalmeasures_obj1.length > 0){
      var formattedRecord2 = []
      this.$store.state.longitudinalmeasures_obj1.forEach(function(rec){
        formattedRecord2.push({
         type: rec[0],tw1: rec[1],tw2: rec[2],realDifference: rec[3],propDifference: rec[4],pValue: rec[5], older: rec[6]
       })
      })
      return formattedRecord2;

    }else{
      return []
    }

  },
  },

  created(){
    this.listSectionalTable();
    this.listLongitudinalMeasures();
    this.listActivitie().then(() => {
      this.checkbox_optionsupdate();
    });
  },

  data() {
    return {
      frame1_start_date:"",
      frame1_end_date:"",
      frame2_start_date:"",
      frame2_end_date:"",
      locationChart: locationChart,
      uch:"uch",
      lch:"lch",
      type1: "bar",
      type2: "pie",
      isActive: true,
      outreach: [{"name":"Refer Hp","value":true},{"name":"Refer Hyg","value":true},{"name":"Refer Dent","value":true},{"name":"Refer Dr","value":true},{"name":"Refer Other","value":true}],
      outreach_obj:"",
      seminar: [{"name":"Checkup / Screening"},{"name":"Relief of pain"},{"name":"Continuation of treatment plan"},{"name":"Other Problem"}],
      seminar_obj:"",
      clinic: [],
      training: [],
      sample_frame: ['Sample Frame #1', 'Sample Frame #2'],
      checkbox_options:[],
      checkbox_selected:[],
      errors:[],

      longitudinalFields: [
        { key: 'type', label: '' },
        { key: 'tw1', label: 'Time Window 1' },
        { key: 'tw2', label: 'Time Window 2' },
        { key: 'realDifference', label: 'Real Difference' },
        { key: 'propDifference', label: 'Proportional Difference' },
        { key: 'pValue', label: 'P-value' },
      ],
      // longitudinalItems:[
      //   { type: 'Carries Risk'},
      //   { type: '<span class="ml-4">Low</span>', tw1: '10', tw2: '30', realDifference: '10', propDifference: '15', pValue: '40' },
      //   { type: '<span class="ml-4">Medium</span>', tw1: '10', tw2: '30', propDifference: '15', pValue: '40' },
      //   { type: '<span class="ml-4">High</span>', tw1: '10', tw2: '30', propDifference: '15', pValue: '40' },
      //   { type: 'Any untreated caries present', tw1: '50', tw2: '20', propDifference: '15', pValue: '70' },
      //   { type: 'Number of decayed primary teeth', tw1: '10', tw2: '30', realDifference: '10', propDifference: '15', pValue: '40' },
      //   { type: 'Number of decayed permanent teeth', tw1: '10', tw2: '30', propDifference: '15', pValue: '40' },
      //   { type: 'Cavity permanent molar or premolar', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
      //   { type: 'Cavity permanent anterior', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
      //   { type: 'Active infection', tw1: '80', tw2: '110', realDifference: '60', propDifference: '60', pValue: '190' },
      //   { type: 'Mouth pain due to reversible pulpitis', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
      //   { type: 'Need ART filling', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
      //   { type: 'Need SDF', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
      //   { type: 'Need Extraction', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
      //
      // ],
    }
  },

  methods:{
    ...mapActions(['listSectionalTable','listLongitudinalMeasures', 'listActivitie']),

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

    LongitudinalForm(){
      var l=[0,0,0,0]
      var a=0
      this.checkbox_selected.forEach(function(e){
          l[a]=e;
          a++;
      })
      this.errors=[]
      if(this.frame1_start_date==''){
        this.errors['frame1_start_date']="Frame1 Start date required."
        this.$bvToast.show('error-toast');
      }
      else if(this.frame1_end_date==""){
        this.errors['frame1_end_date']="Frame1 End date required."
        this.$bvToast.show('error-toast');
      }else if(this.frame2_start_date==""){
        this.errors['frame2_start_date']="Frame2 Start date required."
        this.$bvToast.show('error-toast');
      }else if(this.frame2_end_date==""){
        this.errors['frame2_end_date']="Frame2 End date required."
        this.$bvToast.show('error-toast');
      }
      else if(this.seminar_obj==null){
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
      this.$store.dispatch("CreateLongitudinal",{'frame1_start_date':this.frame1_start_date,'frame1_end_date':this.frame1_end_date,'frame2_start_date':this.frame2_start_date,'frame2_end_date':this.frame2_end_date,"reason_for_visit":this.seminar_obj['name'],"referral_type":this.outreach_obj['name'],"health_post":l[0],"seminar":l[1],"outreach":l[2],"training":l[3]}).then(() => {
        if(this.errormessage=='errormessage'){
          this.$bvToast.show('error-toast');
        }else if(this.successmessage=='success'){
          this.$bvToast.show('success-toast');
        }

      }),
      this.$store.dispatch("CreateLongitudinal1",{'frame1_start_date':this.frame1_start_date,'frame1_end_date':this.frame1_end_date,'frame2_start_date':this.frame2_start_date,'frame2_end_date':this.frame2_end_date,"reason_for_visit":this.seminar_obj['name'],"referral_type":this.outreach_obj['name'],"health_post":l[0],"seminar":l[1],"outreach":l[2],"training":l[3]})
    )

  }
  }
};
</script>

<style lang="scss" scoped>
  @import "../css/index.scss";

</style>
