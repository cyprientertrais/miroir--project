import Vue from "vue";
import Vuex from "vuex";
import UserResources from "@/service/resources/UserResources";
import WidgetResources from "@/service/resources/WidgetResources";
import captitalizeFirstLetter from "../service/utils";

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
  mutations: {
    setLocation(state, location) {
      state.location = location;
    },
    setUserProfile(state, userProfile) {
      console.log("setUser", userProfile);
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
    }
  },
  actions: {
    changeProfile: async function(context, message) {
      // let isExist = true
      const jsonIntoString = JSON.stringify(message);
      console.log("changeProfile detected : " + jsonIntoString);
      const jsonAnswer = JSON.parse(jsonIntoString);
      //TODO CHECK USER EXIST
      await userService
        .getUserProfile(captitalizeFirstLetter(jsonAnswer.info))
        .then(res => {
          context.commit("setUserProfile", res.data);
          // isExist = true;
        })
        .catch(err => {
          console.log(err);
          // isExist = false;
        });
    },
    changeRadio: function(context, message) {
      // let isExist = false
      const jsonIntoString = JSON.stringify(message);
      console.log("changeRadio detected :" + JSON.stringify(message));
      const jsonAnswer = JSON.parse(jsonIntoString);
      console.log("changeRadio:", jsonAnswer);
      //TODO CHECK RADIO EXIST
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
    changeNews: function(context, message) {
      // let isExist = false
      const jsonIntoString = JSON.stringify(message);
      console.log("changeNews detected :" + JSON.stringify(message));
      const jsonAnswer = JSON.parse(jsonIntoString);
      console.log("changeNews:", jsonAnswer);
      //TODO CHECK RADIO EXIST
    },
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
