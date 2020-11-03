<template>
  <div class="mainDiv primary-background">
    <v-sheet
      align="center"
      justify="center"
      class="login secondary-background"
      rounded
    >
      <div class="titre font-title">Oÿna</div>
      <div class="password">
        <v-text-field
          v-model="password"
          v-on:keyup="inputKeyPressed"
          label="Admin password"
          type="password"
          class="inputPassword font-text"
          dark
          :error="isPasswordWrong"
          :error-messages="wrongPasswordMessage"
        ></v-text-field>
        <v-btn
          v-on:click="connectionTentative"
          elevation="2"
          class="butonPassword font-text accent-background"
          color="#155b73"
          >Connect</v-btn
        >
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { sha256 } from "js-sha256";
import Resources from "@/service/resources/resources";
const ResourcesService = new Resources();
export default {
  name: "Connection",
  data() {
    return {
      password: "",
      isPasswordWrong: false,
      wrongPasswordMessage: "",
    };
  },
  computed: {},
  methods: {
    connectionTentative: async function() {
      //hash password
      const hashedPassword = sha256(this.password);
      //askbackif the password is right, recieve 200 or 403
      const responseCheckPassword = await ResourcesService.checkAdminPassword(
        hashedPassword
      );
      //check if call responds 200 or 403
      if (responseCheckPassword.status === 200) {
        //if yes, modification global variable to say user is connected and redirect
        sessionStorage.setItem("isAuthenticated", true);
        this.$router.push(this.$route.query.from || "/");
      } else {
        //if no, display error
        this.isPasswordWrong = true;
        this.wrongPasswordMessage = "Wrong password";
      }
    },
    inputKeyPressed: async function(e) {
      if (e.keyCode === 13) {
        //try connection if user press enter
        await this.connectionTentative();
      } else {
        //reset error on input
        this.isPasswordWrong = false;
        this.wrongPasswordMessage = "";
      }
    },
  },
  mounted: function() {},
};
</script>
<style scoped>
.titre {
  font-weight: bold;
  font-size: 70px;
  color: #ffffff;
  padding-top: 7%;
}
.password {
  margin-top: 6%;
}
.inputPassword {
  width: 160px;
  margin-top: 10px;
}
.butonPassword {
  margin-top: 8%;
  color: #ffffff;
}
.login {
  height: 100%;
}
.mainDiv {
  height: 100%;
  padding: 5% 12% 5% 12%;
}
@media screen and (max-width: 540px) {
  .titre {
    padding-top: 40%;
  }
  .mainDiv {
    height: 100%;
    padding: 10%;
  }
}
</style>
