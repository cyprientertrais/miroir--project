<template>
  <v-sheet color="primary" class="addProfile" align="center" justify="center">
    <v-container>
      <h1>Ajouter un profil</h1>

      <v-text-field
        id="profileName"
        label="Nom de profil"
        dark
        :error="isProfileNameInvalid"
        :error-messages="errorMessage"
        maxlength="20"
        v-model="profileName"
      ></v-text-field>
      <div class="buttons">
        <v-btn color="accent" elevation="2" class="button" v-on:click="addProfile" light
          >Ajouter</v-btn
        >
        <v-btn color="accent" elevation="2" class="button" @click="cancelProfile" light
          >Annuler</v-btn
        >
      </div>
    </v-container>
  </v-sheet>
</template>

<script>
import Resources from "@/service/resources/resources";

const ResourcesService = new Resources();

export default {
  name: "AddProfile",
  data() {
    return {
      profileName: "",
      isProfileNameInvalid: false,
      errorMessage: "",
    };
  },
  methods: {
    cancelProfile() {
      this.profileName='';
      this.$emit("profileCreated", false);
    },
    async addProfile() {
      if (this.profileName.length == 0) {
        this.isProfileNameInvalid = true;
        this.errorMessage = "Veuillez entrer un nom de profil valide.";
        return;
      } else if (this.profileName.length > 20) {
        this.isProfileNameInvalid = true;
        this.errorMessage =
          "La taille du nom ne doit pas dépasser 20 caractères. Veuillez entrer un nom de profil valide.";
          return;
      }

      const profile = `{"pseudo":"${this.profileName}"}`;
      const msg = await ResourcesService.addProfile(JSON.parse(profile)).then(function(res) {
          return JSON.stringify(res);
        });


      if (msg.includes("Request failed with status code 400")) {
        this.isProfileNameInvalid = true;
        this.errorMessage =
          "Ce nom de profil est déjà utilisé. Veuillez entrer un autre nom.";
      } else {
        this.$emit("profileCreated", true);
        this.isProfileNameInvalid = false;
        this.profileName='';
      }
    },
  },
};
</script>

<style scoped>
.addProfile {
  height: 100%;
  color: white;
}

h1 {
  color: white;
  font-size: 30px;
  padding-top: 20%;
  font-weight: bold;
}

.v-text-field {
  margin-top: 30%;
  width: 160px;
}

.button {
  margin: 2%;
}

.buttons {
  margin-top: 20%;
}
</style>
