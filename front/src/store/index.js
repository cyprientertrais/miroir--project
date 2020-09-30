import Vue from "vue";
import Vuex from "vuex";
import Resources from "@/service/resources/resources";

Vue.use(Vuex);

const ResourcesService = new Resources();

export default new Vuex.Store({
  state: {
    widgets: undefined,
    location: undefined,
    userProfile: undefined,
  },
  mutations: {
    setWidgets(state, newWidgets) {
      state.widgets = newWidgets;
    },
    setLocation(state, location){
      state.location = location;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    }
  },
  actions: {
    setWidgets(context, newWidgets) {
      context.commit('setWidgets', newWidgets);
    },
    setLocation(context,location) {
      context.commit('setLocation', location);
    },
    setUserProfile(context, pseudo) {
      ResourcesService.getUserProfile(pseudo).then(res => {
        console.log(res,"TOTOOTO");
        context.commit('setUserProfile', res.data);
      })
    }
  },
  getters: {
    widgets: state => {
      return state.widgets
    },
    location: state => {
      return state.location
    },
    userProfile: state => {
      return state.userProfile
    }
  },
  modules: {},
});
