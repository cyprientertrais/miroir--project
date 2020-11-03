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
        <v-badge
          icon="mdi-pencil"
          color="green"
          overlap
          offset-x="25"
          offset-y="25"
          v-model="editing"
        >
          <v-avatar
            class="profile elevation-5"
            size="20vh"
            @click="editProfile(profile)"
            >{{ profile.pseudo }}</v-avatar
          >
        </v-badge>
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
        color="white"
        x-large
        outlined
        >{{ btnValue }}</v-btn
      >
    </v-row>

    <v-dialog v-model="addProfile" width="50vh">
      <AddProfile @profileCreated="getProfiles" />
    </v-dialog>

    <v-dialog v-model="editingChoosedProfile" width="50vh">
      <ChangeProfile
        @profileChanged="profileEdited"
        :profile="choosedProfile"
      />
    </v-dialog>
  </v-container>
</template>


<script>
import AddProfile from "@/components/AddProfile";
import ChangeProfile from "@/components/ChangeProfile";
import Resources from "@/service/resources/resources";
const ResourcesService = new Resources();
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
      editingChoosedProfile: false
    };
  },
  methods: {
    profileEdited() {
      this.choosedProfile = null;
      this.editingChoosedProfile = false;
    },
    editProfile(profile) {
      if (this.editing) {
        this.choosedProfile = profile;
        this.editingChoosedProfile = true;
      }
    },
    getProfiles(value) {
      if (value) {
        ResourcesService.getAllUserProfile().then(res => {
          this.profilesArray = res.data;
        });
      }

      this.addProfile = false;
    },
    toogleEdit() {
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
  background-color: #3c3e41;
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
  background-color: #3c3e41;
  border: 5px white solid;
}
.paramDiv {
  width: 100%;
  text-align: right;
  margin-top: 20px;
  padding-right: 20px;
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