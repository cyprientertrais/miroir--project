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
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        };

        this.setLocation(location);
        widgetResources.postLocation(location);
      },
      (err) => {
        console.error(err);
        widgetResources.getLocation().then((res) => {
          this.setLocation(res.data.location);
        });
      }
    );
  },

  methods: {
    ...mapActions(["setLocation", "setUserProfile"]),
    startTxtToSpeech() {
      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;

      if ("SpeechRecognition" in window) {
        console.log("supported speech");
      } else {
        console.error("speech not supported");
      }
      const recognition = new window.SpeechRecognition();
      //recognition.continuous = true;
      recognition.lang = "fr-FR";
      recognition.onresult = (event) => {
        console.log(
          "transscript: ",
          event.results[event.results.length - 1][0].transcript
        );
        if (
          event.results[event.results.length - 1][0].transcript.indexOf(
            "miroir"
          ) != -1
        ) {
          let utterance = new SpeechSynthesisUtterance("Bonjour maître");
          utterance.lang = "fr-FR";
          speechSynthesis.speak(utterance);
          if (
            event.results[event.results.length - 1][0].transcript.indexOf(
              "profil"
            ) != -1
          ) {
            let utterance = new SpeechSynthesisUtterance(
              "Allez j'affiche le profile mais carmelo c'est le plus beau"
            );
            utterance.lang = "fr-FR";
            speechSynthesis.speak(utterance);
          } else {
            let utterance = new SpeechSynthesisUtterance(
              "commande inconnu connard mais le plus gros des connard c'est papy"
            );
            utterance.lang = "fr-FR";
            speechSynthesis.speak(utterance);
          }
        }
      };
      recognition.onend = function() {
        recognition.start();

        // sets off a beep/noise each time it is accessed from a cell phone (Andoid).

        // does NOT if accessed from a desktop (Windows using Chrome).
      };

      recognition.start();
    },
  },

  mounted() {
    this.setUserProfile("Invité");

    this.startTxtToSpeech();
  },
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
