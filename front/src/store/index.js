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
      console.log('onOpen')
      Vue.prototype.$socket = event.currentTarget;
    },
    SOCKET_ONCLOSE(state) {
      console.log('onClose')
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.log('onError')
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      console.log('onMessage',message)
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {

      console.log('onReconnect')
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {

      console.log('onReconnectError')
      state.socket.reconnectError = true;
    }
  },
  actions: {
    sendMessage: function(context, message) {
      Vue.prototype.$socket.send(message)
    },
    changeProfile: function(context, message) {
      console.log("changeProfile detected : " + JSON.stringify(message))
      Vue.prototype.$socket.send("changeProfile action well received")
    },
    changeRadio: function(context, message) {
      console.log("changeRadio detected :" + JSON.stringify(message))
      Vue.prototype.$socket.send("changeRadio action well received")
    },
    changeNews: function(context, message) {
      console.log("changeNews detected :" + JSON.stringify(message))
      Vue.prototype.$socket.send("changeRadio action well received")
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
