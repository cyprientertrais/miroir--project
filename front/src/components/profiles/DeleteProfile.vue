<template>
  <div class="mainDiv">
    <div align="center" justify="center" class="pageContent">
      <div class="titre font-title">
        SUPPRIMER LE PROFIL
        <span class="nameProfile">{{ this.profileName }}</span> ?
      </div>
      <div class="description font-text">
        <div class="questionConfirmation">
          Êtes-vous sûr de vouloir supprimer ce profil ?
        </div>
        <div class="descriptionConfirmation">
          Tous les dashboards associés seront définitivement supprimés, et vous
          ne pourrez plus y accéder.
        </div>
      </div>
      <div class="butonDelete">
        <v-btn
          v-on:click="deleteProfile"
          elevation="2"
          class="butonDelete font-text"
          color="#b54545"
          >Supprimer le profil</v-btn
        >
      </div>
      <div class="butonCancel pb-5">
        <v-btn
          elevation="2"
          class="butonCancel font-text"
          color="#155b73"
          @click="cancelDelete"
          >Annuler</v-btn
        >
      </div>
    </div>
    <v-snackbar v-model="snackbar">
      {{ snackbarContent }}
      <template v-slot:action="{ attrs }">
        <v-btn color="#155b73" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Resources from "@/service/resources/resources";

const ResourcesService = new Resources();

export default {
  name: "DeleteProfile",
  data() {
    return {
      //if true, the snackbar displays
      snackbar: false,
      snackbarContent: "",
    };
  },
  props: ["profileName"],
  computed: {},
  methods: {
    cancelDelete() {
      this.$emit("endDelete", false);
    },
    deleteProfile: async function() {
      const profileToDelete = this.profileName;
      const responseDeleteProfile = await ResourcesService.deleteProfileByName(
        profileToDelete
      );
      if (responseDeleteProfile.status === 204) {
        this.snackbarContent = "Le profil a bien été supprimé.";
        this.snackbar = true;
        console.log(`Le profil a bien été supprimé.`);
        this.$emit("endDelete", true);
      } else {
        this.snackbarContent = "Le profil n'a pas pu être supprimé.";
        this.snackbar = true;
        console.log(`Le profil n'a pas pu être supprimé.`);
        this.$emit("endDelete", false);
      }
    },
  },
  mounted: function() {},
};
</script>

<style scoped>
.mainDiv {
  height: 100%;
  padding: 5% 12% 5% 12%;
  background-color: #3c3e41;
}

.titre {
  font-weight: bold;
  font-size: 40px;
  color: #ffffff;
  padding-top: 2%;
}

.nameProfile {
  color: #155b73;
}

.description {
  color: #ffffff;
  width: 90%;
  margin-top: 3%;
}

.deleteProfile {
  background-color: #2e2e2e;
  height: 100%;
}

.descriptionConfirmation {
  margin-top: 10px;
}

.butonDelete {
  margin-top: 17px;
}

.butonCancel {
  margin-top: 10px;
}

@media screen and (max-width: 800px) {
  .titre {
    padding: 12% 10% 0% 10%;
  }

  .description {
    width: 80%;
  }

  .mainDiv {
    padding: 0%;
  }
}
</style>
