import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAudio from 'vue-audio';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VueAudio,
  render: h => h(App)
}).$mount("#app");
