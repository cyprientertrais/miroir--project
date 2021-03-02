<template>
  <v-app>
    <v-main>
      <v-btn
        elevation="2"
        id="play"
        style="display:none"
        @click="textToSpeak()"
      ></v-btn>
      <p id="vocal-text" style="display:none"></p>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import WidgetResources from "./service/resources/WidgetResources";
import VocalRecognition from "./service/vocalRecognition/VocalRecognition";

const widgetResources = new WidgetResources();
const vocalRecognition = new VocalRecognition();

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
          this.setLocation(res.data.location);
        });
      }
    );
  },

  methods: {
    ...mapActions(["setLocation", "setUserProfile"]),
    textToSpeak(text) {
      text = document.getElementById("vocal-text").innerHTML;
      if ("speechSynthesis" in window) {
        // Chrome only !!
        const synth = window.speechSynthesis;
        let timer = setInterval(function() {
          let voices = synth.getVoices();
          if (voices.length !== 0) {
            let msg = new SpeechSynthesisUtterance(text);
            msg.voice = voices.find(_voice => /fr-FR/.test(_voice.lang));
            msg.lang = "en-US";
            synth.speak(msg);
            clearInterval(timer);
          }
        }, 200);
      } else {
        // Other browsers !!
        console.log("VocalRecognition only in Chrome !");
        // Use AJAX (with GET) to a .php to file_get_contents
        // generate the <100 by <100 charaters audio files, and nest in callbacks
      }
    }
  },

  mounted() {
    this.setUserProfile("Invité");
    vocalRecognition.vocalProcess();
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
h1 {
  color: white;
  font-size: 30px;
  font-weight: bold;
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
