<template>
<div id="app" class="app-content">
  <div  v-show="spinner" class="text-center mt-5">
    <b-spinner variant="primary" type="grow" label="Loading Visualization" style="width: 5rem; height: 5rem;" ></b-spinner>
  </div>
  <canvas :id="tag"></canvas>
  <!-- <div class="row pr-4">
    <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
  </div> -->
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
  name: "Visualization",
  props:["tag"],
  components:{
  },
  mounted: function(){
    // write a condition to check visualization has been set in state
    //  no need to pass cleanData

  },
  computed: {
    ...mapState([
      'overviewbargraph_obj','overviewbargraphpost_obj','overviewpiechart_obj','dashboard_piechartpost', 'overviewlinechart_obj','preventionrati_obj','earlyintervention_obj','recalldistribution_obj'
    ])
  },
  watch: {
    overviewbargraphpost_obj: function(){
      this.spinner = true;
      if(this.overviewbargraphpost_obj.locationChart){
        this.spinner = false;
        this.createOverViewBarGraphPost();
      }
    },

    dashboard_piechartpost: function(){
      this.spinner = true;
      if(this.dashboard_piechartpost.locationChart){
        this.spinner = false;
        this.createOverViewPiChartGraphPost();
      }
    },
  },

  created(){
    this.spinner = true;
    this.listOverviewBarGraph().then(() => {
      this.createOverViewBarGraph();
    })


    this.listOverviewPieChartGraph().then(() =>{
      this.createOverViewPiChartGraph();})

    this.listDashboardLineChartGraph().then(() => {
      this.createOverViewLineChart();})

    this.listTreatmentPreventionRatio().then(() => {
      this.createTreatmentLineChart();})

    this.listEarlyIntervention().then(() =>{
      this.createTreatmentLineChart1();})

    this.listRecallDistribution().then(() =>{
      this.createTreatmentLineChart2();})
    this.spinner = false;

  },
  methods:{
    ...mapActions(['listOverviewBarGraph','listOverviewPieChartGraph','listDashboardLineChartGraph','listEarlyIntervention','listRecallDistribution','listTreatmentPreventionRatio',]),


    createOverViewBarGraph() {
      const ctx = document.getElementById('settingsgraph');
      const _ = new Chart(ctx, {
        type: 'bar',
        data: this.overviewbargraph_obj.locationChart.data,
        options: this.overviewbargraph_obj.locationChart.options,
      });
    },
    createOverViewBarGraphPost() {
      const ctx = document.getElementById('settingsgraphpost');
      if (window.MyChart1 != undefined){
        window.MyChart1.destroy();
      }
      window.MyChart1 = new Chart(ctx, {
        type: 'bar',
        data: this.overviewbargraphpost_obj.locationChart.data,
        options: this.overviewbargraphpost_obj.locationChart.options,
      });
    },

    createOverViewLineChart() {
      const ctx = document.getElementById('lch6');
      const _ = new Chart(ctx, {
        type: 'line',
        data: this.overviewlinechart_obj.locationChart.data,
        options: this.overviewlinechart_obj.locationChart.options,

      });
    },

    createOverViewPiChartGraph(){
      const ctx = document.getElementById('piechart');
      const _ = new Chart(ctx, {
        type: 'pie',
        data: this.overviewpiechart_obj.locationChart.data,
        options: this.overviewpiechart_obj.locationChart.options,

      })

    },

    createOverViewPiChartGraphPost(){
      const ctx = document.getElementById('piechartpost');
      if (window.MyChart != undefined){
        window.MyChart.destroy();
      }
      window.MyChart = new Chart(ctx, {
          type: 'pie',
          data: this.dashboard_piechartpost.locationChart.data,
          options: this.dashboard_piechartpost.locationChart.options,

        });
    },

    createTreatmentLineChart() {
      const ctx = document.getElementById('preventiveRatio');
      const _ = new Chart(ctx, {
        type: 'line',
        data: this.preventionrati_obj.locationChart.data,
        options: this.preventionrati_obj.locationChart.options,
      });
    },

    createTreatmentLineChart1() {
      const ctx = document.getElementById('interventionRatio');
      const _ = new Chart(ctx, {
        type: 'line',
        data: this.earlyintervention_obj.locationChart.data,
        options: this.earlyintervention_obj.locationChart.options,
      });
    },


    createTreatmentLineChart2() {
      const ctx = document.getElementById('perRecall');
      const _ = new Chart(ctx, {
        type: 'line',
        data: this.recalldistribution_obj.locationChart.data,
        options: this.recalldistribution_obj.locationChart.options,
      });
    },
  },

  data(){
    return{
      spinner: false
    }
  },



};
</script>

<style lang="scss" scoped>
  @import '../css/style.scss';
</style>
