<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  name: "App",

  components: {
  },

  data() {
    return {
    };
  },

  created() {
    moment.locale("fr");

    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }

    // get position
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setLocation(pos);
      },
      err => {
        console.log("error getting the location:\n" + err.message);
      }
    );
  },

  methods: {
    ...mapActions(["setWidgets", "setLocation", "setUserProfile"])
  },

  mounted() {
    this.setWidgets(["Time", "Weather"]);
    this.setUserProfile("Aymeric");
  }
};
</script>

<style scoped>
#app {
  background-color: black;
}
</style>
