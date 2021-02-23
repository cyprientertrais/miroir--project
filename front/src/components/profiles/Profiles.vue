<template>
  <v-container fill-height fluid class="profilesListContainer">
    <v-row justify="center" id="WhoIsThis" class="d-flex align-start">
      <div class="text-lg-h1 text-md-h1 text-sm-h2 text-h3">
        {{ titleValue }}
      </div>
    </v-row>
    <v-row
      justify="center"
      align="center"
      class="profilesList d-flex align-center"
    >
      <v-col
        cols="6"
        md="2"
        sm="4"
        v-for="profile in profilesArray"
        :key="profile.id"
      >
        <v-avatar
          color="primary"
          class="profile elevation-5"
          size="20vh"
          @click="editProfile(profile)"
        >
          <v-icon
            x-large
            dark
            v-if="profile.pseudo != 'Invité' && editing"
            class="profil-avatar"
            color="grey"
          >
            mdi-pencil
          </v-icon>
          <span class="profil-avatar">{{ profile.pseudo }}</span>
        </v-avatar>
      </v-col>
      <v-col v-if="profilesArray.length < 6" cols="6" md="2" sm="4" xs="6">
        <v-avatar class="plus" size="20vh" @click="addProfile = true">
          <v-icon size="100" color="white" dark
            >mdi-account-plus-outline</v-icon
          >
        </v-avatar>
      </v-col>
    </v-row>
    <v-row justify="center" id="btnEditProfiles" class="d-flex align-end">
      <v-btn
        @click="toogleEdit()"
        href="#"
        class="elevation-5"
        color="accent"
        x-large
        >{{ btnValue }}</v-btn
      >
    </v-row>

    <v-row justify="center">
      <v-alert
        dense
        outlined
        type="error"
        v-if="inviteProfil === true && editing"
      >
        Impossible de supprimer le profil <strong>invité</strong>
      </v-alert>
    </v-row>

    <v-dialog v-model="addProfile" width="500px">
      <AddProfile @profileCreated="getProfiles" />
    </v-dialog>
    <v-dialog v-model="editingChoosedProfile" width="500px">
      <ChangeProfile
        v-if="editingChoosedProfile"
        @profileChanged="profileEdited"
        :profile="choosedProfile"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import AddProfile from "@/components/profiles/AddProfile";
import ChangeProfile from "@/components/profiles/ChangeProfile";
import UserResources from "@/service/resources/UserResources";
const userService = new UserResources();
export default {
  name: "ProfilesLists",
  components: {
    AddProfile,
    ChangeProfile
  },
  created() {
    this.getProfiles(true);
  },
  data() {
    return {
      color: "primary",
      profilesArray: "",
      btnValue: "Éditer les profils",
      titleValue: "Qui est-ce ?",
      editing: false,
      addProfile: false,
      choosedProfile: undefined,
      editingChoosedProfile: false,
      inviteProfil: false,
    };
  },
  methods: {
    profileEdited(needRefresh) {
      this.choosedProfile = null;
      this.editingChoosedProfile = false;
      console.log(needRefresh);
      this.getProfiles(needRefresh);
    },
    editProfile(profile) {
      this.inviteProfil = false;
      if (this.editing && profile.pseudo != "Invité") {
        this.choosedProfile = profile;
        this.editingChoosedProfile = true;
      } else if (this.editing && profile.pseudo === "Invité") {
        this.inviteProfil = true;
      }
    },
    getProfiles(value) {
      if (value) {
        userService.getAllUserProfile().then(res => {
          this.profilesArray = res.data;
        });
      }
      this.addProfile = false;
    },
    toogleEdit() {
      this.inviteProfil = false;
      this.btnValue == "Éditer les profils"
        ? (this.btnValue = "Terminé")
        : (this.btnValue = "Éditer les profils");
      this.titleValue == "Qui est-ce ?"
        ? (this.titleValue = "Éditer les profils")
        : (this.titleValue = "Qui est-ce ?");
      this.editing = !this.editing;
    }
  }
};
</script>

<style scoped>
.profilesListContainer {
  height: 100%;
  width: 100%;
  background: #2e2e2e;
}
#WhoIsThis {
  font-size: 4vh;
  width: 100%;
  text-align: center;
  align-content: center;
  top: 5%;
  /* background-color: cyan; */
}

.profilesList {
  text-align: center;
  text-justify: center;
  align-content: center;
  width: 100%;
  /*background-color: #ffc0cb;*/
  vertical-align: middle;
  top: 50%;
}
.profile {
  margin: 10px;
  font-size: 30px;
}
.plus {
  margin: 10px;
  font-size: 100px;
  background-color: #2e2e2e;
}
.plus:hover {
  cursor: pointer;
  size: 300;
  background-color: #3c3e41;
  transition: 0.5s ease;
}
.profile:hover {
  cursor: pointer;
  size: 300;
  border: 5px white solid;
}
.paramDiv {
  width: 100%;
  text-align: right;
  margin-top: 20px;
  padding-right: 20px;
}
.profil-avatar {
  position: absolute;
}
div {
  color: white;
}
#btnEditProfiles {
  text-align: center;
  top: 55%;
  color: pink;
}
</style>
