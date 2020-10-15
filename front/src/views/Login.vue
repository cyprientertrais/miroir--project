<template>
  <div align="center" justify="center" class="login">
    <div class="titre">IMirror</div>
    <div class="password">
      <v-text-field
        v-model="password"
        v-on:keyup="inputKeyPressed"
        label="Admin password"
        type="password"
        class="inputPassword"
        dark
        :error="isPasswordWrong"
        :error-messages="wrongPasswordMessage"
      ></v-text-field>
      <v-btn v-on:click="connectionTentative" elevation="2" class="butonPassword" dark
        >Connect</v-btn
      >
    </div>
  </div>
</template>

<script>
import { sha256 } from 'js-sha256';
import Resources from "@/service/resources/resources";

const ResourcesService = new Resources();

export default {
  name: "Connection",
  data() {
    return {
      password: "",
      isPasswordWrong: false,
      wrongPasswordMessage: ""
    };
  },
  computed: {},
  methods: {
    connectionTentative: async function() {
      const hashedPassword = sha256(this.password);
      const responseCheckPassword = await ResourcesService.checkAdminPassword(hashedPassword);
      //check if call responds 200 or 403
      if (responseCheckPassword.status===200) {
        sessionStorage.setItem("isAuthenticated", true);
        this.$router.push(this.$route.query.from || "/");
      } else {
        this.isPasswordWrong = true;
        this.wrongPasswordMessage = "Wrong password";
      }
    },
    inputKeyPressed: async function(e) {
      if (e.keyCode === 13) {
        await this.connectionTentative();
      } else {
        this.isPasswordWrong = false;
        this.wrongPasswordMessage = "";
      }
    }
  },
  mounted: function() {}
};
</script>
<style scoped>
.titre {
  font-weight: bold;
  font-size: 50px;
  color: #ffffff;
  padding-top: 10%;
}

.password {
  margin-top: 8%;
}

.inputPassword {
  width: 160px;
  margin-top: 10px;
}

.butonPassword {
  margin-top: 8%;
  color: #ffffff;
}

.login{
    background-color: #3c3e41;
    height: 100%;
}
</style>