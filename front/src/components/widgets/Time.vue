<template>
  <div>
    <v-col align="center" justify="center" class="time">
      <v-row justify="center"
        ><clock :time="moment().format('LTS')" color="white"></clock
      ></v-row>
      <v-row justify="center"
        ><div class="horloge">{{ this.date }}</div></v-row
      >
      <v-row justify="center">
        <div class="date">{{ moment().format("Do MMMM YYYY") }}</div></v-row
      >
    </v-col>
  </div>
</template>

<script>
var moment = require("moment");
import Clock from "vue-clock2";
export default {
  components: {
    Clock
  },
  name: "Time",
  data() {
    return {
      date: null
    };
  },
  computed: {},
  methods: {
    moment: function() {
      return moment();
    }
  },
  mounted: function() {
    setInterval(() => {
      this.date = moment().format("HH:mm:ss");
    }, 1000);
  }
};
</script>
<style scoped>
.horloge {
  font-size: 3vw;
  color: white;
}
.date {
  color: white;
  font-size: 2vw;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
