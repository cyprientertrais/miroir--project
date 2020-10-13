import Vue from "vue";
import Vuex from "vuex";
import Resources from "@/service/resources/resources";

Vue.use(Vuex);

const ResourcesService = new Resources();

export default new Vuex.Store({
  state: {
    location: undefined,
    userProfile: undefined,
  },
  mutations: {
    setLocation(state, location){
      state.location = location;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    }
  },
  actions: {
    setLocation(context,location) {
      context.commit('setLocation', location);
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
    }
  },
  modules: {},
});
