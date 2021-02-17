<template>
  <div class="changeProfile" align="center" justify="center">
    <v-container v-if="profile">
      <h1>Modifier le profil</h1>

      <v-text-field
        id="newProfileName"
        label="Nom d'utilisateur"
        v-model="newPseudo"
        dark
        :error="isProfileNameInvalid"
        :error-messages="errorMessage"
        maxlength="20"
        clearable
      ></v-text-field>
      <div class="buttons">
        <v-btn
          color="accent"
          elevation="2"
          class="buttonSave"
          v-on:click="changeProfileName"
          light
          >Enregistrer</v-btn
        >
        <v-btn
          color="accent"
          elevation="2"
          class="buttonAnnul"
          light
          @click="cancelEdit"
          >Annuler</v-btn
        >
        <v-btn
          color="error"
          elevation="2"
          class="buttonSuppr"
          @click="deleteProfile = true"
          light
          >Supprimer le profil</v-btn
        >
      </div>
    </v-container>

    <v-dialog v-model="deleteProfile" width="500px">
      <DeleteProfile
        v-if="profile"
        @endDelete="profilDeleted"
        :profile-name="profile.pseudo"
      />
    </v-dialog>
  </div>
</template>

<script>
import UserResources from "@/service/resources/UserResources";
import DeleteProfile from "@/components/profiles/DeleteProfile";

const userService = new UserResources();

export default {
  name: "ChangeProfile",
  props: ["profile"],
  components: {
    DeleteProfile
  },
  created() {
    this.newPseudo = this.profile.pseudo;
  },
  mounted() {},
  data() {
    return {
      isProfileNameInvalid: false,
      errorMessage: "",
      newPseudo: "",
      deleteProfile: false
    };
  },
  methods: {
    profilDeleted(deleted) {
      if (deleted) {
        this.$emit("profileChanged", true);
      }
      this.deleteProfile = false;
    },
    cancelEdit() {
      this.$emit("profileChanged", false);
    },
    async changeProfileName() {
      if (this.newPseudo.length === 0) {
        this.isProfileNameInvalid = true;
        this.errorMessage = "Veuillez entrer un nom de profil valide.";
        return;
      } else if (this.newPseudo.length > 20) {
        this.isProfileNameInvalid = true;
        this.errorMessage =
          "La taille du nom ne doit pas dépasser 20 caractères. Veuillez entrer un nom de profil valide.";
        return;
      }

      const msg = await userService
        .changeProfileName(this.profile.pseudo, this.newPseudo)
        .then(function(res) {
          return JSON.stringify(res);
        });

      if (msg.includes("Request failed with status code 404")) {
        this.isProfileNameInvalid = true;
        this.errorMessage =
          "Ce nom de profil est déjà utilisé. Veuillez entrer un autre nom.";
      } else {
        this.$emit("profileChanged");
        this.isProfileNameInvalid = false;
      }
    }
  }
};
</script>

<style scoped>
.changeProfile {
  background-color: #3c3e41;
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

.buttonSave {
  margin: 6%;
  width: 130px;
}
.buttonAnnul {
  margin: 6%;
  width: 130px;
}
.buttons {
  margin-top: 10%;
}

.buttonSuppr {
  width: 300px;
  margin-top: 5%;
}
</style>
