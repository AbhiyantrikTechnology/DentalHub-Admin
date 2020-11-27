<template>
<div class="app-content">
  <canvas :id="tag"></canvas>
  <!-- <div class="row pr-4">
    <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-3">Export Now</i></a></small>
  </div> -->
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
  name: "LoginVisualization",
  props:["cleanData","tag", "type"],
  components:{
  },
  // mounted: function(){
  //   this.createChart(this.tag);
  // },

  computed: {
    ...mapState(['loginvisualization'])
  },

  watch: {
    loginvisualization: function(){
      if(this.loginvisualization.locationChart){
        this.createChart();
      }
    },
  },

  created(){
    this.listLoginVisualization();
  },

  methods:{
    ...mapActions(['listLoginVisualization']),
    createChart() {
      const ctx = document.getElementById(this.tag);
      // ctx.height = 385;
      // ctx.width = 770;
      const _ = new Chart(ctx, {
        type: 'pie',
        data: this.loginvisualization.locationChart.data,
        options: this.loginvisualization.locationChart.options,
      });
    }
  },

  data(){
    return{

    }
  }


};
</script>

<style lang="scss" scoped>
  @import '../css/style.scss';
</style>
