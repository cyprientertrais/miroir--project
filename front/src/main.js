import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAudio from 'vue-audio';
import VueNativeSock from 'vue-native-websocket'

const hostname= window.location.hostname;

Vue.use(VueNativeSock, `ws://${hostname}:8765`,
    {
      reconnection: true, // (Boolean) whether to reconnect automatically (false)
      reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
      reconnectionDelay: 3000,
      store: store,
      format: 'json'
    })

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VueAudio,
  render: h => h(App)
}).$mount("#app");
