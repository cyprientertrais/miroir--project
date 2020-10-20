import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuex)

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

  describe("watcher - userProfile value", () => {
    let spy

    beforeAll(() => {
      spy = jest.spyOn(console, 'log')
    })

    afterEach(() => {
      spy.mockClear()
    })

    it("shallowMount component home", () => {
      const wrapper = shallowMount(Home,{store, localVue, vuetify});
      console.log(wrapper)
    });
  })

});
