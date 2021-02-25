import Vue from "vue";
import Vuex from "vuex";
import UserResources from "@/service/resources/UserResources";
import WidgetResources from "@/service/resources/WidgetResources";

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
      state.userProfile = userProfile;
    },
    setOrientation(state, orientation) {
      state.orientation = orientation;
    },
    setWifiList(state, wifiList) {
      state.wifiList = wifiList;
    },
    setFlowRadio(state, flowRadio) {
      state.flowRadio = flowRadio;
    }
  },
  actions: {
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
    async getFlowRadio(context) {
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
