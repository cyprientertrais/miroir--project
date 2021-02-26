import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAudio from "vue-audio";
import VueSpeech from 'vue-speech'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VueAudio,
  VueSpeech,
  render: h => h(App)
}).$mount("#app");
