<template>
  <v-carousel
    class="radio"
    dark
    v-if="flux"
    v-model="model"
    :show-arrows="true"
    hide-delimiters
    height="400"
    @change="navigationHandler"
  >
    <v-carousel-item width="100%" v-for="(el, i) in flux" :key="i">
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
export default {
  name: "Radio",

  data() {
    return {
      model: 0,
      audio: null,
      actualFlux: 0,
      isPlaying: false,
      flux: [
        {
          title: "Fun Radio",
          audio:
            "http://icecast.funradio.fr/fun-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg",
          img:
            "https://dbs.radioline.fr/pictures/radio_14e09f8063392ed7ba7db184f937aa1a/logo200.jpg?size=600",
        },
        {
          title: "RTL2",
          audio:
            "http://icecast.rtl2.fr/rtl2-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg",
          img:
            "https://4.bp.blogspot.com/-DtRsZYXOANo/W_XGIW3IM1I/AAAAAAAAJAE/XmUOUXDllB0ioQeQ58qPKZSDVC8pXz2PgCKgBGAs/s400/RTL2%2B%253B%2B%2528001%2529.jpg",
        },
        {
          title: "Europe 1",
          audio: "http://stream.europe1.fr/europe1.mp3",
          img:
            "https://1.bp.blogspot.com/-BCb2nEMC10A/W_XGycvr5cI/AAAAAAAAJAM/KaAMTK4-mQYHJE10vB4NI_MY7D9fM5DIACKgBGAs/s1600/Europe%2B1%2B%253B%2B%2528001%2529.jpg",
        },
        {
          title: "France Inter",
          audio: "http://icecast.radiofrance.fr/franceinter-hifi.aac",
          img:
            "https://2.bp.blogspot.com/-Qt4K6yrs4HU/W_XHYewJGiI/AAAAAAAAJAc/aqyQdwRhNFwgbaREYYRSNCPcbZIoLXdjACKgBGAs/s1600/France%2BInter%2B%253B%2B%2528001%2529.jpg",
        },
        {
          title: "Virgin Radio",
          audio: "http://stream.virginradio.fr/virgin.mp3",
          img:
            "https://2.bp.blogspot.com/-pZ5TZDiBexw/W_XGybt5zbI/AAAAAAAAJAM/C2Uw74-Dx-cHg7YvggfQorxFYR5XqoeYwCKgBGAs/s400/Virgin%2BRadio%2B%253B%2B%2528001%2529.jpg",
        },
      ],
    };
  },
  methods: {
    navigationHandler(direction) {
      this.actualFlux = direction;
      this.playRadio();
    },
    playRadio() {
      this.stopRadio();
      this.isPlaying = true;
      this.audio = new Audio(this.flux[this.actualFlux].audio);
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
