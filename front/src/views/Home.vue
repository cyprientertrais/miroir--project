<template>
  <div class="home">
    <v-row>
      <v-card dark class="pa-3" style="text-align: center" shaped width="10%">
        <strong v-if="userProfile">{{ userProfile.pseudo }}</strong>
      </v-card>
    </v-row>
    <v-row class="ma-2" v-if="userProfile">
      <v-col
        v-for="(componentName, index) in this.userProfile.dashboards[0].widgets"
        cols="3"
        :key="index"
      >
        <component :is="componentName"></component>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Time from "@/components/widgets/Time";
import Weather from "@/components/widgets/Weather";

export default {
  name: "Home",
  components: {
    Time,
    Weather
  },
  created() {
    moment.locale("fr");
  },
  watch: {
    userProfile: function() {
      console.log("setUserProfile")
      if (this.userProfile.dashboards[0].widgets) {
        for (let c = 0; c < this.userProfile.dashboards[0].widgets.length; c++) {
          let componentName = this.userProfile.dashboards[0].widgets[c].name;
          this.$options.components[componentName] = () =>
            import("../components/widgets/" + componentName + ".vue");
        }
      }
    },
  },

  computed: {
    ...mapGetters(["userProfile"]),
  },

  methods: {},
};
</script>

<style scoped>
.v-card{
  left:-10px !important;
}
</style>
