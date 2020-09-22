import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    widgets: undefined
  },
  mutations: {
    setWidgets(state, newWidgets) {
      state.widgets = newWidgets;
    }
  },
  actions: {
    setWidgets(context, newWidgets) {
      context.commit('setWidgets', newWidgets);
    }
  },
  modules: {},
});
