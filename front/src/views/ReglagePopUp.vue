<template>
  <v-container color="primary" align="center" justify="center" class="popup">
    <v-card elevation="22" color="primary" class="white--text">
      <v-row justify="center"> <h1 class="font-title">Réglages</h1> </v-row>
      <v-row>
        <v-col>
          <v-sheet color="primary" class="listButtons font-text">
            <v-row justify="center">
              <v-btn
                v-if="this.$router.history.current.path !== '/settings'"
                v-on:click="onClickProfils"
                elevation="2"
                class="profils ma-2 white--text"
                color="accent"
              >
                Gestion des profils
              </v-btn>
            </v-row>
            <v-row justify="center">
              <v-btn
                v-if="this.$router.history.current.path !== '/wifi'"
                v-on:click="onClickWifi"
                elevation="2"
                class="wifi ma-2 white--text"
                color="accent"
              >
                Gestion des Wifi
              </v-btn>
            </v-row>
            <v-row justify="center">
              <v-btn
                v-on:click="onClickUsine"
                elevation="2"
                class="usine ma-2 white--text"
                color="error"
              >
                Retour aux paramètre d'usine
              </v-btn>
            </v-row>
            <v-row justify="center">
              <v-btn
                v-on:click="onClickRetour"
                elevation="2"
                class="retour ma-3 white--text"
                color="accent"
              >
                Retour
              </v-btn>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickProfils() {
      this.$router.push("/settings");
    },
    onClickWifi() {
      this.$router.push("/wifi");
    },
    onClickUsine() {
      console.log("oncClickUsine");
    },
    onClickRetour() {
      this.$emit("closeDialog");
    }
  }
};
</script>
<style scoped></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
