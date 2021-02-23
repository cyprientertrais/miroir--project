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
import WidgetResources from "./service/resources/WidgetResources";

const widgetResources = new WidgetResources();

export default {
  name: "App",

  components: {},

  data() {
    return {};
  },

  created() {
    moment.locale("fr");

    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const location = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude
        };

        this.setLocation(location);
        widgetResources.postLocation(location);
      },
      err => {
        console.error(err);
        widgetResources.getLocation().then(res => {
          this.setLocation(res.data[0].location);
        });
      }
    );
  },

  methods: {
    ...mapActions(["setLocation", "setUserProfile"])
  },

  mounted() {
    this.setUserProfile("Invité");
  }
};
</script>

<style>
@font-face {
  font-family: "Amatic";
  src: local("Amatic"),
    url(fonts/Amatic_SC/AmaticSC-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Poppins";
  src: local("Poppins"),
    url(fonts/Poppins/Poppins-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "PoppinsBold";
  src: local("PoppinsBold"),
    url(fonts/Poppins/Poppins-SemiBold.ttf) format("truetype");
}

.font-title {
  font-family: "Amatic" !important;
}

.font-text {
  font-family: "Poppins" !important;
}

.secondary-background {
  background-color: #2e2e2e !important;
}

.primary-background {
  background-color: #3c3e41 !important;
}

.accent-background {
  background-color: #155b73 !important;
}

.warning-background {
  background-color: #b54545 !important;
}

.accent-color {
  color: #155b73 !important;
}

.warning-color {
  color: #b54545 !important;
}

.primary-color {
  color: #ffffff !important;
}
</style>
