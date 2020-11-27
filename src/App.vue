<template>
<div id="app">

<router-view></router-view>

</div>
</template>

<script>
import IndexPage from './components/IndexPage.vue';

export default {
  name: "app",
  components:{
    "index-page": IndexPage,
  },
  data() {
    return {
      //
    }
  },
  mounted: function() {
    // Test Your API Endpoint URL
    // console.log("API Endpoint: ", process.env.VUE_APP_SERVICE_URL);
  }
};
</script>
