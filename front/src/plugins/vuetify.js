import Vue from "vue";
import Vuetify from "vuetify/lib";
import store from '../store'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, `ws://localhost:1234`,
    {
        reconnection: true, // (Boolean) whether to reconnect automatically (false)
        reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
        reconnectionDelay: 3000,
        store: store,
        format: 'json'
    })
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        dark: false,
        themes: {
            light: {
                primary: '#3c3e41',
                secondary: '#2e2e2e',
                background: '#3c3e41',
                accent: '#155b73',
                error: '#b54545',
            }
        },
    },
});
