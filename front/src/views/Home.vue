<template>
  <div class="home">
    <v-row>
      <v-card dark class="username" style="text-align: center" width="250px" shaped>
        <strong v-if="userProfile">{{ userProfile.pseudo }}</strong>
      </v-card>
    </v-row>
    <v-row class="ma-2" v-if="widgets">
      <v-col v-for="(componentName, index) in widgets" :key="index" cols="3">
        <component :is="componentName"></component>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
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
    this.setWidgets();
  },
  data() {
    return {
      widgets: [],
    };
  },
  watch: {
    userProfile: function() {
      this.setWidgets();
    },
  },
  computed: {
    ...mapGetters(["userProfile"]),
  },
  methods: {
    setWidgets() {
      if (this.userProfile) {
          for (let c = 0; c < this.userProfile.dashboards[0].widgets.length; c++) {
            let componentName = this.userProfile.dashboards[0].widgets[c].name;
            this.widgets.push(componentName);
            this.$options.components[componentName] = () =>
              import("../components/widgets/" + componentName + ".vue");
          }
      }
    },
  },
};
</script>

<style scoped>
.username {
 margin-left:-10px !important
}
</style>
