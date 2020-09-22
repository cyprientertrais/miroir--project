<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),

  methods: {
    ...mapMutations(["setWidgets"])
  },

  mounted() {
    this.setWidgets(["Time"]);
  }
};
</script>

<style scoped>
#app {
  background-color: black;
}
</style>
