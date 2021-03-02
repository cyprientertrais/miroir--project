import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        primary: "#3c3e41",
        secondary: "#2e2e2e",
        background: "#3c3e41",
        accent: "#155b73",
        error: "#b54545"
      }
    }
  }
});
