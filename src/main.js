import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes/'
import { createStore } from './store/'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import AOS
import AOS from "aos";
import "aos/dist/aos.css";

import moment from 'moment'

import Chart from 'chart.js'

import ICountUp from 'vue-countup-v2'

axios.defaults.baseURL = process.env.VUE_APP_SERVICE_URL

Vue.component('ICountUp', ICountUp)

Vue.component('multiselect', window.VueMultiselect.default)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).fromNow();
  }
});

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

const store = createStore()

import './css/style.scss'

new Vue({
  created() {
    AOS.init({ disable: "phone" });
  },
  store,
  router: router,
  render: h => h(App)
}).$mount('#app')
