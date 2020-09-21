import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
require('dotenv').config({ path: require('find-config')('.env') })
Vue.config.productionTip = false

new Vue({
  vuetify,
  Vuex,
  VueRouter,
  render: h => h(App)
}).$mount('#app')
