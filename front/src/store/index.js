import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    widgets: undefined,
    location: undefined,
  },
  mutations: {
    setWidgets(state, newWidgets) {
      state.widgets = newWidgets;
    },
    setLocation(state, location){
      state.location = location;
    }
  },
  actions: {
    setWidgets(context, newWidgets) {
      context.commit('setWidgets', newWidgets);
    },
    setLocation(context,location) {
      console.log("set location ="+location.coords.latitude)
      context.commit('setLocation', location);
    }
  },
  getters: {
    widgets: state => {
      return state.widgets
    },
    location: state => {
      return state.location
    }
  },
  modules: {},
});
