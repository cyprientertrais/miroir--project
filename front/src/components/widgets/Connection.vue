<template>
  <div align="center" justify="center" class="connection">
    <div class="titre">IMirror</div>
    <div class="password">
      <span class="textPassword">Admin password</span>
      <v-text-field
        v-model="password"
        v-on:keyup="inputKeyPressed"
        label="Password"
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
export default {
  name: "Connection",
  data() {
    return {
      isPasswordWrong: false,
      wrongPasswordMessage: ""
    };
  },
  computed: {},
  methods: {
    connectionTentative: function() {
      let test = "nonon";
      if (this.password === test) {
        alert("Bonjour " + this.password + " !");
      } else {
        this.isPasswordWrong = true;
        this.wrongPasswordMessage = "Wrong password";
      }
    },
    inputKeyPressed: function(e) {
      if (e.keyCode === 13) {
        this.connectionTentative();
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
}
</style>