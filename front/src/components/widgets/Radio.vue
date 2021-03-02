<template>
  <v-carousel
    class="radio"
    dark
    v-if="flowRadio"
    v-model="actualFlux"
    :show-arrows="true"
    hide-delimiters
    height="400"
    @change="navigationHandler"
  >
    <v-carousel-item width="100%" v-for="(el, i) in flowRadio" :key="i">
      <v-sheet fill-height fluid>
        <v-card class="mx-auto">
          <v-img width="100%" :src="el.img"></v-img>

          <v-card-title>
            {{ el.title }}
            <v-icon
              className="button-radio"
              v-if="isPlaying"
              @click="stopRadio"
            >
              mdi-pause
            </v-icon>
            <v-icon
              className="button-radio"
              v-if="!isPlaying"
              @click="playRadio"
            >
              mdi-play
            </v-icon>
          </v-card-title>
        </v-card>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Radio",

  data() {
    return {
      model: 0,
      audio: null,
      actualFlux: 0,
      isPlaying: false
    }
  },
  created() {
    this.fetchFlowRadio();
  },
  computed: {
    ...mapGetters(["flowRadio"])
  },
  methods: {
    ...mapActions(["fetchFlowRadio"]),
    changeRadioByName(radioName) {
      let indexRadio = -1;
      this.flowRadio.forEach((element, index) => {
        if(element.title.toLowerCase().replace(/ /g,'') === radioName.toLowerCase().replace(/ /g,'')){
          indexRadio = index;
        }
      });
      if (indexRadio === -1) return;
      this.navigationHandler(indexRadio);
    },
    navigationHandler(direction) {
      this.actualFlux = direction;
      if (this.isPlaying) this.playRadio();
    },
    nextRadio() {
      this.navigationHandler((this.actualFlux + 1)%this.flowRadio.length);
    },
    previousRadio() {
      this.navigationHandler((this.actualFlux === 0) ? this.flowRadio.length-1 : this.actualFlux-1);
    },
    playRadio() {
      this.stopRadio();
      this.isPlaying = true;
      this.audio = new Audio(this.flowRadio[this.actualFlux].audio);
      this.audio.play();
    },
    stopRadio() {
      if (this.audio) {
        this.audio.pause();
      }
      this.isPlaying = false;
    },
  },
};
</script>

<style scoped>
.radio {
  width: 75%;
}

.button-radio {
  margin-left: 10px;
}
</style>
