<template>
  <v-container align="center" justify="center" class="popup">
    <v-card elevation ="22" color ="#3c3e41" class ="white--text"> <v-row justify="center" >  <h1 class="titre">Réglages</h1>   </v-row>
      <v-row>
        <v-col>
          <div class = "listButtons">
              <v-row justify="center">  <v-btn v-on:click="onClickProfils" elevation="2" class="profils ma-2 white--text" color = "#155b73"> Gestion des profils </v-btn> </v-row>
              <v-row justify="center">  <v-btn v-on:click="onClickWifi" elevation="2" class="wifi ma-2 white--text" color = "#155b73"> Gestion des Wifi </v-btn> </v-row>
              <v-row justify="center">  <v-btn v-on:click="onClickUsine" elevation="2" class="usine ma-2 white--text" color = "#155b73"> Retour aux paramètre d'usine </v-btn> </v-row>
              <v-row justify="center">  <v-btn v-on:click="onClickRetour" elevation="2" class="retour ma-3 white--text" color = "#155b73"> Retour </v-btn>   </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    onClickProfils() {
      console.log("onClickProfils")
    },
    onClickWifi(){
      console.log("onClickWifi")
  },
    onClickUsine(){
      console.log("oncClickUsine")
    },
    onClickRetour() {
      console.log("onClickRetour")
    },
}
};



</script>
<style scoped>

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
