<template>
<div id="app">

  <div class="contents">
    <div class="row mb-4">


      <div class="col-md-4 col-12 pt-4 d-flex align-content-center flex-wrap">
        <LoginForm></LoginForm>
      </div>


      <div class="col-md-8 col-12">
        <div class="row mt-4" data-aos="fade-left" data-aos-duration="3200">
          <div class="col-12">
            <div class="card shadow static-card">
              <h1 class="mb-4">Help Dental Hub</h1>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import LoginForm from './LoginForm';

const axios = require('axios');
export default {
  name: "Help",
  components:{
    'LoginForm': LoginForm,
  },

  data() {
    return {

    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../css/loginpage.scss";

</style>
