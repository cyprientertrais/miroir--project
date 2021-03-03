import Vue from "vue";
import Vuex from "vuex";
import UserResources from "@/service/resources/UserResources";
import WidgetResources from "@/service/resources/WidgetResources";
import { captitalizeFirstLetter, answerToVocal } from "../utils/utils";
Vue.use(Vuex);

const userService = new UserResources();
const widgetService = new WidgetResources();

export default new Vuex.Store({
  state: {
    location: undefined,
    userProfile: undefined,
    orientation: undefined,
    wifiList: undefined,
    flowRadio: undefined,
    isPlaying: false,
    selectedRadio: undefined,
    nextRadio: 0,
    previousRadio: 0
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
    updateIsPlaying(state, value) {
      state.isPlaying = value;
    },
    selectedRadio(state, value) {
      state.selectedRadio = value;
    },
    nextRadio(state) {
      ++state.nextRadio;
    },
    previousRadio(state) {
      ++state.previousRadio;
    }
  },
  actions: {
    changeProfile: async function(context, profileName) {
      await userService
        .getUserProfile(captitalizeFirstLetter(profileName))
        .then(res => {
          context.commit("setUserProfile", res.data);
          answerToVocal("profileAnswer", profileName);
        })
        .catch(err => {
          answerToVocal("profileUnknown", profileName);
          console.log(err);
        });
    },
    changeRadio: async function(context, radioName) {
      console.log("changeRadio detected :" + radioName);

      const radios = await widgetService.getFlowRadio();
      context.commit("setFlowRadio", radios.data.flowRadio);

      const filteredRadios = radios.data.flowRadio.filter(
        radio => radio.title === radioName
      );
      if (filteredRadios.length === 1) {
        context.commit("selectedRadio", radioName);
      } else {
        answerToVocal("radioUnknown", radioName);
      }
    },

    playRadio: function(context) {
      context.commit("updateIsPlaying", true);
    },

    stopRadio: function(context) {
      context.commit("updateIsPlaying", false);
    },

    setLocation(context, location) {
      context.commit("setLocation", location);
    },

    setOrientation(context, orientation) {
      context.commit("setOrientation", orientation);
    },

    setUserProfile(context, pseudo) {
      userService.getUserProfile(pseudo).then(res => {
        context.commit("setUserProfile", res.data);
      });
    },

    fetchFlowRadio(context) {
      widgetService.getFlowRadio().then(res => {
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
    },
    isPlaying: state => {
      return state.isPlaying;
    },
    selectedRadio: state => {
      return state.selectedRadio;
    },
    nextRadio: state => {
      return state.nextRadio;
    },
    previousRadio: state => {
      return state.previousRadio;
    }
  },
  modules: {}
});
