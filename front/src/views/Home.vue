<template>
  <div class="home">
    <v-row class="ma-2">
      <v-col cols="12" md="6" v-for="(componentName, index) in widgets" :key="index">
        <component :is="componentName"></component>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment';

export default {
  name: "Home",
  components: {},
  created() {    moment.locale('fr');},
  watch: {
    widgets: function() {
      if (this.widgets) {
        for (let c = 0; c < this.widgets.length; c++) {
          let componentName = this.widgets[c];
          this.$options.components[componentName] = () =>
            import("../components/widgets/" + componentName + ".vue");
        }
      }
    }
  },

  computed: {
    ...mapGetters(["widgets"])
  },

  methods: {}
};
</script>
