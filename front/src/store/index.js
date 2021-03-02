import Vue from "vue";
import Vuex from "vuex";
import UserResources from "@/service/resources/UserResources";
import WidgetResources from "@/service/resources/WidgetResources";
import {captitalizeFirstLetter, answerToVocal} from "../service/utils";
Vue.use(Vuex);

const userService = new UserResources();
const widgetService = new WidgetResources();

export default new Vuex.Store({
  state: {
    location: undefined,
    userProfile: undefined,
    orientation: undefined,
    wifiList: undefined,
    flowRadio: undefined
  },
  socket: {
    isConnected: false,
    message: "",
    reconnectError: false
  },
  mutations: {
    setLocation(state, location) {
      state.location = location;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    setOrientation(state, orientation) {
      state.orientation = orientation;
    },
    setFlowRadio(state, flowRadio) {
      state.flowRadio = flowRadio;
    },
    setWifiList(state, wifiList) {
      state.wifiList = wifiList;
    },
    SOCKET_ONOPEN(state, event) {
      console.log("onOpen");
      Vue.prototype.$socket = event.currentTarget;
    },
    SOCKET_ONCLOSE(state) {
      console.log("onClose");
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.log("onError");
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      console.log("onMessage", message);
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.log("onReconnect");
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      console.log("onReconnectError");
      state.socket.reconnectError = true;
    }
  },
  actions: {
    changeProfile: async function(context, profileName) {
      console.log("INSIDE CHANGE PROFILE ACTION")
      console.log(profileName)
      await userService
        .getUserProfile(captitalizeFirstLetter(profileName))
        .then(res => {
          console.log(res)
          context.commit("setUserProfile", res.data);
          answerToVocal("profileAnswer", profileName);
        })
        .catch(err => {
          answerToVocal("profileUnknown", profileName);
          console.log(err);
        });
    },
    changeRadio: function(context, radioName) {
      let isExist = false;
      console.log("changeRadio detected :" + radioName);
      //TODO CHECK RADIO EXIST
      if (isExist) {
        answerToVocal("radioAnswer", radioName);
      } else {
        answerToVocal("radioUnknown", radioName);
      }
    },
    // radioPlay: function(context, message) {
    //TODO CHECK IS TRUE OR FALSE

    // SEND THIS IF ERROR
    //sendAnswer("commonError", jsonAnswer.info)

    // },
    // nextRadio: function(context, message) {
    //TODO CHECK IS TRUE OR FALSE

    // SEND THIS IF ERROR
    //sendAnswer("commonError", jsonAnswer.info)
    //},
  /*  changeNews: function(context, message) {
      let isExist = false;
      const jsonIntoString = JSON.stringify(message);
      console.log("changeNews detected :" + JSON.stringify(message));
      const jsonAnswer = JSON.parse(jsonIntoString);
      //TODO CHECK RADIO EXIST
      if (isExist) {
        answerToVocal("newsAnswer", jsonAnswer.info);
      } else {
        answerToVocal("newsUnkown", jsonAnswer.info);
      }
    },*/
    setLocation(context, location) {
      context.commit("setLocation", location);
    },
    setOrientation(context, orientation) {
      context.commit("setOrientation", orientation);
    },
    async setUserProfile(context, pseudo) {
      await userService.getUserProfile(pseudo).then(res => {
        context.commit("setUserProfile", res.data);
      });
    },
    async fetchFlowRadio(context) {
      await widgetService.getFlowRadio().then(res => {
        context.commit("setFlowRadio", res.data.flowRadio);
      });
    }
  },
  getters: {
    location: state => {
      return state.location;
    },
    userProfile: state => {
      return state.userProfile;
    },
    orientation: state => {
      return state.orientation;
    },
    flowRadio: state => {
      return state.flowRadio;
    }
  },
  modules: {}
});
