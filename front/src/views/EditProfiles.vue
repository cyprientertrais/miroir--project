<template>
  <v-container fill-height fluid class="profilesListContainer">
    <v-row justify="center" id="WhoIsThis">
      <div class="text-lg-h1 text-md-h1 text-sm-h2 text-h3">Éditer les profils</div>
      <div class="text-lg-h1 text-md-h1 text-sm-h2 text-h3"><v-icon right color="white" size="60px">mdi-cog</v-icon></div>
    </v-row>
    <v-row justify="center" align="center" class="profilesList">
      <v-col cols="6" md="2" sm="3" v-for="profile in profilesArray" :key="profile.id">
        <v-avatar class="profile elevation-5" size="20vh">{{profile.pseudo}}</v-avatar>
      </v-col>
    </v-row>

    <v-row justify="center" id="btnEditProfiles">
      <v-btn class="elevation-5" color="white" x-large outlined>Terminé</v-btn>
    </v-row>
  </v-container>
</template>


<script>
import Resources from "@/service/resources/resources";
const ResourcesService = new Resources();
export default {
  name: "ProfilesLists",
  created() {
    this.getProfiles();
  },
  data() {
    return {
      color: "primary",
      profilesArray: ""
    };
  },
  methods: {
    getProfiles() {
      ResourcesService.getAllUserProfile().then(res => {
        this.profilesArray = res.data;
      });
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
  color: aqua;
}
div {
  color: white;
}
#btnEditProfiles {
  text-align: center;
  top: 55%;
  color: pink;
}
/*.profiles{
    background-color: #3c3e41;
    height: 100%;
}*/
</style>