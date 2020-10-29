<template>
    <div class="mainDiv primary-background">
        <v-sheet align="center" justify="center" class="deleteProfile secondary-background" rounded>
            <div class="pageContent">
                <div class="titre font-title">SUPPRIMER LE PROFIL <span class="nameProfile accent-color">{{this.profileName}}</span> ?</div>
                <div class="description font-text">
                    <div class="questionConfirmation">Êtes-vous sûr de vouloir supprimer ce profil ?</div>
                    <div class="descriptionConfirmation">Tous les dashboards associés seront définitivement supprimés, et vous ne pourrez plus y accéder.</div>
                </div>
                <div class="butonDelete">
                    <v-btn v-on:click="deleteProfile" elevation="2" class="butonDelete font-text warning-background" color="">Supprimer le profil</v-btn>
                </div>
                <div class="butonCancel">
                    <v-btn elevation="2" class="butonCancel font-text accent-background" color="">Annuler</v-btn>
                </div>
            </div>
        </v-sheet>
        <v-snackbar v-model="snackbar">
        {{ snackbarContent }}

            <template v-slot:action="{ attrs }">
            <v-btn
                class="accent-color"
                color=""
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
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
  name: "Connection",
  data() {
    return {
        //if true, the snackbar displays
        snackbar: false,
        snackbarContent: ""
    };
  },
  props: {profileName: String},
  computed: {},
  methods: {
    deleteProfile: async function() {
        const profileToDelete = this.profileName;
        const responseDeleteProfile = await ResourcesService.deleteProfileByName(profileToDelete);
        if (responseDeleteProfile.status===204) {
            this.snackbarContent = "Le profil a bien été supprimé.";
            this.snackbar = true;
            console.log(`Le profil a bien été supprimé.`);
        } else {
            this.snackbarContent = "Le profil n'a pas pu être supprimé.";
            this.snackbar = true;
            console.log(`Le profil n'a pas pu être supprimé.`);
        }
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.mainDiv{
    height: 100%;
    padding: 5% 12% 5% 12%;
}

.titre {
    font-weight: bold;
    font-size: 40px;
    color: #ffffff;
    padding-top: 9%;
}

.description {
    color: #ffffff;
    width: 35%;
    margin-top: 3%;
}

.deleteProfile{
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

    .description{
        width: 80%;
    }

    .mainDiv{
        padding: 0%;
    }
}
</style>
