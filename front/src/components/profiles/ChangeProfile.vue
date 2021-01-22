<template>
  <div class="changeProfile" align="center" justify="center">
    <v-container v-if="profile">
      <h1>Modifier le profil</h1>

      <v-text-field
        id="newProfileName"
        label="Nom d'utilisateur"
        v-model="profile.pseudo"
        dark
        :error="isProfileNameInvalid"
        :error-messages="errorMessage"
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
        <v-btn color="accent" elevation="2" class="buttonAnnul" light @click="cancelEdit"
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
import Resources from "@/service/resources/resources";
import DeleteProfile from "@/components/profiles/DeleteProfile";

const ResourcesService = new Resources();

export default {
  name: "ChangeProfile",
  props: ["profile"],
  components: {
    DeleteProfile,
  },
  created() {
    this.oldPseudo = this.profile.pseudo;
  },
  mounted() {
    console.log("mounted");
  },
  data() {
    return {
      isProfileNameInvalid: false,
      errorMessage: "",
      oldPseudo: "",
      deleteProfile: false,
    };
  },
  methods: {
    profilDeleted(deleted) {
      if (deleted) {
        this.deleteProfile = false;
        this.$emit("profileChanged", true);
      } else {
        this.deleteProfile = false;
      }
    },
    cancelEdit() {
      this.$emit("profileChanged");
    },
    async changeProfileName() {
      const PATCHRequest = ResourcesService.changeProfileName(
        this.oldPseudo,
        this.profile.pseudo
      );

      function getPATCHRequestResponse(PATCHRequest) {
        return PATCHRequest.then(function(res) {
          return JSON.stringify(res);
        });
      }

      const msg = await getPATCHRequestResponse(PATCHRequest);

      if (msg.includes("Request failed with status code 404")) {
        this.isProfileNameInvalid = true;
        if (this.newProfileName.length == 0) {
          this.errorMessage = "Veuillez entrer un nom de profil valide.";
        } else if (this.newProfileName.length > 15) {
          this.errorMessage =
            "La taille du nom ne doit pas dépassé 15 caractères. Veuillez entrer un nom de profil valide.";
        } else {
          this.errorMessage =
            "Ce nom de profil est déjà utilisé. Veuillez entrer un autre nom.";
        }
      } else {
        this.$emit("profileChanged");
        this.isProfileNameInvalid = false;
      }
    },
  },
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
