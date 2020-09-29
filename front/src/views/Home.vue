<template>
  <div class="home">
    <v-row>
      <v-card dark class="pa-3" style="text-align: center" shaped width="10%">
        <strong>{{ userProfile.pseudo }}</strong>
      </v-card>
    </v-row>
    <v-row class="ma-2">
      <v-col
        v-for="(componentName, index) in widgets"
        :key="index"
      >
        <component :is="componentName"></component>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Home",
  components: {},
  created() {
    moment.locale("fr");
  },
  watch: {
    widgets: function() {
      if (this.widgets) {
        for (let c = 0; c < this.widgets.length; c++) {
          let componentName = this.widgets[c];
          this.$options.components[componentName] = () =>
            import("../components/widgets/" + componentName + ".vue");
        }
      }
    },
  },

  computed: {
    ...mapGetters(["widgets", "userProfile"]),
  },

  methods: {},
};
</script>

<style scoped>
.v-card{
  left:-10px !important;
}
</style>
