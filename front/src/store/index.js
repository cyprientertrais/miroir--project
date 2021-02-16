import Vue from "vue";
import Vuex from "vuex";
import Resources from "@/service/resources/resources";

Vue.use(Vuex);

const ResourcesService = new Resources();

export default new Vuex.Store({
  state: {
    location: undefined,
    userProfile: undefined,
    orientation: undefined,
    wifiList: undefined,
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },
  mutations: {
    setLocation(state, location){
      state.location = location;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    setOrientation(state, orientation){
      state.orientation = orientation
    },
    setWifiList(state, wifiList){
      state.wifiList = wifiList
    },
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    }
  },
  actions: {
    changeProfile: function(context, message) {
      Vue.prototype.$socket.send(message)
    },
    setLocation(context,location) {
      context.commit('setLocation', location);
    },
    setOrientation(context, orientation){
      context.commit('setOrientation',orientation);
    },
    async setUserProfile(context, pseudo) {
      await ResourcesService.getUserProfile(pseudo).then(res => {
        context.commit('setUserProfile', res.data);
      })
    }
  },
  getters: {
    location: state => {
      return state.location
    },
    userProfile: state => {
      return state.userProfile
    },
    orientation: state => {
      return state.orientation
    }
  },
  modules: {},
});
