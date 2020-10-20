import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Vue from "vue";

const localVue = createLocalVue()
Vue.use(Vuetify)
Vue.use(Vuex)

describe("Home.vue", () => {
  let getters
  let store
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    getters = {
      userProfile: () => {return { id: "5f6f4d3e2fc33f001288711d", pseudo: "Invité", age: 22, dashboards: [{ name: "default", widgets: [{ name: 'Weather', position: 2 }, { name: 'Time', position: 1 }] }] }},
      orientation: () => 'landscape'
    }

    store = new Vuex.Store({
      getters
    })
  })
  
  it("shallowMount component home", () => {
    const wrapper = shallowMount(Home,{store, localVue});
    console.log(wrapper)
    console.log(wrapper.text())
    expect(wrapper.text()).toMatch('Time')
  });

});
