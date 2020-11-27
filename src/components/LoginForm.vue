<template>
<div id="app" class="d-flex align-content-center flex-wrap">
    <div class="card shadow text-center login-card" data-aos="fade-right" data-aos-duration="3200">
      <b-img src="/dentallogo.png" fluid class="align-self-center mb-4"></b-img>
      <h4 class="mb-4 text-primary">Login as Admin to continue</h4>
      <b-form @submit.prevent>
        <b-form-group class="pb-3" label-for="email">
          <b-form-input id="email" type="email" v-model="username" placeholder="Email Address"></b-form-input>
        </b-form-group>

        <b-form-group class="pb-3" label-for="password">
          <b-form-input id="password" type="password" v-model="password" placeholder="Password"></b-form-input>
        </b-form-group>

        <div class="col-md-12 submit-button text-center">
          <b-button block variant="custom" type="submit" @click="processLogin">Sign in</b-button>
        </div>
      </b-form>
      <div class="row mt-4 justify-content-center">
        <b-nav pills>
          <b-nav-item to="/" :active-class="toggleClass('loginpage')">Overview</b-nav-item>
          <b-nav-item to="/about" :active-class="toggleClass('about')">About</b-nav-item>
          <b-nav-item to="/help" :active-class="toggleClass('help')">Help</b-nav-item>
          <b-nav-item to="/privacypolicy" :active-class="toggleClass('privacypolicy')">Privacy Policy</b-nav-item>
        </b-nav>
      </div>
      <small class="mt-4">&copy; 2019 | Designed, Developed & Maintained by <a href="https://abhiyantrik.com" target="_blank">Abhiyantrik Technology</a></small>
    </div>

    <b-toast id="error-toast" variant="danger" solid append-toast toaster="b-toaster-bottom-full">
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Login Error</strong>
      </div>
      <div v-if="errors.auth">
        <p>{{ errors.auth }}</p>
      </div>
      <div v-if="require_error.username">
        <p>{{ require_error.username }}</p>
      </div>
      <div v-if="require_error.password">
        <p>{{ require_error.password }}</p>
      </div>
    </b-toast>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';

const axios = require('axios');
export default {
  name: "LoginForm",
  components:{
  },
  computed: {
    ...mapState([
      'token','adminusername'
    ])
  },
  data() {
    return {
      username: '',
      password: '',
      errors: {'auth':''},
      require_error:[]
    }
  },

  created(){
    var token = window.localStorage.getItem("token");
    if (token != undefined && token != ""){
      this.$router.replace("/users");
    }
  },

  methods:{
    ...mapMutations([
      'setToken','setAdminUsername'
    ]),

    toggleClass(current_route){
      if(current_route == this.$route.name){
        return 'active';
      }
    },

    processLogin(){
      this.require_error=[]
      if(this.$data.username==''){
        this.require_error['username']="Email required."
        this.$bvToast.show('error-toast');

      }
      else if(this.$data.password==''){
        this.require_error['password']="Password required."
        this.$bvToast.show('error-toast');
      }
      else{
        axios.post('checkuser',{'email':this.$data.username}).then(response=>{
          var formData = {'username': response.data.username, 'password': this.$data.password}
          axios.post('token',formData)
          .then(response => {
            window.localStorage.setItem("token", response.data.token);
            this.setToken(response.data.token);
            axios.defaults.headers.common['authorization']  = 'JWT ' + response.data.token
            this.$router.replace("/users");
          })
          .catch(error => {
            if(error){
              this.errors['auth'] = "Invalid username/password."
              this.$bvToast.show('error-toast');
            }
            this.errored = true;
          })
        })
        .catch(error => {
          if(error){
            this.errors['auth'] =  "Invalid username/password."
            this.$bvToast.show('error-toast');
          }this.errored = true;

        })
      }
    }

  }
};
</script>

<style lang="scss" scoped>
  @import "../css/loginpage.scss";

</style>
